import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import etudes_etranger from "assets/img/etudes_etranger.jpg";
import orientaion_scolaire from "assets/img/orientaion_scolaire.jpg";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import { UserContext } from "context/userContextProvider";
import PropTypes from "prop-types";
import React, { Fragment, useContext, useState } from "react";
import InscriptionEtudeEtranger from "viewutilisateur/Dashboard/InscriptionEtudeEtranger";
import OrientationScolaire from "viewutilisateur/Dashboard/OrientationScolaire";

const DetailClient = () => {
  const { client } = useContext(UserContext);
  const [isEtudeEtranger, setEtudeEtranger] = useState();
  const [isOrientationScolaire, setOrientationScolaire] = useState();

  const handleEtudeEtranger = (event) => {
    event.preventDefault;
    setEtudeEtranger(true);
    setOrientationScolaire(false);
  };

  const handleOrientationScolaire = (event) => {
    event.preventDefault;
    setOrientationScolaire(true);
    setEtudeEtranger(false);
  };

  const style = {
    "font-size": "22px",
    "font-weight": "500",
  };
  const CardIris = ({ titre, image, alt, handleSubmit }) => {
    return (
      <Card>
        <CardActionArea>
          <CardMedia component="img" height="320" image={image} alt={alt} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {titre}
            </Typography>
            <Button color={"info"} onClick={handleSubmit}>
              Suivre le dossier
            </Button>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  };

  return (
    <Fragment>
      <div hidden={isEtudeEtranger || isOrientationScolaire ? "hidden" : ""}>
        <Typography gutterBottom variant="h5" component="div" align="center">
          {"Suivi du dossier de " + client.nom}
        </Typography>
        <br />
        <GridContainer>
          <GridItem xs={12} sm={6} md={6}>
            <CardIris
              alt={"orientation scolaire"}
              image={orientaion_scolaire}
              titre={"Orientation scolaire"}
              handleSubmit={handleOrientationScolaire}
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <CardIris
              alt={"etude à l'étranger"}
              image={etudes_etranger}
              titre={"Etudes à l'étranger"}
              handleSubmit={handleEtudeEtranger}
            />
          </GridItem>
        </GridContainer>
      </div>

      <div hidden={isEtudeEtranger ? "" : "hidden"}>
        <Typography gutterBottom component="div" align="center" style={style}>
          {"Suivi du dossier etude à l'étranger de " + client.nom}
        </Typography>
        <br />
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <InscriptionEtudeEtranger />
          </GridItem>
        </GridContainer>
      </div>

      <div hidden={isOrientationScolaire ? "" : "hidden"}>
        <Typography gutterBottom component="div" align="center" style={style}>
          {"Suivi du dossier Orientation scolaire de " + client.nom}
        </Typography>
        <br />
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <OrientationScolaire />
          </GridItem>
        </GridContainer>
      </div>
    </Fragment>
  );
};

export default DetailClient;

DetailClient.propTypes = {
  titre: PropTypes.string,
  image: PropTypes.string,
  alt: PropTypes.string,
  handleSubmit: PropTypes.func,
};
