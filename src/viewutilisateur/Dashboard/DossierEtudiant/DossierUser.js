import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { UserContext } from "context/userContextProvider";
import * as React from "react";
import ComptenceLinguistique from "./ComptenceLinguistique";
import InfoPerso from "./InfoPerso";
import ParcoursDiplome from "./ParcoursDiplome";

const DossierUser = () => {
  const { client } = React.useContext(UserContext);
  const style = {
    "font-size": "15px",
    "font-weight": "420",
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
            Ma situation personnelle actuelle
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <InfoPerso />
        </AccordionDetails>
      </Accordion>
      <Accordion disabled={!client?.infoPersoOK}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography style={style}>Mon parcours et mes diplômes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ParcoursDiplome />
        </AccordionDetails>
      </Accordion>
      <Accordion disabled={!client?.parcoursDiplomeOk}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography style={style}>Mes compétences linguistiques</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ComptenceLinguistique />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default DossierUser;
