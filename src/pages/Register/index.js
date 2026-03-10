import React from "react";
import { useState } from "react";
import { Container } from "../../styles/GlobalStyle";
import { toast } from "react-toastify";
import { Form } from "./styled";
import { isEmail } from "validator";
import  axios from '../../services/axios';
import history from "../../services/history";
import {get} from 'lodash';


export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (name.length < 3 || name.length > 255) {
      formErrors = true;
      toast.error('Name must be between at least 3 and at most 255 characters long')
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('Password must be between at least 6 and at most 255 characters long')
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Invalid e-mail');
    }


    if(formErrors) return;

    try {
      const response = await axios.post('/users', {nome: name, email, password});
      console.log(response.data);
      toast.success('Account created');
      history.push('/login');

    } catch (error) {
      
      const status = get(error, 'response.status', 0);
      const errors = get(error, 'response.data.errors', 0);

      errors.map(e => toast(e));
      console.log(status);
      console.log(errors);
    }

  }

  return (
    <Container>
      <h1>Create your account</h1>
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
        <button type="submit" >Create account</button>
      </Form>
    </Container>
  );
}
