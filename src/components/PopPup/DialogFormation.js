import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import UploadFile from "components/File/UploadFile";
import GridContainer from "components/Grid/GridContainer.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";

const DialogFormation = (props) => {
  const {control,handleSubmit, formState: { errors}} = useForm();

  const {
    open,
    title,
    ajouterFormation,
    annuler,
    upload,
  } = props;

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

  const CreerFormation = () => {
   

    const classes = useStyles();
    return (
      <div className={classes.root}>
        <GridContainer>
          <Card>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4} lg={4}>
                  <CustomInput
                    labelText="Année scolaire"
                    id="annee_scolaire"
                    name="annee_scolaire"
                    formControlProps={{
                      fullWidth: true,
                    }}
                   // value={formation?.annee_scolaire}
                   // shrink={formation?.annee_scolaire ? true : undefined}
                    errors={errors}
                    control={control}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4} lg={4}>
                  <CustomInput
                    name="pays"
                    labelText="Pays"
                    id="pays"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  //  value={formation?.pays}
                  //  shrink={formation?.pays ? true : undefined}
                    errors={errors}
                    control={control}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4} lg={4}>
                  <CustomInput
                    name="province_etat_region"
                    labelText="Province / état / région "
                    id="province_etat_region"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  //  value={formation?.province_etat_region}
                  //  shrink={formation?.province_etat_region ? true : undefined}
                    errors={errors}
                    control={control}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={4} md={4}>
                  <CustomInput
                    name="ville"
                    labelText="Ville"
                    id="ville"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  //  value={formation?.ville}
                  //  shrink={formation?.ville ? true : undefined}
                    errors={errors}
                    control={control}
                  />
                </GridItem>
                <GridItem xs={12} sm={4} md={8}>
                  <CustomInput
                    name="etablissement"
                    labelText="Etablissement"
                    id="etablissement"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  //  value={formation?.etablissement}
                  //  shrink={formation?.etablissement ? true : undefined}
                    errors={errors}
                    control={control}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={6} md={6}>
                  <CustomInput
                    name="niveau"
                    labelText="Niveau d'étude (ex: Terminale)"
                    id="niveau"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  //  value={formation?.niveau}
                  //  shrink={formation?.niveau ? true : undefined}
                    errors={errors}
                    control={control}
                  />
                </GridItem>

                <GridItem xs={12} sm={6} md={6}>
                  <CustomInput
                    name="domaine"
                    labelText="Domaine d'étude (ex: Scientifique)"
                    id="domaine"
                    formControlProps={{
                      fullWidth: true,
                    }}
                 //   value={formation?.domaine}
                 //   shrink={formation?.domaine ? true : undefined}
                    errors={errors}
                    control={control}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={6} md={6}>
                  <CustomInput
                    name="moyenne"
                    labelText="Moyenne Annuelle"
                    id="moyenne"
                    formControlProps={{
                      fullWidth: true,
                    }}
                   // value={formation?.moyenne}
                   // shrink={formation?.moyenne ? true : undefined}
                    errors={errors}
                    control={control}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={6}>
                  <br />
                  <UploadFile
                    title={"Ajouter comme justificatif"}
                    upload={upload}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridContainer>
      </div>
    );
  };

  return (
    <div>
     
      <Dialog
        open={open}
        onClose={annuler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <form onSubmit={handleSubmit(ajouterFormation)} >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <CreerFormation />
        </DialogContent>
        <DialogActions>
          <Button color="info" onClick={annuler}>
            ANNULER
          </Button>
          <Button type="submit" color="success" autoFocus>
            AJOUTER
          </Button>
        </DialogActions>
      </form>
      </Dialog>
     
     
    </div>
  );
};

export default DialogFormation;

DialogFormation.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string,
  title: PropTypes.string,
  ajouterFormation: PropTypes.func,
  annuler: PropTypes.func,
  handleChange: PropTypes.func,
  formation: PropTypes.object,
  upload: PropTypes.func,
};
