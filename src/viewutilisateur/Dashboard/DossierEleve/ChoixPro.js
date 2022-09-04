import { Button, InputLabel } from "@material-ui/core";
import baseIris from "baseiris";
import CustomInput from "components/CustomInput/CustomInput";
import { UserContext } from "context/userContextProvider";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";

const ChoixPro = () => {
  const {control, register, handleSubmit,clearErrors, formState: { errors , isValid ,isSubmitted }} = useForm();

  const { client, setClient } = useContext(UserContext);
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    client[name] = value;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    client["choixProOK"] = true;
    baseIris.update(`/${client.id}/client`, { data: client });
    setClient({ ...client });
  };

  const style = {
    "font-size": "15px",
    "font-weight": "500",
    color: "#078041",
  };

  const style_button = {
    display: "block",
    width: "100%",
    border: "none",
    "background-color": "#04AA6D",
    color: "white",
    padding: "14px 28px",
    "font-size": "16px",
    cursor: "pointer",
    "text-align": "center",
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputLabel style={style}>
          {"L'élève explique en quelques mots son choix"}
        </InputLabel>
        <CustomInput
          name="choix_filière"
          labelText="Vos motivations"
          id="about-me"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            multiline: true,
            rows: 5,
          }}
          value={client?.choix_filière}
          shrink={client?.choix_filière ? true : undefined}
          onChange={handleChange}
          register={register}
          errors={errors}
          isValid = {isValid}
          isSubmitted = {isSubmitted}
          control={control}
        />
        <br /> <br />
        <InputLabel style={style}>
          {"Quelles sont vos loisirs, passe-temps ? "}
        </InputLabel>
        <CustomInput
          name="loisir"
          labelText="Vos loisirs"
          id="about-me"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            multiline: true,
            rows: 5,
          }}
          value={client?.loisir}
          shrink={client?.loisir ? true : undefined}
          onChange={handleChange}
          register={register}
          errors={errors}
          isValid = {isValid}
          isSubmitted = {isSubmitted}
          control={control}
        />
        <br />
        <br />
        <Button
          color="primary"
          type="submit"
          style={style_button}
        >
          VALIDER
        </Button>
      </form>
    </div>
  );
};

export default ChoixPro;
