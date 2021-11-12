import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Divider from "@material-ui/core/Divider";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grow from "@material-ui/core/Grow";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import { makeStyles } from "@material-ui/core/styles";
import Notifications from "@material-ui/icons/Notifications";
import classNames from "classnames";
import Button from "components/CustomButtons/Button.js";
import PropTypes from "prop-types";
import React from "react";
import { translateNumber } from "utils/index.js";
import styles from "./customDropdownStyle.js";
import { useSelector } from "react-redux";
import strings from "constants/strings.js";

const useStyles = makeStyles(styles);

export default function CustomDropdown(props) {
  const {
    buttonText,
    buttonIcon,
    icon,
    dropdownList,
    buttonProps,
    dropup,
    dropdownHeader,
    caret,
    hoverColor,
    dropPlacement,
    rtlActive,
    noLiPadding,
    innerDropDown,
    navDropdown,
    menuItemProps,
    notification,
    unreadNotifications,
    dropdownItemStyle,
    error,
    errorMessage,
    values,
    readNotifications,
  } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const lang = useSelector((state) => state.lang);

  const handleClick = (event) => {
    if (anchorEl && anchorEl.contains(event.target)) {
      if (readNotifications) {
        readNotifications();
      }
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = (event) => {
    if (anchorEl.contains(event.target)) {
      return;
    }
    if (readNotifications) {
      readNotifications();
    }
    setAnchorEl(null);
  };
  const handleCloseMenu = (param) => {
    if (readNotifications) {
      readNotifications();
    }
    setAnchorEl(null);
    if (props && props.onClick) {
      props.onClick(param);
    }
  };
  const classes = useStyles();
  const caretClasses = classNames({
    [classes.caret]: true,
    [classes.caretDropup]: dropup && !anchorEl,
    [classes.caretActive]: Boolean(anchorEl) && !dropup,
    [classes.caretRTL]: rtlActive,
  });
  const dropdownItem = classNames({
    [classes.dropdownItem]: true,
    [classes[hoverColor + "Hover"]]: true,
    [classes.noLiPadding]: noLiPadding,
    [classes.dropdownItemRTL]: rtlActive,
  });
  const dropDownMenu = (
    <MenuList role="menu" className={classes.menuList}>
      {dropdownList.map((prop, key) => {
        if (prop.divider) {
          return (
            <Divider
              key={key}
              onClick={() => handleCloseMenu("divider")}
              className={classes.dropdownDividerItem}
            />
          );
        } else if (
          prop.props !== undefined &&
          prop.props["data-ref"] === "multi"
        ) {
          return (
            <MenuItem
              key={key}
              className={dropdownItem}
              style={{ overflow: "visible", padding: 0 }}
            >
              {prop}
            </MenuItem>
          );
        }
        return (
          <MenuItem
            key={key}
            onClick={() => handleCloseMenu(values ? values[key] : prop)}
            className={
              dropdownItem +
              (dropdownItemStyle !== undefined ? " " + dropdownItemStyle : null)
            }
          >
            {prop}
          </MenuItem>
        );
      })}
    </MenuList>
  );
  return (
    <div className={innerDropDown ? classes.innerManager : classes.manager}>
      <div className={buttonText !== undefined ? "" : classes.target}>
        <Button
          aria-label="Notifications"
          aria-owns={anchorEl ? "menu-list" : null}
          aria-haspopup="true"
          {...buttonProps}
          onClick={handleClick}
        >
          {buttonIcon !== undefined ? (
            <props.buttonIcon className={classes.buttonIcon} />
          ) : null}
          {icon !== undefined ? (
            <img alt="lang-icon" className={classes.icon} src={icon} />
          ) : null}
          {notification ? (
            <div className={classes.notificationContainer}>
              <span className={classes.notificationLabel}>
                {" "}
                {strings.notifications[lang]}{" "}
              </span>
              <div style={{ position: "relative" }}>
                <Notifications
                  className={classes.headerLinksSvg + " " + classes.links}
                />
                {unreadNotifications !== translateNumber("0", lang) ? (
                  <span className={classes.notifications}>
                    {unreadNotifications}
                  </span>
                ) : null}
              </div>
            </div>
          ) : null}
          {buttonText !== undefined ? buttonText : null}
          {caret ? <b className={caretClasses} /> : null}
        </Button>
      </div>
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        transition
        disablePortal
        placement={dropPlacement}
        className={classNames({
          [classes.popperClose]: !anchorEl,
          [classes.pooperResponsive]: true,
          [classes.pooperNav]: Boolean(anchorEl) && navDropdown,
        })}
      >
        {() => (
          <Grow
            in={Boolean(anchorEl)}
            id="menu-list"
            style={
              dropup
                ? { transformOrigin: "0 100% 0" }
                : { transformOrigin: "0 0 0" }
            }
          >
            <Paper className={classes.dropdown + " " + menuItemProps}>
              {innerDropDown ? (
                dropDownMenu
              ) : (
                <ClickAwayListener onClickAway={handleClose}>
                  <div className={classes.menuClickAway}>
                    {dropdownHeader !== undefined ? (
                      <div className={classes.dropdownHeader}>
                        {dropdownHeader}
                      </div>
                    ) : null}
                    <div
                      className={
                        "scrollbar " +
                        classes.dropdownMenu +
                        (dropdownHeader !== undefined
                          ? " " + classes.dropdownWithHeader
                          : "")
                      }
                    >
                      {dropDownMenu}
                    </div>
                  </div>
                </ClickAwayListener>
              )}
            </Paper>
          </Grow>
        )}
      </Popper>
      <FormHelperText
        id="component-error-text"
        className={classes.labelRootError}
      >
        {errorMessage}
      </FormHelperText>
    </div>
  );
}

CustomDropdown.defaultProps = {
  caret: true,
  dropup: false,
  hoverColor: "primary",
  notification: false,
  unreadNotifications: "0",
};

CustomDropdown.propTypes = {
  hoverColor: PropTypes.oneOf([
    "dark",
    "gray",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "danger",
    "rose",
  ]),
  buttonText: PropTypes.node,
  notification: PropTypes.bool,
  unreadNotifications: PropTypes.string,
  buttonIcon: PropTypes.object,
  dropdownList: PropTypes.array,
  buttonProps: PropTypes.object,
  dropup: PropTypes.bool,
  dropdownHeader: PropTypes.node,
  rtlActive: PropTypes.bool,
  caret: PropTypes.bool,
  dropPlacement: PropTypes.oneOf([
    "bottom",
    "top",
    "right",
    "left",
    "bottom-start",
    "bottom-end",
    "top-start",
    "top-end",
    "right-start",
    "right-end",
    "left-start",
    "left-end",
  ]),
  noLiPadding: PropTypes.bool,
  innerDropDown: PropTypes.bool,
  navDropdown: PropTypes.bool,
  // This is a function that returns the clicked menu item
  onClick: PropTypes.func,
};
