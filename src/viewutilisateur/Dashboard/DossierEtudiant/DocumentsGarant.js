import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import * as React from "react";
import DocumentGarant from "./DocumentGarant";

const DocumentsGarant = () => {
  const style = {
    "font-size": "17px",
    "font-weight": "500",
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={style}>{"1 - Bulletins de paie "}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DocumentGarant nom={"bulletin_de_paie"} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography style={style}>{"2 - Contrat de travail"}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DocumentGarant nom={"contrat_de_travail"} />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography style={style}>{"3 - Justificatifs logement"}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DocumentGarant nom={"justificatif_logement"} />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography style={style}>{"4 - Relevé bancaire"}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DocumentGarant nom={"releve_bancaire"} />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography style={style}>
            {"5 - Attestation sur l'honneur"}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DocumentGarant nom={"attestation_sur_lhonneur"} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default DocumentsGarant;
