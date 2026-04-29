import React, { use, useState } from "react";
import axios from '../../services/axios';
import { useDispatch } from "react-redux";
import { Container, MainContainer, TabNav, Table } from "../../styles/GlobalStyle";

import Loading from '../../components/Loading';
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import * as actions from '../../store/modules/auth/actions'
import { useCashier } from "../../Context/CashierContext";
import { Modal } from "../../components/Layout/Modal";
import NewSale from "../../components/Layout/Sale";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { toCurrency } from "../../utils/currencyValue";


export default function Sales({ match }) {

  const dispatch = useDispatch();
   const { isCashierOpen, shiftId } = useCashier();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [historySales, setHistorySales] = useState([]);

  const [totalOrder, setTotalOrder] = useState(0);
  const [total, setTotal] = useState(0);
  const [productId, setProductId] = useState({});
  const [order, setOrder] = useState({})
  const [qtt, setQtt] = useState(1);
  const [suborder, setSuborder] = useState([]);

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
  }, [isCashierOpen,shiftId,showModal]);


  return (
    <div style={{ display: "flex", flexDirection: 'column' }}>
      <h1>Sales</h1>
      <MainContainer>

        <Loading isLoading={isLoading} />
        {
          showModal && (
            <Modal showModal={showModal} closeModal={()=> setShowModal(false)}>
              <NewSale onCancel={() => setShowModal(false)} onConfirm={() => {
                setSuborder([...suborder, { productId, qtt, total }])
                setProductId('');
                setQtt(0);
                setTotal(0);
              }} />

            </Modal>)
        }

        <TabNav>
          <button onClick={() => {
            if (isCashierOpen) {
              setShowModal(true);
            } else {
              toast.error("Cashier has not been opened, open it and try again");
            }

          }}>New Sale</button>
        </TabNav>

        <Container>
          <h3>Sales history</h3>

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
      </MainContainer>


    </div>

  );
}

Sales.prototype = {
  match: PropTypes.shape({}).isRequired
}