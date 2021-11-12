/* eslint-disable */
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import instructor1 from "assets/images/instructor1.png";
import instructor2 from "assets/images/instructor2.png";
import instructor3 from "assets/images/instructor3.png";
import instructor4 from "assets/images/instructor4.png";
import instructor5 from "assets/images/instructor5.png";
import instructor6 from "assets/images/instructor6.png";
import instructor7 from "assets/images/instructor7.png";
import instructor8 from "assets/images/instructor8.png";
import Button from "components/CustomButtons/Button.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import ArLanguageIcon from "../../assets/images/egy-ar-language.png";
import EnLanguageIcon from "../../assets/images/usa-en-language.png";
import strings from "../../constants/strings";
import { setLanguage } from "../../store/actions";
import api from "services/api";
import { formatAMPM, getDateString, translateNumber, timeAgo } from "utils";
import classNames from "classnames";
import styles from "./headerLinksStyle";
import enums from "enums";

const constructNotificationMessage = (notification, lang) => {
  let notificationMessage = {
    id: notification.id,
    read: notification.read,
    type: notification.type,
    date: new Date(notification.createdAt),
    image: "",
  };

  if (notification.type === enums.NotificationTypes.ANNOUNCEMENT) {
    notificationMessage.name = notification.content.title;
    notificationMessage.text = notification.content.content;
  } else if (notification.type === enums.NotificationTypes.LECTURE_VIDEO) {
    notificationMessage.sessionId = notification.content.courseGroupSessionId;
    notificationMessage.name = `${notification.content.subjectName[lang]} ${strings.by[lang]} ${notification.content.tutorName}`;
    notificationMessage.text = `${strings.lectureUnidentified[lang]} "${
      notification.content.lectureTitle
    }" ${strings.startsOnDate[lang]} ${getDateString(
      new Date(notification.content.date),
      lang,
      true
    )} ${strings.startsOnHour[lang]} ${formatAMPM(
      notification.content.from,
      lang
    )}`;
  } else if (notification.type === enums.NotificationTypes.LIVE_MEETING) {
    notificationMessage.sessionId = notification.content.courseGroupSessionId;
    notificationMessage.meetingUrl = notification.content.meetingUrl;
    notificationMessage.name = `${notification.content.subjectName[lang]} ${strings.by[lang]} ${notification.content.tutorName}`;
    notificationMessage.text = `${strings.QASessionForLecture[lang]} "${
      notification.content.lectureTitle
    }" ${strings.startsOnDate[lang]} ${getDateString(
      new Date(notification.content.date),
      lang,
      true
    )} ${strings.startsOnHour[lang]} ${formatAMPM(
      notification.content.from,
      lang
    )}`;
  }
  return notificationMessage;
};

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const currentUser = useSelector((state) => state.auth);

  const cart = useSelector((state) => state.cart);

  const loggedIn =
    (currentUser?.role === enums.UserRoles.STUDENT &&
      currentUser?.emailVerified &&
      currentUser?.phone) ||
    currentUser?.role === enums.UserRoles.TUTOR ||
    currentUser?.role === enums.UserRoles.STAFF;

  const [values, setValues] = useState({
    width: window.innerWidth,
    unreadNotifications: 0,
    notifications: [],
  });

  const dispatch = useDispatch();

  const lang = useSelector((state) => state.lang);

  const history = useHistory();

  const selectLangHandler = (lang) => {
    dispatch(setLanguage(lang));
  };
  const handleSignup = () => {
    history.push({
      pathname: "/signup",
    });
  };
  const handleProfile = () => {
    history.push({
      pathname: "/",
    });
  };
  const goToVideoLecture = (sessionId) => {
    history.push({
      pathname: "/videolecture",
      state: { sessionId: sessionId },
    });
    history.go(0);
  };

  const goToLiveSession = (meetingUrl) => {
    window.open(meetingUrl, "_blank");
  };

  const goToCart = () => {
    history.push({
      pathname: "/cart",
    });
  };

  const { dropdownHoverColor, handleDrawerToggle } = props;
  const classes = useStyles();

  const notifications = values.notifications.map((notification) =>
    constructNotificationMessage(notification, lang)
  );

  let notificationsList = [];
  if (notifications.length > 0) {
    notificationsList = notifications.map((notification, index) => {
      let notificationClasses = classNames({
        [classes.notificationList]: true,
        [classes.notificationUnread]: !notification.read,
      });
      return (
        <div
          className={notificationClasses}
          onClick={() =>
            notification.type === enums.NotificationTypes.LECTURE_VIDEO
              ? goToVideoLecture(notification.sessionId)
              : notification.type === enums.NotificationTypes.LIVE_MEETING
              ? goToLiveSession(notification.meetingUrl)
              : null
          }
        >
          {/* <img className={classes.teacherIcon} src={notification.image} /> */}
          <div className={classes.notificationItem}>
            <p className={classes.notificationBody}>
              <strong>{notification.name} </strong>
              {notification.text}
            </p>
            <p className={classes.notificationDate}>
              {timeAgo(notification.date, lang)}
            </p>
          </div>
        </div>
      );
    });
  } else {
    notificationsList = [
      <div className={classes.noNotifications}>
        {strings.noNotifications[lang]}
      </div>,
    ];
  }

  useEffect(() => {
    (async () => {
      try {
        if (currentUser && currentUser?.role === enums.UserRoles.STUDENT) {
          const notifications = (await api.getNotifications()).data;

          setValues({
            ...values,
            unreadNotifications: notifications.data?.filter(
              (notification) => notification.read == 0
            ).length,
            notifications: notifications.data,
          });
        }
      } catch (err) {
        // TODO: Something went wrong
      }
    })();
  }, [currentUser]);

  const readNotifications = async () => {
    if (values.notifications.length) {
      const unreadNotifications = values.notifications
        .filter((notification) => !notification.read)
        .map((notification) => notification.id);

      if (unreadNotifications.length) {
        try {
          await api.readNotifications(unreadNotifications);
          let updatedNotifications = [...values.notifications];
          updatedNotifications.forEach(
            (notification) => (notification.read = 1)
          );

          setValues({
            ...values,
            unreadNotifications: 0,
            notifications: updatedNotifications,
          });
        } catch (err) {
          // TODO: Something went wrong
        }
      }
    }
  };

  return (
    <List className={classes.list + " " + classes.mlAuto}>
      <ListItem className={classes.listItem}>
        <Link
          onClick={handleDrawerToggle}
          to="/instructors"
          className={classes.headerLink}
        >
          {strings.ourCourses[lang]}
        </Link>
      </ListItem>
      {loggedIn ? (
        <div>
          <ListItem className={classes.listItem}>
            <Button
              onClick={() => {
                handleProfile();
                handleDrawerToggle();
              }}
              color="primary"
              className={classes.profileButton}
              round
            >
              {strings.profileNavLink[lang]}{" "}
              <AccountCircleIcon className={classes.profileIcon} />
            </Button>
          </ListItem>

          {currentUser?.role === enums.UserRoles.STUDENT ? (
            <ListItem className={classes.listItem}>
              <Button
                onClick={() => {
                  goToCart();
                  handleDrawerToggle();
                }}
                // color="secondary"
                className={classes.cartButton}
                round
              >
                <span className={classes.cartLabel}>
                  {" "}
                  {strings.cart[lang]}{" "}
                </span>
                <ShoppingCartOutlinedIcon className={classes.cartIcon} />

                {translateNumber(cart.items.length.toString(), lang) !==
                translateNumber("0", lang) ? (
                  <span className={classes.cartItems}>
                    {translateNumber(cart.items.length.toString(), lang)}
                  </span>
                ) : null}
              </Button>
            </ListItem>
          ) : null}

          <ListItem className={classes.listItem}>
            <CustomDropdown
              noLiPadding
              navDropdown
              caret={false}
              hoverColor={dropdownHoverColor}
              buttonProps={{
                className: classes.navNotification,
                round: true,
                justIcon: true,
              }}
              notification
              unreadNotifications={translateNumber(
                values.unreadNotifications.toString(),
                lang
              )}
              dropdownHeader={strings.notifications[lang]}
              dropdownList={notificationsList}
              dropdownItemStyle={classes.dropdownItemStyle}
              readNotifications={
                currentUser && currentUser.role === enums.UserRoles.STUDENT
                  ? readNotifications
                  : null
              }
            />
          </ListItem>
        </div>
      ) : (
        <div>
          <ListItem className={classes.listItem}>
            <Link
              onClick={handleDrawerToggle}
              to="/aboutus"
              className={classes.headerLink}
            >
              {strings.aboutNavLink[lang]}
            </Link>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Link
              onClick={handleDrawerToggle}
              to="/signinstaff"
              className={classes.headerLink}
            >
              {strings.signInStaffNavLink[lang]}
            </Link>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Link
              onClick={handleDrawerToggle}
              to="/signintutor"
              className={classes.headerLink}
            >
              {strings.signInTutorNavLink[lang]}
            </Link>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Link
              onClick={handleDrawerToggle}
              to="/signin"
              className={classes.headerLink}
            >
              {strings.signInNavLink[lang]}
            </Link>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Button
              onClick={() => {
                handleSignup();
                handleDrawerToggle();
              }}
              color="primary"
              className={classes.navButton}
              round
            >
              {strings.signUpNavLink[lang]}
            </Button>
          </ListItem>
        </div>
      )}
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          hoverColor={dropdownHoverColor}
          buttonText={strings.langNavLink[lang]}
          buttonProps={{
            className: classes.navLangButton,
            color: "transparent",
          }}
          icon={lang === "en" ? EnLanguageIcon : ArLanguageIcon}
          dropdownList={[
            <div
              onClick={() => {
                selectLangHandler("en");
                handleDrawerToggle();
              }}
            >
              <img className={classes.languageIcon} src={EnLanguageIcon} />
              English
            </div>,
            <div
              onClick={() => {
                selectLangHandler("ar");
                handleDrawerToggle();
              }}
            >
              <img className={classes.languageIcon} src={ArLanguageIcon} />
              العربية
            </div>,
          ]}
        />
      </ListItem>

      {loggedIn ? (
        <ListItem className={classes.listItem}>
          <a
            href={`${process.env.REACT_APP_API_HOST}/auth/logout`}
            className={classes.headerLink}
          >
            {strings.logoutNavLink[lang]}
          </a>
        </ListItem>
      ) : null}
    </List>
  );
}

HeaderLinks.defaultProps = {
  hoverColor: "primary",
};

HeaderLinks.propTypes = {
  dropdownHoverColor: PropTypes.oneOf([
    "dark",
    "primary",
    "gray",
    "secondary",
    "info",
    "success",
    "warning",
    "danger",
    "rose",
  ]),
};
