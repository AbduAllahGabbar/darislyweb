import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import bgImage from "../../assets/images/banner-image.png";
import videoImage from "../../assets/images/video-image.png";
import partnerImage from "../../assets/images/partner-image.png";
import aboutUsPageStyle from "./aboutUsStyle.js";
import Button from "components/CustomButtons/Button.js";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import strings from "constants/strings";
import { useSelector } from "react-redux";

const useStyles = makeStyles(aboutUsPageStyle);

export default function AboutUs({ ...rest }) {

    const classes = useStyles();

    const lang = useSelector((state) => state.lang);

    const history = useHistory();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleStudentApply = () => {
        history.push({
            pathname: "/signup",
        });
    };
    return (
        <div>
            <Header
                links={<HeaderLinks dropdownHoverColor="gray" />}
                fixed
                color="secondary"
            />
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
                        <h1>{strings.aboutUs[lang]}</h1>
                    </GridItem>
                </GridContainer>

            </div>
            <div className={classes.container}>
                <GridContainer className={classes.centerText}>
                    <GridItem
                        xs={12}
                        sm={8}
                        md={8}
                        className={classes.mlAuto + " " + classes.mrAuto}
                    >
                        <h2 className={classes.title}>{strings.ourChallenge[lang]}</h2>
                        <h5 className={classes.description}>
                            {strings.ourChallengeBody[lang]}
                        </h5>
                    </GridItem>
                </GridContainer>
                <GridContainer className={classes.centerText}>
                    <GridItem
                        xs={12}
                        sm={8}
                        md={8}
                        className={classes.mlAuto + " " + classes.mrAuto}
                    >
                        <h2 className={classes.title}>{strings.darisly[lang]}</h2>
                        <h5 className={classes.description}>
                            {strings.darislyBody[lang]}
                        </h5>
                    </GridItem>
                </GridContainer>
                <GridContainer className={classes.centerText}>
                    <GridItem
                        xs={12}
                        sm={8}
                        md={8}
                        className={classes.mlAuto + " " + classes.mrAuto}
                    >
                        <h2 className={classes.title}>{strings.ourMission[lang]}</h2>
                        <h5 className={classes.description}>
                            {strings.ourMissionBody[lang]}
                        </h5>
                    </GridItem>
                </GridContainer>
                <GridContainer className={classes.centerText}>
                    <GridItem
                        xs={12}
                        sm={8}
                        md={8}
                        className={classes.mlAuto + " " + classes.mrAuto}
                    >
                        <h2 className={classes.title}>{strings.value[lang]}</h2>
                        <h5 className={classes.description}>
                            {strings.valueBody1[lang]}
                        </h5>
                        <h5 className={classes.description}>
                            {strings.valueBody2[lang]}
                        </h5>
                    </GridItem>
                </GridContainer>
                {/* <GridContainer justify="center">
                    <GridItem
                        xs={12}
                        sm={8}
                        md={8}
                        className={classes.centerImage}>
                        <div
                            className={classes.video}
                            style={{
                                backgroundImage: `url(${videoImage})`,
                            }}
                        >
                            <i className={"fas fa-play-circle " + classes.playIcon} />
                        </div>
                    </GridItem>
                </GridContainer> */}
                <GridContainer justify="center" className={classes.becomeStudentMarginTop}>
                    <GridItem
                        xs={12}
                        sm={6}
                        md={6}>
                        <GridContainer justify="center">
                            <GridItem xs={10}
                                sm={10}
                                md={3}
                                className={classes.centerPartner}>

                                <img src={partnerImage} className={classes.imageSize} />
                            </GridItem>
                            <GridItem xs={10}
                                sm={10}
                                md={6}
                                className={classes.centerStudentParagraph}>
                                <h4 className={classes.becomeStudentHeader}>{strings.becomeStudent[lang]}</h4>
                                <p className={classes.becomeStudentParagraph}>{strings.becomeStudentParagraph[lang]}</p>
                                <Button
                                    onClick={handleStudentApply}
                                    color="primary"
                                    round
                                    className={classes.applyButton}
                                >
                                    <AddCircleIcon
                                        className={classes.addIcon}
                                    />
                                    {strings.applyNow[lang]}
                                </Button>
                            </GridItem>
                        </GridContainer>
                    </GridItem>

                </GridContainer>
            </div>
        </div>
    );
}
