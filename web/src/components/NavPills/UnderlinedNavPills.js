import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { useSelector } from "react-redux";

import styles from "./underlinedNavPillsStyle.js";

const useStyles = makeStyles(styles);

export default function UnderlinedNavPills(props) {
  const [active, setActive] = React.useState(props.active);
  const handleChange = (event, active) => {
    setActive(active);
  };
  const handleChangeIndex = (index) => {
    setActive(index);
  };
  const direction = useSelector((state) => state.lang) === "ar" ? "rtl" : "ltr";
  const { tabs, color, horizontal, alignCenter, style } = props;
  const classes = useStyles();
  const flexContainerClasses = classNames({
    [classes.flexContainer]: true,
    [classes.horizontalDisplay]: horizontal !== undefined,
  });
  const incicatorClasses = classNames({
    [classes[color + "Indicator"]]: true,
  });
  const tabButtons = (
    <div style={{ position: "relative" }}>
      <Tabs
        classes={{
          root: classes.root,
          fixed: classes.fixed,
          flexContainer: flexContainerClasses,
          indicator: incicatorClasses,
        }}
        value={active}
        onChange={handleChange}
        centered={alignCenter}
      >
        {tabs.map((prop, key) => {
          var icon = {};
          if (prop.tabIcon !== undefined) {
            icon["icon"] = <prop.tabIcon className={classes.tabIcon} />;
          }
          const pillsClasses = classNames({
            [classes.pills]: true,
            [classes.horizontalPills]: horizontal !== undefined,
            [classes.pillsWithIcons]: prop.tabIcon !== undefined,
          });
          return (
            <Tab
              label={prop.tabButton}
              key={key}
              {...icon}
              classes={{
                root: pillsClasses,
                // label: classes.label,
                selected: classes[color],
              }}
            />
          );
        })}
      </Tabs>
      <span className={classes.inactiveIndicator}></span>
    </div>
  );
  const tabContent = (
    <div className={classes.contentWrapper}>
      <SwipeableViews
        axis={direction === "rtl" ? "x-reverse" : "x"}
        index={active}
        onChangeIndex={handleChangeIndex}
        style={{
          direction,
        }}
      >
        {tabs.map((prop, key) => {
          return (
            <div
              className={classes.tabContent}
              style={{
                direction,
              }}
              key={key}
            >
              {prop.tabContent}
            </div>
          );
        })}
      </SwipeableViews>
    </div>
  );
  return horizontal !== undefined ? (
    <div style={{ ...style }}>
      <GridContainer>
        <GridItem {...horizontal.tabsGrid}>{tabButtons}</GridItem>
        <GridItem {...horizontal.contentGrid}>{tabContent}</GridItem>
      </GridContainer>
    </div>
  ) : (
    <div style={{ ...style }}>
      <div className={classes.buttonsContainer}>{tabButtons}</div>
      {tabContent}
    </div>
  );
}

UnderlinedNavPills.defaultProps = {
  active: 0,
  color: "primary",
};

UnderlinedNavPills.propTypes = {
  // index of the default active pill
  active: PropTypes.number,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabButton: PropTypes.string,
      tabIcon: PropTypes.object,
      tabContent: PropTypes.node,
    })
  ).isRequired,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
  ]),
  direction: PropTypes.string,
  horizontal: PropTypes.shape({
    tabsGrid: PropTypes.object,
    contentGrid: PropTypes.object,
  }),
  alignCenter: PropTypes.bool,
};
