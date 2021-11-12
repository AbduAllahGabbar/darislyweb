import { secondaryColor } from "assets/jss/material-kit-pro-react";
import {
  blackColor,
  dangerBoxShadow,
  dangerColor,
  defaultFont,
  grayBoxShadow,
  grayColor,
  hexToRgb,
  infoBoxShadow,
  infoColor,
  primaryBoxShadow,
  primaryColor,
  roseBoxShadow,
  roseColor,
  successBoxShadow,
  successColor,
  warningBoxShadow,
  warningColor,
  whiteColor,
} from "assets/jss/material-kit-pro-react.js";

const customDropdownStyle = (theme) => ({
  popperClose: {
    pointerEvents: "none",
    display: "none !important",
  },
  pooperNav: {
    [theme.breakpoints.down("sm")]: {
      position: "static !important",
      left: "unset !important",
      top: "unset !important",
      transform: "none !important",
      willChange: "none !important",
      "& > div": {
        boxShadow: "none !important",
        transition: "none !important",
        marginTop: "0px !important",
        marginBottom: "5px !important",
        padding: "0px !important",
      },
    },
  },
  labelRootError: {
    color: dangerColor[0] + " !important",
    fontFamily: "Ubuntu",
  },
  manager: {
    "& > div > button:first-child > span:first-child, & > div > a:first-child > span:first-child": {
      width: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    }
  },
  innerManager: {
    display: "block",
    "& > div > button,& > div > a": {
      margin: "0px !important",
      color: "inherit !important",
      padding: "10px 20px !important",
      "& > span:first-child": {
        width: "100%",
        justifyContent: "flex-start",
      },
    },
  },
  target: {
    "& > button:first-child > span:first-child, & > a:first-child > span:first-child": {
      display: "inline-block",
    },
    "& $caret": {
      marginLeft: "0px",
    },
  },
  dropdown: {
    maxHeight: "500px",
    maxWidth: "300px",
    // overflowY: "auto",
    borderRadius: "8px",
    border: "0",
    boxShadow: "0 2px 5px 0 rgba(" + hexToRgb(blackColor) + ", 0.26)",
    top: "100%",
    zIndex: "1000",
    minWidth: "160px",
    padding: "5px 0",
    margin: "2px 0 0",
    fontSize: "14px",
    textAlign: "left",
    listStyle: "none",
    backgroundColor: whiteColor,
    backgroundClip: "padding-box",
  },
  menuList: {
    padding: "0",
  },
  pooperResponsive: {
    zIndex: "1200",
    [theme.breakpoints.down("sm")]: {
      zIndex: "1640",
      position: "static",
      float: "none",
      width: "auto",
      marginTop: "0",
      backgroundColor: "transparent",
      border: "0",
      boxShadow: "none",
      color: "black",
    },
  },
  dropdownItem: {
    ...defaultFont,
    fontSize: "13px",
    margin: "0",
    padding: "0 10px",
    borderRadius: "2px",
    position: "relative",
    transition: "all 150ms linear",
    display: "block",
    clear: "both",
    fontWeight: "400",
    height: "100%",
    color: grayColor[8],
    whiteSpace: "nowrap",
    minHeight: "unset",
  },
  darkHover: {
    "&:hover": {
      boxShadow:
        "0 4px 20px 0px rgba(" +
        hexToRgb(blackColor) +
        ", 0.14), 0 7px 10px -5px rgba(" +
        hexToRgb(grayColor[9]) +
        ", 0.4)",
      backgroundColor: grayColor[9],
      color: whiteColor,
    },
  },
  primaryHover: {
    "&:hover": {
      backgroundColor: primaryColor[0],
      color: whiteColor,
      ...primaryBoxShadow,
    },
  },
  secondaryHover: {
    "&:hover": {
      backgroundColor: secondaryColor,
      color: whiteColor,
      ...primaryBoxShadow,
    },
  },
  infoHover: {
    "&:hover": {
      backgroundColor: infoColor[0],
      color: whiteColor,
      ...infoBoxShadow,
    },
  },
  successHover: {
    "&:hover": {
      backgroundColor: successColor[0],
      color: whiteColor,
      ...successBoxShadow,
    },
  },
  warningHover: {
    "&:hover": {
      backgroundColor: warningColor[0],
      color: whiteColor,
      ...warningBoxShadow,
    },
  },
  dangerHover: {
    "&:hover": {
      backgroundColor: dangerColor[0],
      color: whiteColor,
      ...dangerBoxShadow,
    },
  },
  roseHover: {
    "&:hover": {
      backgroundColor: roseColor[0],
      color: whiteColor,
      ...roseBoxShadow,
    },
  },
  grayHover: {
    "&:hover": {
      backgroundColor: grayColor[11],
      ...grayBoxShadow,
    },
  },
  dropdownItemRTL: {
    textAlign: "right",
  },
  dropdownDividerItem: {
    margin: "5px 0",
    backgroundColor: "rgba(" + hexToRgb(blackColor) + ", 0.12)",
    height: "1px",
    overflow: "hidden",
  },
  buttonIcon: {
    width: "20px",
    height: "20px",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
    marginBottom: 1,
  },
  caret: {
    transition: "all 150ms ease-in",
    display: "inline-block",
    width: "0",
    height: "0",
    marginLeft: "4px",
    verticalAlign: "middle",
    borderTop: "4px solid",
    borderRight: "4px solid transparent",
    borderLeft: "4px solid transparent",
  },
  caretActive: {
    transform: "rotate(180deg)",
  },
  caretDropup: {
    transform: "rotate(180deg)",
  },
  caretRTL: {
    marginRight: "4px",
  },
  dropdownHeader: {
    padding: "5px 0px",
    marginTop: "-5px",
    textAlign: "center",
    // fontWeight: "bold",
    color: whiteColor,
    background: primaryColor[0],
    borderRadius: "8px 8px 0px 0px",
    display: "block",
    fontSize: "0.75rem",
    lineHeight: "1.428571",
    whiteSpace: "nowrap",
    minHeight: "24px",
    position: "fixed",
    width: "100%",
    zIndex: "100",
    "&:hover,&:focus": {
      color: whiteColor,
      background: primaryColor[0],
      cursor: "auto"
    },
    "& + li": {
      paddingTop: 20,
    },
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  headerLinksSvg: {
    width: "25px !important",
    height: "25px !important"
  },
  notificationLabel: {
    display: "none",
    color: secondaryColor[0],
    marginRight: 15,
    [theme.breakpoints.down("sm")]: {
      display: "block"
    }
  },
  notificationContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  links: {
    width: "20px",
    height: "20px",
    zIndex: "4",
    color: primaryColor[0],
    // [theme.breakpoints.down("sm")]: {
    //   display: "block",
    //   width: "30px",
    //   height: "30px",
    //   color: "inherit",
    //   opacity: "0.8",
    //   marginRight: "16px",
    //   marginLeft: "-5px"
    // }
  },
  notifications: {
    zIndex: "4",
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      top: "-2px",
      border: "1px solid " + whiteColor,
      right: "-5px",
      fontSize: "9px",
      background: dangerColor[0],
      color: whiteColor,
      minWidth: "16px",
      height: "16px",
      borderRadius: "10px",
      textAlign: "center",
      lineHeight: "14px",
      verticalAlign: "middle",
      display: "block"
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
      marginRight: "8px",
      position: "absolute",
      top: "0px",
      border: "1px solid " + whiteColor,
      right: "-15px",
      background: dangerColor[0],
      color: whiteColor,
      minWidth: "16px",
      height: "16px",
      borderRadius: "10px",
      textAlign: "center",
      lineHeight: "14px",
      verticalAlign: "middle",
      display: "block"
    }
  },
  dropdownMenu: {
    overflowY: "auto",
    maxHeight: "480px",

  },
  dropdownWithHeader: {
    paddingTop: 20
  },
  menuClickAway: {
    maxHeight: "500px"
  }
});

export default customDropdownStyle;
