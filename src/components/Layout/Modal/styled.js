import styled from "styled-components";

export const Container = styled.div`
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

  button {
    padding: 10px 20px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    background : ${props => props.confirm ? '#038bf4': '#ccc'};
    color:  ${props => props.confirm ? '#fff': '#333'};
  }
`;

export const Button = styled.button`
padding: 10px 20px;
cursor: pointer;
border: none;
border-radius: 4px;
font-weight: bold;
background : ${props => props.confirm ? '#038bf4': '#ccc'};
color:  ${props => props.confirm ? '#fff': '#333'};
`;