import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from '../../services/axios';
import { Container } from "../../styles/GlobalStyle";
import { toast } from "react-toastify";
import { Form } from './styled';
import { get } from 'lodash';
import { isEmail } from "validator";
import * as actions from '../../store/modules/auth/actions';

export default function Login(props) {
  const dispatch = useDispatch();
  const prevPath = get(props, 'location.state.prevPath', '/');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    let formErrors = false;

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('Invalid password');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Invalid e-mail');
    }

    if(formErrors) return;

    dispatch(actions.loginRequest({email,password, prevPath}));

 
  }

  return (
    <Container>
      <h1>Log in</h1>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="email">
          <input type='text' placeholder="your email" value={email} onChange={e => setEmail(e.target.value)}></input>
        </label>

        <label htmlFor="password">
          <input type="password" placeholder="your password" value={password} onChange={e => setPassword(e.target.value)}></input>
        </label>
        <button type="submit">Log in</button>

      </Form>
    </Container>
  );
}
