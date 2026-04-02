import React from "react";

export function OpenCashier({ onConfirm, onCancel }) {
    const [inputValue, setInputValue] = React.useState(0);

    return (<>
        <h2>Abrir Caixa</h2>
        <input
            type="number"
            placeholder="R$ 0,00"
            value={inputValue}
            onChange={(e)=>setInputValue(e.target.value)}
        />
        <div className="actions">
            <button onClick={()=>onCancel()}>Cancelar</button>
            <button onClick={()=> onConfirm(inputValue)}>Confirmar</button>
        </div>
    </>)
}