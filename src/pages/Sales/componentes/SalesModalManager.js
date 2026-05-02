import { FilterDate } from "./FilterSalesModal";
import NewSale from './NewSaleModal';

const MODAL_COMPONENTS = {
    NEW_SALE: NewSale,
    FILTER_DATE: FilterDate
};

export function SalesModalManager ({modalType, ...props}){
    const SelectModal = MODAL_COMPONENTS[modalType];
    
    console.log('modalType selected: ', SelectModal);

    if(!SelectModal) return null;

    return <SelectModal {...props}/>
}