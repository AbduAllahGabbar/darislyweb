import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import React, {useEffect} from "react";
import bgImage from "../../assets/images/banner-image.png";
import FAQPageStyle from "./FAQStyle.js";
import strings from "constants/strings";
import { useSelector } from "react-redux";
const useStyles = makeStyles(FAQPageStyle);

export default function FAQ({ ...rest }) {
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
                        <h1>{strings.FAQ[lang]}</h1>
                    </GridItem>
                </GridContainer>
            </div>
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <h3 className={classes.termsHeading}>{strings.question1[lang]}</h3>
                        <p className={classes.termBody}>
                            {strings.answer1[lang]}
                        </p>
                    </GridItem>
                </GridContainer>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <h3 className={classes.termsHeading}>{strings.question2[lang]}</h3>
                        <p className={classes.termBody}>
                            {strings.answer2[lang]}
                        </p>
                    </GridItem>
                </GridContainer>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <h3 className={classes.termsHeading}>{strings.question3[lang]}</h3>
                        <p className={classes.termBody}>
                            {strings.answer3[lang]}
                        </p>
                    </GridItem>
                </GridContainer>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <h3 className={classes.termsHeading}>{strings.question4[lang]}</h3>
                        <p className={classes.termBody}>
                            {strings.answer4[lang]}
                        </p>
                    </GridItem>
                </GridContainer>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <h3 className={classes.termsHeading}>{strings.question5[lang]}</h3>
                        <p className={classes.termBody}>
                            {strings.answer5[lang]}
                        </p>
                    </GridItem>
                </GridContainer>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <h3 className={classes.termsHeading}>{strings.question6[lang]}</h3>
                        <p className={classes.termBody}>
                            {strings.answer6[lang]}
                        </p>
                    </GridItem>
                </GridContainer>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <h3 className={classes.termsHeading}>{strings.question7[lang]}</h3>
                        <p className={classes.termBody}>
                            {strings.answer7[lang]}
                        </p>
                    </GridItem>
                </GridContainer>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <h3 className={classes.termsHeading}>{strings.question8[lang]}</h3>
                        <p className={classes.termBody}>
                            {strings.answer8[lang]}
                        </p>
                    </GridItem>
                </GridContainer>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <h3 className={classes.termsHeading}>{strings.question9[lang]}</h3>
                        <p className={classes.termBody}>
                            {strings.answer9[lang]}
                        </p>
                    </GridItem>
                </GridContainer>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <h3 className={classes.termsHeading}>{strings.question10[lang]}</h3>
                        <p className={classes.termBody}>
                            {strings.answer10[lang]}
                        </p>
                    </GridItem>
                </GridContainer>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <h3 className={classes.termsHeading}>{strings.question11[lang]}</h3>
                        <p className={classes.termBody}>
                            {strings.answer11[lang]}
                        </p>
                    </GridItem>
                </GridContainer>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <h3 className={classes.termsHeading}>{strings.question12[lang]}</h3>
                        <p className={classes.termBody}>
                            {strings.answer12[lang]}
                        </p>
                    </GridItem>
                </GridContainer>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <h3 className={classes.termsHeading}>{strings.question13[lang]}</h3>
                        <p className={classes.termBody}>
                            {strings.answer13[lang]}
                        </p>
                    </GridItem>
                </GridContainer>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <h3 className={classes.termsHeading}>{strings.question14[lang]}</h3>
                        <p className={classes.termBody}>
                            {strings.answer14[lang]}
                        </p>
                    </GridItem>
                </GridContainer>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <h3 className={classes.termsHeading}>{strings.question15[lang]}</h3>
                        <p className={classes.termBody}>
                            {strings.answer15[lang]}
                        </p>
                    </GridItem>
                </GridContainer>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <h3 className={classes.termsHeading}>{strings.question16[lang]}</h3>
                        <p className={classes.termBody}>
                            {strings.answer16[lang]}
                        </p>
                    </GridItem>
                </GridContainer>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <h3 className={classes.termsHeading}>{strings.question17[lang]}</h3>
                        <p className={classes.termBody}>
                            {strings.answer17[lang]}
                        </p>
                    </GridItem>
                </GridContainer>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <h3 className={classes.termsHeading}>{strings.question18[lang]}</h3>
                        <p className={classes.termBody}>
                            {strings.answer18[lang]}
                        </p>
                    </GridItem>
                </GridContainer>
            </div>
        </div>
    );
}
