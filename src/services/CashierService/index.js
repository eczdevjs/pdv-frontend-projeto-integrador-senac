import axios from '../axios';


export const openCashierRequest = async (openingBalance) => {
    try {
        const response = await axios.post('/cashier/open', { openingBalance });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const closeCashierRequest = async (closingBalance) => {
    const shiftId = localStorage.getItem('activeShiftId');

    if (!shiftId) throw new Error('Cashier is not open, it is not possible closing it');

    try {
        const response = await axios.patch(`/cashier/close/${shiftId}`, { closingBalance });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getShifRequest = async (shiftId) => {
    try {
        const response = await axios.get(`/cashier/shifts/${shiftId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getTransactionsRequest = async (shiftId) => {
    try {
        const response = await axios.get(`/cashier/history/${shiftId}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export const getBalancesRequest = async (shiftId) => {
    try {
        const response = await axios.get(`/cashier/balances/${shiftId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const depositRequest = async (shiftId, amount)=> {
    try {
        const data = await axios.post(`/cashier/deposit/${shiftId}`, {amount})
    } catch (error) {
        throw error;
    }
}

export const withdrawRequest = async (shiftId, {amount, reason})=> {
    try {
        const data = await axios.post(`/cashier/withdraw/${shiftId}`, {amount, reason})
    } catch (error) {
        throw error;
    }
}
