import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Loading from "components/Loading/Loading.js";
import SelectInput from "components/SelectInput/SelectInput";
import Table from "components/Table/Table.js";
import InputWithLabel from "components/TextInputs/InputWithLabel/InputWithLabel";
import strings from "constants/strings.js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "services/api";
import { translateNumber } from "utils/index.js";
import styles from "./quizStudentsStyle.js";

const useStyles = makeStyles(styles);

export default function QuizStudents(props) {
  const classes = useStyles();
  const { quizId, handleView, isOpen, questionsCount } = props;
  const [searchFilter, setSearchFilter] = useState("");
  const [sortValue, setSortValue] = useState("allStudents");
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  const lang = useSelector((state) => state.lang);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setLoading(true);
        setSearchFilter("");
        setSortValue("allStudents");
        setStudents(null);
        setTotalPosts(0);
        setCurrentPage(1);
      }, 300);
    } else {
      (async () => {
        try {
          setLoading(true);
          const filter = sortValue === "allStudents" ? null : sortValue;
          const response = (
            await api.getQuizStudents(quizId, 1, 10, searchFilter, filter)
          ).data;
          setStudents(response.data);
          setTotalPosts(response.total);
          setLoading(false);
        } catch (err) {
          // setState({ ...state, active: 3 });
          setLoading(false);
        }
      })();
    }
  }, [isOpen]);

  let studentsData = [];

  if (students) {
    students.forEach((student, index) => {
      let quizStatus = "";
      if (student.viewed === true) {
        quizStatus = strings.quizViewed[lang];
      } else {
        quizStatus = strings.absent[lang];
      }
      if (student.submitted === true) {
        quizStatus = strings.quizSubmitted[lang];
      }
      studentsData.push([
        <span key={index}>{`${student.firstName} ${student.lastName}`}</span>,
        <span key={index}>{quizStatus}</span>,
        <span key={index}>
          {student.grade === null
            ? strings.na[lang]
            : translateNumber(`${student.grade}/${questionsCount}`, lang, true)}
        </span>,
        <Button
          disabled={!student.submitted}
          key={index}
          round
          color={student.submitted === false ? "disabled" : "primary"}
          style={{ padding: "5px 30px" }}
          onClick={() => handleView(student.id)}
        >
          {strings.view[lang]}
        </Button>,
      ]);
    });
  }

  const paginate = async (pageNumber) => {
    setLoading(true);
    setCurrentPage(pageNumber);
    try {
      const filter = sortValue === "allStudents" ? null : sortValue;
      const response = (
        await api.getQuizStudents(quizId, pageNumber, 10, searchFilter, filter)
      ).data;
      setStudents(response.data);
      setLoading(false);
    } catch (err) {
      // setShowErrorModal(true);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const filter = sortValue === "allStudents" ? null : sortValue;
      const response = (
        await api.getQuizStudents(quizId, 1, 10, searchFilter, filter)
      ).data;
      setStudents(response.data);
      setTotalPosts(response.total);
      setCurrentPage(1);
      setLoading(false);
    } catch (err) {
      // setState({ ...state, active: 3 });
      setLoading(false);
    }
  };

  const handleFilterChange = () => (event) => {
    setSearchFilter(event.target.value);
  };

  const handleSort = async (event) => {
    setSortValue(event.target.value);
    try {
      setLoading(true);
      const filter =
        event.target.value === "allStudents" ? null : event.target.value;
      const response = (
        await api.getQuizStudents(quizId, 1, 10, searchFilter, filter)
      ).data;
      setStudents(response.data);
      setTotalPosts(response.total);
      setCurrentPage(1);
      setLoading(false);
    } catch (err) {
      // setState({ ...state, active: 3 });
      setLoading(false);
    }
  };

  return (
    <div className={classes.studentsContainer}>
      <div className={classes.searchContainer}>
        <GridContainer justify="center" className={classes.rowContainer}>
          <GridItem xs={7} sm={7} md={8} className={classes.gridItem}>
            <InputWithLabel
              formControlProps={{
                fullWidth: true,
              }}
              placeholder={strings.name[lang]}
              formControlStyle={classes.formControl}
              inputStyle={classes.input}
              value={searchFilter}
              inputProps={{
                onChange: handleFilterChange(),
              }}
            />
          </GridItem>
          <GridItem xs={4} sm={4} md={3} className={classes.gridItem}>
            <Button
              round
              color="secondary"
              style={{ padding: "10px 30px" }}
              onClick={() => handleSearch(searchFilter, sortValue)}
            >
              {strings.search[lang]}
            </Button>
          </GridItem>
        </GridContainer>
        <GridContainer justify="flex-start" className={classes.sortContainer}>
          <GridItem xs={6} sm={6} md={2} className={classes.gridItem}>
            {strings.filterBy[lang]}
          </GridItem>
          <GridItem xs={6} sm={6} md={4} className={classes.gridItem}>
            <SelectInput
              selectStyle={classes.select}
              placeholder={strings.filterBy[lang]}
              data={[
                { name: strings.allStudents[lang], value: "allStudents" },
                { name: strings.passed[lang], value: "passed" },
                { name: strings.failed[lang], value: "failed" },
                { name: strings.onDate[lang], value: "onDate" },
                { name: strings.late[lang], value: "late" },
              ]}
              value={sortValue}
              onSelect={handleSort}
            />
          </GridItem>
        </GridContainer>
      </div>
      <Loading loading={loading}>
        <Table
          tableHead={[
            strings.name[lang],
            strings.status[lang],
            strings.result[lang],
            " ",
          ]}
          tableData={studentsData}
          tableHeaderColor="primaryLight"
          round
          backendPagination
          currentPage={currentPage}
          paginate={paginate}
          totalPosts={totalPosts}
        />
      </Loading>
    </div>
  );
}
