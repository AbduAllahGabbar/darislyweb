import { primaryColor, secondaryColor } from "assets/jss/material-kit-pro-react";

const instructorCard = {
    pointer: {
        cursor: "pointer",
    },
    cardHeader: {
        color: secondaryColor[0],
    },
    justifyContent: {
        WebkitBoxPack: "center !important",
        MsFlexPack: "center !important",
        justifyContent: "center !important"
    },
    rating: {
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        "& .MuiRating-root": {
            color: primaryColor[0],
        }
    },
    numberFont: {
        fontSize: "1.1rem",
        textAlign: "right",
        color: secondaryColor[0]
    },
    icon: {
        color: primaryColor[0],
        fontSize: 175
    }
};

export default instructorCard;
