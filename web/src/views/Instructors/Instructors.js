import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import CustomInput from "components/CustomInput/CustomInput";
import ErrorModal from "components/ErrorModal/ErrorModal.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Loading from "components/Loading/Loading";
import strings from "constants/strings";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "services/api";
import { toCamelCase } from "utils";
import bgImage from "../../assets/images/course-bg.png";
import instructorsPageStyle from "./instructorsStyle.js";
import InstructorsList from "./Sections/InstructorsList.js";

const useStyles = makeStyles(instructorsPageStyle);

const educations = {
  ar: strings.educations.map((education) => education.ar),
  en: strings.educations.map((education) => education.en),
};
const grades = {
  ar: strings.grades.map((grade) => grade.ar),
  en: strings.grades.map((grade) => grade.en),
};

export default function Instructors(props) {
  const [state, setState] = useState({
    courses: null,
    subjects: null,
    matchingCourses: null,
    currentPage: 1,
    errorModal: false,
    sortBy: {
      key: "",
      value: "",
    },
  });
  const [filtersState, setFiltersState] = useState({
    course: "",
    grade: "",
    education: "",
    search: "",
  });
  const lang = useSelector((state) => state.lang);
  const stateHandler = (key, value) => {
    setState({ ...state, [key]: value });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      try {
        const courses = (await api.getCourses()).data.data;
        const subjectsData = (await api.getSubjects()).data;
        const subjects = {
          ar: subjectsData.map((subject) => subject.name.ar),
          en: subjectsData.map((subject) => subject.name.en),
          ids: subjectsData.map((subject) => subject.id),
        };
        setState({
          ...state,
          courses,
          matchingCourses: courses,
          subjects: subjects,
        });
      } catch (err) {
        console.log(err);
        stateHandler("errorModal", true);
      }
    })();
  }, []);

  const applyFilters = () => {
    let matchingCourses = state.courses;

    if (matchingCourses?.length > 0) {
      matchingCourses = matchingCourses.filter((course) => {
        return Object.keys(filtersState).every((key) => {
          if (filtersState[key] !== "") {
            if (key === "subject") {
              return course.subject.name[lang] === filtersState[key];
            } else if (key === "education") {
              return (
                course.education === educations[lang].indexOf(filtersState[key])
              );
            } else if (key === "grade") {
              return course.grade === grades[lang].indexOf(filtersState[key]);
            } else if (key === "search")
              return (course.tutor.firstName + " " + course.tutor.lastName)
                .toLowerCase()
                .includes(filtersState[key].toLowerCase());
          } else return true;
        });
      });
      if (state.sortBy.key) {
        matchingCourses.sort(compare[state.sortBy.key]);
      }
    }

    setState({ ...state, matchingCourses, currentPage: 1 });
  };

  useEffect(() => {
    applyFilters();
  }, [filtersState, lang]);

  const handleFiltersChange = (key, value) => {
    let filters = filtersState;
    filters[key] = value;
    setFiltersState({ ...filters });
  };

  const handleSearchChange = (event) => {
    let filters = filtersState;
    filters.search = event.target.value;
    setFiltersState({ ...filters });
  };

  const compare = {
    tutorName: (a, b) => {
      if (
        a.tutor.firstName + " " + a.tutor.lastName <
        b.tutor.firstName + " " + b.tutor.lastName
      ) {
        return -1;
      }
      if (
        a.tutor.firstName + " " + a.tutor.lastName >
        b.tutor.firstName + " " + b.tutor.lastName
      ) {
        return 1;
      }
      return 0;
    },
    subject: (a, b) => {
      if (a.subject.name[lang] < b.subject.name[lang]) {
        return -1;
      }
      if (a.subject.name[lang] > b.subject.name[lang]) {
        return 1;
      }
      return 0;
    },
  };
  const handleSortChange = (value) => {
    let matchingCourses = state.matchingCourses;
    let sortKey = "";
    if (lang === "ar") {
      if (value === "اسم المدرس") {
        sortKey = "tutorName";
      } else if (value === "المادة") {
        sortKey = "subject";
      }
    } else {
      sortKey = toCamelCase(value);
    }
    if (matchingCourses?.length > 0) {
      matchingCourses.sort(compare[sortKey]);
    }
    setState({
      ...state,
      sortBy: { key: sortKey, value: value },
      currentPage: 1,
    });
  };

  const paginate = (pageNumber) => {
    stateHandler("currentPage", pageNumber);
  };

  const classes = useStyles();
  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + bgImage + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundColor: "white",
        }}
      >
        <ErrorModal
          open={state.errorModal}
          onClose={() => stateHandler("errorModal", false)}
        />
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12}>
              <GridContainer justify="center">
                <GridItem xs={10} sm={10} md={4}>
                  <div className={classes.secondaryTitle}>
                    {strings.instructorsPageHeading[lang]}
                  </div>
                </GridItem>
              </GridContainer>
              <GridContainer justify="center" className={classes.rowHeight}>
                <GridItem xs={10} sm={10} md={3}>
                  <GridContainer justify="flex-start">
                    <GridItem xs={12} sm={10} md={10}>
                      <div className={classes.subTitle}>
                        {strings.instructorsSubHeading[lang]}
                      </div>
                    </GridItem>
                  </GridContainer>
                  <GridContainer
                    justify="flex-start"
                    className={classes.alignLeft}
                  >
                    <GridItem xs={12} sm={10} md={10}>
                      <CustomDropdown
                        noLiPadding
                        navDropdown
                        buttonText={
                          filtersState.subject
                            ? filtersState.subject
                            : strings.subject[lang]
                        }
                        onClick={(value) =>
                          handleFiltersChange("subject", value)
                        }
                        buttonProps={{
                          className: classes.dropdownButton,
                        }}
                        dropdownList={
                          state.subjects ? state.subjects[lang] : []
                        }
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer
                    justify="flex-start"
                    className={classes.rowContainer + " " + classes.alignLeft}
                  >
                    <GridItem xs={12} sm={10} md={5}>
                      <CustomDropdown
                        noLiPadding
                        navDropdown
                        buttonText={
                          filtersState.education
                            ? filtersState.education
                            : strings.education[lang]
                        }
                        onClick={(value) =>
                          handleFiltersChange("education", value)
                        }
                        buttonProps={{
                          className: classes.dropdownButton,
                        }}
                        dropdownList={educations[lang]}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={10} md={5}>
                      <CustomDropdown
                        noLiPadding
                        navDropdown
                        buttonText={
                          filtersState.grade
                            ? filtersState.grade
                            : strings.grade[lang]
                        }
                        onClick={(value) => handleFiltersChange("grade", value)}
                        buttonProps={{
                          className: classes.dropdownButton,
                        }}
                        menuItemProps={classes.menuItemWidthSmall}
                        dropdownList={grades[lang]}
                      />
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <GridItem xs={10} sm={10} md={6}>
                  <div className={classes.subTitle}>
                    {strings.instructorsParagraph[lang]}
                  </div>
                </GridItem>
                <GridItem
                  xs={12}
                  sm={12}
                  md={3}
                  className={classes.alignCenter}
                >
                  <GridContainer justify="center">
                    <GridItem xs={10} sm={10} md={10}>
                      <CustomDropdown
                        noLiPadding
                        navDropdown
                        buttonText={
                          state.sortBy.value
                            ? state.sortBy.value
                            : strings.sortBy[lang]
                        }
                        onClick={(value) => handleSortChange(value)}
                        buttonProps={{
                          className: classes.sortButton,
                        }}
                        dropdownList={[
                          strings.tutorName[lang],
                          strings.subject[lang],
                        ]}
                      />
                    </GridItem>
                  </GridContainer>
                </GridItem>
              </GridContainer>
              <GridContainer justify="center">
                <GridItem
                  xs={10}
                  sm={10}
                  md={4}
                  className={classes.searchSpacing}
                >
                  <CustomInput
                    id="font-awesome"
                    formControlProps={{
                      fullWidth: true,
                      className: classes.inputSearch,
                    }}
                    inputProps={{
                      onChange: handleSearchChange,
                      placeholder: strings.instructorsSearch[lang],
                      endAdornment: (
                        <InputAdornment position="end">
                          <i
                            className={
                              "fas fa-search " + classes.inputSearchIcon
                            }
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </GridItem>
              </GridContainer>
              <Loading loading={state.matchingCourses ? false : true}>
                <InstructorsList
                  instructors={state.matchingCourses}
                  lang={lang}
                  paginate={paginate}
                  currentPage={state.currentPage}
                />
              </Loading>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
