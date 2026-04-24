import React, { use, useState } from "react";
import axios from '../../services/axios';
import { useDispatch } from "react-redux";
import { Container, Table,  OrderInfo } from "../../styles/GlobalStyle";
import Loading from '../../components/Loading';
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import * as actions from '../../store/modules/auth/actions'
import { toCurrency } from "../../utils/currencyValue";


export default function Sale({ match }) {
  const [isLoading, setIsLoading] = useState(true);
  const id = match.params.id;
  console.log("Sale id: ", id);
  const [order, setOrder] = useState(null);


  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'short',
    timeStyle: 'short'
  });


  React.useEffect(() => {
    if (!id) return;
    console.log('useEffect Sale called')
    async function getSale() {
      console.log('getSale called')
      try {
        console.log('Try block called')
        const { data } = await axios.get(`/sales/${id}`);
        setOrder(data);
        console.log("Sale detail: ", order);
      } catch (error) {
        toast.error('Error fetching sale information');
        console.log(error);
      }
    }
    getSale();
  }, [id]);

  if (!order) return;

  console.log(order);


  return (
    <div style={{ display: "flex", flexDirection: 'column' }}>

      <h1>Sale</h1>
      <Container>
        <Container >


          <OrderInfo>
            <dt>Id</dt>
            <dd>{order.id}</dd>

            <dt>Date / Time</dt>
            <dd>{dateFormatter.format(new Date(order.createdAt))}</dd>

            <dt className="total">Total</dt>
            <dd className="total">{toCurrency(order.totalOrder)}</dd>

          </OrderInfo>
        

          <Table>
            <thead>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Description</th>
              <th>Size</th>
            </thead>
            <tbody>
              {order.suborders.map((suborder) => (
                <tr key={suborder.id}>
                  <td>{toCurrency}</td>
                  <td>{suborder.qtt}</td>
                  <td>{toCurrency(suborder.total)}</td>
                  <td>{order.paymentMethod.name}</td>
                  <td>{suborder.product.name}</td>
                  <td>{suborder.product.brand}</td>
                  <td>{suborder.product.description}</td>
                  <td>{suborder.product.size}</td>
                </tr>
              ))}
            </tbody>
          </Table>

        </Container>
      </Container>
    </div>
  );
}


Sale.prototype = {
  match: PropTypes.shape({}).isRequired
}