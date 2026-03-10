import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from '../../services/axios';
import { Container } from "../../styles/GlobalStyle";
import { StudentContainer, ProfilePicture } from "./styled";
import { get } from 'lodash';
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa';
import { FaE } from "react-icons/fa6";
export default function Students() {
  const [students, setStudents] = useState([]);

  React.useEffect(() => {
    async function getData() {
      const response = await axios.get('/alunos');
      console.log(response.data)
      setStudents(response.data);
    }

    getData();
  }, [])

  return (
    <Container>
      <h1>Students Page</h1>
      <StudentContainer>
        {
          students.map(student => (
            <div key={String(student.id)}>
              <ProfilePicture>
                {
                  get(students, 'Fotos[0].url', false) ?
                    (<img src={students.Fotos[0].url}></img>) : (<FaUserCircle size={36} />)
                }
              </ProfilePicture>

              <span>{student.nome}</span>
              <span>{student.email}</span>
              <Link to={`/student/${student.id}/edit`}>
                <FaEdit />

                <Link to={`/student/${student.id}/delete`}>
                  <FaWindowClose />
                </Link>
              </Link>
            </div>
          ))
        }

      </StudentContainer>

    </Container>
  );
}
