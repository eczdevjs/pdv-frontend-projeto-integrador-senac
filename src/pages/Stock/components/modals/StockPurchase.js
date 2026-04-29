import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Form, Table } from '../../../../styles/GlobalStyle'
import axios from '../../../../services/axios';
import Select from 'react-select';
import {toCurrency} from '../../../../utils/currencyValue';

export function StockPurchase({ onConfirm, onCancel }) {
    const [productList, setProductList] = useState([]);
    const [providerList, setProviderList] = useState([]);

    const [selectedProvider, setSelectedProvider] = useState(null);
    const [totalPurchase, setTotalPurchase] = useState(0);
    const [invoiceNumber, setInvoiceNumber] = useState(0);
    const [unityCost, setUnityCost] = useState(0);
    const [qty, setQty] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [productsAdded, setProductsAdded] = useState([]);
    const [productId, setProductId] = useState(0);

    useEffect(() => {
        async function getProducts() {
            try {
                const { data } = await axios.get('/products');
                setProductList(data);
                const providers = await axios.get('/providers');
                setProviderList(providers.data);
            } catch (error) {
                console.log(error);
                toast.error('Error fetching product list');
            }
        }

        getProducts();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!selectedProvider) {
            toast.error('Pending select provider');
            return
        }

        if (!invoiceNumber) {
            console.log('invoiceNumber', invoiceNumber)
            toast.error('Pending Invoice Number');
            return
        }

        const payload = {
            providerId: selectedProvider.id,
            invoiceNumber,
            total: totalPurchase,
            products: productsAdded
        };

        try {
            const response = await axios.post('/stock/purchase/create', payload);
            toast.success('Stock receipt recorde succeed');
            console.log(response);
            onCancel();
        } catch (error) {
            toast.error(error);
        }

    }

    function handleAddProduct(e) {
        e.preventDefault();

        if (!selectedProduct) {
            toast.error('Select product before adding'); return;
        }
        if (!qty) { toast.error('Quantity is required to add.'); return };

        if (!unityCost) {
            toast.error('Unity cost is required');
            return
        }

        if (productsAdded.some(item => item.productId === selectedProduct.id)) {
            toast.error('Product has already been added');
            return;
        }

        const item = {
            productId: selectedProduct.id,
            name: selectedProduct.name,
            qty,
            unityCost
        }
        const subtotal = qty * unityCost;
        const updatedTotal = subtotal + totalPurchase;
        console.log('Total purchase: ', updatedTotal);

        setTotalPurchase(updatedTotal);
        const currentProducts = [...productsAdded];
        setProductsAdded([...currentProducts, item]);

        setSelectedProduct(null);
        setQty(0);
        setUnityCost(0);
    }



    // IMPLEMENTAR DELECAO DE ITEM LISTA DE ENTRADA ESTOQUE
    function handleDeleteItem(index) {
        const arr = productsAdded.filter((_, i) => i != index);
        setProductsAdded(arr);
    }

    return (<>
        <Form type="submit">
            <h2>Record a Stock Receipt</h2>
            <label>
                *Provider
                <Select
                    value={selectedProvider}
                    options={providerList}
                    onChange={(selected, actionMeta) => {
                        setSelectedProvider(selected);

                        if (actionMeta.action === 'clear') {
                            setSelectedProduct(null);
                        }
                    }}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    placeholder="Pick provider up"
                    isClearable
                    noOptionsMessage={() => "No provider found"}
                />
            </label>

            <label htmlFor='invoicenumber'>
                *Invoice Number
                <input type='number' placeholder='Invoice number ' value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)}></input>
            </label>

            <label htmlFor='product'>
                *Product
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
                *Quantity:
                <input type='number' placeholder='Quantity'
                    value={qty} onChange={(e) => setQty(Number(e.target.value))} ></input>
            </label>

            <label htmlFor='unityCost'>
                *Unity Cost
                <input type='number' placeholder='Unity cost' value={unityCost} onChange={(e) => setUnityCost(Number(e.target.value))}></input>
            </label>

            <div className='actions'>
                <button onClick={(e) => handleAddProduct(e)}>Add</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </Form>

        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Unity cost</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {productsAdded.length > 0 ? (productsAdded.map((item, index) => (

                        <tr key={item.productId}>
                            <td >
                                {item.productId}
                            </td>
                            <td >
                                {item.name}
                            </td>
                            <td>
                                {item.qty}
                            </td>
                            <td>
                                {toCurrency(item.unityCost)}
                            </td>

                            <td>
                                <button onClick={() => {
                                    handleDeleteItem(index)
                                    console.log('Delete clicked, index=', index)
                                }}>delete</button>
                            </td>
                        </tr>

                    ))) : (<p></p>)}
                </tbody>
            </Table>
        </div>
        {
            productsAdded.length > 0 && (
                <div style={{ padding: '8px' }}>
                    <button onClick={(e) => handleSubmit(e)}>Confirm purchase</button>
                </div>

            )
        }

    </>);

}


