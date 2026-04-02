import React from 'react';
import * as S from './styled.js'
import { Overlay } from '../Overlay/index.js';

export function Modal({children, showModal}) {
    if(!showModal) return;
    return (
        <Overlay>
            <S.Container>
                {children}
            </S.Container>
        </Overlay>
    );
}