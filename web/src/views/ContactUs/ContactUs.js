import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { checkValidity } from "utils";
import bgImage from "../../assets/images/banner-image.png";
import contactImage from "../../assets/images/contact-image.jpg";
import contactUsPageStyle from "./contactUsStyle.js";
import PhoneIcon from "@material-ui/icons/Phone";
import InputWithLabel from "components/TextInputs/InputWithLabel/InputWithLabel";
import strings from "constants/strings";
import api from "services/api";
import SuccessModal from "components/SuccessModal/SuccessModal";
import ErrorModal from "components/ErrorModal/ErrorModal.js";

const useStyles = makeStyles(contactUsPageStyle);

export default function ContactUs({ ...rest }) {
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [errorModal, setShowErrorModal] = React.useState(false);
  const [values, setValues] = React.useState({
    name: {
      value: "",
      validation: {
        required: true,
        minLength: 1,
        maxLength: 50,
      },
      valid: false,
      error: null,
    },
    message: {
      value: "",
      validation: {
        required: true,
        minLength: 1,
        maxLength: 300,
      },
      valid: false,
      error: null,
    },
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
  });

  const classes = useStyles();

  const lang = useSelector((state) => state.lang);

  const handleChange = (prop) => (event) => {
    const updatedElement = { ...values[prop] };
    updatedElement.value = event.target.value;

    setValues({ ...values, [prop]: updatedElement });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSendMessage = async () => {
    let isFormValid = true;
    let updatedValues = { ...values };
    Object.keys(updatedValues).forEach((key) => {
      const updatedElement = { ...updatedValues[key] };
      let val = updatedElement.value;

      updatedElement.error = checkValidity(val, updatedElement.validation);
      updatedElement.valid = updatedElement.error === null;
      updatedValues = { ...updatedValues, [key]: updatedElement };
      isFormValid = isFormValid && updatedElement.valid;
    });
    setValues(updatedValues);

    if (isFormValid) {
      try {
        await api.contactUs(
          values.email.value,
          values.name.value,
          values.message.value
        );
        setShowSuccessModal(true);
      } catch (err) {
        setShowErrorModal(true);
      }
    }
  };

  return (
    <div>
      <ErrorModal open={errorModal} onClose={() => setShowErrorModal(false)} />
      <SuccessModal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message={strings.contactUsSuccess[lang]}
      />
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
            <h1>{strings.contactUs[lang]}</h1>
          </GridItem>
        </GridContainer>
      </div>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={4} lg={4}>
            <Card className={classes.cardContactUs}>
              <GridContainer justify="center">
                <GridItem
                  xs={3}
                  sm={3}
                  md={3}
                  lg={3}
                  className={classes.iconCenter}
                >
                  <CardBody>
                    <div className={classes.iconBorder}>
                      <i className={"fas fa-building " + classes.iconColor}></i>
                    </div>
                  </CardBody>
                </GridItem>
                <GridItem xs={9} sm={9} md={9}>
                  <CardBody className={classes.cardBody}>
                    <h5>{strings.visitUs[lang]}</h5>
                    <h4 className={classes.cardTitle}>
                      {strings.addressContact[lang]}
                    </h4>
                  </CardBody>
                </GridItem>
              </GridContainer>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4} lg={4}>
            <Card className={classes.cardContactUs}>
              <GridContainer justify="center">
                <GridItem
                  xs={3}
                  sm={3}
                  md={3}
                  lg={3}
                  className={classes.iconCenter}
                >
                  <CardBody>
                    <div className={classes.iconBorder}>
                      <i className={"fas fa-envelope " + classes.iconColor}></i>
                    </div>
                  </CardBody>
                </GridItem>
                <GridItem xs={9} sm={9} md={9}>
                  <CardBody className={classes.cardBody}>
                    <h5>{strings.emailInputLabel[lang]}</h5>
                    <h4 className={classes.cardTitle}>support@darisly.com</h4>
                  </CardBody>
                </GridItem>
              </GridContainer>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4} lg={4}>
            <Card className={classes.cardContactUs}>
              <GridContainer justify="center">
                <GridItem
                  xs={3}
                  sm={3}
                  md={3}
                  lg={3}
                  className={classes.iconCenter}
                >
                  <CardBody>
                    <div className={classes.iconBorder}>
                      <PhoneIcon className={classes.phoneIcon} />
                    </div>
                  </CardBody>
                </GridItem>
                <GridItem xs={9} sm={9} md={9}>
                  <CardBody className={classes.cardBody}>
                    <h5>{strings.phone[lang]}</h5>
                    <h4 className={classes.cardTitle}>
                      <a href="tel:+201210172424" className={classes.phoneIcon}>
                        {`${lang === "en" ? "+" : ""}201210172424${
                          lang === "en" ? "" : "+"
                        }`}
                      </a>
                    </h4>
                  </CardBody>
                </GridItem>
              </GridContainer>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center" className={classes.paddingTop}>
          <GridItem xs={12} sm={6} md={6} className={classes.imageContainer}>
            <img src={contactImage} className={classes.imageSize} />
          </GridItem>
          {/* <GridItem
            xs={12}
            sm={6}
            md={6}
            className={classes.sendMessageContainer}
          >
            <Card className={classes.cardSendMessage}>
              <GridContainer justify="center">
                <CardBody className={classes.sendMessageBody}>
                  <h3 className={classes.titleSendMessage}>
                    {strings.sendMessage[lang]}
                  </h3>
                  <InputWithLabel
                    formControlProps={{
                      fullWidth: true,
                      className: classes.customFormControlClasses,
                    }}
                    value={values.name.value}
                    valid={values.name.isValid}
                    errorMessage={values.name.error && values.name.error[lang]}
                    placeholder={strings.name[lang]}
                    formControlStyle={classes.formControl}
                    inputStyle={classes.input}
                    inputProps={{
                      onChange: handleChange("name"),
                    }}
                  />
                  <InputWithLabel
                    formControlProps={{
                      fullWidth: true,
                      className: classes.customFormControlClasses,
                    }}
                    value={values.email.value}
                    valid={values.email.isValid}
                    errorMessage={
                      values.email.error && values.email.error[lang]
                    }
                    placeholder={strings.emailInputLabel[lang]}
                    formControlStyle={classes.formControl}
                    inputStyle={classes.input}
                    inputProps={{
                      onChange: handleChange("email"),
                    }}
                  />
                  <InputWithLabel
                    formControlProps={{
                      fullWidth: true,
                      className: classes.customFormControlClasses,
                    }}
                    value={values.message.value}
                    valid={values.message.isValid}
                    type="text"
                    errorMessage={
                      values.message.error && values.message.error[lang]
                    }
                    placeholder={strings.messageInputLabel[lang]}
                    formControlStyle={classes.textAreaFormControl}
                    inputStyle={classes.textArea}
                    inputProps={{
                      onChange: handleChange("message"),
                      multiline: true,
                      rows: 5,
                    }}
                  />
                  <Button
                    color="secondary"
                    //target="_blank"
                    className={classes.buttonFilled}
                    round
                    onClick={handleSendMessage}
                  >
                    {strings.send[lang]}
                  </Button>
                </CardBody>
              </GridContainer>
            </Card>
          </GridItem> */}
        </GridContainer>
      </div>
    </div>
  );
}
