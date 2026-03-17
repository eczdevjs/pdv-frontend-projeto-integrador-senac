import React, {useState} from "react";

import { Container } from "../../styles/GlobalStyle";
import { get } from "lodash";
import PropTypes from "prop-types";
import { Form } from './styled';
import { toast } from "react-toastify";
import { isEmail, isInt, isFloat } from "validator";
import { useDispatch } from "react-redux";
import Loading from '../../components/Loading';
import axios from "../../services/axios";
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';


export default function Student({ match }) {

  const id = match.params.id;
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // na minha implementacao os dados vem da pagina anterior para nao precisar buscar no servidor de novo. Porem no curso ha uma nova chamada para o endpoint com as informacoes do aluno.
  React.useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const Foto = get(data, 'Fotos[0].url', []);

        setName(data.nome || '');
        setlastName(data.sobrenome || '');
        setEmail(data.email || '');
        setAge(data.idade || '');
        setWeight(data.peso || '');
        setHeight(data.altura || '');

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

    if (name.length < 3 || name.length > 255) {
      formErrors = true;
      toast.error('Last name must be between at least 3 and at most 255 characters long')
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Invalid e-mail');
    }

    if (!isInt(String(age))) {
      formErrors = true;
      toast.error('Age mismatch, a number must be provided');
    }

    if (!isFloat(String(height))) {
      formErrors = true;
      toast.error('Height mismatch a number must be provided');
    }

    if (!isFloat(String(weight))) {
      formErrors = true;
      toast.error('Weight mismatch a number must be provided');
    }

    if (formErrors) return;

    try {
      if (id) {

        const response = await axios.put(`/alunos/${id}`, {
          nome: name,
          sobrenome: lastName,
          email,
          altura: height,
          idade: age,
          peso: weight
        });

        toast.success('Data update succed!');
      } else {

        const response = await axios.post(`/alunos/`, {
          nome: name,
          sobrenome: lastName,
          email,
          altura: height,
          idade: age,
          peso: weight
        });
        toast.success('Register created successfuly');

        history.push(`/student/${response.data.id}/edit`);
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
      <h1 style={{fontFamily:"system-ui"}}>{id ? 'Edit' : 'New Student'}</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name
          <input type="text" value={name} onChange={e => setName(e.target.value)}>
          </input>
        </label>

        <label htmlFor="lastname">
          Last name
          <input type="text" value={lastName} onChange={e => setlastName(e.target.value)}>
          </input>
        </label>

        <label htmlFor="email">
          Email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}>
          </input>
        </label>

        <label htmlFor="age">
          Age
          <input type="number" min={0} value={age} onChange={e => setAge(e.target.value)}>
          </input>
        </label>

        <label htmlFor="height">
          Height
          <input type="number" step={0.01} min={0} max={3} value={height} onChange={e => setHeight(e.target.value)} >
          </input>
        </label>

        <label htmlFor="weight">
          Weight
          <input type="number" step={0.01} min={0} value={weight} onChange={e => setWeight(e.target.value)}>
          </input>
        </label>

        <button>{id ? 'Save' : 'Register'}</button>
      </Form>

    </Container>
  );
}
