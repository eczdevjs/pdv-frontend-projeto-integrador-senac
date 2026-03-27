import styled from 'styled-components';
import { primaryColor } from '../../config/colors';

export const Nav = styled.nav`

    width: 200px;
    position: fixed;
    background:${primaryColor};
    top: 0;
    left: 0;
    height: 100vh;

    padding: 20px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
   
    padding: 40px 0px;
    gap: 20px;

    z-index: 1000;

    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 10px;
    }

    a {
        color:#fff;
        font-weight: bold;
        text-decoration: none;
        display: flex;
        align-items: center;
        width: 100%;
        transition: all 0.3s;
        margin: 0 10px 0;
        padding: 25px;
        border-radius: 4px;
        &.active {
            background-color: #038bf4;
            border-left: 4px solid #fff;
            padding-left: 21px;
        }
            &:not(.active) {
            background-color: transparent;
            border-left: 5px solid transparent;
        }
        &:hover {
            background-color: #038bf4;
        }
    }

    svg {
        margin-right: 15px;
        font-size: 20px;
    }
    
    span {
        font-size: 16px;
    }

    .logout{
        margin-top: auto;
        border-top: 1px solid rgba(255,255,255, 0.1);
    }

`;
