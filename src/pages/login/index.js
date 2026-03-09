import React from "react";
import { useDispatch } from "react-redux";
import { Container } from "../../styles/GlobalStyle";

import { Title } from "./styled";
import GlobalStyle from "../../styles/GlobalStyle";
import axios from "../../services/axios";
import * as exampleActions from '../../modules/example/actions';


export default function Login() {
  const dispatch = useDispatch();

  const handleClick = (e)=>{
    e.preventDefault();
  
    dispatch(exampleActions.buttonClickRequest());
  }

  return (
    <Container>
      <Title>Log in</Title>
      <small> Don't you have an account yet?</small>
      <p> Teste paragrafo</p>
      <button type="button" onClick={handleClick}>Send</button>
    </Container>
  );
}
