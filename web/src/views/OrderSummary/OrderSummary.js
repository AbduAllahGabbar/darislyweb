import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import ErrorModal from "components/ErrorModal/ErrorModal.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Loading from "components/Loading/Loading.js";
import Table from "components/Table/Table.js";
import strings from "constants/strings.js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import api from "services/api";
import { formatAMPM, getDateString, translateNumber } from "utils/index.js";
import styles from "./orderSummaryStyle.js";

const useStyles = makeStyles(styles);

export default function OrderSummary(props) {
  const lang = useSelector((state) => state.lang);
  const classes = useStyles();
  const [modalLoading, setModalLoading] = useState(true);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const [tax, setTax] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const tax = (await api.getTaxes()).data.tax / 100;
        setTax(tax);
        setModalLoading(false);
      } catch (err) {
        setErrorModalOpen(true);
      }
    })();
  }, []);

  let orderItemsData = [];
  let subtotal = 0;
  let totalService = 0;
  if (cart.items.length > 0) {
    subtotal = cart.items
      .reduce(
        (accumulator, currentValue) =>
          accumulator + Number(currentValue.data.session.lecture.price),
        subtotal
      )
      .toFixed(2);

    totalService = cart.items
      .reduce(
        (accumulator, currentValue) =>
          accumulator + Number(currentValue.serviceCharge),
        totalService
      )
      .toFixed(2);

    cart.items.forEach((item, index) => {
      if (item.type === 0) {
        orderItemsData.push([
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
          <div>
            <span style={{ textTransform: "lowercase" }}>
              {formatAMPM(item.data.session.from, lang)}
            </span>
            <span>&nbsp; - &nbsp;</span>
            <span style={{ textTransform: "lowercase" }}>
              {formatAMPM(item.data.session.to, lang)}
            </span>
          </div>,
          <span key={index}>
            {`${translateNumber(
              // item.data.session.lecture.price.toString(),
              Number(
                Number(item.data.session.lecture.price * (1 + tax)) +
                  Number(item.serviceCharge)
              )
                .toFixed(2)
                .toString(),
              lang
            )} ${strings.egp[lang]}`}
          </span>,
          // <span key={index}>
          //   {`${translateNumber(item.serviceCharge.toString(), lang)} ${
          //     strings.egp[lang]
          //   }`}
          // </span>,
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
        <div className={classes.orderContainer}>
          {cart.items.length > 0 ? (
            <div className={classes.summaryContainer}>
              <Loading style={{ height: 175 }} loading={modalLoading}>
                <div>
                  <div className={classes.summary}>
                    <h3 className={classes.orderSummaryTitle}>
                      {strings.orderSummary[lang]}
                    </h3>
                    <div className={classes.orderSummaryTableContainer}>
                      <Table
                        tableHead={[
                          strings.subject[lang],
                          strings.tutor[lang],
                          strings.lecture[lang],
                          strings.date[lang],
                          strings.time[lang],
                          strings.price[lang],
                          // strings.serviceCharge[lang],
                        ]}
                        tableData={orderItemsData}
                        tableHeaderColor="gray"
                        customHeadCellClasses={[
                          classes.summaryTableHead,
                          classes.summaryTableHead,
                          classes.summaryTableHead,
                          classes.summaryTableHead,
                          classes.summaryTableHead,
                          classes.summaryTableHead,
                          // classes.summaryTableHead,
                        ]}
                        // customHeadClassesForCells={[0, 1, 2, 3, 4, 5, 6]}
                        customHeadClassesForCells={[0, 1, 2, 3, 4, 5]}
                        customCellClasses={[
                          classes.summaryTableCell,
                          classes.summaryTableCell,
                          classes.summaryTableCell,
                          classes.summaryTableCell,
                          classes.summaryTableCell,
                          classes.summaryTableCell,
                          // classes.summaryTableCell,
                        ]}
                        // customClassesForCells={[0, 1, 2, 3, 4, 5, 6]}
                        customClassesForCells={[0, 1, 2, 3, 4, 5]}
                      />
                    </div>
                  </div>

                  <div className={classes.summary + " " + classes.marginTop}>
                    <h3 className={classes.orderSummaryTitle}>
                      {strings.paymentSummary[lang]}
                    </h3>

                    <div className={classes.paymentSummary}>
                      <GridContainer>
                        <GridItem xs={6} sm={6} md={3}>
                          <GridContainer justify="center">
                            {/* <GridItem
                              xs={12}
                              sm={12}
                              md={10}
                              className={classes.gridItem}
                            >
                              <span className={classes.paymentDetailName}>
                                {strings.subtotal[lang]}
                              </span>
                            </GridItem>
                            <GridItem
                              xs={12}
                              sm={12}
                              md={10}
                              className={classes.gridItem}
                            >
                              <span className={classes.paymentDetailName}>
                                {strings.tax[lang]}
                              </span>
                            </GridItem>
                            <GridItem
                              xs={12}
                              sm={12}
                              md={10}
                              className={classes.gridItem}
                            >
                              <span className={classes.paymentDetailName}>
                                {strings.serviceCharge[lang]}
                              </span>
                            </GridItem> */}
                            <GridItem
                              xs={12}
                              sm={12}
                              md={10}
                              className={classes.gridItem}
                            >
                              <span className={classes.paymentDetailName}>
                                {strings.totalAmount[lang]}
                              </span>
                            </GridItem>
                          </GridContainer>
                        </GridItem>

                        <GridItem xs={6} sm={6} md={3}>
                          <GridContainer justify="center">
                            {/* <GridItem
                              xs={12}
                              sm={12}
                              md={10}
                              className={classes.gridItem}
                            >
                              <span>
                                {`${translateNumber(subtotal, lang)} ${
                                  strings.egp[lang]
                                }`}
                              </span>
                            </GridItem>
                            <GridItem
                              xs={12}
                              sm={12}
                              md={10}
                              className={classes.gridItem}
                              >
                                <span>{`${translateNumber(
                                  (tax * 100).toFixed(2),
                                  lang
                                )}%`}</span>
                              </GridItem>
                              <GridItem
                                xs={12}
                                sm={12}
                                md={10}
                                className={classes.gridItem}
                              >
                                <span>
                                  {`${translateNumber(totalService, lang)} ${
                                    strings.egp[lang]
                                  }`}
                                </span>
                              </GridItem> */}
                            <GridItem
                              xs={12}
                              sm={12}
                              md={10}
                              className={classes.gridItem}
                            >
                              <span>
                                {`${translateNumber(
                                  (
                                    Number(totalService) +
                                    Number(subtotal) * (1 + Number(tax))
                                  ).toFixed(2),
                                  lang
                                )} ${strings.egp[lang]}`}
                              </span>
                            </GridItem>
                          </GridContainer>
                        </GridItem>
                      </GridContainer>
                    </div>
                  </div>
                  <div className={classes.buttonContainer}>
                    <Button
                      className={classes.button}
                      // color="primary"
                      // onClick={() =>
                      //   history.push({
                      //     pathname: "/pay",
                      //   })
                      // }
                      color={"disabled"}
                      onClick={() => {}}
                      disabled={true}
                      round
                    >
                      {strings.placeOrder[lang]}
                    </Button>
                  </div>
                </div>
              </Loading>
            </div>
          ) : (
            <h3 className={classes.noOrderItemsTitle}>
              {strings.noOrderItems[lang]}
            </h3>
          )}
        </div>
      </GridItem>
    </GridContainer>
  );
}
