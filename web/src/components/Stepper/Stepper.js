import Step from '@material-ui/core/Step';
import StepConnector from '@material-ui/core/StepConnector';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { primaryColor } from "assets/jss/material-kit-pro-react.js";
import React from 'react';
import strings from "constants/strings";
import { useSelector } from "react-redux";
import { translateNumber } from "utils";

const QontoConnector = withStyles({
    alternativeLabel: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    active: {
        '& $line': {
            borderColor: primaryColor[0],
        },
    },
    completed: {
        '& $line': {
            borderColor: primaryColor[0],
        },
    },
    line: {
        //   borderColor: '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
        marginLeft: "12%",
        marginRight: "13%",
    },
})(StepConnector);

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        "& .MuiStepLabel-active": {
            color: primaryColor[0]
        },
        "& .MuiStepLabel-completed": {
            color: primaryColor[0]
        },
        "& .MuiStepIcon-root.MuiStepIcon-active": {
            color: primaryColor[0]
        },
        "& .MuiStepIcon-root.MuiStepIcon-completed": {
            color: primaryColor[0]
        }
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    iconContainer: { // define styles for icon container
        transform: 'scale(2)',
    },
    active: {
        color: primaryColor[0]
    }

}));



export default function HorizontalLabelPositionBelowStepper(props) {
    const classes = useStyles();
    const lang = useSelector((state) => state.lang);
    const steps = [strings.description[lang], strings.curriculum[lang], strings.schedule[lang]];

    return (
        <div className={classes.root}>
            <Stepper activeStep={props.activeStep} alternativeLabel connector={<QontoConnector />}>
                {steps.map((label, index) => (
                    <Step key={label} >
                        <StepLabel
                            icon={translateNumber((index + 1).toString(), lang)}
                            classes={{ // apply this style
                                iconContainer: classes.iconContainer,
                                active: classes.active
                            }}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
}
