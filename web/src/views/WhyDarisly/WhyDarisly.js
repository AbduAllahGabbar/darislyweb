import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import React, {useEffect} from "react";
import bgImage from "../../assets/images/banner-image.png";
import whyDarislyPageStyle from "./whyDarislyStyle.js";
import strings from "constants/strings";
import { useSelector } from "react-redux";
const useStyles = makeStyles(whyDarislyPageStyle);

export default function WhyDarisly({ ...rest }) {
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
                        <h1>{strings.whyDarisly[lang]}</h1>
                    </GridItem>
                </GridContainer>
            </div>
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <p className={classes.termBody}>
                            {strings.firstParagraphWhy[lang]}
                        </p>
                        <ul className={classes.bulletsMargin}>
                            <li className={classes.termBody}>{strings.firstBullet[lang]}</li>
                            <li className={classes.termBody}>{strings.secondBullet[lang]}</li>
                            <li className={classes.termBody}>{strings.thirdBullet[lang]}</li>
                            <li className={classes.termBody}>{strings.fourthBullet[lang]}</li>
                            <li className={classes.termBody}>{strings.fifthBullet[lang]}</li>
                            <li className={classes.termBody}>{strings.sixthBullet[lang]}</li>
                            <li className={classes.termBody}>{strings.seventhBullet[lang]}</li>
                            <li className={classes.termBody}>{strings.eighthBullet[lang]}</li>
                        </ul>
                        <p className={classes.termBody}>
                            {strings.lastParagraphWhy[lang]}
                        </p>
                    </GridItem>
                </GridContainer>
            </div>
        </div>
    );
}
