import {
  warningColor,
  primaryColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  defaultFont,
  blackColor,
  whiteColor,
  secondaryColor,
} from "assets/jss/material-kit-pro-react";

const tableStyle = {
  warning: {
    color: warningColor[0],
  },
  primary: {
    color: primaryColor[0],
  },
  secondary: {
    backgroundColor: secondaryColor[0],
    color: whiteColor,
  },
  primaryLight: {
    backgroundColor: primaryColor[1],
    color: secondaryColor[0],
  },
  danger: {
    color: dangerColor[0],
  },
  success: {
    color: successColor[0],
  },
  info: {
    color: infoColor[0],
  },
  rose: {
    color: roseColor[0],
  },
  gray: {
    backgroundColor: grayColor[2],
    color: blackColor[0],
    // color: grayColor[0],
  },
  right: {
    textAlign: "right",
  },
  table: {
    marginBottom: "0",
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderSpacing: "0",
    borderCollapse: "collapse",
    overflow: "auto",
    "& > tbody > tr, & > thead > tr": {
      height: "auto",
    },
    "& > thead > tr > th": {
      color: "inherit",
    },
  },
  round: {
    "& > thead > tr > th:first-child": {
      borderRadius: "50px 0 0 50px",
      borderWidth: 0,
    },
    "& > thead > tr > th:last-child": {
      borderRadius: "0 50px 50px 0",
      borderWidth: 0,
    },
  },
  tableShoppingHead: {
    fontSize: "0.75em !important",
    textTransform: "uppercase !important",
  },
  tableCell: {
    ...defaultFont,
    lineHeight: "1.5em",
    padding: "15px 35px!important",
    verticalAlign: "middle",
    fontSize: "0.875rem",
    // borderBottom: "none",
    // borderTop: "1px solid " + grayColor[6],
    position: "relative",
    color: secondaryColor[0],
  },
  tableHeadCell: {
    fontSize: "1.1rem",
    fontWeight: "300",
    // color: whiteColor,
  },
  tableCellTotal: {
    fontWeight: "500",
    fontSize: "1.0625rem",
    paddingTop: "20px",
    textAlign: "right",
  },
  tableCellAmount: {
    fontSize: "26px",
    fontWeight: "300",
    marginTop: "5px",
    textAlign: "right",
  },
  tableResponsive: {
    minHeight: "0.1%",
    overflowX: "auto",
  },
  tableStripedRow: {
    backgroundColor: grayColor[16],
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: grayColor[23],
    },
  },
  warningRow: {
    backgroundColor: warningColor[4],
    "&:hover": {
      backgroundColor: warningColor[5],
    },
  },
  dangerRow: {
    backgroundColor: dangerColor[4],
    "&:hover": {
      backgroundColor: dangerColor[5],
    },
  },
  successRow: {
    backgroundColor: successColor[4],
    "&:hover": {
      backgroundColor: successColor[5],
    },
  },
  infoRow: {
    backgroundColor: infoColor[4],
    "&:hover": {
      backgroundColor: infoColor[5],
    },
  },
  paginationContainer: {
    margin: "auto",
    marginTop: 20,
    width: "fit-content",
  },
  noData: {
    textAlign: "left",
    marginLeft: 20,
    marginTop: 10,
    color: grayColor[10],
  },
  card: {
    minWidth: "fit-content",
    height: "fit-content",
    boxShadow: "0 1.5px 5px 0 rgba(0, 0, 0, 0.15)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "20px 20px",
    margin: "15px auto",
  },
  cardRow: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 9,
  },
  cardRowHead: {
    color: primaryColor[0],
    marginRight: 12,
  },
};

export default tableStyle;
