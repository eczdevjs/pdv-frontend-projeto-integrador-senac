import React, { useState } from "react";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import { Container } from "../../styles/GlobalStyle";
import { get } from "lodash";
import { Form } from '../../styles/GlobalStyle';
import { toast } from "react-toastify";
import { isEmail, isInt, isFloat } from "validator";
import { useDispatch } from "react-redux";
import Loading from '../../components/Loading';
import axios from "../../services/axios";
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';
import { Link } from "react-router-dom";



export default function Product({ match }) {

  const id = match.params.id;
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [productModel, setProductModel] = useState('');
  const [description, setDescription] = useState('');
  const [price , setPrice] = useState('');
  const [size, setSize] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState('');

  // na minha implementacao os dados vem da pagina anterior para nao precisar buscar no servidor de novo. Porem no curso ha uma nova chamada para o endpoint com as informacoes do aluno.
  React.useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/products/${id}`);
        // const Foto = get(data, 'Fotos[0].url', '');

        setName(data.name || '');
        setBrand(data.brand || '');
        setProductModel(data.productModel || '');
        setDescription(data.description || '');
        setPrice(data.price || '');
        setSize(data.size || '');
        // setPhoto(Foto);

        setIsLoading(false);

      } catch (error) {
        setIsLoading(false);
        const status = get(error, 'response.status', 0);
        const errors = get(error, 'response.errors', []);

        if (status === 400) {
          errors.map(error => toast.error(error));
          window.alert('Id does not match any data, redirecting ...')
          history.push('/');
        }
      }
    }
    getData();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    // validacao inputs
    if (name.length < 3 || name.length > 255) {
      formErrors = true;
      toast.error('Name must be between at least 3 and at most 255 characters long')
    }

    if (!isFloat(String(price))) {
      formErrors = true;
      toast.error('Weight mismatch a number must be provided');
    }

    if (formErrors) return;

    try {
      if (id) {
        const response = await axios.put(`/products/edit/${id}`, {
          name,
          brand,
          productModel,
          description,
          price,
          size
        });

        toast.success('Data update succed!');
      } else {

        const response = await axios.post(`/products/create`, {
          name,
          brand,
          productModel,
          description,
          price,
          size
        });
        toast.success('Register created successfuly');

        history.push(`/products/`);
      }
    } catch (error) {
      const status = get(error, 'response.data', 0);
      const data = get(error, 'response.data', {});
      const errors = get(error, 'response.errors', []);

      if (errors.length > 0) {
        errors.map(e => toast.error(e))
      } else {
        toast.error('Unknown error');
      }

      if (status === 401) dispatch(actions.loginFailure())
    }

  }


  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1 >{id ? 'Edit Product' : 'Product Registration'}</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name
          <input type="text" value={name} onChange={e => setName(e.target.value)}>
          </input>
        </label>

        <label htmlFor="lastname">
          Brand
          <input type="text" value={brand} onChange={e => setBrand(e.target.value)}>
          </input>
        </label>

        <label htmlFor="text">
          Model
          <input type="text" value={productModel} onChange={e => setProductModel(e.target.value)}>
          </input>
        </label>


        <label htmlFor="text">
          Description
          <input type="text" value={description} onChange={e => setDescription(e.target.value)}>
          </input>
        </label>

        <label htmlFor="number">
          Price
          <input type="text" value={price} onChange={e => setPrice(e.target.value)}>
          </input>
        </label>

        <label htmlFor="text">
          Size
          <input type="text" value={size} onChange={e => setSize(e.target.value)}>
          </input>
        </label>

        <button>{id ? 'Save' : 'Register'}</button>
      </Form>

    </Container>
  );
}
