import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dashboardStyle from "./dashboardStyle.js";
import Overview from "./Sections/Overview/Overview.js";
import Students from "./Sections/Students/Students.js";
import api from "services/api";
import ErrorModal from "components/ErrorModal/ErrorModal.js";
import strings from "constants/strings";

const useStyles = makeStyles(dashboardStyle);

export default function Dashboard(props) {
  const classes = useStyles();
  const { students } = props;

  const [state, setState] = useState({
    errorModal: false,
    loadingStats: true,
    stats: null,
    students: null,
  });

  const stateHandler = (key, value) => {
    setState({ ...state, [key]: value });
  };

  const lang = useSelector((state) => state.lang);
  useEffect(() => {
    (async () => {
      try {
        const stats = (await api.getTutorStats()).data;
        setState({ ...state, stats, loadingStats: false });
      } catch (err) {
        console.log(err);
        stateHandler("errorModal", true);
      }
    })();
  }, []);

  return (
    <div>
      <ErrorModal
        open={state.errorModal}
        onClose={() => stateHandler("errorModal", false)}
      />
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={10} className={classes.gridItem}>
          <NavPills
            alignCenter
            color="secondary"
            tabs={[
              {
                tabButton: strings.overview[lang],
                tabContent: (
                  <Overview loading={state.loadingStats} stats={state.stats} />
                ),
              },
              {
                tabButton: strings.students[lang],
                tabContent: <Students students={[]} />,
              },
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}
