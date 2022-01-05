import React from "react";
import Button from "components/CustomButtons/Button.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";

const Alerte = (props) => {
  const { open, message, title, confirmeDelete, laisseTomber } = props;
  return (
    <div>
      <Dialog
        open={open}
        onClose={laisseTomber}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="info" onClick={laisseTomber}>
            Annuler operation
          </Button>
          <Button color="danger" onClick={confirmeDelete} autoFocus>
            Je confirme
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Alerte;

Alerte.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string,
  title: PropTypes.string,
  confirmeDelete: PropTypes.func,
  laisseTomber: PropTypes.func,
};
