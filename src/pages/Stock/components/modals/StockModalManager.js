import { StockAdjustment } from "./StockAdjustment";
import { StockPurchase } from "./StockPurchase";

const MODAL_COMPONENTS = {
    STOCK_PURCHASE: StockPurchase,
    STOCK_ADJUSTMENT: StockAdjustment
};

export function StockModalManager({modalType, ...props}){
    const SelectModal = MODAL_COMPONENTS[modalType];
    if(!SelectModal) return null;
    return <SelectModal {...props}/>;
}