// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import baseIris from "baseiris";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import Alerte from "components/PopPup/Alerte";
import { UserContext } from "context/userContextProvider";
import React, { Fragment, useContext, useState } from "react";
import { Redirect } from "react-router-dom";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

const AdminProfile = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [goToLogin, setgoToLogin] = useState(false);
  const classes = useStyles();

  const { admin, setAdmin } = useContext(UserContext);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    admin[name] = value;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    baseIris.update(`/${admin.id}/client`, { data: admin });
    setAdmin({ ...admin });
  };

  const handleConfirme = (event) => {
    event.preventDefault();
    setOpenDialog(true);
  };

  const confirmeDelete = () => {
    setOpenDialog(false);
    baseIris.remove(`/${admin.id}`);
    setgoToLogin(true);
  };

  const laisseTomber = () => {
    setOpenDialog(false);
  };

  if (goToLogin) {
    return <Redirect push to={`/login`} />;
  }

  return (
    <div>
      <Alerte
        open={openDialog}
        message={
          "En supprimant votre compte , vous perdrez vos donneées definitivement"
        }
        title="Suppression definitive de votre compte "
        confirmeDelete={confirmeDelete}
        laisseTomber={laisseTomber}
      />
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Modifier mon profil</h4>
              <p className={classes.cardCategoryWhite}>Completer mon profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="NOM"
                    id="nom"
                    name="nom"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    value={admin?.nom}
                    shrink={admin?.nom ? true : undefined}
                    onChange={handleChange}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    name="email"
                    labelText="Email"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    value={admin?.email}
                    shrink={admin?.email ? true : undefined}
                    onChange={handleChange}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    name="prenom"
                    labelText="Prenom"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    value={admin?.prenom}
                    shrink={admin?.prenom ? true : undefined}
                    onChange={handleChange}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    name="phone"
                    labelText="Numéro de telephone"
                    id="last-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    value={admin?.phone}
                    shrink={admin?.phone ? true : undefined}
                    onChange={handleChange}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    name="ville"
                    labelText="Ville"
                    id="city"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    value={admin?.ville}
                    shrink={admin?.ville ? true : undefined}
                    onChange={handleChange}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    name="pays"
                    labelText="Pays"
                    id="country"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    value={admin?.pays}
                    shrink={admin?.pays ? true : undefined}
                    onChange={handleChange}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    name="bp"
                    labelText="Code postal ou quartier"
                    id="postal-code"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    value={admin?.bp}
                    shrink={admin?.bp ? true : undefined}
                    onChange={handleChange}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={handleSubmit}>
                Je modifie mon profile
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={admin?.photo} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile style={{ "text-align": "left" }}>
              <span className={classes.cardCategory}>Nom : {admin?.nom}</span>
              <br />
              {admin?.prenom ? (
                <Fragment>
                  <span className={classes.cardTitle}>
                    Prenom : {admin?.prenom}
                  </span>
                  <br />
                </Fragment>
              ) : null}

              {admin?.email ? (
                <Fragment>
                  <span className={classes.cardTitle}>
                    Email : {admin?.email}
                  </span>
                  <br />
                </Fragment>
              ) : null}

              {admin?.phone ? (
                <Fragment>
                  <span className={classes.cardTitle}>
                    Telephone : {admin?.phone}
                  </span>
                  <br />
                </Fragment>
              ) : null}

              {admin?.pays ? (
                <Fragment>
                  <span className={classes.cardTitle}>
                    Pays : {admin?.pays}
                  </span>
                  <br />
                </Fragment>
              ) : null}

              {admin?.ville ? (
                <Fragment>
                  <span className={classes.cardTitle}>
                    Ville : {admin?.ville}
                  </span>
                  <br />
                </Fragment>
              ) : null}

              {admin?.bpQuartier ? (
                <Fragment>
                  <span className={classes.cardTitle}>
                    Boite Postale ou quartier : {admin?.bpQuartier}
                  </span>
                  <br />
                </Fragment>
              ) : null}
              <br />
              <br />
              <Button color="danger" onClick={handleConfirme} round>
                Supprimer mon compte
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default AdminProfile;
