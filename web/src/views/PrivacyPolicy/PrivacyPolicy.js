import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import React, {useEffect} from "react";
import bgImage from "../../assets/images/banner-image.png";
import privacyPolicyPageStyle from "./privacyPolicyStyle.js";
import strings from "constants/strings";
import { useSelector } from "react-redux";
const useStyles = makeStyles(privacyPolicyPageStyle);

export default function PrivacyPolicy({ ...rest }) {
    const classes = useStyles();

    const lang = useSelector((state) => state.lang);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div>
            <div
                className={classes.pageHeader}
                style={{
                    backgroundImage: "url(" + bgImage + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                    backgroundColor: "white",
                }}
            >
                <GridContainer justify="center" className={classes.termsHeader}>
                    <GridItem xs={12} sm={12} md={12}>
                        <h1>{strings.privacyPolicy[lang]}</h1>
                    </GridItem>
                </GridContainer>
            </div>
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <p className={classes.termBody}>
                            {strings.firstParagraphPrivacy[lang]}
                        </p>
                    </GridItem>
                </GridContainer>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <h3 className={classes.termsHeading}>{strings.collectionHeader[lang]}</h3>
                        <p className={classes.termBody}>
                            {strings.collectionParagraph[lang]}
                        </p>
                    </GridItem>
                </GridContainer>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <h3 className={classes.termsHeading}>{strings.disclosureHeader[lang]}</h3>
                        <p className={classes.termBody}>
                            {strings.disclosureParagraph[lang]}
                        </p>
                    </GridItem>
                </GridContainer>
            </div>
        </div>
    );
}
