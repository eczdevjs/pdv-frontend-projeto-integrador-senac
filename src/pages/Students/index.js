import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from '../../services/axios';
import { Container } from "../../styles/GlobalStyle";
import { StudentContainer, ProfilePicture } from "./styled";
import { get } from 'lodash';
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa';
import { FaE } from "react-icons/fa6";
import Loading from "../../components/Loading";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading]  = useState(false);


  React.useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/alunos');
      console.log(response.data)
      setStudents(response.data);
      setIsLoading(false);
    }

    getData();
  }, [])

  return (
    <Container>
      <Loading isLoading={isLoading}/>
      <h1>Students Page</h1>
      <StudentContainer>
        {
          students.map(student => (
            <div key={String(student.id)}>
              <ProfilePicture>
                {
                  get(student, 'Fotos[0].url', false) ?
                    (<img src={students.Fotos[0].url}></img>) : (<FaUserCircle size={36} />)
                }
              </ProfilePicture>

              <span>{student.nome}</span>
              <span>{student.email}</span>

              <Link to={`/student/${student.id}/edit`}>
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
