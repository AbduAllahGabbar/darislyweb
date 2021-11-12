import {
    container,
    description, 
    grayColor,
    mlAuto,
    mrAuto, 
    secondaryColor,
    title, 
    whiteColor
} from "assets/jss/material-kit-pro-react.js";

const aboutUsStyle = (theme) => ({
    mlAuto,
    mrAuto,
    video: {
        borderRadius: 20,
        height: "250px",
        width: "550px",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        cursor: "pointer",
        [theme.breakpoints.down("sm")]: {
            height: "150px",
            width: "300px",
        }
    },
    playIcon: {
        zIndex: 10,
        position: "absolute",
        top: "40%",
        left: "47%",
        color: whiteColor,
        fontSize: "3rem",
        [theme.breakpoints.down("sm")]: {
            left: "45%",
            fontSize: "2.5rem",
        }
    },
    imageSize: {
        width: "132px",
        height: "115px",
        marginTop: "15px"
    },
    becomeStudentParagraph: {
        fontSize: "12px",
        lineHeight: 1.43,
        color: grayColor[26],
        textAlign: "left",
        [theme.breakpoints.down("sm")]: {
            textAlign: "center",
        }

    },
    becomeStudentHeader: {
        textAlign: "left"
    },
    applyButton: {
        display: "flex"
    },
    addIcon: {
        marginRight: "10px !important",
        marginLeft: "-10px !important"
    },
    centerImage: {
        display: "flex",
        justifyContent: "center",
        marginTop: 60,
        marginBottom: 60
    },
    centerPartner: {
        [theme.breakpoints.down("sm")]: {
            display: "flex",
            justifyContent: "center"
        }
    },
    centerStudentParagraph: {
        [theme.breakpoints.down("sm")]: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }
    }
    ,
    title: {
        ...title,
        color: secondaryColor[0],
    },
    description: {
        ...description,
        color: secondaryColor[0],
        textAlign: "justify"
    },
    centerText: {
        textAlign: "center"
    },
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
    becomeStudentMarginTop: {
        marginTop: 60,
        marginBottom: 60
    },
});

export default aboutUsStyle;
