import { makeStyles, Typography } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import ClearIcon from "@material-ui/icons/Clear";
import baseIris from "baseiris";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import DialogFormation from "components/PopPup/DialogFormation";
import Table from "components/Table/Table.js";
import { UserContext } from "context/userContextProvider";
import LinkFile, { removeDoc, sendFiles } from "gestionFichier";
import * as React from "react";
import Swal from "sweetalert2";

const styles = {
  root: {
    flexGrow: 1,
  },
};

const useStyles = makeStyles(styles);

const ParcoursDiplome = ({setParcoursDiplomeOk, setExpanded}) => {
  const [ utilisateur, setUtilisateur ] =  React.useState({});
  const { client} = React.useContext(UserContext);
  
  const setClientFetch = async () => {
    const user = await baseIris.fetch(`/${client.id}`, {});
    setUtilisateur({ ...utilisateur, ...user.client });
  };

  React.useEffect( () => {
    console.log("RAFFRAICHISSEMENT")
    setClientFetch()
  }, []);



  const [load, setload] = React.useState();

  const filesFromFileStore = React.useRef([]);
  const filesFromDatabase = React.useRef({});
  const [openDialog, setOpenDialog] = React.useState(false);
  const classes = useStyles();

  const handleAjoutFormation = (event) => {
    event.preventDefault();
    setOpenDialog(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let size = 0;
    if(utilisateur?.formations){
       size = Object.keys(utilisateur.formations).length;
    }
    if ( size == 3){
      setParcoursDiplomeOk(true);
      setExpanded("parcoursDiplomeOk")
      utilisateur["parcoursDiplomeOk"] = true;
      baseIris.post(`/${utilisateur.id}/utilisateur`, { data: utilisateur });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Il faut obligatoirement 3 formations pour passer au suivant',
        text: 'Vous avez actuellement  que '+ size +' formation(s)' 
      })

    }
  }

  const ajouterFormation = (event) => {
    console.log(event)
    setOpenDialog(false);    
    event["justificatifs_formation"] = filesFromDatabase.current;

    if (!utilisateur?.formations) {
      utilisateur["formations"] = {};
    }

    utilisateur["formations"][event.annee_scolaire] = event;

    /** Modification du utilisateur */
    baseIris.update(`/${utilisateur.id}/client`, { data: utilisateur });

    /** Envoi des fichiers sur filestore */
    sendFiles(filesFromFileStore.current, "justificatifs_formation");

    /***Reinitialisation des fichiers */
    filesFromDatabase.current = {};
    filesFromFileStore.current = [];
    setUtilisateur({...utilisateur})
  };

  const annuler = (event) => {
    event.preventDefault();
    setOpenDialog(false);
    filesFromDatabase.current = {};
    filesFromFileStore.current = [];
  };

  const deleteFormation = (event, annee) => {
    event.preventDefault();
    console.log("suppression de la formation");
    console.log(utilisateur["formations"][annee]);
    if (utilisateur["formations"][annee]?.justificatifs_formation) {
      suppressionFichierJustifsDeLaformation(utilisateur["formations"][annee]);
    }
    delete utilisateur["formations"][annee];
    baseIris.update(`/${utilisateur.id}/client`, { data: utilisateur });
    setUtilisateur({...utilisateur})
  };

  const suppressionFichierJustifsDeLaformation = (formation) => {
    Object.keys(formation["justificatifs_formation"]).map((id) => {
      removeDoc("justificatifs_formation" + "/" + id);
    });
  };

  const upload = (filesDatabase, filesFileStore) => {
    filesFromDatabase.current = filesDatabase;
    filesFromFileStore.current = filesFileStore;
  };

  const Option = () => {
    return (
      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <Typography variant="h7" component="div" align="center">
            Votre parcours doit comporter les 3 dernières années scolaires et
            activités à représentées par au moins un justificatif.
          </Typography>
        </GridItem>

        <GridItem xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Button color="info" onClick={handleAjoutFormation} fullWidth>
                  AJOUTER UNE FORMATION
                </Button>
              </GridItem>
            </GridContainer>
          </FormControl>
        </GridItem>
      </GridContainer>
    );
  };

  const itemFormation = (formation) => {
    const justificatifs = formation["justificatifs_formation"];

    const a = [
      formation.annee_scolaire,
      formation.niveau,
      formation.etablissement,
      <ul key={formation.annee_scolaire}>{getJustifs(justificatifs)}</ul>,
      <ClearIcon
        color="secondary"
        onClick={(e) => deleteFormation(e, formation.annee_scolaire)}
        key={formation.annee_scolaire}
      />,
    ];
    return a;
  };

  const getJustifs = (justificatifs) => {
    if (!justificatifs) {
      return "";
    }
    return Object.keys(justificatifs).map((item) => {
      if (!justificatifs[item]) {
        return "";
      }
      return (
        <li key={item}>
          <LinkFile
            item={item}
            nom={justificatifs[item]?.nom}
            nomCollection={"justificatifs_formation"}
          />
        </li>
      );
    });
  };

  const tabFormations = () => {
    const r = Object.keys(utilisateur?.formations)
      .filter(function (annee) {
        return (annee != null) & (utilisateur["formations"][annee] != null);
      })
      .map((annee) => {
        return itemFormation(utilisateur["formations"][annee]);
      });
    return r;
  };

  return (
    <div className={classes.root}>
      <DialogFormation
        open={openDialog}
        title="Ajout d'une formation"
        ajouterFormation={ajouterFormation}
        annuler={annuler}
        upload={upload}
      />
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardBody>
              <Option />
              <Table
                tableHeaderColor="primary"
                tableHead={[
                  "Année",
                  "Niveau d'études",
                  "Etablissement",
                  "Justificatifs",
                ]}
                tableData={utilisateur?.formations ? tabFormations() : []}
              />
            </CardBody>
            <CardFooter>
            <Button color="info" onClick={handleSubmit}>
              Suivant
            </Button>
          </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default ParcoursDiplome;
