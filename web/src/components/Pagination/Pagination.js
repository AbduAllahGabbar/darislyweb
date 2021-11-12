import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
import { useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import strings from "constants/strings.js";
import styles from "components/Pagination/paginationStyle.js";
import { translateNumber } from "utils";

const useStyles = makeStyles(styles);

export default function Pagination(props) {
  const {
    color,
    className,
    totalPosts,
    postsPerPage,
    currentPage,
    paginate,
  } = props;
  const classes = useStyles();
  const paginationClasses = classNames(classes.pagination, className);
  const lang = useSelector((state) => state.lang);

  const pages = [];
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  pages.push({ text: strings.paginationPrev[lang] });

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push({ text: i, active: i === currentPage ? true : false });
    }
  } else {
    let difference = totalPages - currentPage;
    if (difference < 2) {
      difference += 1;
      for (let i = currentPage - 5 + difference; i <= totalPages; i++) {
        pages.push({ text: i, active: i === currentPage ? true : false });
      }
    } else if (difference >= totalPages - 2) {
      for (let i = 1; i <= 5; i++) {
        pages.push({ text: i, active: i === currentPage ? true : false });
      }
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pages.push({ text: i, active: i === currentPage ? true : false });
      }
    }
  }
  pages.push({ text: strings.paginationNext[lang] });

  return (
    <ul className={paginationClasses}>
      {pages.map((prop, key) => {
        const paginationLink = classNames({
          [classes.paginationLink]: true,
          [classes[color]]: prop.active,
          [classes.disabled]: prop.disabled,
        });
        return (
          <li className={classes.paginationItem} key={key}>
            {prop.text === strings.paginationNext[lang] ? (
              <Button
                onClick={() =>
                  paginate(
                    totalPages !== currentPage ? currentPage + 1 : currentPage
                  )
                }
                className={paginationLink}
                disabled={prop.disabled}
              >
                {prop.text}
              </Button>
            ) : prop.text === strings.paginationPrev[lang] ? (
              <Button
                onClick={() =>
                  paginate(1 !== currentPage ? currentPage - 1 : currentPage)
                }
                className={paginationLink}
                disabled={prop.disabled}
              >
                {prop.text}
              </Button>
            ) : (
              <Button
                onClick={() => paginate(prop.text)}
                className={paginationLink}
                disabled={prop.disabled}
              >
                {translateNumber(prop.text.toString(), lang)}
              </Button>
            )}
          </li>
        );
      })}
    </ul>
  );
}

Pagination.defaultProps = {
  color: "primary",
};

Pagination.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  className: PropTypes.string,
};
