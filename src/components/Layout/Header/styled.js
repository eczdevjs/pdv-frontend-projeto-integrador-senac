import styled from 'styled-components';
import { primaryColor } from '../../../config/colors';

const drawerWidth = '200px';
const closeWidth = '70px'

export const Nav = styled.nav`

    width: ${props => (props.isOpen ? drawerWidth : closeWidth)};
    position: fixed;
    background:${primaryColor};
    top: 0;
    left: 0;
    height: 100vh;

    display: flex;
    flex-direction: column;
    padding: 40px 0px;
    transition: width 0.3s ease-in-out;
    z-index: 1000;
    overflow-x: hidden;

    // align-items: flex-start;
    // padding: 20px;
    // gap: 20px;
    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 10px;
    }

    a, .logout button {
        display: flex;
        align-items: center;
        width: ${drawerWidth};
        padding: 15px 22px;
        color:#fff;
        transition: background 0.3s;
        text-decoration: none;
        cursor: pointer;
        
        font-weight: bold;
        border-radius: 4px;
        
        &:not(.active) {
            background-color: transparent;
            border-left: 5px solid transparent;
        }
            
        svg {
        margin-right: 15px;
        font-size: 20px;
        }
    
        span {
            opacity: ${props => (props.isOpen ? '1' :  '0')};
            transition: opacity 0.2s;
            white-space: nowrap;
            font-size: 16px;
        }
        
        &:hover {
            background-color: #038bf4;
        }
        
        &.active {
            background-color: #038bf4;
            border-left: 4px solid #fff;
            padding-left: 21px;
        }
        
    }
                           
    .logout{
        margin-top: auto;
        border-top: 1px solid rgba(255,255,255, 0.1);
    }
    
`;


export const ToggleBtn = styled.button`
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    padding: 10px 22px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    font-size: 24px;

    &:hover {opacity: 0.8;}

`;