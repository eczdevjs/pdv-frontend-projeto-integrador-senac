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
    // // display: flex;
    // // flex-direction: column;
    // // align-items: center;
    // width: 100%;
    // min-width: 700px;
   
    // background: #fff;
    // padding: 20px;
    // border-radius: 4px;
    // box-shadow: 0 0 10px rgba(0,0,0,0.1);
    // // margin-left: 200px;
    // margin:0;
    // overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start; 
    align-items: center;        
    width: 100%;
    min-height: 100vh; // Garante que o fundo cubra a tela toda
    background: #f0f0f0; // Cor de fundo diferente para notar o contraste
`;

export const MainContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: start ;
    width: 100%;
    min-width: 700px;
    max-width: 900px;
    background: #fff;
    margin-left: 200px;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    margin:0 auto;
    overflow: auto;
`;
export const ContentWrappper = styled.div`
margin-left: ${props => (props.menuOpened ? '200px' : '70px')};
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
export const Tr = styled.tr`
  background-color : ${props => (props.isActive ? '#038bf4' : '#e0e0e0')}

`

export const Table = styled.table`
  width: 100%;            /* Ocupa todo o espaço lateral */
  border-collapse: collapse; /* Remove espaços entre as bordas das células */
  table-layout: auto;     /* 'auto' ajusta conforme o conteúdo, 'fixed' força larguras iguais */

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    color: ${primaryColor}
  }
  
  td {
    color: #000000
  }

  /* Opcional: Faz com que uma coluna específica (ex: Descrição) 
     ocupe todo o espaço restante */
  .coluna-principal {
    width: 100%;
  }
`;


export const SpanValue = styled.span`
  color: #444d4d;
  margin-bottom: 40px;
`


export const OrderInfo = styled.dl`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px 16px;
  background: #f0f0f0;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #eee;

  dt {
    font-weight: bold;
    color: #666;
    font-size: 0.85rem;
    text-transform: uppercase;
  }

  dd {
    margin: 0;
    font-weight: 500;
    color: #333;
    text-align: right; // Alinha os valores à direita para facilitar a leitura
  }

  .total {
    // grid-column: span 2;
    border-top: 1px solid #ddd;
    padding-top: 10px;
    margin-top: 5px;
    font-size: 1.1rem;
    color: ${primaryColor}; // Verde para o total
  }
`;


export const ProductPicture = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 20px;
  position: relative;

  img{
    width: ${props => props.imgsize ? `${props.imgsize}rem` : `10rem`};
    height:${props => props.imgsize ? `${props.imgsize}rem` : `10rem`};
    border-radius: 50%
  }
  
  a {
    display: flex;
    align-items: center;
    justify-contet: center;
    border:none;
    position: absolute;
    bottom: 0;
    color: ${primaryColor};
    background-color: '#fff';
    width: 36px;
    height:  36px;
    border-radius: 50%;
  }

`