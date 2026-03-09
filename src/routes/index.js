import React from "react";
import {Switch, withRouter} from "react-router-dom";
import CustomRoute from "./CustomRoute";
import Page404 from "../pages/Page404";
import Login from "../pages/login";

import { toast } from "react-toastify";

 function Routes() {
  // console.log('Rota atual: ', window.location.pathname);
  // toast.success('Success message');
  // toast.error('Error');

  return (
    <Switch>
     <CustomRoute exact path="/" component={Login} />
     
      <CustomRoute exact path="/login" component={Login} />

      <CustomRoute component={Page404} />
    </Switch>
  );
}

export default withRouter(Routes);
