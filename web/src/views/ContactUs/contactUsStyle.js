import {
    cardTitle,
    container,
    grayColor,
    hexToRgb,
    primaryColor,
    secondaryColor,
    whiteColor,
} from "assets/jss/material-kit-pro-react.js";
import customCheckboxRadioSwitchStyle from "assets/jss/material-kit-pro-react/customCheckboxRadioSwitchStyle.js";

const contactUsStyle = (theme) => ({
    container: {
        ...container,
        zIndex: "2",
        position: "relative",
        paddingTop: "5vh",
        paddingBottom: "5vh",
        color: secondaryColor[0],
    },
    termBody: {
        margin: "30px"
    },
    termsHeader: {
        zIndex: "10",
        color: secondaryColor[0],
        textAlign: "center",
        paddingTop: "28vh",
        [theme.breakpoints.down("sm")]: {
            paddingTop: "25vh",
        }
    },
    pageHeader: {
        minHeight: "400px",
        height: "auto",
        display: "inherit",
        position: "relative",
        margin: "0",
        padding: "0",
        border: "0",
        alignItems: "center",
    },
    cardSendMessage: {
        borderRadius: "19px",
        boxShadow: "0 0 24px 0 rgba(0, 0, 0, 0.09)",
        // height: "140px",
        width: "80%",
        display: "flex",
        justifyContent: "center",
        marginTop: 0
    },
    cardContactUs: {
        borderRadius: "19px",
        boxShadow: "0 0 24px 0 rgba(0, 0, 0, 0.09)",
        height: "140px",
        display: "flex",
        justifyContent: "center"
    },
    iconBorder: {
        width: "48px",
        height: "48px",
        border: "solid 4px rgba(39, 60, 102, 0.07)",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    iconColor: {
        color: secondaryColor[0],
        fontSize: "1.1rem"
    },
    phoneIcon: {
        color: secondaryColor[0] + " !important"
    },
    titleSendMessage: {
        color: secondaryColor[0],
        textAlign: "left"
    },
    iconCenter: {
        display: "flex",
        alignItems: "center"
    },
    cardTitle: {
        ...cardTitle,
        textDecoration: "none",
        marginBottom: "0.75rem",
        color: secondaryColor[0] + " !important"
    },
    cardBody: {
        paddingLeft: "1rem",
        textAlign: "left"
    },
    sendMessageBody: {
        padding: "0.9375rem 3rem"
    },
    imageContainer: {
        display: "flex",
        justifyContent: "center"
    },
    sendMessageContainer: {
        display: "flex",
        justifyContent: "center"
    },
    imageSize: {
        width: "400px",
        height: "300px",
        [theme.breakpoints.down("sm")]: {
            width: "200px",
            height: "150px",
            marginBottom: "30px",
            marginTop: "-50px"
        }

    },
    paddingTop: {
        paddingTop: "10vh",
    },
    formControl: {
        paddingTop: 12,
        paddingBottom: 12,
        "& .MuiInput-formControl": {
            borderColor: secondaryColor[0],
            borderRadius: 10,
            height: 50,
            borderWidth: 1.5
        },
    },
    textAreaFormControl: {
        paddingTop: 12,
        paddingBottom: 12,
        "& .MuiInput-formControl": {
            borderColor: secondaryColor[0],
            borderRadius: 10,
            borderWidth: 1.5
        },
    },
    input: {
        color: secondaryColor[0],
        height: "unset",
        "&,&::placeholder": {
            color: secondaryColor[0],
            fontSize: "15px",
            textAlign: 'left',
            margin: "20px",

        },
        "&::placeholder": {
            color: secondaryColor[0],
            textAlign: "left",
            // paddingLeft: "20px"
        },
    },
    textArea: {
        color: secondaryColor[0],
        height: "unset",
        "&,&::placeholder": {
            color: secondaryColor[0],
            fontSize: "15px",
            textAlign: 'left',
            textIndent: "20px",
            marginTop: "20px",
            marginBottom: "20px"

        },
        "&::placeholder": {
            color: secondaryColor[0],
            textAlign: "left",
            // paddingLeft: "20px"
        },
    },
    ...customCheckboxRadioSwitchStyle,
    textCenter: {
        textAlign: "center",
    },
    inputAdornment: {
        marginRight: "18px",
        position: "relative",
    },
    inputAdornmentIcon: {
        color: grayColor[13],
    },
    form: {
        margin: "0",
    },
    infoArea: {
        color: whiteColor,
        maxWidth: "360px",
        padding: "0px 0px 20px !important",
        margin: "40px 100px 40px 40px",

        [theme.breakpoints.down("xs")]: {
            margin: "40px auto",
        },
    },
    signin: {
        color: primaryColor[0],
        marginBottom: "60px",
    },
    infoAreaLink: {
        "&,& *,&:hover,&:focus": {
            cursor: "pointer",
            color: primaryColor[0],
            textDecoration: "underline",
            fontWeight: "bold",
        },
    },
    titleFont: {
        fontSize: 25,
    },
    title: {
        fontSize: 22,
        marginTop: 30,
        color: secondaryColor[0]
    },
    block: {
        color: "inherit",
        padding: "0.9375rem",
        fontWeight: "500",
        fontSize: "12px",
        textTransform: "uppercase",
        borderRadius: "3px",
        textDecoration: "none",
        position: "relative",
        display: "block",
    },
    inlineBlock: {
        display: "inline-block",
        padding: "0px",
        width: "auto",
    },
    list: {
        marginBottom: "0",
        padding: "0",
        marginTop: "0",
    },
    left: {
        float: "left!important",
        display: "block",
        "&,& *,& *:hover,& *:focus": {
            color: whiteColor + "  !important",
        },
    },
    right: {
        padding: "15px 0",
        margin: "0",
        float: "right",
        "&,& *,& *:hover,& *:focus": {
            color: whiteColor + "  !important",
        },
    },
    icon: {
        width: "18px",
        height: "18px",
        top: "3px",
        position: "relative",
    },
    noPadding: {
        padding: "0",
    },
    cardInfo: {
        backgroundColor: secondaryColor[0],
    },
    cardInputs: {
        backgroundColor: secondaryColor[1],
    },
    buttonFilled: {
        position: "relative",
        float: "right !important",
        width: "100%",
        fontSize: "15px",
        textTransform: "uppercase",
        lineHeight: "20px",
        textDecoration: "none",
        margin: "0px",
        display: "inline-flex",
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: secondaryColor[0],
        borderRadius: "10px",
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
        // "& $icons": {
        //   marginRight: "3px",
        // },
        "&:hover": {
            backgroundColor: "rgba(" + hexToRgb(secondaryColor[0]) + ", 0.8)",
        },
    },
    buttonOutlined: {
        position: "relative",
        float: "right !important",
        width: "100%",
        fontWeight: "bold",
        fontSize: "12px",
        textTransform: "capitalize",
        lineHeight: "20px",
        textDecoration: "none",
        margin: "0px",
        display: "inline-flex",
        color: primaryColor[0],
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: primaryColor[0],
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
        // "& $icons": {
        //   marginRight: "3px",
        // },
        "&:hover": {
            backgroundColor: "rgba(" + hexToRgb(grayColor[2]) + ", 0.8)",
            color: primaryColor[0],
        },
        "&:focus": {
            color: primaryColor[0],
        },
    },
    rowContainer: {
        marginTop: 10,
        marginBottom: 10,
    },
    socials: {
        position: "absolute",
        left: "15px",
        fontSize: "1.1rem",
    },
});

export default contactUsStyle;
