import React from "react";

export function Deposit({ onConfirm, onCancel }) {

    const [inputValue, setInputValue] = React.useState(0);

    return (<>
        <h2>Realizar depósito caixa</h2>
        <input
            type="number"
            placeholder="R$ 0,00"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
        />
        <input
            type="text"
            placeholder="Motivo do depósito"
        />

        <div className="actions">
            <button onClick={() => onCancel()}>Cancelar</button>
            <button onClick={() => onConfirm(inputValue)}>Confirm</button>
        </div>
    </>)
}