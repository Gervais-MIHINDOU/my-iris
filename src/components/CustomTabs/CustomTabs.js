// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import styles from "assets/jss/material-dashboard-react/components/customTabsStyle.js";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import SearchBarIris from "components/SEARCH/SearchBarIris";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import React, { Fragment } from "react";

const useStyles = makeStyles(styles);

export default function CustomTabs(props) {
  const {
    headerColor,
    plainTabs,
    tabs,
    title,
    rtlActive,
    setSearchValue,
    isNotif,
  } = props;

  const submitValueToSearch = (valueToSearch) => {
    console.log("Valeur à chercher");
    console.log(valueToSearch);
    setSearchValue(valueToSearch);
  };
  const [value, setValue] = React.useState(0);
  const handleChange = (event, value) => {
    setValue(value);
  };
  const classes = useStyles();

  const cardTitle = classNames({
    [classes.cardTitle]: true,
    [classes.cardTitleRTL]: rtlActive,
  });
  return (
    <Card plain={plainTabs}>
      <CardHeader color={headerColor} plain={plainTabs}>
        {title !== undefined ? <div className={cardTitle}>{title}</div> : null}
        <Tabs
          value={value}
          onChange={handleChange}
          classes={{
            root: classes.tabsRoot,
            indicator: classes.displayNone,
            scrollButtons: classes.displayNone,
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((prop, key) => {
            var icon = {};
            if (prop.tabIcon) {
              icon = {
                icon: <prop.tabIcon />,
              };
            }
            return (
              <Fragment key={key}>
                <Tab
                  classes={{
                    root: classes.tabRootButton,
                    selected: classes.tabSelected,
                    wrapper: classes.tabWrapper,
                  }}
                  key={key}
                  label={prop.tabName}
                  {...icon}
                />
                {!isNotif ? (
                  <SearchBarIris
                    placeholder={"Recherche utilisateur"}
                    onRequestSearch={submitValueToSearch}
                  />
                ) : (
                  ""
                )}
              </Fragment>
            );
          })}
        </Tabs>
      </CardHeader>
      <CardBody>
        <br />
        {tabs.map((prop, key) => {
          if (key === value) {
            return <div key={key}>{prop.tabContent}</div>;
          }
          return null;
        })}
      </CardBody>
    </Card>
  );
}

CustomTabs.propTypes = {
  headerColor: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose",
  ]),
  title: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabName: PropTypes.string.isRequired,
      tabIcon: PropTypes.object,
      tabContent: PropTypes.node.isRequired,
    })
  ),
  rtlActive: PropTypes.bool,
  plainTabs: PropTypes.bool,
  isNotif: PropTypes.bool,
  setSearchValue: PropTypes.func,
};