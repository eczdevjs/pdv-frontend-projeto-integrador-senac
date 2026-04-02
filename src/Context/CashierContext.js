import react, { createContext, useState, useContext } from 'react';
import { openCashierRequest, closeCashierRequest, getShifRequest, getTransactionsRequest, getBalancesRequest, depositRequest, withdrawRequest } from '../services/CashierService';
const CashierContext = createContext();

export const CashierProvider = ({ children }) => {

    const [shiftId, setShiftId] = useState(localStorage.getItem('activeShiftId'));
    const [isCashierOpen, setIsCashierOpen] = useState(false);

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

    const handleCloseCashier = async (amount) => {
        try {
      
            const data =  await closeCashierRequest(amount);
            localStorage.removeItem('activeShiftId');
            setShiftId(null);
            setIsCashierOpen(false);
            return data;
        } catch (error) {
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
            const data  = await getTransactionsRequest(shiftId);
            return data;
        } catch (error) {
            throw error;
        }
    }

    const handleGetBalances = async (shiftId) => {
        try {
            const data = await getBalancesRequest(shiftId);
            return data
        }catch(error){
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

    const handleWithdraw = async ({amount, reason}) => {
        try {
            const data = await withdrawRequest(shiftId, {amount, reason});
            return data;
        } catch (error) {
            throw error;
        }
    }


    return (<CashierContext.Provider value={{ 
        shiftId, 
        isCashierOpen, handleOpenCashier, handleCloseCashier, handleGetShift, handleGetTransactions, handleGetBalances, handleDeposit,
        handleWithdraw
     }}>
        {children}
    </CashierContext.Provider>)
}

export const useCashier = () => useContext(CashierContext);