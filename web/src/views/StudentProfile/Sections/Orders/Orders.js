import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import CustomModal from "components/CustomModal/CustomModal.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Loading from "components/Loading/Loading.js";
import Table from "components/Table/Table.js";
import strings from "constants/strings.js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "services/api";
import { formatAMPM, getDateString, translateNumber } from "utils/index.js";
import styles from "./ordersStyle.js";
import ErrorModal from "components/ErrorModal/ErrorModal.js";

const useStyles = makeStyles(styles);

export default function Orders(props) {
  const lang = useSelector((state) => state.lang);
  const classes = useStyles();
  const [orders, setOrders] = useState(null);
  const [orderItems, setOrderItems] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(true);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const orders = (await api.getStudentOrders()).data.data;
        setOrders(orders);
        setOrdersLoading(false);
      } catch (err) {
        setErrorModalOpen(true);
      }
    })();
  }, []);
  let ordersData = [];

  const viewHandler = async (orderId) => {
    setModalOpen(true);
    try {
      const orderItems = (await api.getStudentOrderItems(orderId)).data
        .orderItems;
      setOrderItems(orderItems);
      setModalLoading(false);
    } catch (err) {
      setErrorModalOpen(true);
      setModalOpen(false);
    }
  };
  if (orders) {
    orders.forEach((order, index) => {
      ordersData.push([
        <span key={index}>
          {order.token ? translateNumber(order.token.toString(), lang) : ""}
        </span>,
        <span key={index}>
          {getDateString(new Date(order.createdAt), lang, true)}
        </span>,
        <span key={index}>{strings.orderStatus[order.status][lang]}</span>,
        <span key={index}>
          {order.total
            ? translateNumber(order.total.toString(), lang)
            : translateNumber("0", lang)}
        </span>,
        <Button
          key={index}
          onClick={() => viewHandler(order.id)}
          color="primary"
          className={classes.button}
          round
        >
          {strings.view[lang]}
        </Button>,
      ]);
    });
  }
  let orderItemsData = [];
  if (orderItems) {
    orderItems.forEach((item, index) => {
      orderItemsData.push([
        <span key={index}>{item.subject.name[lang]}</span>,
        <span key={index}>
          {item.tutor.firstName + " " + item.tutor.lastName}
        </span>,
        <span key={index}>{item.lecture.title}</span>,
        <span key={index}>
          {getDateString(new Date(item.session.date), lang, true)}
        </span>,
        <Button
          key={index}
          disabled
          color={"primary"}
          className={classes.button}
          round
        >
          <span style={{ textTransform: "lowercase" }}>
            {formatAMPM(item.session.from, lang)}
          </span>
          <span>&nbsp; - &nbsp;</span>
          <span style={{ textTransform: "lowercase" }}>
            {formatAMPM(item.session.to, lang)}
          </span>
        </Button>,
        <span key={index}>{translateNumber(item.price.toString(), lang)}</span>,
      ]);
    });
  }
  const onCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => {
      setModalLoading(true);
    }, 200);
  };
  return (
    <GridContainer justify="center">
      <GridItem
        xs={12}
        sm={12}
        md={10}
        className={classes.gridItem}
        style={{ marginTop: 20 }}
      >
        <ErrorModal
          open={errorModalOpen}
          onClose={() => setErrorModalOpen(false)}
        />
        <CustomModal open={modalOpen} onClose={onCloseModal}>
          <Loading style={{ height: 175 }} loading={modalLoading}>
            <Table
              tableHead={[
                strings.subject[lang],
                strings.tutor[lang],
                strings.lecture[lang],
                strings.date[lang],
                strings.time[lang],
                strings.price[lang],
              ]}
              tableData={orderItemsData}
              tableHeaderColor="secondary"
              round
            />
          </Loading>
          <div className={classes.modalButtonContainer}>
            <Button
              justIcon
              round
              color="secondary"
              className={classes.modalButton}
              onClick={onCloseModal}
            >
              {strings.ok[lang]}
            </Button>
          </div>
        </CustomModal>
        <Loading loading={ordersLoading}>
          <Table
            tableHead={[
              strings.orderNumber[lang],
              strings.date[lang],
              strings.status[lang],
              strings.price[lang],
              " ",
            ]}
            tableData={ordersData}
            tableHeaderColor="secondary"
            round
            pagination
          />
        </Loading>
      </GridItem>
    </GridContainer>
  );
}
