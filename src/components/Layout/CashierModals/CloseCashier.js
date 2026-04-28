import React from "react";

export function CloseCashier({ onConfirm, onCancel }) {
    
    const [inputValue, setInputValue] = React.useState(0);

    return (<>
        <h2>Fechar Caixa</h2>
        <input
            type="number"
            placeholder="R$ 0,00"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
        />
        <div className="actions">
            <button onClick={() => onCancel()}>Cancelar</button>
            <button onClick={() => onConfirm(inputValue)}>Confirm</button>
        </div>
    </>)
}