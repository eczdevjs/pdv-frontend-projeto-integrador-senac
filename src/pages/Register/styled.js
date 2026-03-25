import styled from "styled-components";
import {primaryColor, primaryDarkColor} from '../../config/colors';
import * as colors from '../../config/colors';

export const Title = styled.h1`
  background: ${primaryColor};
  color: #fff;
  padding: 10px 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top : 20px;


  label {
    display: flex;
    flex-direction: column;
    marging-bottom: 20px;
  }

  input {
    margin-top: 4px;
    margin-bottom: 4px;
    height: 40px;
    font-size: 18px;
    border: 1px solid #ddd;
    padding: 0 10px;
    border-radius: 4px;
    margin-top: 5px;

    &:focus {
      border: 1px solid ${colors.primaryColor};
    }
  }

  button {
    margin-top: 20px;
  }
  button:hover {
    background: ${colors.primaryDarkColor}
  }
`