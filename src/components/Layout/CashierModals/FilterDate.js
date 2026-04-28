import { set } from "lodash";
import React from "react";

export function FilterDate({ onConfirm, onCancel }) {

    const [initialDate, setInitialDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');

    return (<>
        <h2>Filter cashier transactions</h2>
        <label>
            Initial date:
            <input
                type="date"

                value={initialDate}
                onChange={e => setInitialDate(e.target.value)}
            />
        </label>

        <label>
            End date:
            <input
                type="date"

                value={endDate}
                onChange={e => setEndDate(e.target.value)}
            />
        </label>
        <div className="actions">
            <button onClick={() => onCancel()}>Cancelar</button>
            <button onClick={() => onConfirm( {initialDate, endDate})}>Confirm</button>
        </div>
    </>)
}