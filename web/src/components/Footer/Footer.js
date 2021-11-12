import { makeStyles } from "@material-ui/core/styles";
import logo from "assets/images/white-logo.png";
import { whiteColor } from "assets/jss/material-kit-pro-react.js";
import classNames from "classnames";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import PropTypes from "prop-types";
import React from "react";
import styles from "./footerStyle.js";
import strings from "constants/strings.js";
import { useSelector } from "react-redux";
import { translateNumber } from "utils";
import { Link } from "react-router-dom";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const lang = useSelector((state) => state.lang);
  const { children, theme, big, className } = props;
  const classes = useStyles();
  const themeType =
    theme === "transparent" || theme === undefined ? false : true;
  const footerClasses = classNames({
    [classes.footerClass]: true,
    [classes[theme]]: themeType,
    [classes.big]: big || children !== undefined,
    [className]: className !== undefined,
  });

  const openInstagram = () => {
    const win = window.open("https://instagram.com/darisly.egy?igshid=qkmhzpw9s3fc", "_blank");
  };

  const openFacebook = () => {
    const win = window.open("https://facebook.com/Darisly.egy", "_blank");
  };
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div>
          <div className={classes.content}>
            <div className={classes.footer}>
              <GridContainer justify="center" className={classes.gridContainerMarginLeft}>
                <GridItem xs={12} sm={3} md={3} style={{ margin: "auto" }}>
                  <Link to="/home">
                    <img
                      src={logo}
                      alt="Darisly App Logo"
                      className={classes.appLogo}
                    />
                  </Link>
                  <p>
                    {strings.footerParagraph[lang]}
                  </p>
                </GridItem>
                <GridItem xs={6} sm={2} md={2} style={{ margin: "auto" }}>
                  {/* <h5>{strings.menu[lang]}</h5> */}
                  <ul className={classes.linksVertical}>
                    <li>
                      <Link to="/home">- {strings.homeNavLink[lang]}</Link>
                    </li>
                    <li>
                      <Link to="signup">- {strings.becomeStudent[lang]}</Link>
                    </li>
                    <li>
                      <Link to="aboutus">- {strings.aboutUs[lang]}</Link>
                    </li>
                    <li>
                      <Link to="contactus">- {strings.contactUs[lang]}</Link>
                    </li>
                  </ul>
                </GridItem>
                <GridItem xs={6} sm={2} md={2} style={{ margin: "auto" }}>
                  {/* <h5>{strings.menu[lang]}</h5> */}
                  <ul className={classes.linksVertical}>
                    <li>
                      <Link to="faq">- {strings.FAQ[lang]}</Link>
                    </li>
                    <li>
                      <Link to="whydarisly">- {strings.whyDarisly[lang]}</Link>
                    </li>
                    <li>
                      <Link to="termsofuse">- {strings.termsAndConditions[lang]}</Link>
                    </li>
                    <li>
                      <Link to="privacypolicy">- {strings.privacyPolicy[lang]}</Link>
                    </li>
                  </ul>
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
        <div>
          <ul className={classes.socialButtons}>
            <li>
              <Button
                justIcon
                simple
                onClick={openFacebook}
                color="white"
                className={classes.socialIconMargin}
              >
                <i className={"fab fa-facebook " + classes.logoSize} />
              </Button>
            </li>
            {/* <li>
              <Button
                justIcon
                simple
                href="#pablo"
                color="white"
                className={classes.socialIconMargin}
              >
                <i className={"fab fa-twitter " + classes.logoSize} />
              </Button>
            </li> */}

            {/* <li>
              <Button
                justIcon
                simple
                href="#pablo"
                color="white"
                className={classes.socialIconMargin}
              >
                <i className={"fab fa-youtube " + classes.logoSize} />
              </Button>
            </li> */}
            <li>
              <Button
                justIcon
                simple
                onClick={openInstagram}
                color="white"
                className={classes.socialIconMargin}
              >
                <i className={"fab fa-instagram " + classes.logoSize} />
              </Button>
            </li>
          </ul>
          <div className={classNames(classes.pullCenter, classes.copyRight)}>
            {strings.copyright[lang]} &copy; {translateNumber((1900 + new Date().getYear()).toString(), lang)}{" "}
            <Link to="/home" style={{ color: whiteColor }}>
              {strings.darisly[lang]}.
            </Link>{" "}
            {strings.allRights[lang]}
          </div>
        </div>
        <div className={classes.clearFix} />
      </div>
    </footer>
  );
}

Footer.propTypes = {
  theme: PropTypes.oneOf(["dark", "white", "transparent"]),
  big: PropTypes.bool,
};
