
import React, { useEffect, useState } from "react";
import axios from '../../services/axios';
import { Container, TabButton, TabNav, Table, Button } from "../../styles/GlobalStyle";
import { get } from 'lodash';
import { toast } from "react-toastify";
import { SlEqualizer, SlPlus, SlMinus } from "react-icons/sl";
import { StockModalManager } from "./components/modals/StockModalManager";
import { Modal } from "../../components/Layout/Modal";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import MenuContainer from "./components/menu/NewTransactionMenu";

export default function Stock() {

  const [stockList, setStockList] = useState([]);
  const [transactionsList, setTransactionsList] = useState([]);
  const [currentTab, setCurrentTab] = useState('currentStock');
  const [isLoading, setIsLoading] = useState(false);
  const [modalType, setModalType] = useState('');
  const [showModal, setShowModal] = useState(false);


  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'short',
    timeStyle: 'short'
  });
  // const apiUrl = 'http://192.168.0.233:3001';

  React.useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const today = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 30);
        const endDate = today.toISOString().split('T')[0];
        const initialDate = thirtyDaysAgo.toISOString().split('T')[0];

        const transactionsResponse = await axios.get(`/stock/transactions`, {
          params: {
            initialDate,
            endDate
          }
        });
        console.log("transactions response", transactionsResponse);

        const stockResponse = await axios.get('/stock');

        console.log("stock", stockResponse.data);
        console.log("transactions", transactionsResponse.data);
        setStockList(stockResponse.data);
        setTransactionsList(transactionsResponse.data);

        toast.success('Stock has been restablished');
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        console.log('Error useEffect stock: ',e);
        toast.error(e.message);
      }
    }
    getData();
  }, [currentTab]);

  function handleFilter() {
    setModalType('FILTER_TRANSACTIONS');
  }

  function handleFilterRequest({ initialDate, endDate }) {
    if(!initialDate || !endDate){
      toast.error('Date is missing');
      return;
    }
    
    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get('/stock/transactions', {
          params: {
            initialDate,
            endDate
          }
        });
        console.log("datadatadatadata");
        console.log(data);
        if (data?.length === 0) {
          setIsLoading(false);
          toast.error('No transactions found');
          return;
        }

        setTransactionsList(data);
        setIsLoading(false);
        setModalType(null);
        toast.success('Transactions reached');
      } catch (error) {
        setIsLoading(false);
        console.log('Error fetching transactions');
        console.log(error);

      }
    }
    getData();
  }


  function handleConfirmAction(data) {
    switch (modalType) {
      case 'FILTER_TRANSACTIONS':
        handleFilterRequest(data);
        break;
    }
  }

  async function handleDeleteAsk(e, stock) {
    e.preventDefault();
    const confirm = window.confirm(`Do you really wish to exclude ${stock.name} ?`);
    console.log(confirm);
    if (confirm) {
      try {
        setIsLoading(true);
        await axios.delete(`alunos/${stock.id}`);
        const index = stock.indexOf(stock);
        const stockUpdated = [...stockList];
        stockUpdated.splice(index, 1);
        setStockList(stockUpdated);
        setIsLoading(false);
        toast.success("Stock item has been excluded");

      }
      catch (e) {
        setIsLoading(false);
        const errors = get(e, 'response.data.errors', []);
        errors.map(e => toast.error(e));
        if (!errors) {
          toast.error(e);
        }
      }
    }
  }


  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TabNav>
        <TabButton onClick={() => setCurrentTab('currentStock')} active={currentTab === 'currentStock'}>Current Stock</TabButton>
        <TabButton onClick={() => setCurrentTab('stockTransactions')} active={currentTab === 'stockTransactions'}>Stock Transactions</TabButton>
      </TabNav>
      {currentTab === 'currentStock' && (
        <>
          <h1>Stock</h1>
        
          <Container>
            <Table>
              <thead>
                <tr key={'headerStockTable'}>
                  <th >Product</th>
                  <th>Current Stock</th>
                  <th>Provider</th>
                  <th>Category</th>
                  <th>Brand</th>
                </tr>
              </thead>

              <tbody>
                {
                  stockList.length > 0 && (stockList.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <p>{p.product.name}</p>
                        <p>R$ {p.product.price}</p>
                      </td>
                      <td>
                        {p.qty}
                      </td>
                      <td>{p.provider || '-'}</td>
                      <td>{p.category || '-'}</td>
                      <td>{p.brand || '-'}</td>
                    </tr>
                  )))
                }
              </tbody>
            </Table>
          </Container>
        </>)}

      {currentTab === "stockTransactions" && (
        <>
          {modalType && (
            <Modal showModal={!!modalType} closeModal={() => { setModalType(null) }}>
              <StockModalManager
                modalType={modalType}
                onConfirm={(data) => {
                  handleConfirmAction(data);
                }}
                onCancel={() => setModalType(null)}
              >
              </StockModalManager>
            </Modal>
          )}
          <h1>Stock Transactions</h1>

          <div className="actions" style={{ display: 'flex', flexDirection: 'row', padding: '4px', columnGap: '20px' }}>
            <div>
              <MenuContainer setModalType={setModalType} />
            </div>
            {/* <input type="text" placeholder="search"></input> */}
            <button onClick={handleFilter}>Filter by date</button>
          </div>

          <Container>
            <Table>
              <thead>
                <tr key={'header'}>
                  <th>
                    Date/Time
                  </th>
                  <th>
                    User
                  </th>
                  <th>
                    Product
                  </th>
                  <th>
                    Transaction
                  </th>
                  <th>
                    Quantity changed
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  transactionsList.length > 0 && (transactionsList.map((t) =>
                    <tr key={t.id}>
                      <td>{dateFormatter.format(new Date(t.createdAt))}</td>
                      <td>{t.user.name}</td>
                      <td>{t.product.name}</td>
                      <td>{t.referenceType.code}</td>
                      <td>{t.qtyChange}</td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </Container>

        </>)}
    </div>
  );
}
