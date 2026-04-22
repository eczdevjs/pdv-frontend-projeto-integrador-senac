import React, { use, useState } from "react";
import axios from '../../services/axios';
import { useDispatch } from "react-redux";
import { Container, TabNav, Table } from "../../styles/GlobalStyle";
import Loading from '../../components/Loading';
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import * as actions from '../../store/modules/auth/actions'
import { useCashier } from "../../Context/CashierContext";
import { Modal } from "../../components/Layout/Modal";
import NewSale from "../../components/Layout/Sale";
import { SlArrowDown } from "react-icons/sl";


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

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'short',
    timeStyle: 'short'
  });

  const fetchSaleHistory = React.useCallback(async () => {

    console.log(historySales);
    console.log('isCashierOpen', isCashierOpen);

    if (isCashierOpen) {
      try {

        setIsLoading(true);
        const { data } = await axios.get(`/sales/list/daily/${shiftId}`);
        setHistorySales(data.data);
        toast.success('Sales history restablised');
        setIsLoading(false);

      } catch (error) {

        setIsLoading(false);
        if (error.response.status == 401) {
          dispatch(actions.loginFailure());
        }
        toast.error('Error fetching sale history');
      }
    }
  }, [isCashierOpen, shiftId]);

  React.useEffect(() => {

    fetchSaleHistory();

  }, [fetchSaleHistory]);


  return (
    <div style={{ display: "flex", flexDirection: 'column' }}>
      <h1>Sales</h1>
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
          <p><h3>Sales history</h3></p>

          {historySales && historySales.length > 0 ? (
            <Table>
              <thead>
                <td>Date</td>
                <td>Payment</td>
                <td>Total R$</td>
                <td>Action</td>
              </thead>

              <tbody>
                {
                  historySales.map(item => (
                    <tr key={item.id}>
                      <td>{dateFormatter.format(new Date(item.order.createdAt))}</td>
                      <td>{item.order.paymentMethod.name}</td>
                      <td>{item.order.totalOrder}</td>
                      <td> <SlArrowDown size={10} /></td>
                    </tr>))
                }
              </tbody>
            </Table>
          ) : (<p>There is not history for current cashier</p>)}
          {console.log(historySales)}
        </Container>
      </Container>


    </div>

  );
}


Sales.prototype = {
  match: PropTypes.shape({}).isRequired
}