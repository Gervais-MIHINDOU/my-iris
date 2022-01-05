import InputLabel from "@material-ui/core/InputLabel";
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
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
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

const UserProfile = ({ id }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [client, setClient] = useState({});
  const [goToLogin, setgoToLogin] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    initUser();
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const clientUpdated = { ...client };
    clientUpdated[name] = value;
    setClient(clientUpdated);
  };

  const initUser = async () => {
    const utilisateur = await baseIris.fetch(`/${id}`, {});
    const myclient = utilisateur.client;
    setClient({ ...client, ...myclient });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    baseIris.update(`/${client.id}/client`, { data: client });
  };

  const handleConfirme = (event) => {
    event.preventDefault();
    setOpenDialog(true);
  };

  const confirmeDelete = () => {
    setOpenDialog(false);
    baseIris.remove(`/${client.id}`);
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
                    value={client?.nom}
                    shrink={client?.nom ? true : undefined}
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
                    value={client?.email}
                    shrink={client?.email ? true : undefined}
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
                    value={client?.prenom}
                    shrink={client?.prenom ? true : undefined}
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
                    value={client?.phone}
                    shrink={client?.phone ? true : undefined}
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
                    value={client?.ville}
                    shrink={client?.ville ? true : undefined}
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
                    value={client?.pays}
                    shrink={client?.pays ? true : undefined}
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
                    value={client?.bp}
                    shrink={client?.bp ? true : undefined}
                    onChange={handleChange}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>
                    Bref résumé de ce que vous souhaitez faire
                  </InputLabel>
                  <CustomInput
                    name="souhait"
                    labelText="Vos motivations"
                    id="about-me"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                    }}
                    value={client?.souhait}
                    shrink={client?.souhait ? true : undefined}
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
                <img src={client?.photo} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile style={{ "text-align": "left" }}>
              <span className={classes.cardCategory}>Nom : {client?.nom}</span>
              <br />
              {client?.prenom ? (
                <Fragment>
                  <span className={classes.cardTitle}>
                    Prenom : {client?.prenom}
                  </span>
                  <br />
                </Fragment>
              ) : null}

              {client?.email ? (
                <Fragment>
                  <span className={classes.cardTitle}>
                    Email : {client?.email}
                  </span>
                  <br />
                </Fragment>
              ) : null}

              {client?.phone ? (
                <Fragment>
                  <span className={classes.cardTitle}>
                    Telephone : {client?.phone}
                  </span>
                  <br />
                </Fragment>
              ) : null}

              {client?.pays ? (
                <Fragment>
                  <span className={classes.cardTitle}>
                    Pays : {client?.pays}
                  </span>
                  <br />
                </Fragment>
              ) : null}

              {client?.ville ? (
                <Fragment>
                  <span className={classes.cardTitle}>
                    Ville : {client?.ville}
                  </span>
                  <br />
                </Fragment>
              ) : null}

              {client?.bpQuartier ? (
                <Fragment>
                  <span className={classes.cardTitle}>
                    Boite Postale ou quartier : {client?.bpQuartier}
                  </span>
                  <br />
                </Fragment>
              ) : null}

              {client?.souhait ? (
                <Fragment>
                  <p className={classes.description}>{client?.souhait}</p>
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

export default UserProfile;
UserProfile.propTypes = {
  id: PropTypes.string,
};
