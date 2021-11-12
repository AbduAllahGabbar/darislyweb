import {
  mlAuto,
  mrAuto,
  secondaryColor,
  whiteColor,
} from 'assets/jss/material-kit-pro-react.js';
import {primaryColor} from 'assets/jss/material-kit-pro-react';

const coursesStyle = (theme) => ({
  editContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: 32,
    width: 32,
    fontSize: 22,
    backgroundColor: whiteColor,
    color: '#FFD700',
    cursor: 'pointer',
    transition: '0.5s all',
    '&:hover': {
      backgroundColor: '#FFD700',
      color: whiteColor,
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0px 10px',
    },
  },
  background: {
    backgroundColor: secondaryColor[1],
    padding: '20px',
    borderRadius: '15px',
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItemEnd: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  gridItemStart: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  headerMargin: {
    marginTop: '10px',
  },
  iconColor: {
    color: primaryColor[0] + ' !important',
    fontSize: '34px',
  },
  button: {
    '& .MuiButton-label': {
      fontWeight: 'bold',
    },
  },
});

export default coursesStyle;
