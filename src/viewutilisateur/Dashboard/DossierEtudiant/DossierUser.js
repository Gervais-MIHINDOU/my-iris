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

const DossierUser = ({setExpandedIEE,setDossierOk}) => {
  const { client } = React.useContext(UserContext);
  const style = {
    "font-size": "15px",
    "font-weight": "420",
  };

  const [infoPersoOK, setInfoPersoOK] = React.useState();
  const [parcoursDiplomeOk, setParcoursDiplomeOk] = React.useState();


  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    console.log("changement de valeur")
    console.log("La valeur de panel est "+panel)
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
         expanded={expanded === 'first'}
         onChange={handleChange('first')}
        >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={style}>
            Ma situation personnelle actuelle
          </Typography>
        </AccordionSummary>
        <AccordionDetails >
          <InfoPerso 
            setInfoPersoOK= {setInfoPersoOK}
            setExpanded= {setExpanded} />
        </AccordionDetails>
      </Accordion>
      <Accordion 
         expanded={expanded === 'infoPersoOK'}
         onChange={handleChange('infoPersoOK')}
         disabled={client?.infoPersoOK ? false : !infoPersoOK }>

        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography style={style}>Mon parcours et mes diplômes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ParcoursDiplome
             setParcoursDiplomeOk= {setParcoursDiplomeOk} 
             setExpanded= {setExpanded} />
        </AccordionDetails>
      </Accordion>
      <Accordion 
          expanded={expanded === 'parcoursDiplomeOk'} 
          onChange={handleChange('parcoursDiplomeOk')}
          disabled={client?.parcoursDiplomeOk ? false : !parcoursDiplomeOk}>

        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography style={style}>Mes tests/ certificats de stage ou de travail</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ComptenceLinguistique
               setParcoursDiplomeOk= {setParcoursDiplomeOk}
               setExpandedIEE={setExpandedIEE} 
               setDossierOk={setDossierOk} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default DossierUser;
