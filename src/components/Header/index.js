import React from "react";
import { Nav } from "./styled";
import * as colors from '../../config/colors';
import { FaHome, FaUserAlt, FaSignInAlt, FaCircle, FaPowerOff } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';
import history from "../../services/history";

export default function Header() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  function handleLogout(e) {

    e.preventDefault();
    dispatch(actions.loginFailure())
    // actions.loginFailure();
    history.push('/login');
  }

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>

      {isLoggedIn && <FaCircle size={24} color="#5899de" />}

      {isLoggedIn ?
        (
          <>
            <Link to="/register">
              <FaUserAlt size={24} />
            </Link>
            <button>
              < FaPowerOff size={24} onClick={handleLogout} />
            </button>
          </>

        ) :
        (
          <Link to="/register">
            <FaUserAlt size={24} />
          </Link>
        )
      }
      
    </Nav>
  );
}

// os links nao estao conversando com as rotas, corrigir