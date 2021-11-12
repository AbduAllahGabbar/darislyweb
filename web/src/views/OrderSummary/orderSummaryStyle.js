import {
  blackColor,
  grayColor,
  secondaryColor,
} from "assets/jss/material-kit-pro-react";
import { mlAuto, mrAuto } from "assets/jss/material-kit-pro-react.js";

const orderSummaryStyle = (theme) => ({
  button: {
    position: "relative",
    width: "20%",
    fontWeight: "bold",
    fontSize: "12px",
    lineHeight: "20px",
    textDecoration: "none",
    textTransform: "capitalize",
    padding: "8px 20px",
    margin: "0px",
    display: "inline-flex",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: "5px",
      marginTop: "5px",
      textAlign: "left",
      fontSize: "0.75rem",
      "& > span:first-child": {
        justifyContent: "center",
      },
    },
  },
  gridItem: {
    ...mlAuto,
    ...mrAuto,
  },
  orderContainer: { paddingTop: 180, paddingBottom: 180 },
  noOrderItemsTitle: {
    color: secondaryColor[0],
    textAlign: "center",
    marginTop: 50,
  },
  summaryContainer: {
    paddingLeft: 25,
    paddingRight: 25,
  },
  summary: {
    border: `1px solid ${grayColor[6]}`,
    borderRadius: 10,
  },
  summaryTableHead: {
    height: 5,
    fontSize: 12,
    fontWeight: "bold",
    padding: "10px !important",
  },
  summaryTableCell: { color: blackColor, padding: "10px !important" },
  orderSummaryTitle: {
    color: blackColor,
    textAlign: "left",
    margin: 0,
    borderBottom: `1px solid ${grayColor[6]}`,
    padding: 10,
  },
  orderSummaryTableContainer: {
    padding: 20,
  },
  marginTop: { marginTop: 20 },
  paymentSummary: { padding: 20, color: blackColor, textAlign: "left" },
  paymentDetailName: { marginRight: 0 },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 20,
  },
});

export default orderSummaryStyle;
