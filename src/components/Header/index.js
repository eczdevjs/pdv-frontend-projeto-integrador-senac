import React from "react";
import { Nav } from "./styled";
import { FaHome, FaUserAlt, FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function Header() {

  let botaoClicado = useSelector(state => state.example.botaoClicado);
  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>


      <Link to="/register">
        <FaUserAlt size={24} />
      </Link>

      <Link to="/student">
        <FaUserAlt size={24} />
      </Link>

      <Link  to="/students">
        <FaSignInAlt size={24} />
      </Link>
      <p style={{ color: " #fff" }}> {botaoClicado ? 'botao clicado' : 'nao clicado'}</p>

    </Nav>
  );
}

// os links nao estao conversando com as rotas, corrigir