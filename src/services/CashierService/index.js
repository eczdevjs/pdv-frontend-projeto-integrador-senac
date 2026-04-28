import axios from '../axios';
import { useCashier } from '../../Context/CashierContext';

export const openCashierRequest = async (openingBalance) => {
    try {
        const response = await axios.post('/cashier/open', { openingBalance });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const closeCashierRequest = async (isCashierOpen, shiftId, closingBalance) => {

    if (!isCashierOpen) throw new Error('Cashier is not open, it is not possible closing it');

    try {
        console.log("shiftId / closingBalance: ", shiftId, closingBalance)
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

export const getFilteredShiftsRequest = async (dates) => {
    try {
        console.log("filteredREquest",dates)
        const response = await axios.get('/cashier/shifts/filter', {
            params: {
                initialDate: dates.initialDate,
                endDate: dates.endDate
            }
        });
        console.log("response data from request: ", response.data);
        return response.data;
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

export const depositRequest = async (shiftId, amount) => {
    try {
        const data = await axios.post(`/cashier/deposit/${shiftId}`, { amount })
    } catch (error) {
        throw error;
    }
}

export const withdrawRequest = async (shiftId, { amount, reason }) => {
    try {
        const data = await axios.post(`/cashier/withdraw/${shiftId}`, { amount, reason })
    } catch (error) {
        throw error;
    }
}

export const previousShiftsRequest = async (initialDate, endDate) => {
    try {
        const { data } = await axios.get('/cashier/shifts/filter', {
            params: {
                initialDate,
                endDate
            }
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export const getOpenedShiftRequest = async () => {
    try {
        const { data } = await axios.get('/cashier/shift/opened');
        (() => { console.log('data from shift request ', data) })();
        return data.data;
    } catch (error) {
        throw error;
    }
}