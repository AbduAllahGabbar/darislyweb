import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import cx from "classnames";
import Pagination from "components/Pagination/Pagination.js";
import strings from "constants/strings.js";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./tableStyle.js";
import { card } from "assets/jss/material-kit-pro-react.js";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const {
    tableHead,
    tableData,
    tableHeaderColor,
    hover,
    colorsColls,
    coloredColls,
    customCellClasses,
    customClassesForCells,
    striped,
    tableShopping,
    customHeadCellClasses,
    customHeadClassesForCells,
    round,
    pagination,
    backendPagination,
    rowsPerPage,
    currentPage,
    noDataMessage,
    totalPosts,
    mobileResponsive,
  } = props;
  let { paginate } = props;

  const [values, setValues] = React.useState({
    rowsPerPage,
    currentPage,
    customPagination: paginate !== undefined,
    backendData: tableData,
  });

  const [, forceRerender] = React.useState(0);

  // force rerender on resizing the window
  useEffect(() => {
    window.addEventListener("resize", () => forceRerender((n) => !n));
    return () => {
      window.removeEventListener("resize", () => forceRerender((n) => !n));
    };
  }, []);

  useEffect(() => {
    setValues({ ...values, backendData: tableData });
  }, [tableData]);
  const lang = useSelector((state) => state.lang);

  const classes = useStyles();
  const tableClasses = cx({
    [classes.round]: round,
    [classes.table]: true,
  });

  if (!values.customPagination) {
    paginate = (pageNumber) => {
      setValues({ ...values, currentPage: pageNumber });
    };
  }

  let matchingRows = tableData;
  let currentRows = tableData;

  if (pagination) {
    const indexOfLastRow =
      (values.customPagination ? currentPage : values.currentPage) *
      values.rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - values.rowsPerPage;
    currentRows = matchingRows.slice(indexOfFirstRow, indexOfLastRow);
  }

  return window.innerWidth < 768 && mobileResponsive ? (
    <div>
      {currentRows.map((row, rowIndex) => {
        let cardData = [];
        cardData = row.map((cell, cellIndex) => {
          return (
            <div className={classes.cardRow} key={cellIndex}>
              {tableHead[cellIndex] === " " ? null : (
                <div className={classes.cardRowHead}>
                  {tableHead[cellIndex]}
                </div>
              )}
              <div
                style={{
                  margin: tableHead[cellIndex] === " " ? "auto" : "unset",
                }}
              >
                {cell}
              </div>
            </div>
          );
        });
        return (
          <div className={classes.card} key={rowIndex}>
            {cardData}
          </div>
        );
      })}
      {(pagination || backendPagination) && tableData.length !== 0 ? (
        <div className={classes.paginationContainer}>
          <Pagination
            color="primary"
            postsPerPage={values.rowsPerPage}
            totalPosts={totalPosts ? totalPosts : matchingRows.length}
            paginate={paginate}
            currentPage={
              values.customPagination ? currentPage : values.currentPage
            }
            lang={lang}
          />
        </div>
      ) : null}
      {tableData.length === 0 ? (
        <div className={classes.noData}>
          {noDataMessage === "default"
            ? strings.noAvailableData[lang]
            : noDataMessage}
        </div>
      ) : null}
    </div>
  ) : (
    <div className={"scrollbar " + classes.tableResponsive}>
      <Table className={tableClasses}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor]}>
            <TableRow className={classes.tableRow}>
              {tableHead.map((prop, key) => {
                const tableCellClasses =
                  classes.tableHeadCell +
                  " " +
                  classes.tableCell +
                  " " +
                  cx({
                    [customHeadCellClasses[
                      customHeadClassesForCells.indexOf(key)
                    ]]: customHeadClassesForCells.indexOf(key) !== -1,
                    [classes.tableShoppingHead]: tableShopping,
                  });
                return prop ? (
                  <TableCell className={tableCellClasses} key={key}>
                    {prop}
                  </TableCell>
                ) : null;
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {currentRows.map((prop, key) => {
            var rowColor = "";
            var rowColored = false;
            if (prop.color !== undefined) {
              rowColor = prop.color;
              rowColored = true;
              prop = prop.data;
            }
            const tableRowClasses = cx({
              [classes.tableRowHover]: hover,
              [classes[rowColor + "Row"]]: rowColored,
              [classes.tableStripedRow]: striped && key % 2 === 0,
            });
            if (prop.total) {
              return (
                <TableRow key={key} hover={hover} className={tableRowClasses}>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                  />
                  <TableCell
                    className={classes.tableCell + " " + classes.tableCellTotal}
                  >
                    Total
                  </TableCell>
                  <TableCell
                    className={
                      classes.tableCell + " " + classes.tableCellAmount
                    }
                  >
                    {prop.amount}
                  </TableCell>
                  {tableHead.length - (prop.colspan - 0 + 2) > 0 ? (
                    <TableCell
                      className={classes.tableCell}
                      colSpan={tableHead.length - (prop.colspan - 0 + 2)}
                    />
                  ) : null}
                </TableRow>
              );
            }
            if (prop.purchase) {
              return (
                <TableRow key={key} hover={hover} className={tableRowClasses}>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                  />
                  <TableCell
                    className={classes.tableCell + " " + classes.tableCellTotal}
                  >
                    Total
                  </TableCell>
                  <TableCell
                    className={
                      classes.tableCell + " " + classes.tableCellAmount
                    }
                  >
                    {prop.amount}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell + " " + classes.right}
                    colSpan={prop.col.colspan}
                  >
                    {prop.col.text}
                  </TableCell>
                </TableRow>
              );
            }
            return (
              <TableRow
                key={key}
                hover={hover}
                className={classes.tableRow + " " + tableRowClasses}
              >
                {prop.map((prop, key) => {
                  const tableCellClasses =
                    classes.tableCell +
                    " " +
                    cx({
                      [classes[colorsColls[coloredColls.indexOf(key)]]]:
                        coloredColls.indexOf(key) !== -1,
                      [customCellClasses[customClassesForCells.indexOf(key)]]:
                        customClassesForCells.indexOf(key) !== -1,
                    });
                  return prop ? (
                    <TableCell className={tableCellClasses} key={key}>
                      {prop}
                    </TableCell>
                  ) : null;
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {(pagination || backendPagination) && tableData.length !== 0 ? (
        <div className={classes.paginationContainer}>
          <Pagination
            color="primary"
            postsPerPage={values.rowsPerPage}
            totalPosts={totalPosts ? totalPosts : matchingRows.length}
            paginate={paginate}
            currentPage={
              values.customPagination ? currentPage : values.currentPage
            }
            lang={lang}
          />
        </div>
      ) : null}
      {tableData.length === 0 ? (
        <div className={classes.noData}>
          {noDataMessage === "default"
            ? strings.noAvailableData[lang]
            : noDataMessage}
        </div>
      ) : null}
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
  hover: false,
  colorsColls: [],
  coloredColls: [],
  striped: false,
  customCellClasses: [],
  customClassesForCells: [],
  customHeadCellClasses: [],
  customHeadClassesForCells: [],
  pagination: false,
  backendPagination: false,
  rowsPerPage: 10,
  currentPage: 1,
  noDataMessage: "default",
  mobileResponsive: true,
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "primaryLight",
    "secondary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  // Of(PropTypes.arrayOf(PropTypes.node)) || Of(PropTypes.object),
  tableData: PropTypes.array,
  hover: PropTypes.bool,
  coloredColls: PropTypes.arrayOf(PropTypes.number),
  // Of(["warning","primary","danger","success","info","rose","gray"]) - colorsColls
  colorsColls: PropTypes.array,
  customCellClasses: PropTypes.arrayOf(PropTypes.string),
  customClassesForCells: PropTypes.arrayOf(PropTypes.number),
  customHeadCellClasses: PropTypes.arrayOf(PropTypes.string),
  customHeadClassesForCells: PropTypes.arrayOf(PropTypes.number),
  striped: PropTypes.bool,
  // this will cause some changes in font
  tableShopping: PropTypes.bool,
  pagination: PropTypes.bool,
  rowsPerPage: PropTypes.number,
  currentPage: PropTypes.number,
  paginate: PropTypes.func,
  noDataMessage: PropTypes.string,
  totalPosts: PropTypes.number,
  backendPagination: PropTypes.bool,
  mobileResponsive: PropTypes.bool,
};
