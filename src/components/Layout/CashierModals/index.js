import {OpenCashier} from './OpenCashier';
import {CloseCashier} from './CloseCashier';
import {Deposit} from './Deposit'
import { Withdraw} from './Withdraw';
import { FilterDate } from './FilterDate';


const MODAL_COMPONENTS = {
    OPEN_CASHIER: OpenCashier,
    CLOSE_CASHIER: CloseCashier,
    DEPOSIT: Deposit,
    WITHDRAW: Withdraw,
    FILTER_DATE: FilterDate
};

export function CashierModalManager ({modalType, ...props}){
    const SelectModal = MODAL_COMPONENTS[modalType];

    if(!SelectModal) return null;

    return <SelectModal {...props}/>
}