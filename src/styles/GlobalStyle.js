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

export const LabelDate = styled.label`
  display: block;
  font-size: 0.875rem; /* 14px */
  font-weight: 600;
  color: #475569; /* Cinza slate suave */
  margin-bottom: 8px;
  font-family: 'Inter', sans-serif;
  transition: color 0.2s ease;

  &:hover {
    color: #1e293b;
  }
`;

export const InputDate = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 1rem;
  font-family: inherit;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background-color: #ffffff;
  color: #1e293b;
  outline: none;
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;

  /* Estilização do ícone do calendário (Chrome/Safari) */
  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    filter: invert(0.4);
    transition: filter 0.2s;
    
    &:hover {
      filter: invert(0.2);
    }
  }

  &:focus {
    border-color: #3b82f6; /* Azul profissional */
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
    background-color: #fff;
  }

  &:hover:not(:focus) {
    border-color: #cbd5e1;
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const FilterButton = styled.button`
  display: inline-flex;
  align-items: center;
  // height: 20px;
  // width: 50px;
  justify-content: center;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  /* Alinhamento com a paleta Blue/Slate anterior */
  background-color: #3b82f6;
  color: #ffffff;
  
  /* Sombra sutil para profundidade */
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2);

  &:hover {
    background-color: #2563eb;
    box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
    transform: translateY(-1px);
  }

  &:active {
    background-color: #1d4ed8;
    transform: translateY(0);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.4);
  }

  &:disabled {
    background-color: #cbd5e1;
    color: #94a3b8;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;


// export const TabNav = styled.div`
//   display: flex;
//   gap: 10px;
//   margin-bottom :20px;
//   border-bottom: 2px solid #ddd;
//   padding-bottom: 10px;
// `

// export const TabButton = styled.button`
//   background: ${props => (props.active ? '#034bf4' : 'transparent')};
//   color: ${props => (props.active ? '#fff' : '#666')};
//   border: ${props => (props.active ? 'none' : '1px solid #ccc')};
//   padding 10px 20px;
//   border-radius: 4px;
//   font-weight: bold;
//   transition: all 0.3s;

//   &:hover{
//     background: ${props => (props.active ? '#038bf4' : '#e0e0e0')};
//   }
// `