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
import { useForm } from "react-hook-form";

const styles = {
  root: {
    flexGrow: 1,
  },
};

const useStyles = makeStyles(styles);
const DetailGarant = () => {
  const {control, register, handleSubmit,clearErrors, formState: { errors , isValid ,isSubmitted }} = useForm();

  const { client, setClient } = useContext(UserContext);

  const classes = useStyles();

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    if (!client.garant) {
      client["garant"] = {};
    }
    client["garant"][name] = value;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    client["infoGarantOK"] = true;
    baseIris.update(`/${client.id}/client`, { data: client });
    setClient(client);
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
                  labelText="Nom"
                  id="nom"
                  name="nom"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  value={client?.garant?.nom}
                  shrink={client?.garant?.nom ? true : undefined}
                  onChange={handleChange}
                  register={register}
                  errors={errors}
                  isValid = {isValid}
                  isSubmitted = {isSubmitted}
                  control={control}
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
                  value={client?.garant?.prenom}
                  shrink={client?.garant?.prenom ? true : undefined}
                  onChange={handleChange}
                  register={register}
                  errors={errors}
                  isValid = {isValid}
                  isSubmitted = {isSubmitted}
                  control={control}
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
                  value={client.garant?.sexe}
                  shrink={client?.garant?.sexe ? true : undefined}
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
                  name="email"
                  labelText="Email"
                  id="email-address"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  value={client?.garant?.email}
                  shrink={client?.garant?.email ? true : undefined}
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
                  name="phone"
                  labelText="Numéro de telephone"
                  id="phone"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  value={client?.garant?.phone}
                  shrink={client?.garant?.phone ? true : undefined}
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
                  name="profession"
                  labelText="Profession"
                  id="phone_parent"
                  formControlProps={{
                    fullWidth: false,
                  }}
                  value={client?.garant?.profession}
                  shrink={client?.garant?.profession ? true : undefined}
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
              <GridItem xs={12} sm={2} md={2}>
                <CustomInput
                  name="pays"
                  labelText="Pays"
                  id="country"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  value={client?.garant?.pays}
                  shrink={client?.garant?.pays ? true : undefined}
                  onChange={handleChange}
                  register={register}
                  errors={errors}
                  isValid = {isValid}
                  isSubmitted = {isSubmitted}
                  control={control}
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
                  value={client?.garant?.ville}
                  shrink={client?.garant?.ville ? true : undefined}
                  onChange={handleChange}
                  register={register}
                  errors={errors}
                  isValid = {isValid}
                  isSubmitted = {isSubmitted}
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
                  value={client?.garant?.bp}
                  shrink={client?.garant?.bp ? true : undefined}
                  onChange={handleChange}
                  register={register}
                  errors={errors}
                  isValid = {isValid}
                  isSubmitted = {isSubmitted}
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
                  value={client?.garant?.adresse}
                  shrink={client?.garant?.adresse ? true : undefined}
                  onChange={handleChange}
                  register={register}
                  errors={errors}
                  isValid = {isValid}
                  isSubmitted = {isSubmitted}
                  control={control}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter>
            <Button color="info" type="submit">
              Je valide
            </Button>
          </CardFooter>
        </Card>
      </GridContainer>
      </form>
    
    </div>
  );
};

export default DetailGarant;
