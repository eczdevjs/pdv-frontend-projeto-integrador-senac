import styled from "styled-components";
import { primaryColor, primaryDarkColor } from '../../config/colors';


export const Title = styled.h1`
  text-align: center;
`;

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

export const  ProfilePicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 20px;
  position: relative;
  margin-top: 20px;

  img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    position: absolute;
    bottom: 0;
    color: #fff;
    background: ${primaryColor};
    border-radius: 50%;

  }
`