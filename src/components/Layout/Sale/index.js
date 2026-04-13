import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Select from 'react-select';
import axios from "../../../services/axios";
import { useCashier } from "../../../Context/CashierContext";
import {SlArrowRight} from 'react-icons/sl'

export default function NewSale({ onConfirm, onCancel, }) {
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

    const [qtt, setQtt] = useState(1);
    const [totalOrder, setTotalOrder] = useState(0);
    const [subtotal, setSubtotal] = useState(0);

    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get('/products');
                setProductList(data);
                const response = await axios.get('/paymentmethod/list');
                const methods = response.data;
                setPaymentMetohds(methods);
                console.log(data);
            } catch (error) {
                console.log(error);
                toast.error('Error fetching products')
            }
        }

        getData();
    }, []);


    function handleAddCart() {

        if (!selectedProduct) {
            toast.error('Select product before add!', { autoClose: 5000 });
            return;
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
                    const response = await axios.post('sales/create', order);
                    console.log(response);
                    console.log("order: ", order);

                    toast.success('Sale Succeed');
                    onCancel();


                } catch (error) {
                    toast.error('Error creating sale register');
                    console.log("error creating sale: ", error);
                }
            } else {
                toast.error("Cahier has not been opened, open it and try again");
            }
        }

        createSale();

        //     const sale = {
        //         "totalOrder": 419.40,
        //         "paymentMethodId": 1,
        //     }


        //    const cart =  suborders: [{
        //         "productId": 1,
        //         "qtt": 1,
        //         "productPrice": 299.90,
        //         "total": 299.90
        //     }, {
        //         "productId": 2,
        //         "qtt": 1,
        //         "productPrice": 119.50,
        //         "total": 119.50
        //     }]
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
                placeholder="Pick product up"
                isClearable
                noOptionsMessage={() => "No product found"}
            />

            <input onChange={e => {
                setQtt(e.target.value);
                let sub = productPrice * e.target.value;
                setSubtotal(sub);
            }} value={qtt} type="number" min={1} placeholder="Enter quantity"></input>

            <span placeholder="Total order"></span>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{
                    padding: '4px', marginBottom: '4px'
                }} placeholder="Price">Price R$ {productPrice}</span>

                <span style={{
                    padding: '4px', marginBottom: '4px'
                }} placeholder="Subtotal">Subtotal R$ {subtotal}</span>

                <span style={{
                    padding: '4px', marginBottom: '4px'
                }} placeholder="Price"><strong>Total R$ {totalOrder}</strong></span>

            </div>

            <div className="actions">
                <button onClick={handleAddCart}>Add</button>

                <button onClick={onCancel}>Cancel</button>
            </div>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Qtt</th>
                            <th>Subtotal</th>
                            <th>Action</th>
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
                </table>
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


//  React.useEffect(() => {
    
//     fetchSaleHistory();

//   }, [fetchSaleHistory]);

//   const  fetchSaleHistory = React.useCallback(async () => {

//     console.log(historySales);
//     console.log('isCashierOpen', isCashierOpen);

//     if (isCashierOpen) {
//       try {

//         setIsLoading(true);
//         const { data } = await axios.get(`/sales/list/daily/${shiftId}`);
//         setHistorySales(data.data);
//         toast.success('Sales history restablised');
//         setIsLoading(false);

//       } catch (error) {

//         setIsLoading(false);
//         if (error.response.status == 401) {
//           dispatch(actions.loginFailure());
//         }
//         toast.error('Error fetching sale history');
//       }
//     }
//   }, [isCashierOpen, shiftId]);
