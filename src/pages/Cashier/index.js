import React, { useState } from "react";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import { Modal } from "../../components/Layout/Modal";
import { useCashier } from "../../Context/CashierContext";
import {
  CashierContainer,
  CashierSubContainer,
  MainContainer,
  TabButton,
  TabNav
} from "./styled";
import { CashierModalManager } from "../../components/Layout/CashierModals";

export default function Cashier() {

  const [activeTab, setActiveTab] = useState('current');
  // tenho que exportar o componente Loading e adicionar no retorno do componente
  const [isLoading, setIsLoading] = useState(false);
  const [openedAt, setOpenedAt] = useState('');
  const [initialBalance, setInitialBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [finalBalance, setFinalBalance] = useState(0);
  const [balances, setBalances] = useState([]);
  const [modalType, setModalType] = useState('');
  const [totalDeposits, setTotalDeposits] = useState(0);
  const [totalWithdraw, setTotalWithdraw] = useState(0);

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'short',
    timeStyle: 'short'
  });

  const {
    handleOpenCashier, handleCloseCashier,
    handleGetShift,
    isCashierOpen, handleGetTransactions, handleGetBalances,
    handleDeposit,
    handleWithdraw
  } = useCashier();

  React.useEffect(() => {

    const storedId = localStorage.getItem('activeShiftId');

    if (storedId && !modalType) {
      const shiftId = Number(storedId);

      async function getShift() {

        setIsLoading(true);
        try {

          const [shiftData, transactionData, balancesData] = await Promise.all([
            handleGetShift(shiftId),
            handleGetTransactions(shiftId),
            handleGetBalances(shiftId)
          ]);

          const { openingBalance, startTime } = shiftData;
          setOpenedAt(startTime);
          setInitialBalance(openingBalance);
          setTransactions(transactionData);
          setBalances(balancesData);

          const totals = transactionData.reduce((acc, t) => {
            const amount = Number(t.amount) || 0;
            if (t.type.name === 'DEPOSIT') acc.deposits += amount;
            if (t.type.name === 'WITHDRAW') acc.withdraw += amount;
            return acc;
          }, { deposits: 0, withdraw: 0 });

          setTotalDeposits(totals.deposits);
          setTotalWithdraw(totals.withdraw);

          const calculatedFinal = Number(openingBalance) + totals.deposits + totals.withdraw;
          setFinalBalance(calculatedFinal);
          setIsLoading(false);
        } catch (e) {
          setIsLoading(false);
          console.log('erro no carregamento: ', e)
          toast.error("Nao foi possivel restaurar  a sessao caixa", { autoClose: 8000 });
        }
      }
      getShift();
    }
  }, [handleGetShift, handleGetTransactions, modalType]);

  const handleConfirmAction = async (data) => {
   
    setIsLoading(true);
    try {
      if (modalType === 'OPEN_CASHIER') {
        const response = await handleOpenCashier(data);
        setOpenedAt(response.openingBalance);
        setInitialBalance(response.openingBalance);
        toast.success('Caixa aberto');
        setModalType('');
      }

      if (modalType === 'CLOSE_CASHIER') {
        await handleCloseCashier(data);
        setModalType('')
        toast.success('Caixa fechado');
      }

      if (modalType === 'DEPOSIT') {
        await handleDeposit(data);
        setModalType('');
        toast.success('Deposito realizado');
      }

      if (modalType === 'WITHDRAW') {
        await handleWithdraw(data);
        setModalType('');
        toast.success('Saque realizado');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.msg || 'Unexpected error';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <MainContainer>
      <Loading isLoading={isLoading} />

      {modalType && (
        <Modal showModal={!!modalType}>
          <CashierModalManager
            modalType={modalType}
            onCancel={() => setModalType(null)}
            onConfirm={(data) => handleConfirmAction(data)}
            isCashierOpen={isCashierOpen}
          >
          </CashierModalManager>
        </Modal>
      )}

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

      {activeTab === 'current' && (
        <CashierContainer>
          <CashierSubContainer>

            <h1>Cash Summary</h1>

            <div>
              <span className="label">Opening: </span>
              <span className="value"> {openedAt ? dateFormatter.format(new Date(openedAt)) : ''} </span>
            </div>

            <div>
              <span className="label" >Initial balance: </span>
              <span className="value">R${initialBalance ? initialBalance : ''} </span>
            </div>

            <div>
              <span className="label" >Total Deposits: </span>
              <span className="value">{totalDeposits ? totalDeposits : `R$ ${0}`} </span>
            </div>

            <div>
              <span className="label" >Withdraws: </span>
              <span className="value">{totalWithdraw ? totalWithdraw : `R$ ${0}`} </span>
            </div>

            <div>
              <span className="label" >Total Sales: </span>
              <span className="value">{totalSales ? totalSales : 0} </span>
            </div>

            <div>
              <span className="label" ><strong>Final Balance:</strong> </span>
              <span className="value"><strong>{finalBalance ? finalBalance : `R$ 0`}</strong> </span>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '15px', padding: '10px' }}>
              <button onClick={() => setModalType('DEPOSIT')}>Add Cash</button>
              <button onClick={() => { setModalType('WITHDRAW') }}>Withdraw</button>
            </div>
          </CashierSubContainer>

          <CashierSubContainer>

            <h1>Payment Method</h1>

            {balances.length > 0 ? (
              balances.map((item, index) =>
              (<div key={`${item.paymentMethod}-${index}`} className="trasaction-item">
                <div className="info">
                  <h3><strong> {item.name}</strong></h3>
                  <h2><small> {item.payment.name}</small></h2>
                </div>
                <div className="value">
                  {new Intl.NumberFormat('pt-BR', { style: "currency", currency: 'BRL' }).format(item.amount)}
                </div>

              </div>)
              )
            ) : (
              <p>No transactions found.</p>
            )}
          </CashierSubContainer>

          <CashierSubContainer>

            <h2>Transactions</h2>

            {transactions.length > 0 ? (
              transactions.map((item, index) =>
              (<div key={`${item.paymentMethod}-${index}`} className="trasaction-item">
                <div className="info">
                  <strong>{item.type.name}</strong>
                  <small> {item.payment.name}</small>
                </div>
                <div className="value">
                  {new Intl.NumberFormat('pt-BR', { style: "currency", currency: 'BRL' }).format(item.totalAmount || item.amount)}
                </div>

              </div>)
              )
            ) : (<p>No transactions found.</p>)}

            <button onClick={isCashierOpen ? () => setModalType('CLOSE_CASHIER')
              : () => setModalType('OPEN_CASHIER')}>{isCashierOpen ? 'Close Cashier' : 'Open Cashier'}</button>
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




