import { TableHead, useMediaQuery, useTheme } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import { Search } from "@material-ui/icons";
import Close from "@material-ui/icons/Close";
// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
// core components
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(styles);

export default function Tasks(props) {
  const theme = useTheme();
  const matchesNotSm = useMediaQuery(theme.breakpoints.up("sm"));
  const classes = useStyles();
  const {
    tasks,
    rtlActive,
    tableHead,
    detail,
    modifier,
    supprimer,
    isAdmin,
    isNotif,
  } = props;
  const tableCellClasses = classnames(classes.tableCell, {
    [classes.tableCellRTL]: rtlActive,
  });
  console.log(isAdmin);
  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow className={classes.tableHeadRow}>
          {tableHead.map((prop, key) => {
            return (
              <TableCell
                className={classes.tableCell + " " + classes.tableHeadCell}
                key={key}
              >
                {prop}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {tasks.map((value) => (
          <TableRow
            key={value}
            style={{ backgroundColor: value.val6 ? "#CAD9F8" : "" }}
            className={classes.tableRow}
          >
            <TableCell className={tableCellClasses}>{value.val2}</TableCell>

            {matchesNotSm ? <TableCell className={tableCellClasses}>{value.val3}</TableCell> : ""}
            
            <TableCell className={tableCellClasses}>{value.val4}</TableCell>
            <TableCell className={tableCellClasses}>{value.val5}</TableCell>
            <TableCell className={classes.tableActions}>
              {!isNotif ? (
                <Tooltip
                  id="tooltip-top"
                  title="Modifier"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                  onClick={(e) => modifier(value.val1, e)}
                >
                  <IconButton
                    aria-label="Edit"
                    className={classes.tableActionButton}
                  >
                    <Edit
                      className={
                        classes.tableActionButtonIcon + " " + classes.edit
                      }
                    />
                  </IconButton>
                </Tooltip>
              ) : (
                ""
              )}

              <Tooltip
                id="tooltip-top-start"
                title="Rechercher"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
                onClick={(e) => detail(value.val1, e)}
              >
                <IconButton
                  aria-label="Search"
                  className={classes.tableActionButton}
                >
                  <Search
                    className={
                      classes.tableActionButtonIcon + " " + classes.close
                    }
                  />
                </IconButton>
              </Tooltip>
              {!isNotif ? (
                <Tooltip
                  id="tooltip-top-start"
                  title="Supprimer"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                  onClick={(e) => supprimer(value.val1, e)}
                >
                  <IconButton
                    aria-label="Close"
                    className={classes.tableActionButton}
                  >
                    <Close
                      className={
                        classes.tableActionButtonIcon + " " + classes.close
                      }
                    />
                  </IconButton>
                </Tooltip>
              ) : (
                ""
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

Tasks.propTypes = {
  tasksIndexes: PropTypes.arrayOf(PropTypes.number),
  tasks: PropTypes.arrayOf(PropTypes.node),
  rtlActive: PropTypes.bool,
  checkedIndexes: PropTypes.array,
  tableHead: PropTypes.array,
  modifier: PropTypes.func,
  detail: PropTypes.func,
  supprimer: PropTypes.func,
  isAdmin: PropTypes.bool,
  isNotif: PropTypes.bool,
};
