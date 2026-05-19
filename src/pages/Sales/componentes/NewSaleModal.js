import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Select from 'react-select';
import axios from "../../../services/axios";
import { useCashier } from "../../../Context/CashierContext";
import {SlArrowRight} from 'react-icons/sl'
import { Table } from "../../../styles/GlobalStyle";
import { toCurrency } from "../../../utils/currencyValue";



export default function NewSale({ onConfirm, onCancel }) {
    const [order, setOrder] = useState({});

    const { isCashierOpen, shiftId } = useCashier();
    console.log("isCashierOpen: ", isCashierOpen, 'shiftId = ', shiftId);
    const [activeModal, setActiveModal] = useState('newSale');
    const [paymentMethods, setPaymentMetohds] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [suborders, setSuborders] = useState([]);
    const [productList, setProductList] = useState([]);
    const [productPrice, setProductPrice] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [qtt, setQtt] = useState(1);
    const [totalOrder, setTotalOrder] = useState(0);
    const [subtotal, setSubtotal] = useState(0);

    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get('/products');
                setProductList(data);
                const response = await axios.get('/payment-methods');
                const methods = response.data;
                const clientResponse = await axios.get('/clients');
                setClients(clientResponse.data);
                console.log("clients response:", clientResponse);
                console.log('clients response: ', clientResponse)

                setPaymentMetohds(methods);
                console.log(data);
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }

        getData();
    }, []);


    function handleAddCart() {

        if (!selectedProduct) {
            toast.error('Select product before add!', { autoClose: 5000 });
            return;
        }

        if(suborders.some(product => product.productId === selectedProduct.id)){
            toast.error('Product has already been added, remove product from list and add it with new quantity!', {autoClose: 5000});
            return ;
        }

        const newItem = {
            productId: selectedProduct.id,
            name: selectedProduct.name,
            productPrice: selectedProduct.price,
            qtt: qtt,
            total: selectedProduct.price * qtt
        }


        setSuborders([...suborders, newItem]);
        const newTotal = totalOrder + newItem.total;
        setTotalOrder(newTotal);

        setSelectedProduct(null);
        setProductPrice(0);
        setQtt(1);
    }


    /// context do cashier context para saber se o shiftId existe
    function handleConfirmNewSale() {

        async function createSale() {

            if (isCashierOpen) {
                try {
                    const response = await axios.post('/sales', order);
                    console.log(response);
                    console.log("order: ", order);

                    toast.success('Venda realizada com sucesso!');
                    onCancel();
                } catch (error) {
                    toast.error('Erro ao realizar venda');
                    toast.error(error.response.data.message, {autoClose:6000});
                    console.log("error creating sale: ", error);
                }
            } else {
                toast.error("Caixa não está aberto, abra o caixa para realizar uma venda");
            }
        }
        createSale();
    }


    useEffect(() => console.log(suborders), [suborders]);

    function handleDeleteItem(index) {
        const newTotal = totalOrder - suborders[index].total
        const arr = suborders.filter((_, i) => i != index);
        setSuborders(arr);
        setTotalOrder(newTotal);
        setSubtotal(0);
    }

    function handleCheckout() {

    }

    return (
        activeModal == "newSale" ? (<div style={{ "overflow": "scroll" }}>
          <label htmlFor="client" style={{marginBottom: '10px'}}>
            Cliente:
            <Select
                value={selectedClient}
                options={clients}
                onChange={(selected, actionMeta) => {
                    setSelectedClient(selected);
                 

                    if (actionMeta.action === 'clear') {
                        setSelectedClient(null);
                    }
                }}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                placeholder="Selecione o cliente"
                isClearable
                noOptionsMessage={() => "No client found"}
            />
          </label>

            <Select
                value={selectedProduct}
                options={productList}
                onChange={(selected, actionMeta) => {
                    setSelectedProduct(selected);
                    if (selected) {
                        setProductPrice(selected.price);
                        const sub = qtt * selected.price;
                        setSubtotal(sub);

                    }

                    if (actionMeta.action === 'clear') {
                        setProductPrice(0);
                    }
                }}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                placeholder="Selecione o produto"
                isClearable
                noOptionsMessage={() => "No product found"}
            />

            <input onChange={e => {
                setQtt(e.target.value);
                let sub = productPrice * e.target.value;
                setSubtotal(sub);
            }} value={qtt} type="number" min={1} placeholder="quantidade"></input>

            <span placeholder="Total order"></span>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{
                    padding: '4px', marginBottom: '4px'
                }} placeholder="Price">Price R$ {toCurrency(productPrice)}</span>

                <span style={{
                    padding: '4px', marginBottom: '4px'
                }} placeholder="Subtotal">Subtotal R$ {toCurrency(subtotal)}</span>

                <span style={{
                    padding: '4px', marginBottom: '4px'
                }} placeholder="Price"><strong>Total R$ {toCurrency(totalOrder)}</strong></span>

            </div>

            <div className="actions">
                <button onClick={handleAddCart}>Add</button>

                <button onClick={onCancel}>Cancel</button>
            </div>

            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Produto</th>
                            <th>Preço</th>
                            <th>Qtd</th>
                            <th>Subtotal</th>
                            <th>Ação</th>
                        </tr>
                    </thead>

                    <tbody>
                        {suborders.length > 0 ? (suborders.map((item, index) => (

                            <tr key={item.productId}>
                                <td >
                                    {item.productId}
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    {item.productPrice}
                                </td>
                                <td>
                                    {item.qtt}
                                </td>
                                <td>
                                    {item.total}
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
                suborders.length > 0 ? (
                    <button onClick={() => setActiveModal('checkout ')}>
                        Chechout
                    </button>) : (<></>)
            }
        </div>) : (
            <>
                <h1>Checkout </h1>
                <span>Total: R$ {totalOrder}</span>
                <Select
                    placeholder="Select payment"
                    value={selectedPayment}
                    options={paymentMethods}
                    onChange={(selected /*, actionMeta*/) => {
                        setSelectedPayment(selected);
                        if (selected) {
                            setSelectedPayment(selected);
                        }

                        const newOrder = {
                            clientId: selectedClient.id,
                            shiftId: Number(shiftId),
                            paymentMethodId: selected.id,
                            totalOrder,
                            suborders
                        }
                        console.log('newOrer: ', newOrder)
                        setOrder(newOrder);
                    }}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                />

                <div className="actions">
                    <button onClick={handleConfirmNewSale}>Confirm</button>
                    <button onClick={() => setActiveModal("newSale")}>Cancel</button>

                </div>
            </>


        )
    )
}

