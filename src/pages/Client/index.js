import React, { useState } from "react";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import { Container } from "../../styles/GlobalStyle";
import { get } from "lodash";
import { Form, ProfilePicture, Title } from './styled';
import { toast } from "react-toastify";
import { isEmail, isInt, isFloat, isMobilePhone } from "validator";
import { useDispatch } from "react-redux";
import Loading from '../../components/Loading';
import axios from "../../services/axios";
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';
import { Link } from "react-router-dom";



export default function Client({ match }) {

  const id = match.params.id;
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('')
  const [isLoading, setIsLoading] = useState(false);


  React.useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/clients/${id}`);
        // const Foto = get(data, 'Fotos[0].url', '');

        setName(data.name || '');
        setlastName(data.lastName || '');
        setEmail(data.email || '');
        setPhone(data.phone || '');

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
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    // validacao inputs
    if (name.length < 3 || name.length > 255) {
      formErrors = true;
      toast.error('Name must be between at least 3 and at most 255 characters long');
    }

    if (lastName.length < 3 || name.length > 255) {
      formErrors = true;
      toast.error('Last name must be between at least 3 and at most 255 characters long')
    }

    if (email && !isEmail(email)) {
      formErrors = true;
      toast.error('Invalid e-mail');
    }

    if (!isMobilePhone(phone)) {
      formErrors = true;
      toast.error('Invalid Phone, or not provided');
    }


    if (formErrors) return;

    try {
      if (id) {
        const response = await axios.put(`/clients/${id}`, {
          name,
          lastName,
          email,
          phone
        });
        toast.success('Data update succed!');
        history.push('/clients')
      } else {
        const response = await axios.post(`/clients`, {
          name,
          lastName,
          email,
          phone
        });
        toast.success('Register created successfuly');

        history.push(`/clients`);
      }
    } catch (error) {
      const status = get(error, 'response.data', 0);
      const data = get(error, 'response.data', {});
      const errors = get(error, 'response.errors', []);
      console.log(error);
      if (errors.length > 0) {
        errors.map(e => toast.error(e))
      } else {
        toast.error('Unknown error');
      }

      if (status === 401) dispatch(actions.loginFailure())
    }

  }


  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title >{id ? 'Editar Cliente' : 'NovoCliente'}</Title>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">
          *Nome
          <input type="text" value={name} onChange={e => setName(e.target.value)}>
          </input>
        </label>

        <label htmlFor="lastname">
          *Sobrenome
          <input type="text" value={lastName} onChange={e => setlastName(e.target.value)}>
          </input>
        </label>

        <label htmlFor="email">
          E-mail
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}>
          </input>
        </label>


        <label htmlFor="phone">
          *Contato (celular/Telefone)
          <input type="text" value={phone} onChange={e => setPhone(e.target.value)}>
          </input>
        </label>

        <button>{id ? 'Salvar' : 'Registrar'}</button>
      </Form>

    </Container>
  );
}
