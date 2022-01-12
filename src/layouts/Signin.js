import { Avatar, Button, makeStyles, Typography } from "@material-ui/core";
import bgImage from "assets/img/logoDeIris.jpg";
import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";
import baseIris, { firebaseApp } from "baseiris";
import firebase from "firebase";
import React, { useState } from "react";
//import irisLogo from "../img/logoiris.JPG";
import { Redirect } from "react-router-dom";
import EnumObjectNotif from "viewutilisateur/Notification/EnumObjectNotif";
import googleLogo from "../img/google-logo.png";
import "./login.css";
import { v4 as uuidv4 } from "uuid";

const useStylesBackground = makeStyles(styles);

const useStyles = makeStyles((theme) => ({
  center: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    textTransform: "none",
    marginTop: theme.spacing(10),
    display: "flex",
    alignItems: "center",
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    transition: "background-color 0.5s",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      transition: "background-color 0.5s",
      cursor: "pointer",
    },
  },
  avatar: {
    margin: `0 ${theme.spacing(0.5)}px`,
  },
  text: {
    flexGrow: 1,
    textAlign: "center",
  },
  form: {
    position: "relative",
    zIndex: "2",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = () => {
  const [param, setParam] = useState({});

  const classes = useStyles();

  const classesBackgound = useStylesBackground();

  const style = {
    "font-size": "55px",
    "font-weight": "bold",
    "text-align": "center",
    "font-family": "ui-sans-serif",
     color: "white",
  };
  const submit = (event) => {
    event.preventDefault();
    login();
  };

  const login = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    await firebaseApp.auth().signInWithPopup(googleProvider).then(handleAuth);
  };

  const handleAuth = async (authdata) => {
    const user = authdata.user;
    let clientTmp = {};
    clientTmp["email"] = user.email;
    clientTmp["id"] = user.uid;
    clientTmp["nom"] = user.displayName;
    clientTmp["photo"] = user.photoURL;
    clientTmp["phone"] = user.phoneNumber;
    const utilisateur = await baseIris.fetch(`/${clientTmp.id}`, {});
    if (!utilisateur.client) {
      clientTmp["dateInscription"] = new Date().toISOString().split("T")[0];
    } else {
      clientTmp = utilisateur.client;
    }

    if (!clientTmp.notifications) {
      clientTmp["notifications"] = [];

      const notifId = uuidv4();
      clientTmp["notifications"].push({
        id: notifId,
        Object: "Bienvenu",
        Severite: EnumObjectNotif.INFO,
        Date: new Date().toISOString().split("T")[0],
        Provenance: "MY IRIS",
        isNew: true,
        message:
          "Bienvenu sur l'application My Iris\n\n Nous esperons que vous allez atteindre vos objectifs sur cette application",
      });
    }

    clientTmp["lastdateActif"] = new Date().toISOString().split("T")[0];
    baseIris.post(`/${clientTmp.id}/client`, { data: clientTmp });

    let app = {};
    app["goInAppAdmin"] = clientTmp.isAdmin;
    app["goInAppClient"] = !clientTmp.isAdmin;
    setParam({ ...param, ...app });
  };

  if (param.goInAppClient) {
    return <Redirect push to={`/client`} />;
  }

  if (param.goInAppAdmin) {
    return <Redirect push to={`/admin`} />;
  }

  return (
    <div className="connexionBox">
      <div className={classes.form}>
        <form className="connexion">
          <Typography style={style}>
            BIENVENUE <br />
            SUR <br />
            MY IRIS
          </Typography>

          <Button className={classes.button} onClick={submit}>
            <Avatar src={googleLogo} className={classes.avatar} />
            <Typography component="p" variant="h6" className={classes.text}>
              Connecter vous avec Google
            </Typography>
          </Button>
        </form>
      </div>

      <div
        className={classesBackgound.background}
        style={{ backgroundImage: "url(" + bgImage + ")" }}
      />
    </div>
  );
};

export default SignIn;
