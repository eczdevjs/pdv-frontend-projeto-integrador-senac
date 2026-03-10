import styled from "styled-components";
import { primaryColor, primaryDarkColor } from '../../config/colors';


export const Title = styled.h1`
  background: ${primaryColor};
  color: #fff;
  padding: 10px 20px;
`;

export const Form = styled.form`
  margin-top:20px;
  justfy-content: center;
  align-items: center;
  display: flex;
  gap:  8px;
  flex-direction: column;
  align-items: space-between;
  
  
  input {
    
    margin-botton: 20px;
    height:40px;
    padding:0 10px;
    border-radius: 4px;
    border: 1px solid ${primaryColor};
  }
`