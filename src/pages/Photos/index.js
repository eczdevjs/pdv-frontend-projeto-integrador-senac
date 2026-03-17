import React from "react";
import { useDispatch } from "react-redux";
import { Container } from "../../styles/GlobalStyle";
import { Form, Title } from './styled';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import history from '../../services/history';
import { get } from "lodash";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import * as actions from '../../store/modules/auth/actions'
export default function Photos({ match }) {
  const dispatch = useDispatch();
  const id = get(match, 'params.id', '');
  const [isLoading, setIsLoading] = React.useState(false);
  const [photo, setPhoto] = React.useState('');

  React.useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const { data } = axios.get(`/alunos/${id}`);
        setPhoto(get(data, 'Fotos[0].url', ''));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error('Error fetching image, redirecting ...');
      }
    }

    getData();
  }, [])

  async function handleChange(e) {

    const selectedPhoto = e.target.files[0];
    const photoUrl = URL.createObjectURL(selectedPhoto);
    console.log(photoUrl);
    setPhoto(photoUrl);

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('foto', selectedPhoto);

    try {
      setIsLoading(true);
      axios.post('/fotos/', formData, {
        headers: {
          "Content-Type": `multipart/form-data`
        }
      })
      toast.success('Photo updated');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      const {status} = get(error, 'response', '');

      if (status === 401) dispatch(actions.loginFailure());
      toast.error('Credential failure : You are supposed to log in');
      history.push('/login');
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>Photos Page</Title>
      <Form>
        <label htmlFor="photo">
          {photo ? <img src={photo} alt="Profile photo" /> : 'Select'}
          <input type="file" id="photo" onChange={handleChange}></input>
        </label>
      </Form>
    </Container>
  );
}


Photos.prototype = {
  match: PropTypes.shape({}).isRequired
}