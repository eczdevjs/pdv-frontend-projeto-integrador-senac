import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from '../../services/axios';
import { Container } from "../../styles/GlobalStyle";
import { CashierContainer, CashierSubContainer, MainContainer, TabButton, TabNav, Modal, Overlay, Button } from "./styled";
import { get } from 'lodash';
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa';
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

import { useCashier } from "../../Context/CashierContext";


export default function Cashier() {

  const [activeTab, setActiveTab] = useState('current');
  // tenho que exportar o componente Loading e adicionar no retorno do componente
  const [isLoading, setIsLoading] = useState(false);
  const [openedAt, setOpenedAt] = useState('');
  const [initialBalance, setInitialBalance] = useState(0);
  const [closingBalance, setClosingBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [finalBalance, setFinalBalance] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [openingBalance, setOpeningBalance] = useState(0);

  const { handleOpenCashier, handleCloseCashier, handleGetShift , isCashierOpen } = useCashier();


  React.useEffect(() => {

    const shiftId = localStorage.getItem('activeShiftId');

    if (shiftId) {
      async function getShift() {
        setIsLoading(true);
        try {
          const data = await handleGetShift(shiftId);
          const { openinBalance, startTime } = data;
          setOpenedAt(startTime);
          setInitialBalance(openinBalance);
          setIsLoading(false);
        } catch (e) {
          setIsLoading(false);
          toast.error(e.message, {autoClose: 8000});
        }
      }

      async function getTransactions() {
        setIsLoading(true);
        try {
          const response = await axios.get(`/cashier/balances/${shiftId}`);
          const { openinBalance, startTime } = response.data;
          setTransactions(response.data);
          toast.success()
          setIsLoading(false);
        } catch (e) {
          setIsLoading(false);
          toast.error(e.response.data.msg);
        }
      }
      getShift();
      getTransactions();
    }


  }, []);


  function handleModalOpeningCashier() {
    setShowModal(true);
  }

  function confirmOpeningCashier() {
    console.log('Opening cashier with: ', openingBalance);

    setIsLoading(true);
    async function getData() {
      try {
        const data = await handleOpenCashier(openingBalance);
        console.log(data);
        setOpenedAt(data.startTime);
        setInitialBalance(data.openingBalance);
        toast.success('Cashier opened');
        setIsLoading(false);
        setShowModal(false);
        return data;
      } catch (e) {

        setIsLoading(false);
        setShowModal(false);
        const errorMessage = e.response?.data?.msg || 'Unexpected error'
        console.log(e);
        toast.error(errorMessage, { autoClose: 4000 });
      }
    }
    getData();
  }



  function handleModalClosingCashier() {
    setShowModal(true);
  }

  function confirmClosingCashier() {

    async function getData() {
      try {

        const data = await handleCloseCashier(closingBalance);
        toast.success('Cashier Closed');
        setIsLoading(false);
        setShowModal(false);
        return data;
      } catch (error) {

        setIsLoading(false);
        setShowModal(false);
        const errorMessage = error.response?.data?.msg || 'Unexpected error'
        console.log(error)
        console.log(error.response);
        toast.error(errorMessage, { autoClose: 4000 });
      }
    }
    getData();
  }


  function handleCashierHistory() {

  }

  function handleAddCash() {

  }

  function handleWithdraw() {

  }


  return (
    <MainContainer>
      <Loading isLoading={isLoading} />

      {showModal && (<Overlay>
        <Modal>
          <h2>{isCashierOpen ? 'Close Cashier' : "Open Cashier"}</h2>
          <p>{isCashierOpen ? "Enter final balance" :'Enter final balance' }</p>
          <input
            type="number"
            placeholder="R$ 0,00"
            value={isCashierOpen ? closingBalance  : openingBalance}
            onChange={(e) => isCashierOpen ? setClosingBalance(e.target.value) : setOpeningBalance(e.target.value) }
            autoFocus
          />
          <div className="actions">
            <Button onClick={() => setShowModal(false)}>Cancel</Button>

            <Button confirm onClick={
              () => isCashierOpen ?confirmClosingCashier() :confirmOpeningCashier()}>
              Confirm</Button>
          </div>
        </Modal>
      </Overlay>
      )
      }
      <TabNav>
        <TabButton
          active={activeTab === 'current'}
          onClick={() => setActiveTab('current')}
        >
          Current Cashier
        </TabButton>

        <TabButton
          active={activeTab === 'previous'}
          onClick={() => setActiveTab('previous')}
        >
          Previous Cashier
        </TabButton>
      </TabNav>

      {activeTab === 'current' && (<CashierContainer>
        <CashierSubContainer>
          <h1>Cash Summary</h1>
          <div>
            <span className="label">Opened at: </span>
            <span className="value"> {openedAt ? openedAt : ''} </span>
          </div>

          <div>
            <span className="label" >Initial balance: </span>
            <span className="value">R${initialBalance ? initialBalance : ''} </span>
          </div>

          <div>
            <span className="label" >Total Sales: </span>
            <span className="value">{totalSales ? totalSales : `R$ ${0}`} </span>
          </div>

          <div>
            <span className="label" >Final Balance: </span>
            <span className="value">{finalBalance ? finalBalance : `R$ 0`} </span>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '15px', padding: '10px' }}>
            <button>Add Cash</button>
            <button>Withdraw</button>
          </div>
        </CashierSubContainer>

        <CashierSubContainer>
          <h2>Payment methods</h2>
          <span>Credit Card: R$ 0,00</span>
          <span>Debit Card: R$ 0,00</span>
          <span>Pix : R$ 0,00</span>
          <span>Cash : R$ 0,00</span>

        </CashierSubContainer>

        <CashierSubContainer>
          <h2>Transactions</h2>
          <h4>List</h4>
          <button onClick={isCashierOpen ? handleModalClosingCashier : handleModalOpeningCashier}>{isCashierOpen ? 'Close Cashier' : 'Open Cashier'}</button>
        </CashierSubContainer>
      </CashierContainer>)}

      {activeTab === 'previous' && (
        <CashierContainer>
          <CashierSubContainer style={{ maxWidth: '100%' }}>
            <h2>History of closed cashiers</h2>
            <p>List of previous cashier transactions</p>

          </CashierSubContainer>
        </CashierContainer>
      )}
    </MainContainer>
  );

}




