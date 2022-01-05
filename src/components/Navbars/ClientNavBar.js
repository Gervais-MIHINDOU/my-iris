import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Divider from "@material-ui/core/Divider";
import Grow from "@material-ui/core/Grow";
import Hidden from "@material-ui/core/Hidden";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Poppers from "@material-ui/core/Popper";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Dashboard from "@material-ui/icons/Dashboard";
import Notifications from "@material-ui/icons/Notifications";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import classNames from "classnames";
import Button from "components/CustomButtons/Button.js";
import useConfig from "hooks/useConfig";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const useStyles = makeStyles(styles);

const ClientNavBar = ({ client, isAdmin }) => {
  const conf = useConfig();

  const getNbrNewNotif = () => {
    let nbre = client?.notifications?.filter((notif) => notif.isNew).length;

    console.log("Le nombre de notifications est de : " + nbre);
    return nbre;
  };

  const classes = useStyles();
  const [openProfile, setOpenProfile] = React.useState(null);

  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };

  const contactezNous = () => {
    Swal.fire("Contact: " + conf.numeroAdmin + "\nEmail: " + conf.emailAdmin);
  };

  return (
    <div>
      <Button
        color={window.innerWidth > 959 ? "transparent" : "white"}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-label="Dashboard"
        className={classes.buttonLink}
        component={Link}
        to={isAdmin ? "/admin/dashboard" : "/client/dashbord"}
      >
        <Dashboard className={classes.icons} />
        <Hidden mdUp implementation="css">
          <p className={classes.linkText}>Dashboard</p>
        </Hidden>
      </Button>
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-haspopup="true"
          className={classes.buttonLink}
          component={Link}
          to={isAdmin ? "/admin/notifications" : "/client/notifications"}
        >
          <Notifications className={classes.icons} />

          {getNbrNewNotif() > 0 ? (
            <span className={classes.notifications}>{getNbrNewNotif()}</span>
          ) : (
            ""
          )}

          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Notification</p>
          </Hidden>
        </Button>
      </div>

      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <MenuItem
                      className={classes.dropdownItem}
                      component={Link}
                      to={isAdmin ? "/admin/user" : "/client/user"}
                    >
                      Mon Compte
                    </MenuItem>
                    <MenuItem
                      className={classes.dropdownItem}
                      onClick={contactezNous}
                    >
                      contactez-nous
                    </MenuItem>
                    <Divider light />
                    <MenuItem
                      className={classes.dropdownItem}
                      component={Link}
                      to="/login"
                    >
                      Deconnexion
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
};

export default ClientNavBar;

ClientNavBar.propTypes = {
  redirectLogin: PropTypes.func,
  redirectProfile: PropTypes.func,
  redirectNotif: PropTypes.func,
  client: PropTypes.object,
  isAdmin: PropTypes.bool,
};
