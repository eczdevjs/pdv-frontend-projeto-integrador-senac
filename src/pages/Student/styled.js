import styled from "styled-components";
import { primaryColor, primaryDarkColor } from '../../config/colors';


export const Title = styled.h1`
  background: ${primaryColor};
  color: #fff;
  padding: 10px 20px;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 500px;
  margin: 30px auto;

  border: 1px solid #b6aeae;
  border-radius: 6px;
  box-shadow: 0 0 10px rgba(67, 63, 63, 0.1);

  display: flex;
  flex-direction: column;
  padding: 30px;
  gap:10px;
  font-family: system-ui;

  input{
    border: 1px solid #b6aeae;
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
