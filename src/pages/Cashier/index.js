import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import { Modal } from "../../components/Layout/Modal";
import { useCashier } from "../../Context/CashierContext";
import { loginFailure } from '../../store/modules/auth/actions';
import { Table, SpanValue } from "../../styles/GlobalStyle";
import {
  CashierContainer,
  CashierSubContainer,
  MainContainer,
  TabButton,
  TabNav
} from "./styled";
import {toCurrency} from '../../utils/currencyValue';

import { CashierModalManager } from "../../components/Layout/CashierModals";


export default function Cashier() {

  const [activeTab, setActiveTab] = useState('current');
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
  const [previousShifts, setPreviousShifts] = useState([]);

  const dispatch = useDispatch();

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'short',
    timeStyle: 'short'
  });

  const {
    handleOpenCashier,
    handleCloseCashier,
    handleGetShift,
    isCashierOpen,
    shiftId,
    handleGetTransactions,
    handleGetBalances,
    handleDeposit,
    handleWithdraw,
    handlePreviousShifts,
    handleFilteredShifts

  } = useCashier();

  React.useEffect(() => {

    if (isCashierOpen && !modalType) {

      async function getData() {

        setIsLoading(true);
        try {
          const [shiftData,
            transactionData,
            balancesData] = await Promise.all([
              handleGetShift(shiftId),
              handleGetTransactions(shiftId),
              handleGetBalances(shiftId)
            ]);

          const { openingBalance, startTime } = shiftData;
          setOpenedAt(startTime);
          setInitialBalance(openingBalance);
          setTransactions(transactionData);
          console.log('Transactions data: ', transactionData);
          setBalances(balancesData);

          const totals = transactionData.reduce((acc, t) => {
            const amount = Number(t.amount) || 0;
            if (t.type.name === 'DEPOSIT') acc.deposits += amount;
            if (t.type.name === 'WITHDRAW') acc.withdraw += amount;
            if (t.type.name === 'SALE') acc.sales += amount;
            return acc;
          }, { deposits: 0, withdraw: 0, sales: 0 });

          setTotalDeposits(totals.deposits);
          setTotalWithdraw(totals.withdraw);
          setTotalSales(totals.sales);

          const calculatedFinal = Number(openingBalance) + totals.deposits + totals.withdraw + totals.sales;
          setFinalBalance(calculatedFinal);
          setIsLoading(false);
        } catch (e) {
          setIsLoading(false);
          if (e.response?.status === 401) {
            dispatch(loginFailure());
          }
          console.log('erro no carregamento: ', e)
          toast.error("Nao foi possivel restaurar  a sessao caixa", { autoClose: 8000 });
        }
      }
      getData();
    }
  }, [handleGetShift, handleGetTransactions, dispatch, handleGetBalances, modalType, activeTab, previousShifts]);


  const handleConfirmAction = async (data) => {

    setIsLoading(true);
    try {
      if (modalType === 'OPEN_CASHIER') {
        const response = await handleOpenCashier(data);
        setOpenedAt(response.openedAt);
        setInitialBalance(response.openingBalance);
        toast.success('Caixa aberto');
        setModalType('');
      }

      if (modalType === 'CLOSE_CASHIER') {
        console.log(`isCashierOpen ${isCashierOpen}, shiftId=${shiftId}, closingBalance=${data}`)
        await handleCloseCashier(isCashierOpen, shiftId, data);
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

      if (modalType === 'FILTER_DATE') {
        console.log('cashier: ', data)
        const history = await handleFilteredShifts(data);
        console.log("history: ", history);
        console.log("data", data);
        setModalType('');
        setPreviousShifts(history);

        toast.success('History reached');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.msg || 'Unexpected error';
      toast.error(errorMessage, { autoClose: 7000 });
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <MainContainer>
      <Loading isLoading={isLoading} />

      {modalType && (
        <Modal showModal={!!modalType} closeModal={() => {setModalType(null)}}>
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
          onClick={async () => {
            setActiveTab('previous');
            const today = new Date();
            const thirtyDaysBefore = new Date();
            thirtyDaysBefore.setDate(today.getDate() - 30);

            const endDate = today.toISOString().split('T')[0];
            const initialDate = thirtyDaysBefore.toISOString().split('T')[0]; 
            try {
              setIsLoading(true);
              const history = await handleFilteredShifts({ initialDate, endDate });
              setPreviousShifts(history);
              setIsLoading(false);
              toast.success("Last 30 days transactions restablished")
            } catch (e) {
              setIsLoading(false);
                toast.error('Error getting transactions');
                console.log(e)
            }

          }}
        >
          Previous Cashier
        </TabButton>
      </TabNav>

      {activeTab === 'current' && (
        <CashierContainer >
          <CashierSubContainer>

            <h1>Cash Summary</h1>
            <div style={{ paddingBottom: '4px' }}>
              <div>
                <span className="label"><strong>OPENED AT:  </strong> </span>
                <SpanValue className="value"> {openedAt ? dateFormatter.format(new Date(openedAt)) : ''} </SpanValue>
              </div>
            </div>

            <div>
              <span className="label" ><strong>INITIAL BALANCE: </strong> </span>
              <SpanValue className="value">{new Intl.NumberFormat('pt-BR', { style: "currency", currency: 'BRL' }).format(initialBalance ? initialBalance : '')} </SpanValue>
            </div>

            <div>
              <span className="label" ><strong>TOTAL DEPOSITS:  </strong></span>
              <SpanValue className="value">{new Intl.NumberFormat('pt-BR', { style: "currency", currency: 'BRL' }).format(totalDeposits ? totalDeposits : 0)}</SpanValue>
            </div>

            <div>
              <span className="label" ><strong>TOTAL WITHDRAW:  </strong></span>
              <SpanValue className="value">{new Intl.NumberFormat('pt-BR', { style: "currency", currency: 'BRL' }).format(totalWithdraw ? totalWithdraw : 0)} </SpanValue>
            </div>

            <div>
              <span className="label" ><strong>TOTAL SALES: </strong> </span>
              <SpanValue className="value">{new Intl.NumberFormat('pt-BR', { style: "currency", currency: 'BRL' }).format(totalSales ? totalSales : 0)} </SpanValue>
            </div>

            <div>
              <span className="label" ><strong>FINAL BALANCE: </strong> </span>
              <SpanValue className="value"><strong>{new Intl.NumberFormat('pt-BR', { style: "currency", currency: 'BRL' }).format(finalBalance ? finalBalance : 0)}</strong> </SpanValue>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '15px', padding: '10px' }}>
              <button onClick={() => {
                if (!isCashierOpen) {
                  toast.error('Cashier is not opened');
                  return;
                }
                setModalType('DEPOSIT')
              }}>Add Cash</button>
              <button onClick={() => {
                if (!isCashierOpen) {
                  toast.error('Cashier is not opened');
                  return;
                }
                setModalType('WITHDRAW')
              }}>Withdraw</button>
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
                  <SpanValue>
                    {new Intl.NumberFormat('pt-BR', { style: "currency", currency: 'BRL' }).format(item.amount)}
                  </SpanValue>
                </div>

              </div>)
              )
            ) : (
              <p>No transactions found.</p>
            )}
          </CashierSubContainer>

          <CashierSubContainer >
            <h2>Transactions</h2>
            <button onClick={isCashierOpen ? () => setModalType('CLOSE_CASHIER')
              : () => setModalType('OPEN_CASHIER')}>{isCashierOpen ? 'Close Cashier' : 'Open Cashier'}
            </button>

            {transactions.length > 0 ? (
              transactions.map((item, index) =>
              (<div key={`${item.paymentMethod}-${index}`} className="trasaction-item">
                <div className="info">
                  <div><strong>{dateFormatter.format(new Date(item.createdAt))}</strong> </div>

                  <strong>{item.type.name}</strong>
                  <small> {item.payment.name}</small>
                </div>
                <div className="value">
                  <SpanValue>
                    {new Intl.NumberFormat('pt-BR', { style: "currency", currency: 'BRL' }).format(item.totalAmount || item.amount)}
                  </SpanValue>
                </div>

              </div>)
              )
            ) : (<p>No transactions found.</p>)}


          </CashierSubContainer>
        </CashierContainer>)}


      {activeTab === 'previous' && (

        < CashierContainer >
          <CashierSubContainer style={{ maxWidth: '100%' }}>
            <h2>History of closed cashiers</h2>
            <h3>List of previous cashier transactions (last 30 days)</h3>
            <div className="actions">
              <button onClick={() => { setModalType('FILTER_DATE') }}>Filter</button>
            </div>
            {
              <Table >
                <thead>
                  <tr>
                    <th>
                      Opened at
                    </th>

                    <th>
                      Opening amount
                    </th>

                    <th>
                      Closed at
                    </th>

                    <th>
                      Closing amount
                    </th>
                    <th>
                      Difference
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    previousShifts ? previousShifts.map(item => (
                      <tr key={item.id} >
                        <td>{dateFormatter.format(new Date(item.startTime))}</td>
                        <td>R$ {item.openingBalance}</td>
                        <td> {item.endTime ? dateFormatter.format(new Date(item.endTime)) : 'CURRENTLY OPENED'}</td>
                        <td>{toCurrency(item.closingBalance)}</td>
                        <td>{toCurrency(item.difference)}</td>
                      </tr>
                    )) : (<tr><td>No data</td></tr>)
                  }
                </tbody>  
              </Table>

            }
            
          </CashierSubContainer>
        </CashierContainer>)}
    </MainContainer >);
}




