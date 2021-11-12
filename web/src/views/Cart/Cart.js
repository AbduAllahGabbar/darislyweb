import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import ErrorModal from "components/ErrorModal/ErrorModal.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import strings from "constants/strings.js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { removeFromCart } from "store/actions";
import { formatAMPM, getDateString, translateNumber } from "utils/index.js";
import api from "services/api";
import styles from "./cartStyle.js";

const useStyles = makeStyles(styles);

export default function Cart(props) {
  const lang = useSelector((state) => state.lang);
  const classes = useStyles();
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const [tax, setTax] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    (async () => {
      try {
        const tax = (await api.getTaxes()).data.tax / 100;
        setTax(tax);
      } catch (err) {
        console.log(err);
        setErrorModalOpen(true);
      }
    })();
  }, []);

  const handleRemoveFromCart = (itemId) => async () =>
    dispatch(removeFromCart(itemId));

  let cartItemsData = [];
  if (cart.items.length > 0) {
    cart.items.forEach((item, index) => {
      if (item.type === 0) {
        cartItemsData.push([
          <span key={index}>
            {item.data.session.lecture.course.subject.name[lang]}
          </span>,
          <span key={index}>
            {item.data.session.lecture.course.tutor.firstName +
              " " +
              item.data.session.lecture.course.tutor.lastName}
          </span>,
          <span key={index}>{item.data.session.lecture.title}</span>,
          <span key={index}>
            {getDateString(new Date(item.data.session.date), lang, true)}
          </span>,
          <Button
            key={index}
            disabled
            color={"primary"}
            className={classes.button}
            round
          >
            <span style={{ textTransform: "lowercase" }}>
              {formatAMPM(item.data.session.from, lang)}
            </span>
            <span>&nbsp; - &nbsp;</span>
            <span style={{ textTransform: "lowercase" }}>
              {formatAMPM(item.data.session.to, lang)}
            </span>
          </Button>,
          <span key={index}>
            {translateNumber(
              // item.data.session.lecture.price
              Number(
                Number(item.data.session.lecture.price * (1 + tax)) +
                  Number(item.serviceCharge)
              )
                .toFixed(2)
                .toString(),
              lang
            )}
          </span>,
          <Button
            key={index}
            color="danger"
            className={classes.button}
            onClick={handleRemoveFromCart(item.id)}
            round
          >
            <span>{strings.removeFromCart[lang]}</span>
          </Button>,
        ]);
      }
    });
  }

  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={10} className={classes.gridItem}>
        <ErrorModal
          open={errorModalOpen}
          onClose={() => setErrorModalOpen(false)}
        />
        <div className={classes.cartContainer}>
          <h2 className={classes.cartTitle}>{strings.cart[lang]}</h2>

          {cart.items.length > 0 ? (
            <div className={classes.cartTableContainer}>
              <div className={classes.cartContainerTitle}>
                <h3 className={classes.cartSessions}>
                  {strings.sessions[lang]}
                </h3>
                <Button
                  color="primary"
                  className={classes.proceedButton}
                  onClick={() =>
                    history.push({
                      pathname: "/ordersummary",
                    })
                  }
                  round
                >
                  <span>{strings.proceedToCheckout[lang]}</span>
                </Button>
              </div>
              <Table
                tableHead={[
                  strings.subject[lang],
                  strings.tutor[lang],
                  strings.lecture[lang],
                  strings.date[lang],
                  strings.time[lang],
                  strings.price[lang],
                  " ",
                ]}
                tableData={cartItemsData}
                tableHeaderColor="secondary"
                round
              />
            </div>
          ) : (
            <h3 className={classes.noCartItemsTitle}>
              {strings.noCartItems[lang]}
            </h3>
          )}
        </div>
      </GridItem>
    </GridContainer>
  );
}
