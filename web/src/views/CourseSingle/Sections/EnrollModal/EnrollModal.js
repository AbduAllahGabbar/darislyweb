import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
import Check from "@material-ui/icons/Check";
import CheckCircle from "@material-ui/icons/CheckCircle";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import Button from "components/CustomButtons/Button";
import CustomModal from "components/CustomModal/CustomModal";
import Loading from "components/Loading/Loading.js";
import strings from "constants/strings.js";
import enums from "enums";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import api from "services/api";
import { addToCart } from "store/actions";
import { formatAMPM, getDateString, translateNumber } from "utils/index.js";
import styles from "./enrollModalStyle.js";
import classNames from "classnames";

const useStyles = makeStyles(styles);

export default function EnrollModal(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { isOpen, handleClose, course } = props;
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    active: 0,
    courseType: null, //0: online, 1: center, 2:both
    locaitons: null,
    groups: null,
    sessions: null,
    sections: null,
    selectAll: false,
    atLeastOne: false,
    centerError: false,
    price: 0,
    center: null,
    allCenters: null,
  });

  const lang = useSelector((state) => state.lang);

  const resetState = () => {
    setState({
      active: 0,
      courseType: null,
      locaitons: null,
      groups: null,
      sessions: null,
      sections: null,
      selectAll: false,
      atLeastOne: false,
      price: 0,
      center: null,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      resetState();
    }, 100);
  }, [isOpen]);

  useEffect(() => {
    if (state.active === 3 && state.sections) {
      handleSelectAll();
    }
  }, [state.active]);

  let modalcontent = <div />;

  const onlineClickHandler = async () => {
    try {
      setLoading(true);
      const groups = (
        await api.getCourseGroups(course.id, enums.CourseTypes.ONLINE)
      ).data;
      setState({
        ...state,
        active: 2,
        courseType: enums.CourseTypes.ONLINE,
        groups,
      });
      setLoading(false);
    } catch (err) {
      setState({ ...state, atLeastOne: false, active: 5 });
    }
  };
  // const centerClickHandler = async () => {
  //   try {
  //     setLoading(true);
  //     const locations = (
  //       await api.getCourseGroups(course.id, enums.CourseTypes.CENTER)
  //     ).data;
  //     setState({
  //       ...state,
  //       active: 1,
  //       courseType: enums.CourseTypes.CENTER,
  //       locations,
  //     });
  //     setLoading(false);
  //   } catch (err) {
  //     setState({ ...state, atLeastOne: false, active: 5 });
  //   }
  // };
  const groupClickHandler = async (groupId, type, centerId, centerName) => {
    try {
      setLoading(true);
      const sections = (
        await api.getCourseGroupSession(groupId, new Date().toISOString())
      ).data;

      sections.forEach((section) => {
        section.sessions.forEach((session) => {
          session.purchased || session.addedToCart
            ? (session.checked = true)
            : (session.checked = false);
        });
      });
      const center =
        type === enums.CourseTypes.CENTER
          ? { id: centerId, name: centerName }
          : null;
      setState({
        ...state,
        active: 3,
        sections,
        center,
      });
      setLoading(false);
    } catch (err) {
      // stateHandler("errorModal", true);
      setState({ ...state, atLeastOne: false, active: 5 });
    }
  };

  const proceedHandler = async () => {
    try {
      setLoading(true);
      let selectedSessions = [];
      state.sections.forEach((section) => {
        section.sessions.forEach((session) => {
          if (session.checked && !session.purchased && !session.addedToCart)
            selectedSessions.push({ id: session.id, type: state.courseType });
        });
      });
      if (selectedSessions.length > 0) {
        if (state.courseType === enums.CourseTypes.ONLINE) {
          const allCenters = (await api.getAllCenters()).data;
          setState({
            ...state,
            active: 6,
            allCenters,
            atLeastOne: false,
          });
        } else if (state.courseType === enums.CourseTypes.CENTER) {
          const response = await api.createOrder(
            selectedSessions,
            enums.OrderTypes.CASH,
            state.center.id
          );
          setState({
            ...state,
            active: 4,
            atLeastOne: false,
          });
        }
      } else {
        setState({ ...state, atLeastOne: true });
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setState({ ...state, atLeastOne: false, active: 5 });
    }
  };

  const addToCartHandler = async () => {
    try {
      setLoading(true);
      let productIds = [];
      state.sections.forEach((section) => {
        section.sessions.forEach((session) => {
          if (session.checked && !session.purchased && !session.addedToCart) {
            productIds.push(session.productId);
          }
        });
      });
      if (productIds.length > 0) {
        if (state.courseType === enums.CourseTypes.ONLINE) {
          await dispatch(addToCart(productIds));
          history.push("cart");
        }
      } else {
        setState({ ...state, atLeastOne: true });
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setState({ ...state, atLeastOne: false, active: 5 });
    }
  };

  const confirmHandler = async () => {
    if (state.center) {
      try {
        setLoading(true);
        let selectedSessions = [];
        state.sections.forEach((section) => {
          section.sessions.forEach((session) => {
            if (session.checked && !session.purchased)
              selectedSessions.push({ id: session.id, type: state.courseType });
          });
        });
        const response = await api.createOrder(
          selectedSessions,
          enums.OrderTypes.CASH,
          state.center.id
        );
        setState({
          ...state,
          active: 4,
          atLeastOne: false,
          centerError: false,
        });
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setState({
          ...state,
          centerError: false,
          atLeastOne: false,
          active: 5,
        });
      }
    } else {
      setState({ ...state, centerError: true });
    }
  };
  const handleSelectSession = (sessionId, sectionId) => {
    let sections = [...state.sections];
    const sectionIndex = sections
      .map((section) => section.id)
      .indexOf(sectionId);
    const sessionIndex = sections[sectionIndex].sessions
      .map((session) => session.id)
      .indexOf(sessionId);
    sections[sectionIndex].sessions[sessionIndex]["checked"] = !sections[
      sectionIndex
    ].sessions[sessionIndex]["checked"];

    sections[sectionIndex]["checked"] = sections[sectionIndex].sessions.every(
      (session) => session.checked
    );
    let selectAll = sections.every((section) => {
      return section.sessions.every((session) => {
        return session.checked;
      });
    });
    let price = 0;
    sections.forEach((section) => {
      section.sessions.forEach((session) => {
        price +=
          session.checked && !session.purchased && !session.addedToCart
            ? // ? Number(session.lecture.price)
              Number(
                (
                  Number(
                    session.lecture.price *
                      (1 + props.course?.taxPercentage / 100)
                  ) + Number(props.course?.serviceFees)
                ).toFixed(2)
              )
            : 0;
      });
    });

    setState({ ...state, sections, selectAll, price });
  };
  const handleSelectSection = (sectionId) => {
    let sections = [...state.sections];
    const sectionIndex = sections
      .map((section) => section.id)
      .indexOf(sectionId);
    sections[sectionIndex]["checked"] = sections[sectionIndex]["checked"]
      ? false
      : true;
    sections[sectionIndex].sessions.forEach((session) => {
      session["checked"] = sections[sectionIndex]["checked"];
    });
    let selectAll = sections.every((section) => section.checked);
    let price = 0;
    sections.forEach((section) => {
      section.sessions.forEach((session) => {
        price +=
          session.checked && !session.purchased && !session.addedToCart
            ? // ? Number(session.lecture.price)
              Number(
                (
                  Number(
                    session.lecture.price *
                      (1 + props.course?.taxPercentage / 100)
                  ) + Number(props.course?.serviceFees)
                ).toFixed(2)
              )
            : 0;
      });
    });

    setState({ ...state, sections, selectAll, price });
  };
  const handleSelectAll = () => {
    let sections = [...state.sections];
    let price = 0;
    sections.forEach((section) => {
      section["checked"] = !state.selectAll;
      section.sessions.forEach((session) => {
        session["checked"] = !state.selectAll;
        price +=
          session["checked"] && !session.purchased && !session.addedToCart
            ? // ? Number(session.lecture.price)
              Number(
                (
                  Number(
                    session.lecture.price *
                      (1 + props.course?.taxPercentage / 100)
                  ) + Number(props.course?.serviceFees)
                ).toFixed(2)
              )
            : 0;
      });
    });
    setState({ ...state, sections, selectAll: !state.selectAll, price });
  };

  const onlineOrCenterModal = (
    <div>
      <div className={classes.titleContainer}>
        {strings.selectCourseType[lang]}
      </div>
      <div className={classes.modalBody}>
        <Button
          justIcon
          round
          color="primary"
          className={classes.liveButton}
          onClick={onlineClickHandler}
          // disabled
        >
          {strings.courseTypes[enums.CourseTypes.ONLINE][lang]}
        </Button>
        <Button
          justIcon
          round
          disabled
          className={classes.liveButton}
          // onClick={centerClickHandler}
        >
          {strings.courseTypes[enums.CourseTypes.CENTER][lang]}
        </Button>
      </div>
    </div>
  );
  let locationsElement = [];
  let groupsElement = [];
  let weekDaysElement = [];
  let sectionsElement = [];
  let sessionsElement = [];
  let centersElement = [];
  if (state.active === 1 && state.locations) {
    state.locations.forEach((location, locationIndex) => {
      groupsElement = [];
      location.courseGroups.forEach((group, groupNumber) => {
        weekDaysElement = [];
        group.weekDays.forEach((weekDay, index) => {
          weekDaysElement.push(
            <div className={classes.weekDayContainer} key={index}>
              <span className={classes.weekDay}>
                {strings.weekDays[lang][weekDay.day]}
              </span>
              <Button
                disabled
                color={"primary"}
                className={classes.button}
                round
              >
                <span style={{ textTransform: "lowercase" }}>
                  {formatAMPM(weekDay.from, lang)}
                </span>
                <span>&nbsp; - &nbsp;</span>
                <span style={{ textTransform: "lowercase" }}>
                  {formatAMPM(weekDay.to, lang)}
                </span>
              </Button>
            </div>
          );
        });
        groupsElement.push(
          <div
            onClick={() =>
              groupClickHandler(
                group.id,
                enums.CourseTypes.CENTER,
                location.id,
                location.name
              )
            }
            className={classes.groupContainer}
            key={groupNumber}
          >
            <span>
              <span>{strings.group[lang]}</span> &nbsp;
              <span>{translateNumber((groupNumber + 1).toString(), lang)}</span>
            </span>
            <div className={classes.weekDaysContainer}>{weekDaysElement}</div>
          </div>
        );
      });
      locationsElement.push(
        <div className={classes.locationContainer} key={locationIndex}>
          <span className={classes.location}>{location.name[lang]}</span>
          <div>{groupsElement}</div>
        </div>
      );
    });
  }
  if (state.active === 2 && state.groups) {
    state.groups.forEach((group, groupNumber) => {
      weekDaysElement = [];
      group.weekDays.forEach((weekDay, index) => {
        weekDaysElement.push(
          <div className={classes.weekDayContainer} key={index}>
            <span className={classes.weekDay}>
              {strings.weekDays[lang][weekDay.day]}
            </span>
            <Button disabled color={"primary"} className={classes.button} round>
              <span style={{ textTransform: "lowercase" }}>
                {formatAMPM(weekDay.from, lang)}
              </span>
              <span>&nbsp; - &nbsp;</span>
              <span style={{ textTransform: "lowercase" }}>
                {formatAMPM(weekDay.to, lang)}
              </span>
            </Button>
          </div>
        );
      });
      groupsElement.push(
        <div
          className={classes.groupContainer}
          key={groupNumber}
          onClick={() =>
            groupClickHandler(group.id, enums.CourseTypes.ONLINE, "")
          }
        >
          <span>
            <span>{strings.group[lang]}</span> &nbsp;
            <span>{translateNumber((groupNumber + 1).toString(), lang)}</span>
          </span>
          <div className={classes.weekDaysContainer}>{weekDaysElement}</div>
        </div>
      );
    });
  }
  if (state.active === 3 && state.sections) {
    state.sections.forEach((section, sectionIndex) => {
      sessionsElement = [];
      section.sessions.forEach((session, sessionIndex) => {
        sessionsElement.push(
          <div key={sessionIndex} className={classes.sessionItem}>
            <div className={classes.lectureTitleContainer}>
              <LibraryBooksIcon className={classes.lectureIcon} />
              <span className={classes.lectureName}>
                {session.lecture.title}
              </span>
            </div>
            <div className={classes.sessionDateTimeContainer}>
              {session.purchased ? (
                <div className={classes.done}>
                  {strings.purchasedBefore[lang]}
                </div>
              ) : session.addedToCart ? (
                <div className={classes.done}>
                  {strings.alreadyInCart[lang]}
                </div>
              ) : (
                <span className={classes.sessionDateTime}>
                  <span dir="auto" className={classes.sessionDate}>
                    {getDateString(new Date(session.date), lang)}
                  </span>
                  <div className={classes.dateTimeAndCheckbox}>
                    <div>
                      <span style={{ textTransform: "lowercase" }}>
                        {formatAMPM(session.from, lang)}
                      </span>
                      <span>&nbsp; - &nbsp;</span>
                      <span style={{ textTransform: "lowercase" }}>
                        {formatAMPM(session.to, lang)}
                      </span>
                    </div>
                    <Checkbox
                      onClick={() =>
                        handleSelectSession(session.id, section.id)
                      }
                      checked={session.checked ? true : false}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked,
                        root: classes.checkRoot,
                      }}
                    />
                  </div>
                </span>
              )}
            </div>
          </div>
        );
      });
      sectionsElement.push(
        <div className={classes.sectionContainer} key={sectionIndex}>
          <div className={classes.sectionTitle}>
            <div className={classes.sectionName}>{section.title}</div>
            <div className={classes.selectAllSection}>
              <Checkbox
                onClick={() => handleSelectSection(section.id)}
                checked={section.checked ? true : false}
                checkedIcon={<Check className={classes.checkedIcon} />}
                icon={<Check className={classes.uncheckedIcon} />}
                classes={{
                  checked: classes.checked,
                  root: classes.checkRoot,
                }}
              />
            </div>
          </div>
          <div className={classes.sessionsList}>{sessionsElement}</div>
        </div>
      );
    });
  }
  if (state.active === 6 && state.allCenters) {
    state.allCenters.forEach((center, index) => {
      let centerClasses = classNames({
        [classes.groupContainer]: true,
        [classes.cenetrSelecter]: state.center?.id === center.id,
      });
      centersElement.push(
        <div
          className={centerClasses}
          key={index}
          onClick={() => setState({ ...state, center })}
        >
          <span>{center.name[lang]}</span>
        </div>
      );
    });
  }
  //Online or center
  if (course) {
    if (state.active === 0) {
      modalcontent = onlineOrCenterModal;
      //select group from center
    } else if (state.active === 1) {
      modalcontent = (
        <div>
          <div className={classes.titleContainer}>
            {strings.selectGroup[lang]}
          </div>
          <div className={"scrollbar " + classes.modalBody}>
            <div>{locationsElement}</div>
          </div>
        </div>
      );
      //select group from live
    } else if (state.active === 2) {
      modalcontent = (
        <div>
          <div className={classes.titleContainer}>
            {strings.selectGroup[lang]}
          </div>
          <div className={"scrollbar " + classes.modalBody}>
            <div>{groupsElement}</div>
          </div>
        </div>
      );
      //select sessions
    } else if (state.active === 3) {
      modalcontent = (
        <div>
          <div className={classes.titleContainer}>
            {strings.selectLessons[lang]}
          </div>
          <div className={classes.priceContainer}>
            <span>{strings.price[lang]}</span>&nbsp;
            <span className={classes.price}>
              {translateNumber(Number(state.price).toFixed(2).toString(), lang)}
            </span>
            &nbsp;
            <span className={classes.price}>{strings.egp[lang]}</span>
          </div>
          {state.atLeastOne ? (
            <div className={classes.selectOneMessage}>
              {strings.pleaseSelectOneLecture[lang]}
            </div>
          ) : null}
          <div className={"scrollbar " + classes.modalBody}>
            <div className={classes.selectAllContainer}>
              <div>{strings.selectAll[lang]}</div>
              <Checkbox
                onClick={() => handleSelectAll()}
                checked={state.selectAll}
                checkedIcon={<Check className={classes.checkedIcon} />}
                icon={<Check className={classes.uncheckedIcon} />}
                classes={{
                  checked: classes.checked,
                  root: classes.checkRoot,
                }}
              />
            </div>
            <div>{sectionsElement}</div>
          </div>
        </div>
      );
    } else if (state.active === 4) {
      let orderPlaced = {
        en:
          "Your order has been placed successfully. Please pay " +
          translateNumber(state.price.toString(), lang) +
          " " +
          strings.egp[lang] +
          " at " +
          state.center.name[lang] +
          " in the next 24 hours.",
        ar:
          "تم تقديم طلبكم بنجاح. من فضلك ادفع  " +
          translateNumber(state.price.toString(), lang) +
          " " +
          strings.egp[lang] +
          " في " +
          state.center.name[lang] +
          " خلال ال٢٤ ساعة القادمة.",
      };
      modalcontent = (
        <div>
          <div className={classes.titleContainer}>
            <CheckCircle className={classes.checkCircleIcon} />
          </div>
          <div className={classes.orderPlaced}>{orderPlaced[lang]}</div>
        </div>
      );
    } else if (state.active === 5) {
      modalcontent = (
        <div>
          <div className={classes.titleContainer}>
            <CancelIcon className={classes.cancelIcon} />
          </div>
          <div className={classes.orderPlaced}>
            {strings.somethingWrong[lang]}
          </div>
        </div>
      );
    } else if (state.active === 6) {
      modalcontent = (
        <div>
          <div className={classes.titleContainer}>
            {strings.selectCenterToPay[lang]}
          </div>
          {state.centerError ? (
            <div className={classes.selectOneMessage}>
              {strings.pleaseSelectCenterError[lang]}
            </div>
          ) : null}
          <div className={"scrollbar " + classes.modalBody}>
            <div>{centersElement}</div>
          </div>
        </div>
      );
      //select sessions
    }
  }

  return (
    <div>
      <CustomModal style={{ marginTop: 0 }} open={isOpen} onClose={handleClose}>
        <Loading style={{ height: 175 }} loading={loading}>
          {modalcontent}
        </Loading>
        <div className={classes.buttonsContainer}>
          <Button
            round
            color="secondary"
            className={classes.modalButton}
            onClick={handleClose}
          >
            {state.active === 4 ? strings.ok[lang] : strings.cancel[lang]}
          </Button>
          {state.active === 3 ? (
            <Button
              round
              color="primary"
              className={classes.modalButton}
              onClick={addToCartHandler}
            >
              {strings.addToCart[lang]}
            </Button>
          ) : null}
          {state.active === 6 ? (
            <Button
              round
              color="primary"
              className={classes.modalButton}
              onClick={confirmHandler}
            >
              {strings.confirm[lang]}
            </Button>
          ) : null}
        </div>
      </CustomModal>
    </div>
  );
}

EnrollModal.propTypes = {
  active: PropTypes.number,
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};
