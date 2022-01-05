import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { UserContext } from "context/userContextProvider";
import PropTypes from "prop-types";
import * as React from "react";
import ChoixPro from "./DossierEleve/ChoixPro";
import InfoEleve from "./DossierEleve/InfoEleve";
import ParcoursDiplome from "./DossierEtudiant/ParcoursDiplome";
import Button from "components/CustomButtons/Button.js";
import Swal from "sweetalert2";
import baseIris from "baseiris";
import { Fragment } from "react";

const OrientationScolaire = () => {
  const { client, isAdmin, setClient } = React.useContext(UserContext);
  const payementDossier = () => {
    if (client?.payementOrientationScolaireOk) {
      return "Le paiement a bien été effectué";
    } else {
      if (isAdmin) {
        return "En attente du signalement du paiement";
      }
      return "En attente de votre paiement";
    }
  };

  const irisVerifieDossier = () => {
    if (client?.verificationDossierScolaireOk) {
      if (isAdmin) {
        return client?.payementOrientationScolaireOk
          ? "Vous avez validé le dossier du client!"
          : "Vous avez validé le dossier du client. Il peut maintenant passer au paiement.";
      }
      return client?.payementOrientationScolaireOk
        ? "Votre Dossier est complet et a été validé."
        : "Votre Dossier est complet et a été validé. Vous pouvez procéder au paiement.";
    } else {
      if (isAdmin) {
        return "Le dossier est en attente de votre validation!";
      }
      return "En attente de validation de la part d'iris";
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
        baseIris.post(`/${client.id}/client`, { data: client });
        Swal.fire("Action effectué !", "", "success");
        setClient({ ...client });
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

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={style}>{"1 - Information de l'élève"}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <InfoEleve />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography style={style}>{"2 - Parcours Scolaire"}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ParcoursDiplome />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography style={style}>{"3 - Choix professionel"}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ChoixPro />
        </AccordionDetails>
      </Accordion>

      <Accordion
        disabled={
          !client?.dossierOk ||
          !client?.parcoursDiplomeOk ||
          !client?.choixProOK
        }
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography style={style}>
            {isAdmin
              ? "2 - Validation du dossier"
              : "2 - Iris vérifie mon dossier"}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant="h10"
            style={getStyleMessage(client?.verificationDossierScolaireOk)}
          >
            <Fragment>
              {isAdmin ? (
                <ButtonAction
                  messageButton={
                    client?.verificationDossierScolaireOk
                      ? "Devalider le dossier"
                      : "Valider le dossier"
                  }
                  text={
                    client?.verificationDossierScolaireOk
                      ? "Vous etes sur le point de Devalider le dossier"
                      : "Vous etes sur le point de Valider le dossier"
                  }
                  propertieToSet={"verificationDossierScolaireOk"}
                  success={client?.verificationDossierScolaireOk}
                />
              ) : (
                ""
              )}

              {"  " + irisVerifieDossier()}
            </Fragment>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion disabled={!client?.verificationDossierScolaireOk}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography style={style}>{"4 - Paiement"}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant="h10"
            style={getStyleMessage(client?.payementOrientationScolaireOk)}
          >
            <Fragment>
              {isAdmin ? (
                <ButtonAction
                  messageButton={
                    client?.payementOrientationScolaireOk
                      ? "Non Effectué"
                      : "Effectué"
                  }
                  text={
                    client?.payementOrientationScolaireOk
                      ? "Vous etes sur le point dévalider le paiement"
                      : "Vous etes sur le point de Valider le paiement"
                  }
                  propertieToSet={"payementOrientationScolaireOk"}
                  success={client?.payementOrientationScolaireOk}
                />
              ) : (
                ""
              )}

              {"  " + payementDossier()}
            </Fragment>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default OrientationScolaire;
