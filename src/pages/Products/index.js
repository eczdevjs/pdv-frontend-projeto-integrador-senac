import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from '../../services/axios';
import { Container, Table, ProductPicture } from "../../styles/GlobalStyle";
import { ProductContainer } from "./styled";
import { get, size } from 'lodash';
import { toast } from "react-toastify";
import { IoAddCircle } from "react-icons/io5";
import Loading from "../../components/Loading";
import {
  SlPencil, SlMinus, SlTag
} from "react-icons/sl";
import { ImgModal } from './components/ImgModal';
import { useDispatch } from "react-redux";
import { loginFailure } from '../../store/modules/auth/actions';

export default function Products() {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [imgsrc, setImgsrc] = useState('');
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
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
        console.log(e);
        if(e.status === 401) dispatch(loginFailure());
        setIsLoading(false);
        console.log("e.status: ",e.status);
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
      {showModal && <ImgModal imgsrc={imgsrc} showModal={showModal} closeModal={() => setShowModal(false)} />}
      <h1 style={{ fontFamily: "system-ui" }}>Produtos</h1>
      <Link to="/product"> <IoAddCircle size={30} /><p><strong>Novo</strong></p></Link>
      <ProductContainer>
        <Table>
          <thead>
            <tr>
              <td>Id</td>
              <td>Foto</td>
              <td>Produto</td>
              <td>Marca</td>
              <td>Preço</td>
              <td>Modelo</td>
              <td>Tamanho</td>
              <td>Ações</td>
            </tr>
          </thead>
          <tbody>
            {
              products.map(product => (
                <tr key={String(product.id)}>
                  <td>{product.id}</td>
                  <td>{product.photo[0]?.url ? (
                    <ProductPicture imgsize={5} onClick={() => {
                      setShowModal(true);
                      setImgsrc(product.photo[0]?.url);
                    }
                    }>
                      <img src={product.photo[0]?.url} ></img>
                    </ProductPicture>) : (<SlTag size={40} />)}</td>
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