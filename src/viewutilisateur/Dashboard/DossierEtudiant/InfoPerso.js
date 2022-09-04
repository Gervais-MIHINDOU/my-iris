import { FormControl, makeStyles, MenuItem ,InputLabel,Select } from "@material-ui/core";
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
import CountryIris from "./CountryIris";
import { Controller, useForm } from "react-hook-form";


const styles = {
  root: {
    flexGrow: 1,
  },
};

const useStyles = makeStyles(styles);
const InfoPerso = ({setInfoPersoOK,setExpanded}) => {
  const { client} = useContext(UserContext);

  const {control, handleSubmit, formState: { errors }} = useForm();

  const classes = useStyles();

  const onSubmit = (event) => {                                                 
    event["infoPersoOK"] = true;
    baseIris.update(`/${client.id}/client`, { data: event });
    setInfoPersoOK(true);
    setExpanded("infoPersoOK");
  };

  return (
    <div className={classes.root}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <GridContainer>
        <Card>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4} lg={4}>
                <CustomInput
                  labelText="Nom *"
                  id="nom"
                  name="nom"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  value={client?.nom}
                  shrink={client?.nom ? true : undefined}
                  errors={errors}
                  control={control}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4} lg={4}>
                <CustomInput
                  name="prenom"
                  labelText="Prenom *"
                  id="prenom"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  value={client?.prenom}
                  shrink={client?.prenom ? true : undefined}
                  errors={errors}
                  control={control}
                />
               
              </GridItem>
              <GridItem xs={12} sm={12} md={4} lg={4}>
                <br/>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Sexe *</InputLabel>
                  <Controller
                      name="sexe"
                      control={control}
                      defaultValue=""
                      rules={{ required: true }}
                      render={({ field: { ref, onChange, ...field } }) => (   
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={client?.sexe}
                    label="Sexe"
                    name="sexe"
                    aria-invalid={!!errors.sexe}
                    innerRef={ref}
                    onChange={({ target: { value } }) => onChange(value)}
                    className="has-input input-lg"
                  >
                    <MenuItem value={"F"}>F</MenuItem>
                    <MenuItem value={"M"}>M</MenuItem>
                  </Select>
                  )}
                  />
                </FormControl>
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={4} md={4}>
                <CustomInput
                  name="email"
                  labelText="Email *"
                  id="email-address"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  value={client?.email}
                  shrink={client?.email ? true : undefined}
                  errors={errors}
                  control={control}
                />
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <CustomInput
                  name="phone"
                  labelText="Numéro de telephone *"
                  id="phone"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  value={client?.phone}
                  shrink={client?.phone ? true : undefined}
                  errors={errors}
                  control={control}
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
                  errors={errors}
                  control={control}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={2} md={2}>
                <br/>
                <CountryIris 
                  name="pays"
                  labelText="Pays *"
                  id="pays"
                  value= {client?.pays}
                  errors={errors}
                  control={control}
                  />      
              </GridItem>

              <GridItem xs={12} sm={2} md={2}>
                <CustomInput
                  name="ville"
                  labelText="Ville *"
                  id="city"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  value={client?.ville}
                  shrink={client?.ville ? true : undefined}
                  errors={errors}
                  control={control}
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
                  errors={errors}
                  control={control}
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
                  errors={errors}
                  control={control}
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
                  errors={errors}
                  control={control}
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={3} md={3}>
                <br/>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Type de pièce d'identité *</InputLabel>
                 
                <Controller
                      name="sexe"
                      control={control}
                      defaultValue=""
                      rules={{ required: true }}
                      render={({ field: { ref, onChange, ...field } }) => (  

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={client?.type_piece_identite}
                    label="Type de pièce d'identité"
                    name="type_piece_identite"
                    aria-invalid={!!errors[name]}
                    innerRef={ref}
                    onChange={({ target: { value } }) => onChange(value)}
                    className="has-input input-lg"
                  >
                    <MenuItem value={"Passeport"}>Passeport</MenuItem>
                    <MenuItem value={"CNI"}>CNI</MenuItem>
                    <MenuItem value={"Carte de séjour,"}>Carte de séjour</MenuItem>
                    <MenuItem value={"Récépissé"}>Récépissé</MenuItem>
                  </Select>
                      )}
                   />
                </FormControl>
              </GridItem>
              <GridItem xs={12} sm={3} md={3}>
                <CustomInput
                  name="numero_piece_identite"
                  labelText="Numéro de pièce d'identité"
                  id="numero_piece_identite"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  value={client?.numero_piece_identite}
                  shrink={client?.numero_piece_identite ? true : undefined}
                  errors={errors}
                  control={control}
                />
              </GridItem>
              <GridItem xs={12} sm={3} md={3}>
                <br />
                <CountryIris 
                  name="pays_de_delivrance_piece_identite"
                  labelText="Pays de délivrance  *"
                  id="pays_de_delivrance_piece_identite"
                  value= {client?.pays_de_delivrance_piece_identite}
                  errors={errors}
                  control={control}
                  />  
              </GridItem>

              <GridItem xs={12} sm={3} md={3}>
                <CustomInput
                  name="date_limite_de_validite"
                  labelText="Date limite de validité *"
                  id="date_limite_de_validite"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  value={client?.date_limite_de_validite}
                  shrink={client?.date_limite_de_validite ? true : undefined}
                  errors={errors}
                  control={control}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter>
            <Button type="submit" color="info">
              Suivant
            </Button>
          </CardFooter>
        </Card>
      </GridContainer>
      </form>
    </div>
  );
};
export default InfoPerso;
