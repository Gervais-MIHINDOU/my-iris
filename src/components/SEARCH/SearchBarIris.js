import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input, InputAdornment, makeStyles } from "@material-ui/core";
import { Search } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  design: {
    backgroundColor: "white",
    width: "370px",
    height: "30px",
    borderRadius: "4px 4px",
    border: "1px none",
    margin: "8px 0",
    padding: "12px 20px",
  },
}));

const SearchBarIris = ({ placeholder, onRequestSearch }) => {
  const classes = useStyles();
  const [valueToSearch, setValueToSearch] = useState();

  const onChange = (event) => {
    event.preventDefault();
    setValueToSearch(event.target.value);
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      console.log(valueToSearch);
      onRequestSearch(valueToSearch);
      setValueToSearch();
    }
  };

  return (
    <Input
      className={classes.design}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      endAdornment={
        <InputAdornment position="start">
          <Search />
        </InputAdornment>
      }
    />
  );
};
SearchBarIris.propTypes = {
  placeholder: PropTypes.string,
  onRequestSearch: PropTypes.func,
};

export default SearchBarIris;
