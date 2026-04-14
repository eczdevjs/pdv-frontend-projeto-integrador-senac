import styled, { createGlobalStyle } from "styled-components";

import { primaryColor, primaryDarkColor, errorColor, successColor } from '../config/colors'
import 'react-toastify/dist/ReactToastify.css'


export default createGlobalStyle`
    *{
        margin: 0;
        padding:0;
        outline:none;
        box-sizing: border-box;
    }

    body {
        font-family: sans-serif;
        color: ${primaryColor};

    }

    html, body, #root {
        height: 100%;
    }

    button {
        cursor: pointer;
        background:${primaryColor};
        border: none;
        color:#fff;
        border-radius: 4px;
        padding: 10px 20px;
        font-weight: 700;
    }

    a {
        text-decoration:none;
        color: ${primaryColor};
    }

    ul{
        list-style: none;
    }

    body .Toastify .Toastify__toast-container .Toastify__toast--success {
        background: ${successColor};
        color: #fff
    }

       body .Toastify .Toastify__toast-container .Toastify__toast--error {
        background: ${errorColor};
        color: #fff
    }

`;

export const Container = styled.section`
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    width: 100%;
    max-width: 500px;
    background: #fff;
    margin-left: 200px;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    margin:0;

`;

export const ContentWrappper = styled.div`
margin-left: ${props => (props.menuOpened ? '200px': '70px')};
transition: margin-left 0.3s ease-in-out;
width: auto;
min-height: 100vh;
display: flex;
justify-content: center;
align-items: center;
padding: 20px;

background-color: #f5f5f5;

// @media (max-width: 768px) {
//   margin-left: 0;
//   width: 100%;
// }
`

export const TabNav = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom :20px;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
`


export const TabButton = styled.button`
  background: ${props => (props.active ? '#034bf4' : 'transparent')};
  color: ${props => (props.active ? '#fff' : '#666')};
  border: ${props => (props.active ? 'none' : '1px solid #ccc')};
  padding 10px 20px;
  border-radius: 4px;
  font-weight: bold;
  transition: all 0.3s;

  &:hover{
    background: ${props => (props.active ? '#038bf4' : '#e0e0e0')};
  }
`


export const Form = styled.form`
  width: 100%;
  max-width: 500px;
  margin: 30px auto;

 
  border-radius: 6px;
  box-shadow: 0 0 10px rgba(67, 63, 63, 0.1);

  display: flex;
  flex-direction: column;
  padding: 30px;
  gap:10px;
  font-family: system-ui;

  input{
    border: 1px solid #e2dada;
    border-radius: 4px;
    height: 40px;
    padding: 0 15px;
    font-size: 16px;
    
  }
  
  &:focus{
    border-color: #333;
    outline: none;
  }

  label{
    display: flex;
    flex-direction: column;
    font-family: system-ui;
    font-weight: 600;
    gap: 5px;
  }

  button {
    margin-top: 10px;
    height: 40px;
    cursor: pointer;
    background: ${primaryColor};
    color: #fff;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    transition: all 0.3s;
  }

  button:hover {
    filter: brightness(1.2);
  }
  
`
