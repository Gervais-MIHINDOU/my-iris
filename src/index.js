/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import "assets/css/iris.css";
import "assets/css/material-dashboard-react.css?v=1.10.0";
import UserProvider from "context/userContextProvider";
import SignIn from "layouts/Signin";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
// core components
import Admin from "./layouts/Admin";
import Utilisateur from "./layouts/Utilisateur";

const Root = () => (
  <UserProvider>
    <BrowserRouter>
      <Switch>
        <Route path="/admin">
           <Admin />
        </Route>
        <Route path="/client">
          <Utilisateur />
        </Route>
        <Route path="/login">
          <SignIn />
        </Route>
        <Redirect from="/" to="/login" />
      </Switch>
    </BrowserRouter>
  </UserProvider>
);

ReactDOM.render(<Root />, document.getElementById("root"));
