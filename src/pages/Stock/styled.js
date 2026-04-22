import styled from "styled-components";
import { primaryColor, primaryDarkColor } from '../../config/colors';


export const StudentContainer = styled.div`
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

`

export const MenuContainer = styled.div`
  position: relative;
  display: inline-block;
 
`

export const  MenuList = styled.ul`
position:absolute;
top: 100%;
right: 0;
background-color: #fffafa;
min-width: 140px;
box-shadow: 0px 8px 16px rgba(0,0,0, 0.1);
border: 1px solid #ddd;
border-radius: 4px;
z-index: 1000;
list-style: none;
padding: 5px 0;
margin 5px 0 0 0;

`

export const MenuItem = styled.li`
padding: 8px 16px;
cursor: pointer;
font-size: 14px;
transition: background 0.2s;
color:#333;

 &:hover{
 background-color: ${primaryColor};
 color: #fff;
}
`

export const Divider = styled.li`
height: 1px;
background-color: #eee;
margin: 4px 0;
cursor: default;

&: hover{
background-color: #eee;
}
`