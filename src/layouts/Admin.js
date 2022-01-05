// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import logo from "assets/img/reactlogo.png";
import bgImage from "assets/img/sidebar-2.jpg";
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";
import baseIris from "baseiris";
import Footer from "components/Footer/Footer.js";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import { UserContext } from "context/userContextProvider";
import firebase from "firebase";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import React, { useContext, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routesAdmin from "routesadmin";
import AdminProfile from "viewadmin/AdminProfile/AdminProfile";
import DetailClient from "viewadmin/Clients/DetailClient";
import ListClient from "viewadmin/Clients/ListClient";
import Config from "viewadmin/Config/Config";
import Dashboard from "viewadmin/Dashboard/Dashboard";
import Notification from "viewutilisateur/Notification/Notification";

let ps;

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  const { isAdmin, setIsAdmin, setAdmin, admin } = useContext(UserContext);

  const setAdminFetch = async (id) => {
    const utilisateur = await baseIris.fetch(`/${id}`, {});
    setAdmin({ ...admin, ...utilisateur.client });
  };

  const reconnexion = async () => {
    await firebase.auth().onAuthStateChanged((user) => {
      setAdminFetch(user.uid);
    });
  };

  useEffect(() => {
    reconnexion();
  }, []);

  useEffect(() => {
    setIsAdmin(true);
  }, []);

  const SwitchRoutes = () => (
    <Switch>
      <Route path={"/admin/dashboard"}>
        <Dashboard />
      </Route>
      <Route path="/admin/clients">
        <ListClient />
      </Route>
      <Route path="/admin/config">
        <Config />
      </Route>
      <Route path={"/admin/notifications"}>
        <Notification />
      </Route>
      <Route path="/admin/user">
        <AdminProfile />
      </Route>
      <Route path={"/admin/client"}>
        <DetailClient />
      </Route>
      <Redirect from="/admin" to={`/admin/dashboard`} />
    </Switch>
  );

  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routesAdmin}
        logoText={"COMPTE ADMIN"}
        logo={logo}
        image={bgImage}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={"blue"}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routesAdmin}
          handleDrawerToggle={handleDrawerToggle}
          client={admin}
          isAdmin={isAdmin}
          {...rest}
        />
        <div className={classes.content}>
          <div className={classes.container}>
            <SwitchRoutes />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
