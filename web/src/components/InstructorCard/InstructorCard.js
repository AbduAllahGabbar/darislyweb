import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import Rating from "@material-ui/lab/Rating";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { translateNumber } from "utils/index.js";
import Card from "../Card/Card.js";
import CardAvatar from "../Card/CardAvatar.js";
import CardBody from "../Card/CardBody.js";
import CardFooter from "../Card/CardFooter.js";
import styles from "./instructorCardStyle.js";

const useStyles = makeStyles(styles);

export default function InstructorCard(props) {
  // const [mobileOpen, setMobileOpen] = React.useState(false);
  const history = useHistory();
  const lang = useSelector((state) => state.lang);
  const handleClick = (courseId) => {
    //Add the correct screen here
    history.push({ pathname: "coursesingle", search: `?id=${courseId}` });
  };
  const classes = useStyles();

  return (
    <Card profile plain>
      <div
        onClick={() => handleClick(props.instructor.id)}
        className={classes.pointer}
      >
        <CardAvatar profile>
          {props.instructor.tutor.hasImage ? (
            <img
              src={props.instructor.tutor.imageUrl}
              alt="..."
              className={classes.img}
            />
          ) : (
            <AccountCircleIcon className={classes.icon} />
          )}
        </CardAvatar>
        <CardBody>
          <div>
            <h4
              className={classes.cardHeader}
            >{`${props.instructor.tutor.firstName} ${props.instructor.tutor.lastName}`}</h4>
            <h6 className={classes.cardHeader}>
              {props.instructor.subject.name[lang]}
            </h6>
          </div>
        </CardBody>
      </div>
      <CardFooter profile className={classes.justifyContent}>
        <div className={classes.rating}>
          <Rating
            name="read-only"
            value={props.instructor.rating}
            precision={0.1}
            readOnly
            icon={<StarRoundedIcon fontSize="inherit" />}
          />
          {/* {props.lang === "en" ?
                        <span dir="auto" className={classes.numberFont}>({props.instructor.numberOfRatings})</span> : */}
          <span dir="auto" className={classes.numberFont}>
            ({translateNumber("0", lang)})
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
