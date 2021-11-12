import { makeStyles } from "@material-ui/core/styles";
import GeneralSettings from "components/GeneralSettings/GeneralSettings";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import PasswordSettings from "components/PasswordSettings/PasswordSettings";
import strings from "constants/strings.js";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./settingsStyle.js";

const useStyles = makeStyles(styles);

export default function Settings(props) {
  const classes = useStyles();
  // const { student } = props;
  const lang = useSelector((state) => state.lang);

  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={10} className={classes.gridItem}>
        <NavPills
          alignCenter
          color="secondary"
          tabs={[
            {
              tabButton: strings.general[lang],
              tabContent: (
                <GridContainer justify="center">
                  <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    className={classes.gridItem}
                    style={{ marginTop: 20 }}
                  >
                    <GeneralSettings />
                  </GridItem>
                </GridContainer>
              ),
            },
            // {
            //   tabButton: "Billing",
            //   tabContent: (
            //     <GridContainer justify="center">
            //       <GridItem
            //         xs={12}
            //         sm={12}
            //         md={12}
            //         className={classes.gridItem}
            //         style={{ marginTop: 20 }}
            //       ></GridItem>
            //     </GridContainer>
            //   ),
            // },
            {
              tabButton: strings.passwordInputLabel[lang],
              tabContent: (
                <GridContainer justify="center">
                  <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    className={classes.gridItem}
                    style={{ marginTop: 20 }}
                  >
                    <PasswordSettings />
                  </GridItem>
                </GridContainer>
              ),
            },
          ]}
        />
      </GridItem>
    </GridContainer>
  );
}
