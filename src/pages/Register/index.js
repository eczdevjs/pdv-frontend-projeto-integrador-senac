import React, { useState } from "react";
import { Container } from "../../styles/GlobalStyle";
import { toast } from "react-toastify";
import { Form } from "./styled";
import { isEmail } from "validator";
import axios from '../../services/axios';
import history from "../../services/history";
import { get } from 'lodash';
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../store/modules/auth/actions'
import Loading from '../../components/Loading'
// trade of: tanto registro como edicao no mesmo codigo
export default function Register() {
 const dispatch = useDispatch();

 const id = useSelector(state => state.auth.user.id) ;
 const nameStored = useSelector(state => state.auth.user.nome) ;
 const emailStored = useSelector(state => state.auth.user.email) ;
 const isLoading = useSelector(state => state.auth.isLoading) ;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  React.useEffect(()=>{
    if(!id) return;
    setName(nameStored);
    setEmail(emailStored);
  },[emailStored, id,nameStored]);

  async function handleSubmit(e) {

    e.preventDefault();
    let formErrors = false;

    if (name.length < 3 || name.length > 255) {
      formErrors = true;
      toast.error('Name must be between at least 3 and at most 255 characters long')
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


    if (formErrors) return;

    dispatch(actions.registerRequest({name, email, password, id}));
    dispatch(actions.loginFailure());
    history.push('/login');

  }

  return (
    <Container>
      <Loading isLoading={isLoading}/>
      <h1>{id ? 'Edit user': 'Create your account'}</h1>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="your name"></input>
        </label>

        <label htmlFor="Email">
          E-mail
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="your e-mail"></input>
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
