import FullCalendar from "@fullcalendar/react";
import arLocale from "@fullcalendar/core/locales/ar";
import dayGridPlugin from "@fullcalendar/daygrid";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { translateNumber } from "utils";
import calendarStyle from "./calendarStyle.js";
import { primaryColor } from "assets/jss/material-kit-pro-react";

const useStyles = makeStyles(calendarStyle);

export default function Calendar(props) {
  const [values] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const lang = useSelector((state) => state.lang);

  let events = props.sessions.map((event) => {
    let fromDate = new Date(event.from);
    let dateString = moment(event.from).format("YYYY-MM-DD");
    let dayNumber = fromDate.getDate();
    return {
      title: dayNumber,
      id: dateString,
      date: dateString,
      ...(props.selectedDate === dateString ? { color: primaryColor[0] } : {}),
    };
  });

  const classes = useStyles();
  return (
    <div style={{ height: 410 }} className={classes.calendarStyling}>
      {props.display ? (
        <FullCalendar
          eventClick={props.eventClick}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          showNonCurrentDates={false}
          events={events}
          locale={lang === "ar" ? arLocale : null}
          height="410px"
        />
      ) : null}
    </div>
  );
}
