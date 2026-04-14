import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from '../../services/axios';
import { Container } from "../../styles/GlobalStyle";
import { StudentContainer, ProfilePicture } from "./styled";
import { get } from 'lodash';
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa';
import { toast } from "react-toastify";
import { IoAddCircle } from "react-icons/io5";
import Loading from "../../components/Loading";


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
      <Link to="/product"> <IoAddCircle size={30}/></Link>
      <StudentContainer>
        {
          products.map(product => (
            <div key={String(product.id)}>

              <span>{product.id}</span>
              <span>{product.name}</span>
              <span>{product.brand}</span>
              <span>R$ {product.price}</span>
              <span>{product.productModel}</span>
              <span>{product.size}</span>

              <Link to={`/product/${product.id}/edit`}>
                <FaEdit />
              </Link>

              <Link to={`/product/${product.id}/delete`}>
                <FaWindowClose onClick={(e) => {handleDeleteAsk(e, product)}}/>
              </Link>

            </div>
          ))
        }

      </StudentContainer>

    </Container>
  );
}