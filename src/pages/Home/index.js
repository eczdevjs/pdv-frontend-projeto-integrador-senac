import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from '../../services/axios';
import { Container } from "../../styles/GlobalStyle";
import { StudentContainer, ProfilePicture } from "./styled";
import { get } from 'lodash';
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa';
import { toast } from "react-toastify";
import ProductRankingChart from "./components/ProductRankingChart";
import Loading from "../../components/Loading";

export default function Home() {
  const [rankingData, setRankingData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const apiUrl = 'http://192.168.0.233:3001';

  React.useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const response = await axios.get('/sales/ranking');
        setRankingData(response.data);
        
        toast.success('Dados de vendas estabelecidos com sucesso')
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        console.log(e)
        toast.error('erro buscando dados de ranking');
      }
    }
    getData();
  }, []);


  return (
    <Container>
      <h1>Painel de gestão</h1>
      <div className="dashboard-container" style={{ width: '100%', display: 'flex', justifyContent: 'center' }} >

        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <ProductRankingChart data={rankingData} />
        </div>
      </div>

      <div className="dashboard-container" style={{ width: '100%', display: 'flex', justifyContent: 'center' }} >

        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <ProductRankingChart data={rankingData} type='revenue' />
        </div>
      </div>
    </Container>
  );
}
