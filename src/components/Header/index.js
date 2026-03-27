import React from "react";
import { Nav , ToggleBtn} from "./styled";
import * as colors from '../../config/colors';
import { SlHome, SlUser, SlPower, SlPeople, SlTag, SlLogout, SlSocialDropbox, SlDrawer, SlNote , SlMenu} from 'react-icons/sl';
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';
import history from "../../services/history";



export default function Header() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const [isOpen, setIsOpen] = React.useState(true);
  const dispatch = useDispatch();
  function handleLogout(e) {

    e.preventDefault();
    dispatch(actions.loginFailure())
    // actions.loginFailure();
    history.push('/login');
  }

  return (
    <Nav isOpen={isOpen}>

      <ToggleBtn onClick={()=> setIsOpen(!isOpen)}>
        <SlMenu/>
      </ToggleBtn>

      <NavLink exact to="/" end>
        <SlHome size={24} /><span>Home</span>
      </NavLink>

      <NavLink to="/cashier">
        <SlDrawer size={24} /><span>Cashier</span>
      </NavLink>

      <NavLink to="/sales">
        <SlNote size={24} /><span>Sales</span>
      </NavLink>


      <NavLink to="/clients">
        <SlPeople size={24} /><span>Clients</span>
      </NavLink>

      <NavLink to="/products">
        <SlTag size={24} /><span>Products</span>
      </NavLink>

      <NavLink to="/stock">
        <SlSocialDropbox size={24} /><span>Stock</span>
      </NavLink>



      {isLoggedIn ?
        (
          <>
            <NavLink to="/register">
              <SlUser size={24} /><span>Account</span>
            </NavLink>
            <div className="logout">
              <button >
                < SlPower size={24} onClick={handleLogout} /><span>Log out</span>
              </button>
            </div>
          </>

        ) :
        (
          <NavLink to="/register">
            <SlUser size={24} /><span>Register</span>
          </NavLink>
        )
      }

    </Nav>
  );
}

// os links nao estao conversando com as rotas, corrigir