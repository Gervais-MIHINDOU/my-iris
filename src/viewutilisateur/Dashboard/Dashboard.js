// @material-ui/core
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
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import InscriptionEtudeEtranger from "./InscriptionEtudeEtranger";
import OrientationScolaire from "./OrientationScolaire";

const Dashboard = () => {
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
              Creer un dossier
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
          {"Quel dossier souhaitez vous créer ?"}
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
          {
            "Pour finaliser votre inscription veuillez saisir toutes les infromations ci dessous. Pour passer à l'étape suivante il faut valider l'étape précedente !"
          }
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
          {
            "Veuillez saisir les infromations relative pour l'orientation scolaire  de votre enfant étape par étape! Pour qu'iris verifie son dossier"
          }
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

export default Dashboard;

Dashboard.propTypes = {
  titre: PropTypes.string,
  image: PropTypes.string,
  alt: PropTypes.string,
  handleSubmit: PropTypes.func,
  id: PropTypes.string,
};
