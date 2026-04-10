import React, { use, useState } from "react";
import Select from 'react-select';
import axios from '../../services/axios';
import { useDispatch } from "react-redux";
import { Container, TabNav, TabButton } from "../../styles/GlobalStyle";
import Loading from '../../components/Loading';
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import * as actions from '../../store/modules/auth/actions'
import { useCashier } from "../../Context/CashierContext";
import { Modal } from "../../components/Layout/Modal";
import NewSale from "../../components/Layout/Sale";



export default function Sales({ match }) {

  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [historySales, setHistorySales] = useState([]);
  const { isCashierOpen, shiftId } = useCashier();

  const [totalOrder, setTotalOrder] = useState(0);
  const [total, setTotal] = useState(0);
  const [productId, setProductId] = useState({});
  const [order, setOrder] = useState({})
  const [qtt, setQtt] = useState(1);
  const [suborder, setSuborder] = useState([]);


  React.useEffect(() => {

    async function getData() {
      console.log(historySales);
      console.log('isCashierOpen', isCashierOpen);
      if (isCashierOpen) {
        try {
          setIsLoading(true);
          const { data } = axios.get(`/sales/list/daily/${shiftId}`);
          setHistorySales(data);
          toast.success('Sales history restablised');
          console.log('Data history: ')
          console.log(data);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          if (error.response.status == 401) {
            dispatch(actions.loginFailure());
          }
          toast.error('Error fetching sale history');
        }
      }
    }

    getData();
  }, [])



  return (
    <>

      <Container>
        <Loading isLoading={isLoading} />
        {
          showModal && (
            <Modal showModal={showModal}>
              <NewSale onCancel={() => setShowModal(false)} onConfirm={() => {
                setSuborder([...suborder, { productId, qtt, total }])
                setProductId('');
                setQtt(0);
                setTotal(0);
              }} />

            </Modal>)
        }
        <h1>Sales Page</h1>
        <TabNav>
          <button onClick={() => {
            setShowModal(true);
          }}>New Sale</button>
        </TabNav>

        <Container>
          <p>Sales history</p>
          {historySales.length > 0 ? (<p>Ha vendas</p>) : (<p>There is not history for current cashier</p>)}
        </Container>
      </Container>


    </>

  );
}


Sales.prototype = {
  match: PropTypes.shape({}).isRequired
}