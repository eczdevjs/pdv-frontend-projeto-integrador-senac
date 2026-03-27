import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from '../../services/axios';
import { Container } from "../../styles/GlobalStyle";
import { CashierContainer, CashierSubContainer, MainContainer, TabButton, TabNav } from "./styled";
import { get } from 'lodash';
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa';
import { toast } from "react-toastify";

import Loading from "../../components/Loading";

export default function Cashier() {
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState('current');
  console.log('aba ativa agora: ', activeTab)
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = 'http://192.168.0.233:3001';
  const [isCashierOpen, setIsCashierOpen] = useState(false);

  // React.useEffect(() => {
  //   async function getData() {
  //     setIsLoading(true);
  //     try {
  //       const response = await axios.get('/alunos');
  //       setStudents(response.data);
  //       toast.success()
  //       setIsLoading(false);
  //     } catch (e) {
  //       setIsLoading(false);
  //       toast.error(e.message);
  //     }
  //   }

  //   getData();
  // }, []);


  // async function handleDeleteAsk(e, student) {
  //   e.preventDefault();
  //   const confirm = window.confirm(`Do you really wish to exclude ${student.nome} ?`);
  //   console.log(confirm);
  //   if (confirm) {
  //     try {
  //       setIsLoading(true);
  //       await axios.delete(`alunos/${student.id}`);
  //       const index = students.indexOf(student);
  //       const studentsUpdated = [...students];
  //       studentsUpdated.splice(index, 1);
  //       setStudents(studentsUpdated);
  //       setIsLoading(false);
  //       toast.success("Student has been excluded");

  //     }
  //     catch (e) {
  //       setIsLoading(false);
  //       const errors = get(e, 'response.data.errors', []);
  //       errors.map(e => toast.error(e));
  //       if (!errors) {
  //         toast.error(e);
  //       }
  //     }
  //   }
  // }

  return (
    <MainContainer>
      <TabNav>
        <TabButton
          active={activeTab === 'current'}
          onClick={() => setActiveTab('current')}
        >
          Current Cashier
        </TabButton>

        <TabButton
          active={activeTab === 'previous'}
          onClick={() => setActiveTab('previous')}
        >
          Previous Cashier
        </TabButton>
      </TabNav>

      {activeTab === 'current' && (<CashierContainer>
        <CashierSubContainer>
          <h1>Cash Summary</h1>
          <span>Opened at: </span>
          <span>Initial balance: </span>
          <span>Total Sales: </span>
          <span>Final Balance: </span>
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px', padding: '10px' }}>
            <button>Add Cash</button>
            <button>Withdraw</button>
          </div>
        </CashierSubContainer>

        <CashierSubContainer>
          <h2>Payment methods</h2>
          <span>Credit Card: 10,00</span>
          <span>Debit Card: 10,00</span>
          <span>Pix Card: 10,00</span>
        </CashierSubContainer>

        <CashierSubContainer>
          <h2>Transactions</h2>
          <h4>List</h4>
          <button>Close Cashier</button>
        </CashierSubContainer>
      </CashierContainer>)}

      {activeTab === 'previous' && (
        <CashierContainer>
          <CashierSubContainer style={{ maxWidth: '100%' }}>
            <h2>History of closed cashiers</h2>
            <p>List of previous cashier transactions</p>

          </CashierSubContainer>
        </CashierContainer>
      )}
    </MainContainer>
  );
}





// codigo anterior para salvar apenas, remover posteriormente

{/* <Loading isLoading={isLoading}/>
      <h1 style={{fontFamily: "system-ui"}}>Students Page</h1>
      <Link to="/student">New student</Link>
      <StudentContainer>
        {
          students.map(student => (
            <div key={String(student.id)}>
              <ProfilePicture>
              
                {
                  get(student, 'Fotos[0].url', '') ?
          
}          (<img src={student.Fotos[0].url}></img>) : (<FaUserCircle size={36} />)
                }
              </ProfilePicture>

              <span>{student.nome}</span>
              <span>{student.email}</span>

              <Link to = {`/student/${student.id}/edit`}>
                  <FaEdit />
              </Link>

              <Link to={`/student/${student.id}/delete`}>
                <FaWindowClose />
              </Link>

            </div>
          ))
        }

      </StudentContainer> */}
