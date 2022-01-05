import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import baseIris from "baseiris";
import Button from "components/CustomButtons/Button.js";
import { UserContext } from "context/userContextProvider";
import { notifClientEvolutiondossier } from "GestionNotification/useNotification";
import { notifAdminEvolutiondossier } from "GestionNotification/useNotification";
import PropTypes from "prop-types";
import * as React from "react";
import Swal from "sweetalert2";
import DetailGarant from "./DetailGarant";
import DocumentsGarant from "./DocumentsGarant";

const ProcedureVisa = () => {
  const { client, setClient, isAdmin } = React.useContext(UserContext);
  const style = {
    "font-size": "17px",
    "font-weight": "500",
  };

  const rendezVousOK = () => {
    if (client?.verificationGarantOK) {
      return client["rendezVousVisa"]
        ? "Les documents du garant ainsi que ses informations ont bien été validé : " +
            client["rendezVousVisa"]
        : "Les documents du garant ainsi que ses informations ont bien été validé";
    } else {
      return isAdmin
        ? "En attente de votre confirmation"
        : "En attente de Validation du dossier de votre garant";
    }
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
          <Typography style={style}>{"1 - Info Garant"}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DetailGarant />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography style={style}>{"2 - Documents du Garant"}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DocumentsGarant />
        </AccordionDetails>
      </Accordion>

      <Accordion disabled={!client?.logementOK}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography style={style}>{"3 - Verification du dossier"}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {isAdmin ? (
            <ButtonForm
              messageButton={
                client?.verificationGarantOK
                  ? client?.verificationGarantOK
                    ? "Modifier la date de rendez vous VISA"
                    : "Rendez vous non Chosi"
                  : "Rendez vous choisi"
              }
              text={
                client?.verificationGarantOK
                  ? "Vous etes sur le point de saisir une date de rendez-vous pour une demande VISA"
                  : "Vous etes sur le point de confirmer une date de rendez vous pour une demande VISA"
              }
              propertieToSet={"verificationGarantOK"}
              success={client?.rendezVousVisa}
              choice={"rendezVousVisa"}
            />
          ) : (
            ""
          )}

          {"     " + rendezVousOK()}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default ProcedureVisa;
