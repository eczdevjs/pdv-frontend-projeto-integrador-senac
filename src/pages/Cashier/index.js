import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import { Modal } from "../../components/Layout/Modal";
import { useCashier } from "../../Context/CashierContext";
import { Link } from "react-router-dom";
import { loginFailure } from '../../store/modules/auth/actions';
import {
  Table, SpanValue,
  LabelDate,
  InputDate,
  FilterButton
} from "../../styles/GlobalStyle";
import {
  CashierContainer,
  CashierSubContainer,
  MainContainer,
  TabButton,
  TabNav
} from "./styled";
import { SlArrowRight } from 'react-icons/sl';
import { toCurrency } from '../../utils/currencyValue';
import { CashierModalManager } from "../../components/Layout/CashierModals";


export default function Cashier() {

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

  const savedData = getDataSession();


  const [activeTab, setActiveTab] = useState(savedData.activeTab || 'current');
  const [previousShifts, setPreviousShifts] = useState(savedData.previousShifts || []);
  const [initialDate, setInitialDate] = useState(savedData.initialDate || '');
  const [endDate, setEndDate] = useState(savedData.endDate || '');

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
    handleFilteredShifts,
    handleGetOpenedShift

  } = useCashier();


  React.useEffect(() => {

    if (isCashierOpen && !modalType) {

      async function getData() {

        setIsLoading(true);
        try {

          const openedShift = await handleGetOpenedShift();
          // if (openedShift) {
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
          // }

        } catch (e) {
          setIsLoading(false);
          if (e.response?.status === 401) {
            dispatch(loginFailure());
          }

          if (e.response?.status === 404) {
            console.log("Nao ha sessao de caixa aberta");
            return;
          }
          console.log('erro no carregamento: ', e)
          toast.error("Nao foi possivel restaurar  a sessao caixa", { autoClose: 8000 });
        }
      }
      getData();
    }
  }, [handleGetShift, handleGetTransactions, dispatch, handleGetBalances, modalType, activeTab, previousShifts]);

  // salvando dados para nao perder o estado da pagina ao clicar em outra pagina, persiste durante a sessao(navegador ser fechado);
  React.useEffect(() => {

    if (!activeTab) return;

    const stateToSave = {
      activeTab,
      initialDate,
      endDate,
      previousShifts
    };

    sessionStorage.setItem('@CashierPage:state', JSON.stringify(stateToSave));

  }, [activeTab, initialDate, endDate, previousShifts]);


  function getDataSession() {
    const dataSession = sessionStorage.getItem('@CashierPage:state');
    if (dataSession && dataSession !== "[object Object]") {
      try {
        return JSON.parse(dataSession);
      } catch (error) {
        console.error('error fetching session storage cashier: ', error);
      }
    }
    return {};
  }

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

        if (data.amount > 0) {
          toast.error('A quantia para saque deve ser menor do que zero(negativa)', { autoClose: 5000 });
          return;
        }
        await handleWithdraw(data);
        setModalType('');
        toast.success('Saque realizado');
      }

      if (modalType === 'FILTER_DATE') {
        const history = await handleFilteredShifts(data);
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


  function handleFilterDate() {

    if (!initialDate && !endDate) {
      toast.error('Initial and final date must be provided');
      return;
    }

    if (endDate < initialDate) {
      toast.error("Data final não pode ser menor do que a data inicial");
      return;
    }


    // checar se final e menor do que inicial;

    async function getFilteredCashier() {
      try {
        setIsLoading(true);
        const history = await handleFilteredShifts({ initialDate, endDate });
        setPreviousShifts(history);
        setIsLoading(false);
        toast.success("Filtered applied")
      } catch (e) {
        setIsLoading(false);
        toast.error('Error getting transactions');
        console.log(e)
      }

    }
    getFilteredCashier();
  }

  return (
    <MainContainer>
      <Loading isLoading={isLoading} />

      {modalType && (
        <Modal showModal={!!modalType} closeModal={() => { setModalType(null) }}>
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
          Caixa atual
        </TabButton>

        <TabButton
          active={activeTab === 'previous'}
          onClick={async () => {
            setActiveTab('previous');
          }}
        >
          Caixas anteriores
        </TabButton>
      </TabNav>

      {activeTab === 'current' && (
        <CashierContainer >
          <CashierSubContainer>

            <h1>Resumo do Caixa</h1>
            <div style={{ paddingBottom: '4px' }}>
              <div>
                <span className="label"><strong>ABERTURA:  </strong> </span>
                <SpanValue className="value"> {openedAt ? dateFormatter.format(new Date(openedAt)) : ''} </SpanValue>
              </div>
            </div>

            <div>
              <span className="label" ><strong>SALDO ABERTURA: </strong> </span>
              <SpanValue className="value">{new Intl.NumberFormat('pt-BR', { style: "currency", currency: 'BRL' }).format(initialBalance ? initialBalance : '')} </SpanValue>
            </div>

            <div>
              <span className="label" ><strong>TOTAL EM DEPOSITOS:  </strong></span>
              <SpanValue className="value">{new Intl.NumberFormat('pt-BR', { style: "currency", currency: 'BRL' }).format(totalDeposits ? totalDeposits : 0)}</SpanValue>
            </div>

            <div>
              <span className="label" ><strong>TOTAL RETIRADAS:  </strong></span>
              <SpanValue className="value">{new Intl.NumberFormat('pt-BR', { style: "currency", currency: 'BRL' }).format(totalWithdraw ? totalWithdraw : 0)} </SpanValue>
            </div>

            <div>
              <span className="label" ><strong>TOTAL VENDAS: </strong> </span>
              <SpanValue className="value">{new Intl.NumberFormat('pt-BR', { style: "currency", currency: 'BRL' }).format(totalSales ? totalSales : 0)} </SpanValue>
            </div>

            <div>
              <span className="label" ><strong>SALDO FINAL: </strong> </span>
              <SpanValue className="value"><strong>{new Intl.NumberFormat('pt-BR', { style: "currency", currency: 'BRL' }).format(finalBalance ? finalBalance : 0)}</strong> </SpanValue>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '15px', padding: '10px' }}>
              <button style={{lineHeight:"2.5"}} onClick={() => {
                if (!isCashierOpen) {
                  toast.error('Abra o Caixa para realizar um depósito', {autoClose:6000});
                  return;
                }
                setModalType('DEPOSIT')
              }}>Adicionar saldo</button>
              <button style={{lineHeight:"2.5"}} onClick={() => {
                if (!isCashierOpen) {
                  toast.error('Abra o Caixa para realizar sangria', {autoClose:6000});
                  return;
                }
                setModalType('WITHDRAW')
              }}>Retirada</button>
            </div>
          </CashierSubContainer>

          <CashierSubContainer>

            <h1>Meio de Pagamento</h1>

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
              <p>Nenhuma transação encontrada.</p>
            )}
          </CashierSubContainer>

          <CashierSubContainer >
            <h2>Transações</h2>
            <button style={{lineHeight:"2.5"}} onClick={isCashierOpen ? () => setModalType('CLOSE_CASHIER')
              : () => setModalType('OPEN_CASHIER')}>{isCashierOpen ? 'Fechar Caixa' : 'Abrir Caixa'}
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
            ) : (<p>Nenhuma transação encontrada</p>)}


          </CashierSubContainer>
        </CashierContainer>)}

      {activeTab === 'previous' && (

        < CashierContainer >
          <CashierSubContainer style={{ maxWidth: '100%' }}>
            <h2>Histórico de Caixa</h2>

            <div
              className="actions"
              style={{
                display: 'flex',
                flexDirection: "row"
              }}>
              <LabelDate>
                Initial date:

                <InputDate
                  type='date'
                  value={initialDate}
                  onChange={(e) => setInitialDate(e.target.value)}>
                </InputDate>
              </LabelDate>

              <LabelDate>
                Final date:
                <InputDate
                  type='date'
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}></InputDate>
              </LabelDate>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: '10px'
                }}>
                <FilterButton
                  onClick={() => handleFilterDate()}
                >Filtrar</FilterButton>
              </div>
            </div>
            {
              <Table >
                <thead>
                  <tr>
                    <th>
                      Abertura
                    </th>

                    <th>
                      Valor
                    </th>

                    <th>
                      Fechamento
                    </th>

                    <th>
                      Valor
                    </th>
                    <th>
                      Diferença
                    </th>
                    <th>
                      Detalhes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    previousShifts ? previousShifts.map(item => (
                      <tr key={item.id} >
                        <td>{dateFormatter.format(new Date(item.startTime))}</td>
                        <td>R$ {item.openingBalance}</td>
                        <td>
                          {item.endTime ? dateFormatter.format(new Date(item.endTime)) : <div><span style={{ color: "#27d65b" }}><strong>CURRENTLY OPENED</strong></span></div>
                          }
                        </td>
                        <td>{toCurrency(item.closingBalance)}</td>
                        <td>{toCurrency(item.difference)}</td>
                        <td>
                          <Link to={`/cashier/${item.id}`}>
                            <SlArrowRight>
                            </SlArrowRight>
                          </Link>
                        </td>
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




