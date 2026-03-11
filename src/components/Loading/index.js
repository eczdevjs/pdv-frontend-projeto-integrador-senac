import React from 'react';
import { Container } from './styled';
import PropTypes from 'prop-types';

export default function Loading({ isLoading }) {
    if (!isLoading) return <></>;
    return (
        <Container>
            <div/>
                <span>Loading ....</span>
           
        </Container>
    )
}

Loading.defaultProps = {
    isLoading: false
};

Loading.propTypes = {
    isLoading: PropTypes.bool
}
