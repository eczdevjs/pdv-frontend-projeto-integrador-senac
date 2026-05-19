import React, { use, useState } from "react";
import axios from '../../../services/axios';
import { useDispatch } from "react-redux";
import { Container, Table, OrderInfo } from "../../../styles/GlobalStyle";
import Loading from '../../../components/Loading';
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import * as actions from '../../../store/modules/auth/actions'
import { toCurrency } from "../../../utils/currencyValue";
import { toBrazilianDate } from "../../../utils/toBrazilianDate";
import { useCashier } from "../../../Context/CashierContext";
import { Link } from "react-router-dom";




export default function CashierHistoryDetail({ match }) {
    const [isLoading, setIsLoading] = useState(true);
    const shiftId = match.params.shiftId;

    const [transactions, setTransactions] = useState([]);
    const { handleGetTransactions, handleGetShift } = useCashier();
    const [shift, setShift] = useState(null);

    const dateFormatter = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'short',
        timeStyle: 'short'
    });


    React.useEffect(() => {
        if (!shiftId) return;

        async function getTransactions() {
            try {
                const response = await handleGetTransactions(shiftId);

                setTransactions(response);
                const shift = await (handleGetShift(shiftId));

                setShift(shift);

            } catch (error) {
                toast.error('Error fetching cashier detail information');
                console.log(error);
            }
        }
        getTransactions();
    }, [shiftId]);



    return (
        <div style={{ display: "flex", flexDirection: 'column' }}>

            <h1>Detalhes Seção Caixa</h1>
            <Container>

                {shift && (<Container >
                    <OrderInfo>
                        <dt>Abertura</dt>
                        <dd>{toBrazilianDate(new Date(shift.startTime))}</dd>

                        <dt>Valor</dt>
                        <dd>{toCurrency(shift.openingBalance)}</dd>

                        <dt>Fechamento</dt>
                        <dd>{dateFormatter.format(new Date(shift.endTime))}</dd>

                        <dt>Valor</dt>
                        <dd>{toCurrency(shift.closingBalance)}</dd>

                        <dt>Diferença</dt>
                        <dd>{toCurrency(shift.difference)}</dd>
                    </OrderInfo>

                    <div>
                        <h2>Historico de transações</h2>
                    </div>
                    <Table>
                        <thead>
                            <tr key="headerTable">
                                <th>Data / Hora</th>
                                <th>Usuário</th>
                                <th>Transação</th>
                                <th>Valor</th>
                                <th>Método</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions && transactions.map((item) => (
                                <tr key={item.id}>
                                    <td>{toBrazilianDate(new Date(item.createdAt))}</td>
                                    <td>{item.user.name}</td>
                                    <td>{item.type.name}</td>
                                    <td>{toCurrency(item.amount)}</td>
                                    <td>{item.payment.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                </Container>)}
            </Container>
        </div>
    );
}

CashierHistoryDetail.prototype = {
    match: PropTypes.shape({}).isRequired
}