// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import logo from "assets/img/logoiris.JPG";
import bgImage from "assets/img/sidebar-2.jpg";
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";
import baseIris from "baseiris.js";
import Footer from "components/Footer/Footer.js";
import { UserContext } from "context/userContextProvider.js";
import firebase from "firebase";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import React, { useContext, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routesuser.js";
import Notification from "viewutilisateur/Notification/Notification";
// core components
import Navbar from "../components/Navbars/Navbar.js";
import Sidebar from "../components/Sidebar/Sidebar";
import DashboardPage from "../viewutilisateur/Dashboard/Dashboard";
import UserProfile from "../viewutilisateur/UserProfile/UserProfile";
import SignIn from "./Signin.js";

let ps;

const useStyles = makeStyles(styles);

const Utilisateur = ({ ...rest }) => {
  const { client, setClient } = useContext(UserContext);

  const setClientFetch = async (id) => {
    const utilisateur = await baseIris.fetch(`/${id}`, {});
    setClient({ ...client, ...utilisateur.client });
  };

  const reconnexion = async () => {
    await firebase.auth().onAuthStateChanged((user) => {
      setClientFetch(user.uid);
    });
  };

  useEffect(() => {
    reconnexion();
  }, []);

  const SwitchRoutes = () => (
    <Switch>
      <Route path={`/client/monsuivi`}>
        <DashboardPage />
      </Route>
      <Route path={`/client/user`}>
        <UserProfile id={client.id} />
      </Route>
      <Route path={`/client/notifications`}>
        <Notification />
      </Route>
      <Route path={"/login"}>
        <SignIn />
      </Route>
      <Redirect from="/client" to={`/client/monsuivi`} />
    </Switch>
  );

  // styless
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions

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
    if ((navigator.platform.indexOf("Win") > -1) & mainPanel?.current) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if ((navigator.platform.indexOf("Win") > -1) & ps) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={client.nom}
        logo={logo}
        image={bgImage}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={"blue"}
        id={client.id}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          client={client}
          {...rest}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        <div className={classes.content}>
          <div className={classes.container}>
            <SwitchRoutes />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Utilisateur;
