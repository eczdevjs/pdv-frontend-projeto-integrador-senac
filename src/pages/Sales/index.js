import React, { use, useState } from "react";
import axios from '../../services/axios';
import { useDispatch } from "react-redux";
import {
  Container,
  MainContainer,
  TabNav,
  TabButton,
  Table,
  LabelDate,
  InputDate,
  FilterButton
} from "../../styles/GlobalStyle";
import { SalesModalManager } from "./componentes/SalesModalManager";
import Loading from '../../components/Loading';
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import * as actions from '../../store/modules/auth/actions'
import { useCashier } from "../../Context/CashierContext";
import { Modal } from "../../components/Layout/Modal";
import NewSale from "./componentes/NewSaleModal";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { toCurrency } from "../../utils/currencyValue";







export default function Sales({ match }) {

  const dispatch = useDispatch();
  const { isCashierOpen, shiftId } = useCashier();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [historySales, setHistorySales] = useState([]);
  const [modalType, setModalType] = useState(null)
  const [totalOrder, setTotalOrder] = useState(0);
  const [total, setTotal] = useState(0);
  const [productId, setProductId] = useState({});
  const [order, setOrder] = useState({})
  const [qtt, setQtt] = useState(1);
  const [suborder, setSuborder] = useState([]);

  const savedData = JSON.parse(sessionStorage.getItem('@SalesPage:state')) || {};

  console.log('Data from saved data: ', savedData);

  const [activeTab, setActiveTab] = useState(savedData.activeTab || 'current')

  const [initialDate, setInitialDate] = useState(savedData.initialDate || '');

  const [finalDate, setFinalDate] = useState(savedData.finalDate || '')
  const [filteredHistorySales, setFilteredHistorySales] = useState(savedData.filteredHistorySales || []);


  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'short',
    timeStyle: 'short'
  });

  React.useEffect(() => {
    async function getData() {

      console.log('isCashierOpen', isCashierOpen);

      if (isCashierOpen && shiftId) {
        try {
          setIsLoading(true);
          console.log('shiftId from sales: ', shiftId);
          const { data } = await axios.get(`/sales/list/daily/${shiftId}`);
          (() => { console.log("Data from getData", data.data) })();
          setHistorySales(data.data);
          setIsLoading(false);
        } catch (error) {

          setIsLoading(false);
          if (error.response?.status == 401) {
            dispatch(actions.loginFailure());
          }
          toast.error('Error fetching sale history');
        }
      }
    }
    getData();
  }, [isCashierOpen, shiftId, showModal, modalType, activeTab]);



  // salvando dados para nao perder o estado da pagina ao clicar no detalhe de uma venda que direciona para outra pagina (Sale);
  React.useEffect(() => {

    if (!activeTab) return;
    console.log('activeTab use effect salvar no storage: ', activeTab)

    const stateToSave = {
      activeTab,
      initialDate,
      finalDate,
      filteredHistorySales
    };

    sessionStorage.setItem('@SalesPage:state', JSON.stringify(stateToSave));

  }, [activeTab, initialDate, finalDate, filteredHistorySales]);



  function handleConfirmAction(data) {

  }


  function handleFilterDate() {
    if (!initialDate && !finalDate) {
      toast.error('Initial and final date must be provided');
      return;
    }

    console.log('Filter date called: ');
    console.log('InitalDate: ', initialDate);
    console.log('finalDate: ', finalDate);
    // checar se final e menor do que inicial;

    async function getFilteredSale() {
      try {
        const { data } = await axios.get('/sales/filter', {
          params: {
            initialDate,
            finalDate
          }
        });
        console.log('filted sale request: ', data);
        setFilteredHistorySales(data);

        toast.success('History fetched');
      } catch (error) {
        if (error.status === 404) {
          toast.error('No data for given period');
          return;
        }
        toast.error('error Fetching history');
        console.log(error);
      }

    }
    getFilteredSale();
  }

  return (
    <div style={{ display: "flex", flexDirection: 'column' }}>
      <h1>Sales</h1>
      <MainContainer>

        <Loading isLoading={isLoading} />

        {
          modalType && (
            <Modal
              showModal={!!modalType}
              closeModal={() => {
                setModalType(null)
              }}>
              <SalesModalManager
                modalType={modalType}
                onCancel={() => setModalType(null)}
                onConfirm={(data) => handleConfirmAction(data)}
              >
              </SalesModalManager>
            </Modal>
          )
        }

        <div className="actions" style={{ marginBottom: '20px' }}>
          <button onClick={() => {
            if (isCashierOpen) {
              setModalType('NEW_SALE');
              console.log(modalType);
            } else {
              toast.error("Cashier has not been opened, open it and try again");
            }
          }}>New Sale</button>
        </div>

        <TabNav>
          <TabButton
            active={activeTab === 'current'}
            onClick={() => setActiveTab('current')}
          >
            Current session
          </TabButton>

          <TabButton
            active={activeTab === 'previous'}
            onClick={() => {
              setActiveTab('previous');
            }}
          >
            Sale History
          </TabButton>

        </TabNav>


        {activeTab === 'current' && (
          <Container>
            <h3>Sales from current cashier session</h3>

            {historySales.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <td>Id</td>
                    <td>Date</td>
                    <td>Payment</td>
                    <td>Total R$</td>
                    <td>Action</td>
                  </tr>

                </thead>

                <tbody>
                  {
                    historySales.map(item => (
                      <tr key={item.id}>
                        <td>{item.order.id}</td>
                        <td>{dateFormatter.format(new Date(item.order.createdAt))}</td>
                        <td>{item.order.paymentMethod.name}</td>
                        <td>{toCurrency(item.order.totalOrder)}</td>
                        <td>

                          <Link to={`/sale/${item.order.id}`} >
                            <SlArrowRight size={10} />
                          </Link>

                        </td>
                      </tr>))
                  }
                </tbody>
              </Table>
            )}
            {console.log("sale history: ", historySales)}
          </Container>
        )}



        {activeTab === 'previous' && (
          <>
            <div className="actions" style={{ display: 'flex', flexDirection: "row" }}>
              <LabelDate>
                Initial date:
                <InputDate type='date' value={initialDate} onChange={(e) => setInitialDate(e.target.value)}></InputDate>
              </LabelDate>
              <LabelDate>
                Final date:
                <InputDate type='date' value={finalDate} onChange={(e) => setFinalDate(e.target.value)}></InputDate>
              </LabelDate>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: '10px' }}>
                <FilterButton onClick={() => handleFilterDate()}>Filter</FilterButton>
              </div>
            </div>

            <Container>

              <h3>Sales Filtered</h3>

              {filteredHistorySales.length > 0 && (
                <Table>
                  <thead>
                    <tr>
                      <td>Id</td>
                      <td>Date</td>
                      <td>Payment</td>
                      <td>Total R$</td>
                      <td>Action</td>
                    </tr>

                  </thead>

                  <tbody>
                    {
                      filteredHistorySales.map(item => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{dateFormatter.format(new Date(item.createdAt))}</td>
                          <td>{item.paymentMethod.name}</td>
                          <td>{toCurrency(item.totalOrder)}</td>
                          <td>

                            <Link to={`/sale/${item.id}`} >
                              <SlArrowRight size={10} />
                            </Link>

                          </td>
                        </tr>))
                    }
                  </tbody>
                </Table>
              )}
              {console.log("sale history: ", historySales)}
            </Container>
          </>
        )}
      </MainContainer>
    </div>

  );
}

Sales.prototype = {
  match: PropTypes.shape({}).isRequired
}