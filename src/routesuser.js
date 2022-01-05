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
import Dashboard from "@material-ui/icons/Dashboard";
import Notifications from "@material-ui/icons/Notifications";
import Person from "@material-ui/icons/Person";
// core components/views for Admin layout
import DashboardPage from "viewutilisateur/Dashboard/Dashboard.js";
import NotificationsPage from "viewutilisateur/Notification/Notification.js";
import UserProfile from "./viewutilisateur/UserProfile/UserProfile";

const dashboardRoutes = [
  {
    path: "/monsuivi",
    name: "Mon Dossier",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/client",
  },
  {
    path: "/user",
    name: "Mon Profil",
    icon: Person,
    component: UserProfile,
    layout: "/client",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/client",
  },
];

export default dashboardRoutes;
