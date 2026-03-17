import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from '../../services/axios';
import { Container } from "../../styles/GlobalStyle";
import { StudentContainer, ProfilePicture } from "./styled";
import { get } from 'lodash';
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa';
import { toast } from "react-toastify";

import Loading from "../../components/Loading";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading]  = useState(false);
  const apiUrl = 'http://192.168.0.233:3001';

  React.useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const response = await axios.get('/alunos');
        setStudents(response.data);
        toast.success()
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        toast.error(e.message);
      }
    }

    getData();
  }, []);


  async function handleDeleteAsk(e, student) {
    e.preventDefault();
    const confirm = window.confirm(`Do you really wish to exclude ${student.nome} ?`);
    console.log(confirm);
    if (confirm) {
      try {
        setIsLoading(true);
        await axios.delete(`alunos/${student.id}`);
        const index = students.indexOf(student);
        const studentsUpdated = [...students];
        studentsUpdated.splice(index, 1);
        setStudents(studentsUpdated);
        setIsLoading(false);
        toast.success("Student has been excluded");

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
      <Loading isLoading={isLoading}/>
      <h1 style={{fontFamily: "system-ui"}}>Students Page</h1>
      <Link to="/student">New student</Link>
      <StudentContainer>
        {
          students.map(student => (
            <div key={String(student.id)}>
              <ProfilePicture>
              
                {
                  get(student, 'Fotos[0].url', '') ?
                    (<img src={student.Fotos[0].url}></img>) : (<FaUserCircle size={36} />)
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

      </StudentContainer>

    </Container>
  );
}
