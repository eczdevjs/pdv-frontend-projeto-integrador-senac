import React from 'react';
import * as S from './styled.js'
import { Overlay } from '../Overlay/index.js';

export function Modal({ children, showModal , closeModal}) {
    React.useEffect(()=>{
        

        function hadleKeyDown(e){
            console.log(`Tecla clicada: ${e.key}`);
            if(e.key ==='Escape'){
                if(!closeModal){
                    console.warn("Warning:  closeModal prop has not been provided");
                }
                closeModal?.();
            }
        }

        document.addEventListener('keydown',hadleKeyDown);
        
        return ()=> {
            document.removeEventListener('keydown', hadleKeyDown);
        }
    },[closeModal]);

    // if (!showModal) return;
 
    return (
        <Overlay>
            <S.Container>
                {children}
            </S.Container>
        </Overlay>
    );
}