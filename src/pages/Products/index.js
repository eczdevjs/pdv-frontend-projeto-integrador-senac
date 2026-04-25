import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from '../../services/axios';
import { Container, Table } from "../../styles/GlobalStyle";
import { ProductContainer } from "./styled";
import { get } from 'lodash';
import { toast } from "react-toastify";
import { IoAddCircle } from "react-icons/io5";
import Loading from "../../components/Loading";
import { SlPencil, SlMinus } from "react-icons/sl";


export default function Products() {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const apiUrl = 'http://192.168.0.233:3001';

  React.useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const response = await axios.get('/products');
        setProducts(response.data);
        console.log("products response: ", response.data);
        toast.success()
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        toast.error(e.message);
      }
    }

    getData();
  }, []);


  async function handleDeleteAsk(e, product) {
    e.preventDefault();
    const confirm = window.confirm(`Do you really wish to exclude ${product.name} ?`);
    console.log(confirm);
    if (confirm) {
      try {
        setIsLoading(true);
        await axios.delete(`products/delete/${product.id}`);
        const index = products.indexOf(product);
        const productsUpdated = [...products];
        productsUpdated.splice(index, 1);
        setProducts(productsUpdated);
        setIsLoading(false);
        toast.success("Product has been excluded");

      }
      catch (e) {
        setIsLoading(false);
        const errors = get(e, 'response.data.errors', []);
        errors.map(e => toast.error(e));
        if (!errors) {
          toast.error(e);
        }
      }
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1 style={{ fontFamily: "system-ui" }}>Products </h1>
      <Link to="/product"> <IoAddCircle size={30} /><p><strong>New</strong></p></Link>
      <ProductContainer>
        <Table>
          <thead>
            <tr>
              <td>Id</td>
              <td>Product</td>
              <td>Brand</td>
              <td>Price</td>
              <td>Model</td>
              <td>Size</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {
              products.map(product => (
                <tr key={String(product.id)}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>R$ {product.price}</td>
                  <td>{product.productModel}</td>
                  <td>{product.size}</td>
                  <td>
                    <div>
                      <Link to={`/product/${product.id}/edit`}>
                        <SlPencil />
                      </Link>
                    </div>
                    <Link to={`/product/${product.id}/delete`}>
                      <SlMinus onClick={(e) => { handleDeleteAsk(e, product) }} />
                    </Link></td>
                </tr>
              ))
            }
          </tbody>

        </Table>


      </ProductContainer>

    </Container>
  );
}