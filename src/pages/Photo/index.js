import React from 'react';
import {useDispatch}  from 'react-redux';
import { Form, Title } from './styled';
import { Container, ProductPicture } from '../../styles/GlobalStyle';
import axios from '../../services/axios';
import history from '../../services/history';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import PropTypes from 'prop-types';
import {loginFailure} from '../../store/modules/auth/actions'
export function Photo({ match }) {
    const id = match.params?.id || '';
    
    const [photo, setPhoto] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();
    React.useEffect(() => {
        async function getData() {
            try {
                setLoading(true);
                const { data } = await axios.get(`/products/${id}`);

                const photo = data.photo[0]?.url;

                setPhoto(photo);
                setLoading(false);

                toast.success('Photo reached');
            } catch (error) {
                setLoading(false);
                toast.error('Error fetching photo');
                console.log(error);
                history.push('/products');
            }
        }
        getData();
    }, [id]);

    const handleChange = async e => {
        const photo = e.target.files[0];
        

        if (!photo) {
            
            return;
        }
        const photoUrl = URL.createObjectURL(photo);
        setPhoto(photoUrl);
        // Enviar foto servidor:
        const formData = new FormData();
        // anexando arquivo:
        formData.append('productId', id);
        formData.append('photo', photo);
        formData.append('productId', id);

        try {
            setLoading(true);
            await axios.post(`/photos/product/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(false);
            toast.success('Product photo updated');
        } catch (error) {
            setLoading(false);
            toast.error('Error uploading photo');
            console.log(error);

            const {status} = error;

            if(status === 401){
                dispatch(loginFailure());
            }
        }

    }



    return (

        <Container>
            <Loading isLoading={loading} />
            <Title>Edit Product Photo</Title>
            <Form>
                <label htmlFor='photo'>
                    {photo ? (
                        <ProductPicture imgsize={13}>
                            <img src={photo} alt="Product photo"></img>
                        </ProductPicture>) : ('Select')}
                    <input type='file' id='photo' onChange={handleChange}></input>

                </label>

            </Form>
        </Container>

    );
}

Photo.prototype = {
    match: PropTypes.shape({}).isRequired
}