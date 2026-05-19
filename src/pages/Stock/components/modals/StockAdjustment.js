import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Form } from '../../../../styles/GlobalStyle'
import axios from '../../../../services/axios';
import Select from 'react-select'


export function StockAdjustment({ onConfirm, onCancel }) {
    const [productList, setProductList] = useState([]);
    const [qtyChange, setQtyChange] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [reason, setReason] = useState();

    useEffect(() => {
        async function getProducts() {
            try {
                const { data } = await axios.get('/products');
                setProductList(data);
              
            } catch (error) {
                console.log(error);
                toast.error('Error fetching product list');
            }
        }

        getProducts();
    }, []);
  
    async function handleSubmit(e) {
        e.preventDefault();
        let errors = false;

        if (!selectedProduct) {
            toast.error('Select product before continue', { autoClose: 5000 });

            errors = true;
        }

        if (!reason || reason.trim().length === 0) {
            toast.error('Reason is required', { autoClose: 5000 });
            errors = true;
        }


        if (qtyChange === 0) {
            toast.error('Quantity must be different from 0', { autoClose: 5000 });
            errors = true;
        }

        if (errors) return;

        const payload = {
            productId: selectedProduct.id,
            qtyChange: parseInt(qtyChange),
            reason
        }

      
        try {
            const response = await axios.patch(`/stock/${payload.productId}`, payload);
            toast.success('Stock update succeed! :)')
            setSelectedProduct(null);
            setQtyChange(0);
            setReason('');
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    }

    return (<>
        <Form type="submit">
            <h2>Ajuste de Estoque</h2>
            <label>
                *Selecione o produto:
                <Select
                    value={selectedProduct}
                    options={productList}
                    onChange={(selected, actionMeta) => {
                        setSelectedProduct(selected);

                        if (actionMeta.action === 'clear') {
                            setSelectedProduct(null);
                        }
                    }}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    placeholder="Pick product up"
                    isClearable
                    noOptionsMessage={() => "No product found"}
                />
            </label>

            <label htmlFor='qty'>
                *Quantidade à ser ajustada:
                <input type='number' value={qtyChange} onChange={(e) => setQtyChange(e.target.value)}  ></input>
            </label>

            <label htmlFor='reason'>
                *Motivo :
                <textarea type='text' id='reason' value={reason} onChange={(e) => setReason(e.target.value)} required={true}
                    style={{ backgroundColor: '#dae0f4', minHeight: '120px', borderRadius: '4px' }}></textarea>
            </label>

            <div className='actions'>
                <button onClick={(e) => handleSubmit(e)}>Confirmar</button>
                <button onClick={onCancel}>Cancel</button>
            </div>

        </Form>


    </>);

}


/* 
{
{
    "userId": 10,
    "productId": 2,
    "qtyChange": 10,
    "reason": "Undoing transference id 1"
}
}


*/