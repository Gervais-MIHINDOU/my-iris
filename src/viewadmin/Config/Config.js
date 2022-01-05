// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import baseIris from "baseiris";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import { UserContext } from "context/userContextProvider";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

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

const Config = () => {
  const [dateDesuppression, setDateDesuppression] = useState();

  const handleChangeDate = (e) => {
    e.preventDefault();
    setDateDesuppression(e.target.value);
  };
  const classes = useStyles();

  const style = {
    "font-size": "17px",
    "font-weight": "500",
  };

  const deleteAllClient = (e, text) => {
    e.preventDefault();
    Swal.fire({
      title: "Cette action sera irreversible !!!! Etes vous sur ?",
      text: text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Annuler",
      confirmButtonText: "Oui, je confirme!",
    }).then((result) => {
      if (result.isConfirmed) {
        Object.keys(listUser)
          .filter((id) => !listUser[id].client.isAdmin)
          .map((id) => {
            baseIris.remove(`/${id}`);
          });
        Swal.fire("Tout les clients ont été supprimés !", "", "success");
      }
    });
  };

  const deleteAllClientByDate = (e, text) => {
    e.preventDefault();
    if (!dateDesuppression) {
      Swal.fire("Vous devez selectionné une date !", "", "error");
    } else {
      Swal.fire({
        title: "Cette action sera irreversible !!!! Etes vous sur ?",
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Annuler",
        confirmButtonText: "Oui, je confirme!",
      }).then((result) => {
        if (result.isConfirmed) {
          Object.keys(listUser)
            .filter(
              (id) =>
                !listUser[id].client.isAdmin &&
                new Date(listUser[id].client.dateInscription).getTime() <
                  new Date(dateDesuppression).getTime()
            )
            .map((id) => {
              baseIris.remove(`/${id}`);
            });
          Swal.fire(
            "Tout les clients inscrit avant la date " +
              dateDesuppression +
              " ont bien été supprimés !",
            "",
            "success"
          );
        }
      });
    }
  };

  const { admin } = React.useContext(UserContext);
  const [listUser, setListUser] = useState();

  useEffect(() => {
    baseIris.fetch(`/`, {}).then((response) => {
      setListUser({ ...listUser, ...response });
    });
  }, []);

  const updateSystemAdmin = (data, propertie, propertieBool) => {
    Object.keys(listUser)
      .filter((id) => listUser[id].client.isAdmin)
      .map((id) => {
        const adminNew = listUser[id].client;
        adminNew[propertie] = data;
        adminNew[propertieBool] = true;
        baseIris.post(`/${id}/client`, { data: adminNew });
      });
  };

  const formActionAdmin = (text, propertieToSet, choice, e) => {
    e.preventDefault();
    Swal.fire({
      title: text,
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Valider",
      cancelButtonText: "Annuler",
      showLoaderOnConfirm: true,
      preConfirm: (input) => {
        if (input) {
          updateSystemAdmin(input, choice, propertieToSet);
        } else {
          Swal.showValidationMessage(`Echec de la demande`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Action effectué !", "", "success");
      }
    });
  };
  const ButtonForm = ({
    messageButton,
    text,
    propertieToSet,
    success,
    choice,
  }) => {
    return (
      <Button
        color={success ? "info" : "success"}
        onClick={(e) => formActionAdmin(text, propertieToSet, choice, e)}
      >
        <Typography component="p" variant="h8">
          {messageButton}
        </Typography>
      </Button>
    );
  };
  ButtonForm.propTypes = {
    messageButton: PropTypes.string,
    text: PropTypes.string,
    propertieToSet: PropTypes.string,
    success: PropTypes.bool,
    choice: PropTypes.string,
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                {"CONFIGURATION SYSTEM de L'APPLICATION"}
              </h4>
              <p className={classes.cardCategoryWhite}>
                Vous pouvez modifier les valeurs system
              </p>
            </CardHeader>
            <br /> <br />
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <ButtonForm
                    messageButton={
                      admin?.montantUnitChoisiOK
                        ? admin?.montantUnitairePrestation
                          ? "Modifier le montant de la prestation en euro"
                          : "Montant de la prestation non Chosi"
                        : "Montant de la prestation choisi"
                    }
                    text={
                      admin?.montantUnitChoisiOK
                        ? "Vous etes sur le point de modifier le montant de la prestation"
                        : "Vous etes sur le point de confirmer le montant de la prestation"
                    }
                    propertieToSet={"montantUnitChoisiOK"}
                    success={admin?.montantUnitairePrestation}
                    choice={"montantUnitairePrestation"}
                  />
                  <br />
                  <Typography style={style}>
                    {admin?.montantUnitChoisiOK
                      ? "     Le montant unitaire de la prestation est de " +
                        admin.montantUnitairePrestation
                      : ""}
                  </Typography>
                </GridItem>
              </GridContainer>
              <br /> <br /> <br />
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <ButtonForm
                    messageButton={
                      admin?.numeroAdminChoisiOK
                        ? admin?.numeroAdmin
                          ? "Modifier le numero de telephone du system"
                          : "Numero de telephone non Choisi"
                        : "Numero de telephone choisi"
                    }
                    text={
                      admin?.numeroAdminChoisiOK
                        ? "Vous etes sur le point de modifier le numéro de telephone du system MY IRIS"
                        : "Vous etes sur le point de confirmer le numéro de telephone du system MY IRIS"
                    }
                    propertieToSet={"numeroAdminChoisiOK"}
                    success={admin?.numeroAdmin}
                    choice={"numeroAdmin"}
                  />
                  <br />
                  <Typography style={style}>
                    {admin?.numeroAdminChoisiOK
                      ? "     Le numero System de l'application est : " +
                        admin.numeroAdmin
                      : ""}
                  </Typography>
                </GridItem>
              </GridContainer>
              <br /> <br /> <br />
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <ButtonForm
                    messageButton={
                      admin?.emailAdminChoisiOK
                        ? admin?.emailAdmin
                          ? "Modifier le mail de telephone du system"
                          : "L'email non Choisi"
                        : "Le mail choisi"
                    }
                    text={
                      admin?.emailAdminChoisiOK
                        ? "Vous etes sur le point de modifier le mail du system MY IRIS"
                        : "Vous etes sur le point de confirmer le mail du system MY IRIS"
                    }
                    propertieToSet={"emailAdminChoisiOK"}
                    success={admin?.emailAdmin}
                    choice={"emailAdmin"}
                  />
                  <br />
                  <Typography style={style}>
                    {admin?.emailAdminChoisiOK
                      ? "     Le mail System de l'application est : " +
                        admin.emailAdmin
                      : ""}
                  </Typography>
                </GridItem>
              </GridContainer>
              <br /> <br /> <br />
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Typography component="p" variant="h7">
                    {"Reinitialisé tout le system"}
                  </Typography>
                  <br />
                  <Button
                    color={"warning"}
                    onClick={(e) =>
                      deleteAllClient(
                        e,
                        "Vous etes sur le point de supprimer tout les clients de votre application à l'exception des admins"
                      )
                    }
                  >
                    <Typography component="p" variant="h8">
                      {"Reinitialisé le system depuis la création"}
                    </Typography>
                  </Button>

                  <br />
                </GridItem>
              </GridContainer>
              <br /> <br />
              <GridContainer>
                <GridItem xs={12} sm={6} md={6}>
                  <Typography component="p" variant="h7">
                    {"Reinitialisé le system à une date précise"}
                  </Typography>
                  <br />
                  <TextField
                    id="date"
                    label="Date Limite"
                    type="date"
                    defaultValue="2017-05-24"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={handleChangeDate}
                  />
                  <br />
                  <br />
                  <Button
                    color={"warning"}
                    onClick={(e) =>
                      deleteAllClientByDate(
                        e,
                        "Vous etes sur le point de supprimer tout les clients anterieure à la date " +
                          dateDesuppression
                      )
                    }
                  >
                    <Typography component="p" variant="h8">
                      {"Reinitialisé temporellement le system"}
                    </Typography>
                  </Button>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};
export default Config;
