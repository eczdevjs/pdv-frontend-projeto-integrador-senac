import react, { createContext, useState, useContext, useEffect } from 'react';
import {
    openCashierRequest,
    closeCashierRequest,
    getShifRequest,
    getTransactionsRequest,
    getBalancesRequest,
    depositRequest,
    withdrawRequest,
    previousShiftsRequest,
    getOpenedShiftRequest,
    getFilteredShiftsRequest
} from '../services/CashierService';
import { useSelector } from 'react-redux';





const CashierContext = createContext();


export const CashierProvider = ({ children }) => {
    const { token, isLoggedIn } = useSelector(state => state.auth);
    const [shiftId, setShiftId] = useState(null);
    const [isCashierOpen, setIsCashierOpen] = useState(false);

    useEffect(() => {
        async function loadActiveShift() {

            if (!isLoggedIn) {
                setShiftId(null);
                setIsCashierOpen(false);
                return;
            }

            try {
                console.log('getShift called');
                const shift = await handleGetOpenedShift();
                (() => { console.log('shiftId funcao getShift CashierContext: ', shift) })();
                if (shift) {
                    console.log('shift from cashierContext', shift.id);
                    setShiftId(shift.id);
                    setIsCashierOpen(true);
                }
            } catch (error) {
                console.log("Error validating opened shift", error);
            }
        }
        loadActiveShift();
    }, [isLoggedIn, token]);

    const handleOpenCashier = async (amount) => {
        try {
            const data = await openCashierRequest(amount);
            setShiftId(data.id);
            localStorage.setItem('activeShiftId', data.id);
            setIsCashierOpen(true);
            return data;
        } catch (e) {
            throw e;
        }
    }

    const handleCloseCashier = async (isCashierOpen, shiftId, amount) => {
        try {
            const data = await closeCashierRequest(isCashierOpen, shiftId, amount);
            setShiftId(null);
            setIsCashierOpen(false);
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const handleGetShift = async (shiftId) => {
        try {
            const data = await getShifRequest(shiftId);
            setIsCashierOpen(true);
            return data;
        } catch (error) {
            throw error;
        }
    }

    const handleGetTransactions = async (shiftId) => {
        try {
            const data = await getTransactionsRequest(shiftId);
            return data;
        } catch (error) {
            throw error;
        }
    }



    const handleGetBalances = async (shiftId) => {
        try {
            const data = await getBalancesRequest(shiftId);
            return data
        } catch (error) {
            throw error;
        }
    }

    const handleDeposit = async (amount) => {
        try {
            const data = await depositRequest(shiftId, amount);
            return data;
        } catch (error) {
            throw error;
        }
    }

    const handleWithdraw = async ({ amount, reason }) => {
        try {
            const data = await withdrawRequest(shiftId, { amount, reason });
            return data;
        } catch (error) {
            throw error;
        }
    }

    const handlePreviousShifts = async (initialDate, endDate) => {
        try {
            const data = await previousShiftsRequest(initialDate, endDate);
            return data;
        } catch (error) {
            throw error;
        }
    }

    const handleFilteredShifts = async (dates) => {
        try {
            console.log("handleFiltered useCashier: ", dates);
            const data = await getFilteredShiftsRequest(dates);
            console.log("handleFilteredShifts return: ", data);
            return data;
        } catch (error) {
            throw error;
        }
    }

    async function handleGetOpenedShift() {
        try {
            const data = await getOpenedShiftRequest();
            (() => { console.log('data from handleGetOpenedShift: ', data) })();
            return data;
        } catch (error) {
            throw error;
        }
    }

    return (<CashierContext.Provider value={{
        shiftId,
        isCashierOpen,
        handleOpenCashier,
        handleCloseCashier,
        handleGetShift,
        handleGetTransactions,
        handleGetBalances,
        handleDeposit,
        handleWithdraw,
        handlePreviousShifts,
        handleGetOpenedShift,
        handleFilteredShifts
    }}>
        {children}
    </CashierContext.Provider>)
}

export const useCashier = () => useContext(CashierContext);

