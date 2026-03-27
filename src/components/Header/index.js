import React from "react";
import { Nav } from "./styled";
import * as colors from '../../config/colors';
import { FaHome, FaUserAlt, FaSignInAlt, FaCircle, FaPowerOff } from "react-icons/fa";
import { SlHome, SlUser, SlPower, SlPeople, SlTag, SlLogout, SlSocialDropbox, SlDrawer, SlNote } from 'react-icons/sl';
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
        <SlHome size={24} /><span>Home</span>
      </Link>

      <Link to="/sales">
        <SlNote size={24} /><span>Sales</span>
      </Link>

      <Link to="/clients">
        <SlPeople size={24} /><span>Clients</span>
      </Link>

      <Link to="/products">
        <SlTag size={24} /><span>Products</span>
      </Link>

      <Link to="/stock">
        <SlSocialDropbox size={24} /><span>Stock</span>
      </Link>

      <Link to="/cashier">
        <SlDrawer size={24} /><span>Cashier</span>
      </Link>

      {isLoggedIn ?
        (
          <>
            <Link to="/register">
              <SlUser size={24} /><span>Account</span>
            </Link>
          <div className="logout">
              <button >
              < SlPower size={24} onClick={handleLogout} /><span>Log out</span>
            </button>
          </div>
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