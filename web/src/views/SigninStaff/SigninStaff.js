/*eslint-disable*/
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { checkValidity } from "utils";
import bgImage from "../../assets/images/banner-bg.png";
import signinStaffPageStyle from "./signinStaffStyle.js";
import InputWithLabel from "components/TextInputs/InputWithLabel/InputWithLabel.js";
import PasswordInput from "components/TextInputs/PasswordInput/PasswordInput";
import { signInStaff } from "../../store/actions";
import strings from "constants/strings";
import ErrorModal from "components/ErrorModal/ErrorModal.js";
import { Link } from "react-router-dom";
import Loading from "components/Loading/Loading.js";

const useStyles = makeStyles(signinStaffPageStyle);

export default function SigninStaff({ ...rest }) {
  const dispatch = useDispatch();

  const [errorModal, setErrorModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [values, setValues] = React.useState({
    username: {
      value: "",
      validation: {
        required: true,
        minLength: 1,
        maxLength: 50,
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
  // React.useEffect(() => {
  // });
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

  const handleSigninStaff = async () => {
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
        username: values.username.value.trim(),
        password: values.password.value.trim(),
      };

      try {
        await dispatch(signInStaff(signInInfo));
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
    } else {
      setLoading(false);
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
              <Card className={classes.cardSigninStaff}>
                <CardBody className={classes.noPadding}>
                  <GridContainer justify="center">
                    <GridItem
                      className={classes.noPadding + " " + classes.cardInfo}
                      xs={12}
                      sm={6}
                      md={6}
                    >
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
                        <Link to="/termsofuse" className={classes.infoAreaLink}>
                          {strings.termsOfUse[lang]}
                        </Link>
                      </div>
                    </GridItem>
                    <GridItem
                      className={classes.noPadding + " " + classes.cardInputs}
                      xs={12}
                      sm={6}
                      md={6}
                    >
                      <div className={classes.textCenter}>
                        <GridContainer
                          justify="center"
                          // className={classes.verticalPadding}
                        >
                          <GridItem xs={10} sm={10} md={10}>
                            <InputWithLabel
                              labelText={strings.usernameInputLabel[lang]}
                              formControlProps={{
                                fullWidth: true,
                                className: classes.customFormControlClasses,
                              }}
                              value={values.username.value}
                              valid={values.username.isValid}
                              errorMessage={
                                values.username.error &&
                                values.username.error[lang]
                              }
                              inputProps={{
                                onChange: handleChange("username"),
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
                                onClick={handleSigninStaff}
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
