import {
    container,
    secondaryColor
} from "assets/jss/material-kit-pro-react.js";

const FAQStyle = (theme) => ({
    container: {
        ...container,
        zIndex: "2",
        position: "relative",
        paddingTop: "5vh",
        paddingBottom: "5vh",
        color: secondaryColor[0],
    },
    termBody: {
        margin: "30px",
        textAlign: "left",
        whiteSpace: "pre-line"
    },
    termsHeading: {
        textAlign: "left",
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
    cardFAQ: {
        boxShadow: "none",
        marginBottom: "100px",
        backgroundColor: "transparent",
    },
});

export default FAQStyle;
