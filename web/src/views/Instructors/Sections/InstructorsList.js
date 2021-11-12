import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import InstructorCard from "components/InstructorCard/InstructorCard.js";
import Pagination from "components/Pagination/Pagination.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import styles from "./instructorsListStyle.js";
import { useSelector } from "react-redux";

const useStyles = makeStyles(styles);

export default function InstructorList(props) {
    const [values] = useState({
        instructorsPerPage: 8,
    });
    const lang = useSelector((state) => state.lang);
    const classes = useStyles();

    let matchingInstructors = props.instructors;

    const indexOfLastInstructor = props.currentPage * values.instructorsPerPage;
    const indexOfFirstInstructors = indexOfLastInstructor - values.instructorsPerPage;
    const currentInstructors = matchingInstructors.slice(
        indexOfFirstInstructors,
        indexOfLastInstructor
    );

    let instructorsList = [];
    if (currentInstructors.length > 0) {
        instructorsList = currentInstructors.map((instructor, index) => (
            <GridItem xs={12} sm={3} md={3} key={index}>
                <InstructorCard
                    instructor={instructor}
                    lang={lang}
                />
            </GridItem>
        ));
    }
    return (
        <GridContainer justify="center" className={classes.rowContainer}>
            <GridItem xs={12} sm={10} md={10}>
                <GridContainer justify="center">
                    {instructorsList}
                </GridContainer>
                <GridContainer justify="center">
                    <GridItem xs={8} sm={6} md={3} >
                        <Pagination
                            color="primary"
                            postsPerPage={values.instructorsPerPage}
                            totalPosts={matchingInstructors.length}
                            paginate={props.paginate}
                            currentPage={props.currentPage}
                            lang={lang}
                        />
                    </GridItem>
                </GridContainer>
            </GridItem>
        </GridContainer>
    );
};

