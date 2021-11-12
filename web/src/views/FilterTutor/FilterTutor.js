/*eslint-disable*/
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AreaTutorInfo from "assets/images/area-tutor-info.png";
import CityTutorInfo from "assets/images/city-tutor-info.png";
import EducationTutorInfo from "assets/images/education-tutor-info.png";
import GradeTutorInfo from "assets/images/grade-tutor-info.png";
import SearchTutorInfoIcon from "assets/images/search-tutor-info-icon.png";
import SearchTutorInfo from "assets/images/search-tutor-info.png";
import SubjectTutorInfo from "assets/images/subject-tutor-info.png";
import { secondaryColor } from "assets/jss/material-kit-pro-react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button";
import FilterTutorSearch from "components/FilterTutorSearch/FilterTutorSearch";
import FilterTutorSelect from "components/FilterTutorSelect/FilterTutorSelect";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import strings from "constants/strings";
import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import filterTutorStyle from "./filterTutorStyle";

const useStyles = makeStyles(filterTutorStyle);

export default function FilterTutor(props) {
  const lang = useSelector((state) => state.lang);

  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <div className={classes.container}>
        <div className={classes.inputContainer}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Card className={classes.card}>
                <CardBody className={classes.noPadding}>
                  <GridContainer justify="center">
                    <GridItem
                      xs={12}
                      sm={12}
                      md={12}
                      className={classes.containerItem}
                    >
                      <p className={classes.title}>
                        {strings.monthlySubscription[lang]}
                      </p>
                    </GridItem>
                    <FilterTutorSearch
                      imageSrc={SearchTutorInfo}
                      labelText={strings.searchName[lang].toUpperCase()}
                      placeholder={strings.searchByName[lang].toUpperCase()}
                      iconSrc={SearchTutorInfoIcon}
                    />
                    <FilterTutorSelect
                      id="subject"
                      imageSrc={SubjectTutorInfo}
                      labelText={`${strings.select[
                        lang
                      ].toUpperCase()} ${strings.subject[lang].toUpperCase()}`}
                      placeholder={strings.subject[lang].toUpperCase()}
                      style={{ backgroundColor: secondaryColor[2] }}
                      data={strings.subjects.map((subject) => subject[lang])}
                    />
                    <FilterTutorSelect
                      id="education"
                      imageSrc={EducationTutorInfo}
                      labelText={`${strings.select[
                        lang
                      ].toUpperCase()} ${strings.education[
                        lang
                      ].toUpperCase()}`}
                      placeholder={strings.education[lang].toUpperCase()}
                      data={strings.educations.map(
                        (education) => education[lang]
                      )}
                    />
                    <FilterTutorSelect
                      id="grade"
                      imageSrc={GradeTutorInfo}
                      labelText={`${strings.select[
                        lang
                      ].toUpperCase()} ${strings.grade[lang].toUpperCase()}`}
                      placeholder={strings.grade[lang].toUpperCase()}
                      style={{ backgroundColor: secondaryColor[2] }}
                      data={strings.grades.map((grade) => grade[lang])}
                    />

                    <GridContainer className={classes.gridContainerRow}>
                      <GridItem
                        xs={12}
                        sm={12}
                        md={6}
                        className={
                          classes.noPadding + " " + classes.borderRight
                        }
                      >
                        <FilterTutorSelect
                          id="city"
                          imageSrc={CityTutorInfo}
                          labelText={`${strings.select[
                            lang
                          ].toUpperCase()} ${strings.city[lang].toUpperCase()}`}
                          placeholder={strings.city[lang].toUpperCase()}
                          data={strings.cities.map((city) => city[lang]).sort()}
                        />
                      </GridItem>
                      <GridItem
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.noPadding}
                      >
                        <FilterTutorSelect
                          id="area"
                          imageSrc={AreaTutorInfo}
                          labelText={`${strings.select[
                            lang
                          ].toUpperCase()} ${strings.area[lang].toUpperCase()}`}
                          placeholder={strings.area[lang].toUpperCase()}
                          data={strings.areas.map((area) => area[lang]).sort()}
                        />
                      </GridItem>
                    </GridContainer>
                    <Button className={classes.button}>
                      {strings.search[lang]}
                    </Button>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
