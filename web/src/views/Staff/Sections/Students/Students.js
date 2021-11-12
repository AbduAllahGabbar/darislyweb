import { Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button";
import CustomModal from "components/CustomModal/CustomModal.js";
import ErrorModal from "components/ErrorModal/ErrorModal.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Loading from "components/Loading/Loading.js";
import PaymentModal from "components/PaymentModal/PaymentModal.js";
import SuccessModal from "components/SuccessModal/SuccessModal";
import Table from "components/Table/Table.js";
import InputWithLabel from "components/TextInputs/InputWithLabel/InputWithLabel.js";
import strings from "constants/strings.js";
import enums from "enums";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "services/api";
import { getDirectionFromString } from "utils";
import {
  formatAMPM,
  getDateString,
  translateNumber,
  translatePhoneNumber,
} from "utils/index.js";
import ChooseLectureModal from "./ChooseLectureModal/ChooseLectureModal";
import OpenSessionModal from "./OpenSessionModal/OpenSessionModal";
import styles from "./studentsStyle.js";

const useStyles = makeStyles(styles);

export default function Students(props) {
  const classes = useStyles();
  const { dispCourseInfo, dispSearch } = props;
  const [filter, setFilter] = useState("");
  const [filterOnChange, setFilterOnChange] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, settotalPosts] = useState(1);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({
    isOpen: false,
    active: "validate",
    loading: false,
    orderId: null,
  });
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderModalLoading, setOrderModalLoading] = useState(false);
  const [orderItems, setOrderItems] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [openSessionModalOpen, setOpenSessionModalOpen] = useState(false);
  const [selectedOrderItem, setSelectedOrderItem] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [state, setState] = useState({
    errorModal: false,
    orders: null,
  });
  const stateHandler = (key, value) => {
    setState({ ...state, [key]: value });
  };
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successModalMessage, setSuccessModalMessage] = useState(null);
  const [retakeQuizLoading, setRetakeQuizLoading] = useState(false);

  const lang = useSelector((state) => state.lang);
  useEffect(() => {
    (async () => {
      try {
        const response = (await api.getCenterOrders(1, 10, "")).data;
        const orders = response.data;
        stateHandler("orders", orders);
        settotalPosts(response.total);
        setLoading(false);
      } catch (err) {
        stateHandler("errorModal", true);
      }
    })();
  }, []);

  const handleReceive = async (paymentType, discount) => {
    try {
      setModal({ ...modal, loading: true });
      const response = await api.putOrderStatus(
        modal.orderId,
        1,
        paymentType,
        discount
      );
      setModal({ ...modal, active: "success", loading: false });
      setLoading(true);
      try {
        const response = (await api.getCenterOrders(currentPage, 10, filter))
          .data;
        const orders = response.data;
        stateHandler("orders", orders);
        settotalPosts(response.total);
        setLoading(false);
      } catch (err) {}
    } catch (err) {
      setModal({ ...modal, active: "error", loading: false });
    }
  };
  const handleReturn = async () => {
    try {
      setModal({ ...modal, loading: true });
      const response = await api.putOrderStatus(modal.orderId, 3);
      setModal({ ...modal, active: "success", loading: false });
      setLoading(true);
      try {
        const response = (await api.getCenterOrders(currentPage, 10, filter))
          .data;
        const orders = response.data;
        stateHandler("orders", orders);
        settotalPosts(response.total);
        setLoading(false);
      } catch (err) {}
    } catch (err) {
      setModal({ ...modal, active: "error", loading: false });
    }
  };
  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = (await api.getCenterOrders(1, 10, filterOnChange)).data;
      const orders = response.data;
      stateHandler("orders", orders);
      settotalPosts(response.total);
      setFilter(filterOnChange);
      setCurrentPage(1);
      setLoading(false);
    } catch (err) {
      setModal({ ...modal, active: "error", loading: false });
    }
  };
  let studentsData = [];

  const paymentButtons = {
    [enums.OrderStatus.VALIDATE]: {
      onClick: (orderId) => {
        setModal({ isOpen: true, active: "validate", orderId });
      },
      color: "primary",
      disabled: false,
    },
    [enums.OrderStatus.RETURN]: {
      onClick: (orderId) => {
        setModal({ isOpen: true, active: "return", orderId });
      },
      color: "secondary",
      disabled: false,
    },
    [enums.OrderStatus.EXPIRED]: {
      onClick: (orderId) => {
        setModal({ isOpen: true, active: "validate", orderId });
      },
      color: "danger",
      disabled: false,
    },
    [enums.OrderStatus.CANCELLED]: {
      onClick: (orderId) => {
        setModal({ isOpen: true, active: "validate", orderId });
      },
      color: "danger",
      disabled: false,
    },
    [enums.OrderStatus.FAILED]: {
      onClick: (orderId) => {
        setModal({ isOpen: true, active: "validate", orderId });
      },
      color: "danger",
      disabled: false,
    },
    [enums.OrderStatus.RETURNED]: {
      onClick: (orderId) => {
        setModal({ isOpen: true, active: "validate", orderId });
      },
      color: "warning",
      disabled: false,
    },
  };
  const viewOrderHandler = async (orderId) => {
    setOrderModalOpen(true);
    try {
      setOrderModalLoading(true);
      const order = (await api.getStudentOrderItems(orderId)).data;
      const { orderItems, student, ...rest } = order;
      setSelectedOrder(rest);
      setOrderItems(orderItems);
      setSelectedStudent(student);
      setOrderModalLoading(false);
    } catch (err) {
      setOrderModalOpen(false);
    }
  };

  const openSessionHandler = async (orderItem) => {
    setSelectedOrderItem(orderItem);
    setOpenSessionModalOpen(true);
  };

  const editSessionHandler = async (orderItem) => {
    setOrderModalOpen(false);
    setSelectedOrderItem(orderItem);
    setEditModalOpen(true);
  };

  const retakeQuizHandler = (quizId, quizSessionId) => async () => {
    try {
      setRetakeQuizLoading(true);
      await api.retakeQuiz(quizId, quizSessionId, selectedStudent.id);
      setSuccessModalMessage(strings.quizResetSuccessfully[lang]);
      setOrderModalOpen(false);
      setShowSuccessModal(true);
    } catch (err) {
      setOrderModalOpen(false);
      setModal({ ...modal, active: "error", loading: false });
    } finally {
      setRetakeQuizLoading(false);
    }
  };

  if (state.orders) {
    state.orders.forEach((order, index) => {
      studentsData.push([
        <span key={index}>
          {translateNumber(order.token.toString(), lang)}
        </span>,
        <span
          key={index}
        >{`${order.student.firstName} ${order.student.lastName}`}</span>,
        <span key={index}>
          {translatePhoneNumber(
            order.student.countryCode + order.student.phone,
            lang
          )}
        </span>,
        dispCourseInfo ? (
          <span key={index}>
            {order.tutor.firstName +
              " " +
              order.tutor.lastName +
              " - " +
              order.subject[lang]}
          </span>
        ) : null,
        <span key={index}>
          {translateNumber(Number(order.total).toFixed(2).toString(), lang)}
        </span>,
        <div key={index} className={classes.lectureNameContainer}>
          {order.lectures.map((lecture, lectureIndex) => (
            <div dir={getDirectionFromString(lecture)} key={lectureIndex}>
              <Tooltip title={lecture}>
                <div className={classes.lectureName}>{lecture}</div>
              </Tooltip>
              <span>&nbsp;</span>
            </div>
          ))}
        </div>,
        <span>{order.fawryReferenceNumber}</span>,
        <div>
          <div className={classes.buttonsContainer}>
            <Button
              key={index}
              onClick={() => viewOrderHandler(order.id)}
              color="primary"
              className={classes.button}
              round
            >
              {strings.view[lang]}
            </Button>
            <Button
              round
              color={paymentButtons[order.status].color}
              className={classes.button}
              onClick={() => paymentButtons[order.status].onClick(order.id)}
              disabled={paymentButtons[order.status].disabled}
            >
              {strings.orderActions[order.status][lang]}
            </Button>

            <Button
              round
              color={paymentButtons[enums.OrderStatus.CANCELLED].color}
              className={classes.button}
              onClick={() =>
                paymentButtons[enums.OrderStatus.RETURN].onClick(order.id)
              }
            >
              {strings.cancel[lang]}
            </Button>
          </div>
        </div>,
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
          style={{ width: "100%" }}
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
        <span key={index}>
          {translateNumber(Number(item.price).toFixed(2).toString(), lang)}
        </span>,
        item.attended <= enums.Attendance.LATE ? (
          <span key={index} className={classes.videoViewed}>
            {strings.viewed[lang]}
          </span>
        ) : (
          <span key={index} className={classes.videoClosed}>
            {strings.notViewed[lang]}
          </span>
        ),
        <div key={index} className={classes.buttonsContainer}>
          <Button
            onClick={() => openSessionHandler(item)}
            color={
              selectedOrder.status !== enums.OrderStatus.RETURN
                ? "disabled"
                : "primary"
            }
            className={classes.button}
            round
            disabled={selectedOrder.status !== enums.OrderStatus.RETURN}
          >
            {strings.open[lang]}
          </Button>

          <Button
            onClick={() => editSessionHandler(item)}
            color="secondary"
            className={classes.button + " " + classes.buttonMargin}
            round
          >
            {strings.edit[lang]}
          </Button>

          <Loading
            loading={retakeQuizLoading}
            style={{ minWidth: 100 }}
            iconStyle={{ width: 22, height: 22 }}
          >
            <Button
              onClick={
                !(item.quiz && item.quiz.answered)
                  ? null
                  : retakeQuizHandler(item.quiz.id, item.quiz.quizSessionId)
              }
              color={
                !(item.quiz && item.quiz.answered) ? "disabled" : "warning"
              }
              round
              disabled={!(item.quiz && item.quiz.answered)}
            >
              {strings.retakeQuiz[lang]}
            </Button>
          </Loading>
        </div>,
      ]);
    });
  }
  const handleFilterChange = (event) => {
    setFilterOnChange(event.target.value);
  };

  const paginate = async (pageNumber) => {
    window.scrollTo(0, 0);
    setCurrentPage(pageNumber);
    setLoading(true);
    try {
      const orders = (await api.getCenterOrders(pageNumber, 10, filter)).data
        .data;
      stateHandler("orders", orders);
      setLoading(false);
    } catch (err) {
      setModal({ ...modal, active: "error", loading: false });
    }
  };
  const closeModal = () => {
    setModal({
      isOpen: false,
      active: "validate",
      loading: false,
      orderId: null,
    });
  };
  const onCloseOrderModal = () => {
    setOrderModalOpen(false);
    setTimeout(() => {
      setOrderModalLoading(true);
    }, 200);
  };

  const onCloseEditModal = () => {
    setEditModalOpen(false);
  };

  const onCloseOpenSessionModal = () => {
    setOpenSessionModalOpen(false);
  };

  const modalErrorHandler = () => {
    stateHandler("errorModal", true);
  };

  const showSuccessModalHandler = (message) => {
    setSuccessModalMessage(message);
    setShowSuccessModal(true);
  };

  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={12} className={classes.gridItem}>
        <PaymentModal
          handleReceive={handleReceive}
          handleReturn={handleReturn}
          active={modal.active}
          isOpen={modal.isOpen}
          handleClose={closeModal}
        />
        <CustomModal open={orderModalOpen} onClose={onCloseOrderModal}>
          <Loading style={{ height: 175 }} loading={orderModalLoading}>
            <div
              className="scrollbar"
              style={{ maxHeight: "70vh", overflowY: "scroll" }}
            >
              <Table
                tableHead={[
                  strings.subject[lang],
                  strings.tutor[lang],
                  strings.lecture[lang],
                  strings.date[lang],
                  strings.time[lang],
                  strings.price[lang],
                  strings.video[lang],
                  " ",
                ]}
                tableData={orderItemsData}
                tableHeaderColor="secondary"
                round
              />
            </div>
          </Loading>
          <div className={classes.buttonsContainer}>
            <Button
              justIcon
              round
              color="secondary"
              onClick={onCloseOrderModal}
              style={{ width: 100 }}
            >
              {strings.ok[lang]}
            </Button>
          </div>
        </CustomModal>
        <ChooseLectureModal
          student={selectedStudent}
          orderId={selectedOrder?.id}
          orderItem={selectedOrderItem}
          isOpen={editModalOpen}
          handleClose={onCloseEditModal}
          handleError={modalErrorHandler}
          handleSuccess={() => {
            showSuccessModalHandler(strings.orderUpdated[lang]);
            onCloseEditModal();
            onCloseOrderModal();
          }}
        ></ChooseLectureModal>
        <OpenSessionModal
          student={selectedStudent}
          orderItem={selectedOrderItem}
          isOpen={openSessionModalOpen}
          handleClose={onCloseOpenSessionModal}
          handleError={modalErrorHandler}
          handleSuccess={() => {
            showSuccessModalHandler(strings.sessionOpened[lang]);
            onCloseOrderModal();
          }}
        ></OpenSessionModal>
        <SuccessModal
          open={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          message={successModalMessage}
        />
        <ErrorModal
          open={state.errorModal}
          onClose={() => stateHandler("errorModal", false)}
        />
        {dispSearch ? (
          <GridContainer justify="center" className={classes.selectRow}>
            <GridItem
              xs={12}
              sm={12}
              md={8}
              className={classes.gridItem + " " + classes.searchContainer}
            >
              <div className={classes.label}>
                <span>{strings.studentNamePhone[lang]}</span>
              </div>
              <InputWithLabel
                placeholder={strings.search[lang]}
                formControlProps={{
                  // fullWidth: true,
                  className: classes.customFormControlClasses,
                }}
                formControlStyle={classes.formControl}
                inputStyle={classes.input}
                value={filterOnChange}
                inputProps={{
                  onChange: handleFilterChange,
                }}
              />
              <Button
                round
                color="primary"
                className={classes.searchButton}
                onClick={handleSearch}
              >
                {strings.search[lang]}
              </Button>
            </GridItem>
          </GridContainer>
        ) : null}
        <GridContainer justify="center">
          <GridItem
            xs={12}
            sm={12}
            md={12}
            className={classes.gridItem}
            style={{ marginTop: 20 }}
          >
            <Loading loading={loading}>
              <Table
                tableHead={[
                  strings.orderNumber[lang],
                  strings.name[lang],
                  strings.phone[lang],
                  dispCourseInfo ? strings.subject[lang] : null,
                  strings.price[lang],
                  strings.sessions[lang],
                  strings.fawryReferenceNumber[lang],
                  strings.payment[lang],
                ]}
                tableData={studentsData}
                tableHeaderColor="secondary"
                round
                backendPagination
                currentPage={currentPage}
                paginate={paginate}
                totalPosts={totalPosts}
              />
            </Loading>
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
}
Students.defaultProps = {
  dispCourseInfo: true,
  dispSearch: true,
};
