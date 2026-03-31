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


export const Overlay = styled.div`
  position: fixed;
  top:0;
  left:0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`

export const Modal = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);

  h2 {
    margin-bottom: 20px;
  }

  input {
    width: 100%;
    padding: 12px;
    margin-bottom: 20px;
    border : 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .actions {
    display: flex;
    justify-content: flex-end
    gap: 10px;
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