import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import baseIris from "baseiris";
import { UserContext } from "context/userContextProvider";
import * as React from "react";
import { Fragment } from "react";
import DossierUser from "./DossierEtudiant/DossierUser";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import Button from "components/CustomButtons/Button.js";
import ProcedureVisa from "./DossierEtudiant/ProcedureVisa";
import { notifAdminEvolutiondossier } from "GestionNotification/useNotification";
import { notifClientEvolutiondossier } from "GestionNotification/useNotification";

const InscriptionEtudeEtranger = () => {
  const { client, setClient, isAdmin } = React.useContext(UserContext);

  const irisVerifieDossier = () => {
    if (client?.verificationDossierOk) {
      if (isAdmin) {
        return client?.payementOk
          ? "Vous avez validé le dossier du client !"
          : "Vous avez validé le dossier du client. Il peut maintenant passer au paiement.";
      }
      return client?.payementOk
        ? "Votre Dossier est complet et a été validé."
        : "Votre Dossier est complet et a été validé. Vous pouvez procéder au paiement.";
    } else {
      if (isAdmin) {
        return "Le dossier est en attente de votre validation!";
      }
      return "En attente de validation de la part d'iris";
    }
  };

  const payementDossier = () => {
    if (client?.payementOk) {
      return "Le paiement a bien été effectué";
    } else {
      if (isAdmin) {
        return "En attente du signalement du paiement";
      }
      return "En attente de votre paiement";
    }
  };

  const choixEtablissement = () => {
    if (client?.etablissementOk) {
      return "L'établissment choisi est : " + client["EtablissementChoisi"];
    } else {
      return isAdmin
        ? "En attente de votre confirmation"
        : "En attente de confirmation de votre etablissement";
    }
  };

  const choixLogement = () => {
    if (client?.logementOK) {
      return "Le logement choisi se situe au : " + client["LogementChoisi"];
    } else {
      return isAdmin
        ? "En attente de votre confirmation"
        : "En attente de confirmation du choix de votre logement";
    }
  };

  const style = {
    "font-size": "17px",
    "font-weight": "500",
  };

  const getStyleMessage = (ok) => {
    if (ok) {
      return { color: "#078041", "font-size": "15px", "font-weight": "550" };
    } else {
      return { color: "#EB2815", "font-size": "15px", "font-weight": "550" };
    }
  };

  const actionAdmin = (text, propertieToSet, e) => {
    e.preventDefault();
    Swal.fire({
      title: "Etes vous sur ?",
      text: text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Annuler",
      confirmButtonText: "Oui, je confirme!",
    }).then((result) => {
      if (result.isConfirmed) {
        client[propertieToSet] = !client[propertieToSet];
        notifAdminEvolutiondossier(propertieToSet, client.nom);
        notifClientEvolutiondossier(client, propertieToSet);
        baseIris.post(`/${client.id}/client`, { data: client });
        Swal.fire("Action effectué !", "", "success");
        setClient({ ...client });
      }
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
          client[propertieToSet] = true;
          client[choice] = input;
          notifAdminEvolutiondossier(propertieToSet, client.nom);
          notifClientEvolutiondossier(client, propertieToSet);
          baseIris.post(`/${client.id}/client`, { data: client });
          setClient({ ...client });
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
  const ButtonAction = ({ messageButton, text, propertieToSet, success }) => {
    return (
      <Button
        color={success ? "warning" : "success"}
        onClick={(e) => actionAdmin(text, propertieToSet, e)}
      >
        <Typography component="p" variant="h8">
          {messageButton}
        </Typography>
      </Button>
    );
  };
  ButtonAction.propTypes = {
    messageButton: PropTypes.string,
    text: PropTypes.string,
    propertieToSet: PropTypes.string,
    success: PropTypes.bool,
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
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={style}>
            {isAdmin
              ? "1 - Saisi du dossier du client " + client.nom
              : "1 - Je saisis mon dossier"}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DossierUser />
        </AccordionDetails>
      </Accordion>
      <Accordion disabled={!client?.dossierOk}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography style={style}>
            {isAdmin
              ? "2 - Validation du dossier"
              : "2 - Iris vérifie mon dossier"}{" "}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant="h10"
            style={getStyleMessage(client?.verificationDossierOk)}
          >
            <Fragment>
              {isAdmin ? (
                <ButtonAction
                  messageButton={
                    client?.verificationDossierOk
                      ? "Devalider le dossier"
                      : "Valider le dossier"
                  }
                  text={
                    client?.verificationDossierOk
                      ? "Vous etes sur le point de Devalider le dossier"
                      : "Vous etes sur le point de Valider le dossier"
                  }
                  propertieToSet={"verificationDossierOk"}
                  success={client?.verificationDossierOk}
                />
              ) : (
                ""
              )}

              {"  " + irisVerifieDossier()}
            </Fragment>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled={!client?.verificationDossierOk}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography style={style}>3 - Paiement</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h10" style={getStyleMessage(client?.payementOk)}>
            <Fragment>
              {isAdmin ? (
                <ButtonAction
                  messageButton={
                    client?.payementOk ? "Non Effectué" : "Effectué"
                  }
                  text={
                    client?.payementOk
                      ? "Vous etes sur le point dévalider le paiement"
                      : "Vous etes sur le point de Valider le paiement"
                  }
                  propertieToSet={"payementOk"}
                  success={client?.payementOk}
                />
              ) : (
                ""
              )}

              {"  " + payementDossier()}
            </Fragment>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion disabled={!client?.payementOk}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel4a-header"
        >
          <Typography style={style}>4 - Etablissement choisi</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant="h10"
            style={getStyleMessage(client?.etablissementOk)}
          >
            <Fragment>
              {isAdmin ? (
                <ButtonForm
                  messageButton={
                    client?.etablissementOk
                      ? client?.EtablissementChoisi
                        ? "Modifier l'établissment"
                        : "Etablissement non Chosi"
                      : "Etablissement choisi"
                  }
                  text={
                    client?.etablissementOk
                      ? "Vous etes sur le point de modifier un établissement choisie"
                      : "Vous etes sur le point de confirmer une école choisie"
                  }
                  propertieToSet={"etablissementOk"}
                  success={client?.EtablissementChoisi}
                  choice={"EtablissementChoisi"}
                />
              ) : (
                ""
              )}

              {"  " + choixEtablissement()}
            </Fragment>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion disabled={!client?.etablissementOk}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel5a-header"
        >
          <Typography style={style}>5 - Logement choisi </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h10" style={getStyleMessage(client?.logementOK)}>
            <Fragment>
              {isAdmin ? (
                <ButtonForm
                  messageButton={
                    client?.logementOK
                      ? client?.LogementChoisi
                        ? "Modifier le logement"
                        : "Logement non Chosi"
                      : "Logement choisi"
                  }
                  text={
                    client?.logementOK
                      ? "Vous etes sur le point de modifier le logement choisie"
                      : "Vous etes sur le point de confirmer un logement choisie"
                  }
                  propertieToSet={"logementOK"}
                  success={client?.LogementChoisi}
                  choice={"LogementChoisi"}
                />
              ) : (
                ""
              )}

              {"  " + choixLogement()}
            </Fragment>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion disabled={!client?.logementOK}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6a-content"
          id="panel5a-header"
        >
          <Typography style={style}>6 - Procedure VISA </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <ProcedureVisa />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default InscriptionEtudeEtranger;
