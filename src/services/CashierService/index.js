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

export const getTransactionsRequest = async () => {
    
}


