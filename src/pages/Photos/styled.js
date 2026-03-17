import styled from "styled-components";
import { primaryColor, primaryDarkColor } from '../../config/colors';


export const Title = styled.h1`
  text-align: center;
`;

export const Form = styled.form`




  input {
    display: none;
  }

  label {
    width: 180px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eee;
    border: 5px dashed ${primaryColor};
    margin: 30px;
    cursor: pointer;
    border-radius: 50%;
    overflow: hidden;
  }

  img {
    width: 180px;
    height: 180px;
  }






`