import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import React, {useEffect} from "react";
import bgImage from "../../assets/images/banner-image.png";
import termsAndConditionsPageStyle from "./termsAndConditionsStyle.js";
import strings from "constants/strings";
import { useSelector } from "react-redux";
const useStyles = makeStyles(termsAndConditionsPageStyle);

export default function TermsAndConditions({ ...rest }) {
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const lang = useSelector((state) => state.lang);
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
            <h1>{strings.termsAndConditions[lang]}</h1>
          </GridItem>
        </GridContainer>
      </div>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <h3 className={classes.termsHeading}>{strings.agreementHeader[lang]}</h3>
            <p className={classes.termBody}>
              {strings.agreementBody[lang]}
            </p>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <h3 className={classes.termsHeading}>{strings.contentHeader[lang]}</h3>
            <p className={classes.termBody}>
              {strings.contentBody[lang]}
            </p>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <h3 className={classes.termsHeading}>{strings.useWebsiteHeader[lang]}</h3>
            <p className={classes.termBody}>
              {strings.useWebsiteBody[lang]}
            </p>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <h3 className={classes.termsHeading}>{strings.purchaseHeader[lang]}</h3>
            <p className={classes.termBody}>
              {strings.purchaseBody[lang]}
            </p>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <h3 className={classes.termsHeading}>{strings.accountsHeader[lang]}</h3>
            <p className={classes.termBody}>
              {strings.accountsBody[lang]}
            </p>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <h3 className={classes.termsHeading}>{strings.privacyHeader[lang]}</h3>
            <p className={classes.termBody}>
              {strings.privacytBody[lang]}
            </p>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <h3 className={classes.termsHeading}>{strings.linksHeader[lang]}</h3>
            <p className={classes.termBody}>
              {strings.linksBody[lang]}
            </p>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <h3 className={classes.termsHeading}>{strings.disclaimerHeader[lang]}</h3>
            <p className={classes.termBody}>
              {strings.disclaimerBody[lang]}
            </p>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <h3 className={classes.termsHeading}>{strings.limitationHeader[lang]}</h3>
            <p className={classes.termBody}>
              {strings.limitationBody[lang]}
            </p>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <h3 className={classes.termsHeading}>{strings.indemnityHeader[lang]}</h3>
            <p className={classes.termBody}>
              {strings.indemnityBody[lang]}
            </p>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <h3 className={classes.termsHeading}>{strings.violationHeader[lang]}</h3>
            <p className={classes.termBody}>
              {strings.violationBody[lang]}
            </p>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <h3 className={classes.termsHeading}>{strings.governingHeader[lang]}</h3>
            <p className={classes.termBody}>
              {strings.governingBody[lang]}
            </p>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <h3 className={classes.termsHeading}>{strings.miscellaneousHeader[lang]}</h3>
            <p className={classes.termBody}>
              {strings.miscellaneousBody[lang]}
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
            <h3 className={classes.termsHeading}>{strings.feedbackHeader[lang]}</h3>
            <p className={classes.termBody}>
              {strings.feedbackBody[lang]}
            </p>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <h3 className={classes.termsHeading}>{strings.paymentHeader[lang]}</h3>
            <p className={classes.termBody}>
              {strings.paymentBody[lang]}
            </p>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
