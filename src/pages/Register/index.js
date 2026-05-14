import React, { useState } from "react";
import { Container } from "../../styles/GlobalStyle";
import { toast } from "react-toastify";
import { Form } from "./styled";
import { isEmail, isMobilePhone} from "validator";
import axios from '../../services/axios';
import history from "../../services/history";
import { get, last } from 'lodash';
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../store/modules/auth/actions'
import Loading from '../../components/Loading'

// trade of: tanto registro como edicao no mesmo codigo
export default function Register() {
  const dispatch = useDispatch();

  const id = useSelector(state => state.auth.user.id);
  const nameStored = useSelector(state => state.auth.user.name);
  const lastNameStored = useSelector(state => state.auth.user.lastName);
  const emailStored = useSelector(state => state.auth.user.email);
  const phoneStored = useSelector(state => state.auth.user.phone);
  const isLoading = useSelector(state => state.auth.isLoading);

  
  console.log('Saved data from user: ', {id, nameStored, lastNameStored, emailStored, phoneStored});

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  React.useEffect(() => {
    if (!id) return;
    setName(nameStored);
    setLastName(lastNameStored);
    setEmail(emailStored);
    setPhone(phoneStored);
  }, [emailStored, id, nameStored, lastNameStored, phoneStored]);

  async function handleSubmit(e) {

    e.preventDefault();
    let formErrors = false;

    if (name.length < 3 || name.length > 255) {
      formErrors = true;
      toast.error('Name must be between at least 3 and at most 255 characters long')
    }

    if (lastName.length < 3 || name.length > 255) {
      formErrors = true;
      toast.error('Last name must be between at least 3 and at most 255 characters long')
    }


    // se esta logado, a validacao de senha nao sera chamada
    if (!id && (password.length < 6 || password.length > 50)) {
      formErrors = true;
      toast.error('Password must be between at least 6 and at most 255 characters long')
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Invalid e-mail');
    }

    if (!isMobilePhone(phone, 'pt-BR')) {
      formErrors = true;
      toast.error('Invalid phone number');
    }


    if (formErrors) return;

    dispatch(actions.registerRequest({ name, lastName, email, phone, password, id }));
    dispatch(actions.loginFailure());
    history.push('/login');
  }


  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Edit user' : 'Create your account'}</h1>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="your name"></input>
        </label>

        <label htmlFor="lastName">
          Last name
          <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="your name"></input>
        </label>

        <label htmlFor="Email">
          E-mail
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="your e-mail"></input>
        </label>


        <label htmlFor="phone">
          Phone
          <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="your name"></input>
        </label>

        <label htmlFor="Password">
          Password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="your password"></input>
        </label>
        <button type="submit" >{id ? 'Save' : 'Create account'}</button>
      </Form>
    </Container>
  );
}
