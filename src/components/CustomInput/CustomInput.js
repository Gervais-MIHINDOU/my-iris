import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
// core components
import styles from "assets/jss/material-dashboard-react/components/customInputStyle.js";
import { Controller } from "react-hook-form";

const useStyles = makeStyles(styles);

const CustomInput = (props) => {
  const classes = useStyles();
  const {
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    success,
    rtlActive,
    value,
    shrink,
    name,
    errors,
    control,
    onChange,
  } = props;



  const Response = () => {

    if(control){
      
      return  (




     <Controller
              name={name}
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field: { ref, onChange, ...field } }) => (
                
            <Input
                classes={{
                  root: marginTop,
                  disabled: classes.disabled,
                  underline: underlineClasses,
                  placeholder: classes.Checkplaceholder,
                  input: classes.input,
                }}
                id={id}
                {...field}
                {...inputProps}
                inputProps={newInputProps}
                placeholder={value}
                name={name}
                aria-invalid={!!errors[name]}
                innerRef={ref}
                onChange={({ target: { value } }) => onChange(value)}
                className="has-input input-lg"
              />


              )}
      />
            )

    }else{

      return  (
      <Input
          classes={{
            root: marginTop,
            disabled: classes.disabled,
            underline: underlineClasses,
            placeholder: classes.Checkplaceholder,
            input: classes.input,
          }}
          id={id}
          {...inputProps}
          inputProps={newInputProps}
          placeholder={value}
          onChange={onChange}
          name={name} 
    />)
   
    }
   
};


  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error,
    [" " + classes.labelRTL]: rtlActive,
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
  });
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined,
  });
  let newInputProps = {
    maxLength:
      inputProps && inputProps.maxLength ? inputProps.maxLength : undefined,
    minLength:
      inputProps && inputProps.minLength ? inputProps.minLength : undefined,
    step: inputProps && inputProps.step ? inputProps.step : undefined,
  };
  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
    >
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + labelClasses}
          htmlFor={id}
          shrink={shrink}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}

      <Response />
  {error ? (
      <Clear className={classes.feedback + " " + classes.labelRootError} />
    ) : success ? (
      <Check className={classes.feedback + " " + classes.labelRootSuccess} />
    ) : null}
      
      {errors && errors[name] && (
              <span style={{ color: "red" }} role="alert">
                Donnée obligatoire
              </span>
            )}
     
</FormControl>
    
  );

  

}
export default CustomInput;
CustomInput.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool,
  rtlActive: PropTypes.bool,
  value: PropTypes.string,
  shrink: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
};
