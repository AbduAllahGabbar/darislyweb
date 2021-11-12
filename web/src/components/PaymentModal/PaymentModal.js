import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Button from "components/CustomButtons/Button";
import CustomModal from "components/CustomModal/CustomModal";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Loading from "components/Loading/Loading";
import SelectInput from "components/SelectInput/SelectInput";
import strings from "constants/strings.js";
import enums from "enums/index.js";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./paymentModalStyle.js";

const useStyles = makeStyles(styles);

export default function PaymentModal(props) {
  const classes = useStyles();
  const { active, isOpen, handleReturn, handleReceive, handleClose } = props;
  const lang = useSelector((state) => state.lang);
  const [paymentType, setPaymentType] = useState({ value: "", error: null });
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);

  const validatePayment = async () => {
    if (active == "validate" && String(paymentType.value) == "") {
      setPaymentType({ ...paymentType, error: strings.errors.required });
    } else {
      setLoading(true);
      await handleReceive(paymentType.value, discount);
      setLoading(false);
      setPaymentType({ value: "", error: null });
    }
  };

  const handleSelectType = async (event) => {
    setPaymentType({ ...paymentType, value: event.target.value });
  };

  const handleDiscount = async (event) => {
    setDiscount(event.target.checked ? 1 : 0);
  };

  const paymentTypesData = Object.values(enums.OrderTypes).map((val) => {
    return { value: val, name: strings.orderTypes[val][lang] };
  });

  const paymentModal = {
    validate: {
      title: <h3>{strings.payment[lang]}</h3>,
      message: "",
      buttons: [
        {
          text: strings.cancel[lang],
          onClick: handleClose,
          color: "secondary",
        },
        {
          text: strings.orderActions[enums.OrderStatus.VALIDATE][lang],
          onClick: validatePayment,
          color: "primary",
        },
      ],
    },
    return: {
      title: <h3>{strings.payment[lang]}</h3>,
      message: strings.wantToReturnPayment[lang],
      buttons: [
        {
          text: strings.no[lang],
          onClick: handleClose,
          color: "secondary",
        },
        {
          text: strings.yes[lang],
          onClick: handleReturn,
          color: "primary",
        },
      ],
    },
    success: {
      title: <CheckCircleIcon className={classes.checkIcon} />,
      message: strings.transactionCompleted[lang],
      buttons: [
        {
          text: strings.ok[lang],
          onClick: handleClose,
          color: "primary",
        },
      ],
    },
    error: {
      title: <CancelIcon className={classes.cancelIcon} />,
      message: strings.somethingWrong[lang],
      buttons: [
        {
          text: strings.cancel[lang],
          onClick: handleClose,
          color: "secondary",
        },
      ],
    },
  };

  const choosePaymentType = (
    <GridContainer justify="center" className={classes.rowContainer}>
      <GridItem xs={12} sm={12} md={4} className={classes.gridItem}>
        <div className={classes.label}>{strings.paymentType[lang]}</div>
      </GridItem>
      <GridItem xs={12} sm={12} md={8} className={classes.gridItem}>
        <SelectInput
          selectStyle={classes.select}
          id={1}
          placeholder={strings.choosePaymentType[lang]}
          data={paymentTypesData}
          value={paymentType.value}
          onSelect={handleSelectType}
          errorMessage={paymentType.error && paymentType.error[lang]}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={4} className={classes.gridItem}>
        <div className={classes.label}>{strings.discount[lang]}</div>
      </GridItem>
      <GridItem
        xs={12}
        sm={12}
        md={8}
        className={classes.gridItem + " " + classes.switchContainer}
      >
        <Switch
          checked={discount}
          onChange={handleDiscount}
          classes={{
            switchBase: classes.switchBase,
            checked: classes.switchChecked,
            thumb: classes.switchIcon,
            track: classes.switchBar,
          }}
          name="checkedDiscount"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
      </GridItem>
    </GridContainer>
  );

  return (
    <CustomModal style={{ marginTop: 0 }} open={isOpen} onClose={handleClose}>
      <div>
        <div className={classes.titleContainer}>
          {paymentModal[active].title}
        </div>

        {active == "validate" ? choosePaymentType : null}

        <p className={classes.modalBody}>{paymentModal[active].message}</p>
        <div className={classes.buttonsContainer}>
          {paymentModal[active].buttons.map((button, index) => {
            return active === "validate" && index === 1 ? (
              <div style={{ width: "40%" }}>
                <Loading loading={loading}>
                  <Button
                    key={index}
                    justIcon
                    round
                    color={button.color}
                    className={classes.modalButton}
                    style={{ width: "100%" }}
                    onClick={button.onClick}
                  >
                    {button.text}
                  </Button>
                </Loading>
              </div>
            ) : (
              <Button
                key={index}
                justIcon
                round
                color={button.color}
                className={classes.modalButton}
                onClick={button.onClick}
              >
                {button.text}
              </Button>
            );
          })}
        </div>
      </div>
    </CustomModal>
  );
}

PaymentModal.propTypes = {
  active: PropTypes.oneOf(["validate", "return", "success", "error"]),
  isOpen: PropTypes.bool,
  handleReturn: PropTypes.func,
  handleReceive: PropTypes.func,
  handleClose: PropTypes.func,
};
