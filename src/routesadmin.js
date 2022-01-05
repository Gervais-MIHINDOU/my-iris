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
// @material-ui/icons

import { DashboardOutlined, Policy, Settings } from "@material-ui/icons";
import Notifications from "@material-ui/icons/Notifications";
import Person from "@material-ui/icons/Person";
import AdminProfile from "viewadmin/AdminProfile/AdminProfile";
import ListClient from "viewadmin/Clients/ListClient";
import Config from "viewadmin/Config/Config";
import Dashboard from "viewadmin/Dashboard/Dashboard";
import Notification from "viewutilisateur/Notification/Notification";
// core components/views for Admin layout

const routesAdmin = [
  {
    path: "/dashboard",
    name: "Tableau de bord",
    icon: DashboardOutlined,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/clients",
    name: "Mes Clients",
    icon: Person,
    component: ListClient,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,
    component: Notification,
    layout: "/admin",
  },
  {
    path: "/config",
    name: "Configuration",
    icon: Settings,
    component: Config,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "Mon compte Admin",
    icon: Policy,
    component: AdminProfile,
    layout: "/admin",
  },
];

export default routesAdmin;
