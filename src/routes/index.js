import React from "react";
import { Switch, withRouter } from "react-router-dom";
import CustomRoute from "./CustomRoute";
import Page404 from "../pages/Page404";
import Login from "../pages/Login";
import Clients from '../pages/Clients';
import Products from '../pages/Products';
import Sales from '../pages/Sales';
import Stock from '../pages/Stock';
import Cashier from '../pages/Cashier';
import Register from '../pages/Register';
import Home from '../pages/Home'
import { toast } from "react-toastify";

function Routes() {
  // console.log('Rota atual: ', window.location.pathname);
  // toast.success('Success message');
  // toast.error('Error');

  return (
    <Switch>

      <CustomRoute exact path="/" component={Home} isClosed={true} />
      <CustomRoute exact path="/clients" component={Clients} isClosed={true} />
      <CustomRoute exact path="/products" component={Products} isClosed={true} />
      <CustomRoute exact path="/sales" component={Sales} isClosed={true}/>
      <CustomRoute exact path="/stock" component={Stock} isClosed={true} />
      <CustomRoute exact path="/login" component={Login} isClosed={false}/>
      <CustomRoute exact path="/cashier" component={Cashier} isClosed={true}/>
      <CustomRoute exact path="/register" component={Register} isClosed={false} />
      <CustomRoute component={Page404} />
      
    </Switch>
  );
}

export default withRouter(Routes);
