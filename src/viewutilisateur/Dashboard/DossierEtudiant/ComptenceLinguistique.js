import { makeStyles, Typography } from "@material-ui/core";
import baseIris from "baseiris";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import UploadFile from "components/File/UploadFile";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { UserContext } from "context/userContextProvider";
import LinkFile, { sendFiles } from "gestionFichier";
import { notifAdminEvolutiondossier } from "GestionNotification/useNotification";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const styles = {
  root: {
    flexGrow: 1,
  },
};
const useStyles = makeStyles(styles);
const ComptenceLinguistique = ({setExpandedIEE,setDossierOk}) => {

  const {control, register, handleSubmit,clearErrors, formState: { errors , isValid ,isSubmitted }} = useForm();

  const { client} = useContext(UserContext);
  const classes = useStyles();
  const [competence_linguistique, setCompetence_linguistique] = useState({});
  const fileTestEtExamFrenchDatabase = React.useRef([]);
  const fileTestEtExamFrenchFileStore = React.useRef([]);

  const filePreuveDetudesFrenchDatabase = React.useRef([]);
  const filePreuveDetudesFrenchFileStore = React.useRef([]);

  const testExamEnglishDatabase = React.useRef([]);
  const testExamEnglishFileStore = React.useRef([]);

  useEffect(() => {
    setCompetence_linguistique(client?.competence_linguistique);
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const competence_linguistiqueClone = { ...client };
    competence_linguistiqueClone[name] = value;
    setCompetence_linguistique(competence_linguistiqueClone);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const clientUpdated = { ...client };

    const competence_linguistiqueClone = { ...competence_linguistique };
    const justifs = {};
    justifs["TestEtExamFrench"] = fileTestEtExamFrenchDatabase.current;
    justifs["TestExamEnglish"] = testExamEnglishDatabase.current;
    justifs["PreuveDetudesFrench"] = filePreuveDetudesFrenchDatabase.current;

    competence_linguistiqueClone[
      "justificatifs_competence_linguistique"
    ] = justifs;
    clientUpdated["competence_linguistique"] = competence_linguistiqueClone;
    clientUpdated["dossierOk"] = true;
    notifAdminEvolutiondossier(
      "Dossier Totalement Completé par le client",
      clientUpdated.nom
    );
    baseIris.post(`/${clientUpdated.id}/client`, { data: clientUpdated });

    /** Envoi des fichiers sur filestore */
    sendFiles(
      fileTestEtExamFrenchFileStore.current,
      "justificatifs_competence_linguistique_TestEtExamFrench"
    );

    /** Envoi des fichiers sur filestore */
    sendFiles(
      testExamEnglishFileStore.current,
      "justificatifs_competence_linguistique_TestExamEnglish"
    );

    /** Envoi des fichiers sur filestore */
    sendFiles(
      filePreuveDetudesFrenchFileStore.current,
      "justificatifs_competence_linguistique_PreuveDetudesFrench"
    );
    setExpandedIEE("verificationDossierOk")
    setDossierOk(true);
  };

  const uploadfileTestEtExamFrench = (filesDatabase, filesFileStore) => {
    fileTestEtExamFrenchDatabase.current = filesDatabase;
    fileTestEtExamFrenchFileStore.current = filesFileStore;
  };

  const uploadtestExamEnglish = (filesDatabase, filesFileStore) => {
    testExamEnglishDatabase.current = filesDatabase;
    testExamEnglishFileStore.current = filesFileStore;
  };

  const uploadfilePreuveDetudesFrench = (filesDatabase, filesFileStore) => {
    filePreuveDetudesFrenchDatabase.current = filesDatabase;
    filePreuveDetudesFrenchFileStore.current = filesFileStore;
  };

  const listLinkFile = (categorie) => {
    const justifs =
      competence_linguistique?.justificatifs_competence_linguistique;

    const justificatifs = justifs ? justifs[categorie] : null;

    if (justificatifs) {
      return Object.keys(justificatifs).map((item) => {
        if (!justificatifs[item]) {
          return "";
        }
        return (
          <li key={item}>
            <LinkFile
              item={item}
              nom={justificatifs[item]?.nom}
              nomCollection={
                "justificatifs_competence_linguistique_" + categorie
              }
            />
          </li>
        );
      });
    } else {
      return <a>{"Pour l'instant il y'a aucun justificatifs"}</a>;
    }
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>

      <Card>
        <CardBody>
          <GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={6} md={6}>
                <Typography>Mes tests et examens de français</Typography>
                Vous devez joindre au moins un justificatif pour chaque test
                déclaré
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <UploadFile upload={uploadfileTestEtExamFrench} />
                <br />
                {listLinkFile("TestEtExamFrench")}
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Typography>Mon niveau de français</Typography>
                {
                  "Si vous avez fait des études dans un pays ou la langue est le français veuillez mettre un justificatif(ex : attestation scolaire ) et remplir le formulaire"
                }
              </GridItem>

              <GridItem xs={12} sm={12} md={12}>
                <GridContainer>
                  <GridItem xs={12} sm={6} md={6}>
                    <CustomInput
                      name="etablissement"
                      labelText="Etablissement "
                      id="etablissement"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={competence_linguistique?.etablissement}
                      shrink={
                        competence_linguistique?.etablissement
                          ? true
                          : undefined
                      }
                      onChange={handleChange}

                      register={register}
                      errors={errors}
                      isValid = {isValid}
                      isSubmitted = {isSubmitted}
                      control={control}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={6} md={6}>
                    <CustomInput
                      name="ville_pays"
                      labelText="Ville/Pays"
                      id="ville_pays"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={competence_linguistique?.ville_pays}
                      shrink={
                        competence_linguistique?.ville_pays ? true : undefined
                      }
                      onChange={handleChange}

                      register={register}
                      errors={errors}
                      isValid = {isValid}
                      isSubmitted = {isSubmitted}
                      control={control}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={4} md={4}>
                    <CustomInput
                      name="volume_heure_de_francai"
                      labelText="Volume d'heures de cours de Français "
                      id="volume_heure_de_francai"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={competence_linguistique?.volume_heure_de_francai}
                      shrink={
                        competence_linguistique?.volume_heure_de_francai
                          ? true
                          : undefined
                      }
                      onChange={handleChange}

                      register={register}
                      errors={errors}
                      isValid = {isValid}
                      isSubmitted = {isSubmitted}
                      control={control}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={4} md={4}>
                    <CustomInput
                      name="sur_une_duree_de_francai"
                      labelText="Sur une durée de "
                      id="sur_une_duree_de_francai"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={competence_linguistique?.sur_une_duree_de_francai}
                      shrink={
                        competence_linguistique?.sur_une_duree_de_francai
                          ? true
                          : undefined
                      }
                      onChange={handleChange}

                      register={register}
                      errors={errors}
                      isValid = {isValid}
                      isSubmitted = {isSubmitted}
                      control={control}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={4} md={4}>
                    <CustomInput
                      name="niveau_francais_atteint"
                      labelText="Niveau atteint"
                      id="niveau_francais_atteint"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={competence_linguistique?.niveau_francais_atteint}
                      shrink={
                        competence_linguistique?.niveau_francais_atteint
                          ? true
                          : undefined
                      }
                      onChange={handleChange}
                      register={register}
                      errors={errors}
                      isValid = {isValid}
                      isSubmitted = {isSubmitted}
                      control={control}
                    />
                  </GridItem>
                </GridContainer>
              </GridItem>

              <GridItem xs={12} sm={12} md={12}>
                <br />
                <UploadFile upload={uploadfilePreuveDetudesFrench} />
                <br />
                {listLinkFile("PreuveDetudesFrench")}
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={6} md={6}>
                <br />
                <Typography>
                  {"Mon niveau d'anglais (et autres langues)"}
                </Typography>
                {
                  "Vous devez joindre au moins un justificatif pour cette partie déclaré"
                }
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <br />
                <UploadFile upload={uploadtestExamEnglish} />
                <br />
                {listLinkFile("TestExamEnglish")}
              </GridItem>
            </GridContainer>
          </GridContainer>
        </CardBody>
        <CardFooter>
          <div className={classes.root}>
            <Button
              variant="contained"
              color="info"
              component="span"
              type="submit"
            >
             VALIDER
            </Button>
          </div>
        </CardFooter>
      </Card>


      </form>
    </div>
  );
};

export default ComptenceLinguistique;
