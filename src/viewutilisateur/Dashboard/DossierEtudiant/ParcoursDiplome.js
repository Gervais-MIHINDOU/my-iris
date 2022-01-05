import { makeStyles, Typography } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import ClearIcon from "@material-ui/icons/Clear";
import baseIris from "baseiris";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import DialogFormation from "components/PopPup/DialogFormation";
import Table from "components/Table/Table.js";
import { UserContext } from "context/userContextProvider";
import LinkFile, { removeDoc, sendFiles } from "gestionFichier";
import * as React from "react";

const styles = {
  root: {
    flexGrow: 1,
  },
};

const useStyles = makeStyles(styles);

const ParcoursDiplome = () => {
  const { client, setClient } = React.useContext(UserContext);

  const filesFromFileStore = React.useRef([]);
  const filesFromDatabase = React.useRef({});

  const [formation, setFormation] = React.useState({});

  const [openDialog, setOpenDialog] = React.useState(false);
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpenDialog(true);
  };

  const ajouterFormation = (event) => {
    event.preventDefault();
    setOpenDialog(false);
    const formationClient = { ...formation };
    formationClient["justificatifs_formation"] = filesFromDatabase.current;

    if (!client?.formations) {
      client["formations"] = {};
    }

    client["formations"][formation.annee_scolaire] = formationClient;

    /** Modification du client */
    client["parcoursDiplomeOk"] = true;
    baseIris.post(`/${client.id}/client`, { data: client });
    /** Envoi des fichiers sur filestore */
    sendFiles(filesFromFileStore.current, "justificatifs_formation");

    /***Reinitialisation des fichiers */
    filesFromDatabase.current = {};
    filesFromFileStore.current = [];
    setClient({ ...client });
    setFormation({});
  };

  const annuler = (event) => {
    event.preventDefault();
    setOpenDialog(false);
    setFormation({});
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    formation[name] = value;
    setFormation(formation);
  };

  const deleteFormation = (event, annee) => {
    event.preventDefault();
    console.log("suppression de la formation");
    console.log(client["formations"][annee]);
    if (client["formations"][annee]?.justificatifs_formation) {
      suppressionFichierJustifsDeLaformation(client["formations"][annee]);
    }
    delete client["formations"][annee];
    baseIris.update(`/${client.id}/client`, { data: client });
    setClient({ ...client });
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
                <Button color="info" onClick={handleSubmit} fullWidth>
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
    const r = Object.keys(client?.formations)
      .filter(function (annee) {
        return (annee != null) & (client["formations"][annee] != null);
      })
      .map((annee) => {
        return itemFormation(client["formations"][annee]);
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
        handleChange={handleChange}
        formation={formation}
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
                tableData={client?.formations ? tabFormations() : []}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default ParcoursDiplome;
