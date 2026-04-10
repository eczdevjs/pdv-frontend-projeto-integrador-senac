import styled from "styled-components";
import { primaryColor, primaryDarkColor } from '../../config/colors';


export const ListContainer = styled.div`
  margin-top: 20px;

  div {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0 ;
    
  }

  div + div {
    border-top : 1px solid #eee;
  }
`

export const ProfilePicture = styled.div`
  img {
    width: 36px;
    height:36px;
    border-radius:50%;
  }

`;

export const CashierContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    // gap: 20px;
    // align-items: flex-start;
    width: 100%;
    padding: 20px;
    gap: 20px;
    max-width: 800px;
    background: #e8e8e8;
    // margin-left: 200px;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    margin:0 auto;

    button{
      padding: 4px;
      margin: 0px;
      flex: 0 1 auto;
      &:hover{
        background-color: #038bf4;
      }
    }
    
`;

export const CashierSubContainer = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    
    /* Reduzi o max-width para que caibam 3 na mesma linha */
    width: 100%;
    max-width: 350px; 
    
    /* Flex interno para organizar o texto dentro de cada bloco */
    display: flex;
    flex-direction: column;
    gap: 10px;

    h1, h2 { margin-bottom: 10px; display: flex; justify-content: center; }

`
export const MainContainer = styled.div`


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


export const Button = styled.button`
padding: 10px 20px;
cursor: pointer;
border: none;
border-radius: 4px;
font-weight: bold;
background : ${props => props.confirm ? '#038bf4': '#ccc'};
color:  ${props => props.confirm ? '#fff': '#333'};
`


export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto; /* Garante scroll no mobile */
  margin-top: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: sans-serif;
  
  thead {
    background-color: #f8f9fa;
    tr {
      border-bottom: 2px solid #dee2e6;
    }
  }

  th, td {
    padding: 12px 15px;
    text-align: left;
    font-size: 14px;
  }

  tbody tr {
    border-bottom: 1px solid #eee;
    transition: background 0.2s;

    &:hover {
      background-color: #f1f1f1;
    }
  }
`;

// Exemplo de célula com cor dinâmica via Props
export const StatusCell = styled.td`
  font-weight: bold;
  color: ${props => props.value < 0 ? '#e74c3c' : '#2ecc71'};
`;