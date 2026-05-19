import React, { useEffect, useState, useRef } from 'react';
import { SlPlus } from "react-icons/sl";

import {
    MenuContainer,
    MenuList,
    MenuItem,
    Divider
} from '../../styled'

const ActionMenu = ({setModalType}) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef();

    // fechar o menu clicando fora
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <MenuContainer ref={menuRef}>
            <SlPlus size={30} onClick={() => setIsOpen(!isOpen)} />
            {isOpen && (
                <MenuList>
                    <MenuItem onClick={() => { setModalType('STOCK_PURCHASE')}}>Nova compra</MenuItem>

                    <MenuItem onClick={() => { setModalType('STOCK_ADJUSTMENT')}}>Adjuste</MenuItem>

                    <Divider />
                   
                    <MenuItem onClick={() => setIsOpen(false)}>Cancelar</MenuItem>
                </MenuList>
            )}
        </MenuContainer>
    );
}


export default ActionMenu;