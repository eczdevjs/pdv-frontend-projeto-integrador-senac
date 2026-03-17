import React from "react";
import { Switch, withRouter } from "react-router-dom";
import CustomRoute from "./CustomRoute";
import Page404 from "../pages/Page404";
import Login from "../pages/Login";
import Student from '../pages/Student';
import Students from '../pages/Students';
import Photos from '../pages/Photos';
import Register from '../pages/Register';
import { toast } from "react-toastify";

function Routes() {
  // console.log('Rota atual: ', window.location.pathname);
  // toast.success('Success message');
  // toast.error('Error');

  return (
    <Switch>
      <CustomRoute exact path="/" component={Students} isClosed={true} />
      <CustomRoute exact path="/student/:id/edit" component={Student} isClosed={true} />
      <CustomRoute exact path="/student" component={Student} isClosed={true}/>
      <CustomRoute exact path="/photo/:id" component={Photos} isClosed={true} />
      <CustomRoute exact path="/login" component={Login} isClosed={false}/>
      <CustomRoute exact path="/register" component={Register} isClosed={false} />
      <CustomRoute component={Page404} />
    </Switch>
  );
}

export default withRouter(Routes);
