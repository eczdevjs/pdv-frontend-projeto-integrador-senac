import React from "react";

export function Withdraw({ onConfirm, onCancel }) {

    const [amount, setAmount] = React.useState(0);
    const [reason, setReason] = React.useState('');
    return (<>
        <h2>Realizar depósito caixa</h2>
        <input
            type="number"
            placeholder="R$ -0,00"
            max={0}
            value={amount}
            onChange={e => setAmount(e.target.value)}
        />

        <input
            type="text"
            placeholder="Motivo da retirada"
            value={reason}
            onChange={e => setReason(e.target.value)}
        />
        
        <div className="actions">
            <button onClick={()=>onCancel()}>Cancelar</button>
            <button onClick={()=>onConfirm({amount, reason})}>Confirm</button>
        </div>
    </>)
}