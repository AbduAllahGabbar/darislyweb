/*eslint-disable*/
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// core components
import InfoArea from "components/InfoArea/InfoArea.js";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { checkValidity } from "utils";
import bgImage from "../../assets/images/banner-bg.png";
import signinPageStyle from "./signinStyle.js";
import InputWithLabel from "components/TextInputs/InputWithLabel/InputWithLabel.js";
import PasswordInput from "components/TextInputs/PasswordInput/PasswordInput";
import { signInStudent } from "../../store/actions";
import { Link } from "react-router-dom";
import enums from "enums";
import strings from "constants/strings";
import ErrorModal from "components/ErrorModal/ErrorModal.js";
import Loading from "components/Loading/Loading.js";

const useStyles = makeStyles(signinPageStyle);

export default function Signin({ ...rest }) {
  const dispatch = useDispatch();
  const [errorModal, setErrorModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [values, setValues] = React.useState({
    email: {
      value: "",
      validation: {
        required: true,
        minLength: 1,
        maxLength: 50,
        email: true,
      },
      valid: false,
      error: null,
    },
    password: {
      value: "",
      validation: {
        required: true,
        minLength: 8,
        maxLength: 50,
        password: true,
      },
      valid: false,
      error: null,
      show: false,
    },
  });

  const lang = useSelector((state) => state.lang);

  const classes = useStyles();

  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (prop) => (event) => {
    const updatedElement = { ...values[prop] };
    updatedElement.value = event.target.value;

    setValues({ ...values, [prop]: updatedElement });
  };

  const handleSignin = async () => {
    setLoading(true);
    let isFormValid = true;
    let updatedValues = { ...values };
    Object.keys(updatedValues).forEach((key) => {
      const updatedElement = { ...updatedValues[key] };
      let val = updatedElement.value;

      updatedElement.error = checkValidity(
        val.trim(),
        updatedElement.validation
      );
      updatedElement.valid = updatedElement.error === null;
      if (
        key == "password" &&
        !updatedElement.valid &&
        updatedElement.error[lang] === strings.passwordInvalidError[lang]
      )
        updatedElement.error = strings.passwordInputHelper;
      updatedValues = { ...updatedValues, [key]: updatedElement };
      isFormValid = isFormValid && updatedElement.valid;
    });
    setValues(updatedValues);

    if (isFormValid) {
      let signInInfo = {
        id: values.email.value.trim(),
        password: values.password.value.trim(),
      };

      try {
        await dispatch(signInStudent(signInInfo));
        history.push("/");
      } catch (err) {
        if (err.response?.data?.errors?.length) {
          err.response.data.errors.forEach((error) => {
            if (error.location && error.location === "body") {
              const updatedElement = { ...updatedValues[error.param] };
              updatedElement.error = error.msg;
              updatedElement.valid = false;
              updatedValues = {
                ...updatedValues,
                [error.param]: updatedElement,
              };
              setValues(updatedValues);
            }
          });
        } else {
          setErrorModal(true);
        }
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <ErrorModal open={errorModal} onClose={() => setErrorModal(false)} />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + bgImage + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundColor: "white",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Card className={classes.cardSignin}>
                <CardBody className={classes.noPadding}>
                  <GridContainer justify="center">
                    <GridItem
                      className={classes.noPadding + " " + classes.cardInfo}
                      xs={12}
                      sm={6}
                      md={6}
                    >
                      <div className={classes.paddingText}>
                        <InfoArea
                          className={classes.infoArea + " " + classes.titleFont}
                          description={strings.goodToSeeYou[lang]}
                        />
                        <div className={classes.infoArea}>
                          {strings.blueHeader3[lang]} &nbsp;
                          <Link
                            to="/privacypolicy"
                            className={classes.infoAreaLink}
                          >
                            {strings.privacyPolicy[lang]}
                          </Link>
                          &nbsp;{strings.blueHeader4[lang]} &nbsp;
                          <Link
                            to="/termsofuse"
                            className={classes.infoAreaLink}
                          >
                            {strings.termsOfUse[lang]}
                          </Link>
                        </div>
                      </div>
                    </GridItem>
                    <GridItem
                      className={classes.noPadding + " " + classes.cardInputs}
                      xs={12}
                      sm={6}
                      md={6}
                    >
                      <div className={classes.textCenter}>
                        <GridContainer justify="center">
                          <GridItem
                            xs={10}
                            sm={10}
                            md={8}
                            className={classes.rowContainer}
                          >
                            <a
                              href={`${process.env.REACT_APP_API_HOST}/auth/google`}
                            >
                              <Button
                                color="white"
                                target="_blank"
                                className={classes.buttonOutlined}
                                round
                              >
                                <i
                                  className={"fab fa-google " + classes.socials}
                                />
                                {strings.signInGoogle[lang]}
                              </Button>
                            </a>
                          </GridItem>
                        </GridContainer>
                        {/* <GridContainer justify="center">
                          <GridItem
                            xs={10}
                            sm={10}
                            md={8}
                            className={classes.rowContainer}
                          >
                            <a
                              href={`${process.env.REACT_APP_API_HOST}/auth/facebook`}
                            >
                              <Button
                                color="white"
                                target="_blank"
                                className={classes.buttonOutlined}
                                round
                              >
                                <i
                                  className={
                                    "fab fa-facebook " + classes.socials
                                  }
                                />
                                {strings.signInFacebook[lang]}
                              </Button>
                            </a>
                          </GridItem>
                        </GridContainer> */}
                        {/* <GridContainer justify="center">
                          <GridItem
                            xs={10}
                            sm={10}
                            md={8}
                            className={classes.rowContainer}
                          >
                            <a
                              href={`${process.env.REACT_APP_API_HOST}/auth/twitter`}
                            >
                              <Button
                                color="white"
                                target="_blank"
                                className={classes.buttonOutlined}
                                round
                              >
                                <i
                                  className={
                                    "fab fa-twitter " + classes.socials
                                  }
                                />
                                {strings.signInTwitter[lang]}
                              </Button>
                            </a>
                          </GridItem>
                        </GridContainer> */}
                        <GridContainer
                          justify="center"
                          // className={classes.verticalPadding}
                        >
                          <GridItem xs={10} sm={10} md={10}>
                            <InputWithLabel
                              labelText={strings.emailInputLabel[lang]}
                              formControlProps={{
                                fullWidth: true,
                                className: classes.customFormControlClasses,
                              }}
                              value={values.email.value}
                              valid={values.email.isValid}
                              errorMessage={
                                values.email.error && values.email.error[lang]
                              }
                              inputProps={{
                                onChange: handleChange("email"),
                              }}
                            />
                          </GridItem>
                        </GridContainer>
                        <GridContainer
                          justify="center"
                          // className={classes.verticalPadding}
                        >
                          <GridItem xs={10} sm={10} md={10}>
                            <PasswordInput
                              labelText={strings.passwordInputLabel[lang]}
                              formControlProps={{
                                fullWidth: true,
                                className: classes.customFormControlClasses,
                              }}
                              // descriptionText={
                              //   strings.passwordInputHelper[lang]
                              // }
                              data={values.password}
                              handleChange={handleChange("password")}
                            />
                          </GridItem>
                        </GridContainer>
                        <GridContainer justify="center">
                          <GridItem xs={10} sm={10} md={10}>
                            <div className={classes.forgotPasswordContainer}>
                              <Link
                                className={classes.forgotPasswordLink}
                                to="/student/forgotpassword"
                              >
                                {strings.forgotPassword[lang]}
                              </Link>
                            </div>
                          </GridItem>
                        </GridContainer>
                        <GridContainer justify="center">
                          <GridItem
                            xs={10}
                            sm={10}
                            md={8}
                            className={classes.rowContainer}
                          >
                            <Loading loading={loading}>
                              <Button
                                color="primary"
                                target="_blank"
                                className={classes.buttonFilled}
                                onClick={handleSignin}
                                round
                              >
                                {strings.signInNavLink[lang]}
                              </Button>
                            </Loading>
                          </GridItem>
                        </GridContainer>
                      </div>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
