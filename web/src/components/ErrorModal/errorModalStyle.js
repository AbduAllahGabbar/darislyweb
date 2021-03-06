import {
  whiteColor,
  grayColor,
  secondaryColor,
  dangerColor,
} from "assets/jss/material-kit-pro-react.js";

const errorModalStyle = (theme) => ({
  modalRoot: {
    overflow: "auto",
    display: "block",
  },
  container: {
    height: "unset",
  },
  modal: {
    [theme.breakpoints.up("sm")]: {
      maxWidth: "fit-content",
      minWidth: "500px",
      margin: "auto",
    },
    borderRadius: "30px",
    overflow: "visible",
    maxHeight: "unset",
    width: "100%",
    marginTop: "130px !important",
  },
  modalHeader: {
    borderBottom: "none",
    paddingTop: "15px",
    paddingRight: "15px",
    paddingBottom: "0",
    paddingLeft: "10px",
    minHeight: "16.43px",
  },
  modalTitle: {
    margin: "0",
    lineHeight: "1.5",
  },
  modalCloseButton: {
    "&, &:hover": {
      color: grayColor[0],
    },
    "&:hover": {
      opacity: "1",
    },
    cursor: "pointer",
    padding: "1rem",
    margin: "-1rem -1rem -1rem auto",
    backgroundColor: "transparent",
    border: "0",
    WebkitAppearance: "none",
    float: "right",
    fontSize: "1.5rem",
    fontWeight: "500",
    lineHeight: "1",
    textShadow: "0 1px 0 " + whiteColor,
    opacity: ".5",
  },
  modalClose: {
    width: "16px",
    height: "16px",
  },
  modalBody: {
    paddingTop: "0px",
    paddingRight: "24px",
    paddingBottom: "16px",
    paddingLeft: "24px",
    position: "relative",
    overflow: "visible",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "12px",
      paddingRight: "12px",
    },
  },
  modalFooter: {
    padding: "15px",
    textAlign: "right",
    paddingTop: "0",
    margin: "0",
  },
  modalFooterCenter: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  instructionNoticeModal: {
    marginBottom: "25px",
  },
  imageNoticeModal: {
    maxWidth: "150px",
  },
  modalLarge: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "800px",
    },
  },
  modalSmall: {
    [theme.breakpoints.up("sm")]: {
      width: "300px",
      margin: "auto",
    },
    margin: "0 auto",
  },
  modalSmallBody: {
    marginTop: "20px",
  },
  modalSmallFooterFirstButton: {
    margin: "0",
    paddingLeft: "16px",
    paddingRight: "16px",
    width: "auto",
  },
  modalSmallFooterSecondButton: {
    marginBottom: "0",
    marginLeft: "5px",
  },
  modalLogin: {
    maxWidth: "360px",
    overflowY: "visible",
    width: "100%",
    "& $modalCloseButton": {
      color: whiteColor,
      top: "-10px",
      right: "10px",
      textShadow: "none",
      position: "relative",
    },
    "& $modalHeader": {
      borderBottom: "none",
      paddingTop: "24px",
      paddingRight: "24px",
      paddingBottom: "0",
      paddingLeft: "24px",
    },
    "& $modalBody": {
      paddingBottom: "0",
      paddingTop: "0",
    },
    "& $modalFooter": {
      paddingBottom: "0",
      paddingTop: "0",
    },
  },
  modalLoginCard: {
    marginBottom: "0",
    margin: "0",
    "& $modalHeader": {
      paddingTop: "0",
    },
  },
  modalSignup: {
    maxWidth: "900px",
    width: "100%",
    "& $modalHeader": {
      paddingTop: "0",
    },
    "& $modalTitle": {
      textAlign: "center",
      width: "100%",
      marginTop: "0.625rem",
    },
    "& $modalBody": {
      paddingBottom: "0",
      paddingTop: "0",
    },
  },
  modalSignupCard: {
    padding: "40px 0",
    margin: "0",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-around",
  },
  button: {
    width: "100%",
  },
  modalButton: {
    width: "40%",
    marginTop: 20,
  },
  titleContainer: {
    color: secondaryColor[0],
    marginTop: 0,
    marginBottom: 20,
    textAlign: "center",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  modalBody: {
    color: secondaryColor[0],
    fontSize: 16,
    textAlign: "center",
  },
  cancelIcon: {
    fontSize: 90,
    color: dangerColor[0],
  },
});

export default errorModalStyle;
