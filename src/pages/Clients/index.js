import React, { useState } from "react";
import { FaUserCircle, FaEdit, FaWindowClose } from "react-icons/fa";
import { Container, Table } from "../../styles/GlobalStyle";
import { get } from "lodash";
import { Form, ProfilePicture, Title } from './styled';
import { toast } from "react-toastify";
import { isEmail, isInt, isFloat } from "validator";
import { useDispatch } from "react-redux";
import Loading from '../../components/Loading';
import axios from "../../services/axios";
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';
import { Link } from "react-router-dom";
import { SlPencil, SlClose, SlUserFollow } from "react-icons/sl";



export default function Clients({ match }) {
  const [clients, setClients] = useState([]);
  const id = match.params.id;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);


  React.useEffect(() => {

    async function getData() {
      try {
        console.log('useEffect clients called')
        setIsLoading(true);
        const { data } = await axios.get(`/clients`);
        console.log("data from clients: ", data);
        setClients(data);
        toast.success("Clients restored")
        setIsLoading(false);

      } catch (error) {
        setIsLoading(false);
        const status = get(error, 'response.status', 0);
        const errors = get(error, 'response.errors', []);

        if (status === 400) {
          errors.map(error => toast.error(error));
          window.alert('Id does not match any data, redirecting ...')
          history.push('/');
        }
      }
    }
    getData();
  }, []);

  async function handleDeleteAsk(e, client) {
    e.preventDefault();
    const confirm = window.confirm(`Do you really wish to exclude ${client.name} ?`);
    console.log(confirm);
    if (confirm) {
      try {
        setIsLoading(true);
        await axios.delete(`clients/delete/${client.id}`);
        const index = clients.indexOf(client);
        const clientsUpdated = [...clients];
        clientsUpdated.splice(index, 1);
        setClients(clientsUpdated);
        setIsLoading(false);
        toast.success("Client has been excluded");

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
    <Container>
      <Loading isLoading={isLoading} />
      <Title >Clients</Title>
      <Link to="/client"> <SlUserFollow/> New Client </Link>
      <div>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Last name</th>
              <th>E-mail</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              clients && clients.length > 0 ? (clients.map(client => (
                <tr key={client.id}>
                  <td >
                    {client.name}
                  </td>
                  <td >
                    {client.lastName}
                  </td>
                  <td >
                    {client.email}
                  </td>
                  <td >
                    {client.phone}
                  </td>
                  <td>
                    <Link to={`/client/${client.id}/edit`}> <SlPencil size={15} /> </Link>
                    
                    <SlClose onClick={(e)=> handleDeleteAsk(e, client)} size={15}/>

                  </td>
                </tr>
              )
              )) : (
                <tr></tr>
              )
            }
          </tbody>
        </Table>

      </div>

    </Container>
  );
}
