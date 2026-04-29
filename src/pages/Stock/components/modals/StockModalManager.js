import { StockAdjustment } from "./StockAdjustment";
import { StockPurchase } from "./StockPurchase";
import { FilterDate } from "./FilterDate";
const MODAL_COMPONENTS = {
    STOCK_PURCHASE: StockPurchase,
    STOCK_ADJUSTMENT: StockAdjustment,
    FILTER_TRANSACTIONS: FilterDate
};

export function StockModalManager({modalType, ...props}){
    const SelectModal = MODAL_COMPONENTS[modalType];
    if(!SelectModal) return null;
    return <SelectModal {...props}/>;
}