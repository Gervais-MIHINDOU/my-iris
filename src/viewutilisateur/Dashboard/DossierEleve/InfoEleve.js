import { makeStyles } from "@material-ui/core";
import baseIris from "baseiris";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import { UserContext } from "context/userContextProvider";
import React, { useContext } from "react";

const styles = {
  root: {
    flexGrow: 1,
  },
};

const useStyles = makeStyles(styles);

const InfoEleve = () => {
  const { client, setClient } = useContext(UserContext);
  const classes = useStyles();

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    client[name] = value;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    client["infoEleveOk"] = true;
    baseIris.update(`/${client.id}/client`, { data: client });
    setClient({ ...client });
  };

  return (
    <div className={classes.root}>
      <GridContainer>
        <Card>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4} lg={4}>
                <CustomInput
                  labelText="Nom"
                  id="nom"
                  name="nom"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  value={client?.nom}
                  shrink={client?.nom ? true : undefined}
                  onChange={handleChange}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4} lg={4}>
                <CustomInput
                  name="prenom"
                  labelText="Prenom"
                  id="prenom"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  value={client?.prenom}
                  shrink={client?.prenom ? true : undefined}
                  onChange={handleChange}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4} lg={4}>
                <CustomInput
                  name="sexe"
                  labelText="Sexe"
                  id="sexe"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  value={client?.sexe}
                  shrink={client?.sexe ? true : undefined}
                  onChange={handleChange}
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={4} lg={4}>
                <CustomInput
                  labelText="Nom du responsable légal"
                  id="nom_parent_id"
                  name="nom_parent"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  value={client?.nom_parent}
                  shrink={client?.nom_parent ? true : undefined}
                  onChange={handleChange}
                  required
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4} lg={4}>
                <CustomInput
                  name="prenom_parent"
                  labelText="Prenom du responsable légal"
                  id="prenom_parent"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  value={client?.prenom_parent}
                  shrink={client?.prenom_parent ? true : undefined}
                  onChange={handleChange}
                  required
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4} lg={4}>
                <CustomInput
                  name="residence_eleve"
                  labelText="Residence de l'élève chez"
                  id="residence_eleve"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  value={client?.residence_eleve}
                  shrink={client?.residence_eleve ? true : undefined}
                  onChange={handleChange}
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={4} md={4}>
                <CustomInput
                  name="email"
                  labelText="Email"
                  id="email-address"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  value={client?.email}
                  shrink={client?.email ? true : undefined}
                  onChange={handleChange}
                />
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <CustomInput
                  name="phone"
                  labelText="Numéro de telephone"
                  id="phone"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  value={client?.phone}
                  shrink={client?.phone ? true : undefined}
                  onChange={handleChange}
                />
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <CustomInput
                  name="phone_parent"
                  labelText="Télephone des parents"
                  id="phone_parent"
                  formControlProps={{
                    fullWidth: false,
                  }}
                  value={client?.phone_parent}
                  shrink={client?.phone_parent ? true : undefined}
                  onChange={handleChange}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={2} md={2}>
                <CustomInput
                  name="pays"
                  labelText="Pays"
                  id="country"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  value={client?.pays}
                  shrink={client?.pays ? true : undefined}
                  onChange={handleChange}
                />
              </GridItem>

              <GridItem xs={12} sm={2} md={2}>
                <CustomInput
                  name="ville"
                  labelText="Ville"
                  id="city"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  value={client?.ville}
                  shrink={client?.ville ? true : undefined}
                  onChange={handleChange}
                />
              </GridItem>

              <GridItem xs={12} sm={2} md={3}>
                <CustomInput
                  name="province_etat_region"
                  labelText="Province / état / région"
                  id="province_etat_region"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  value={client?.province_etat_region}
                  shrink={client?.province_etat_region ? true : undefined}
                  onChange={handleChange}
                />
              </GridItem>

              <GridItem xs={12} sm={2} md={2}>
                <CustomInput
                  name="bp"
                  labelText="Code postal"
                  id="postal-code"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  value={client?.bp}
                  shrink={client?.bp ? true : undefined}
                  onChange={handleChange}
                />
              </GridItem>

              <GridItem xs={12} sm={2} md={3}>
                <CustomInput
                  name="adresse"
                  labelText="Adresse ou Quartier"
                  id="adresse"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  value={client?.adresse}
                  shrink={client?.adresse ? true : undefined}
                  onChange={handleChange}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter>
            <Button color="info" onClick={handleSubmit}>
              Je valide
            </Button>
          </CardFooter>
        </Card>
      </GridContainer>
    </div>
  );
};
export default InfoEleve;
