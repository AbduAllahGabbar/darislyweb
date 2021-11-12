import {
  dangerColor,
  grayColor,
  secondaryColor,
  whiteColor,
} from 'assets/jss/material-kit-pro-react';

export default (theme) => ({
  deleteGroup: {
    color: whiteColor,
    textTransform: 'none !important',
    border: '1.5px solid ' + dangerColor[0] + ' !important',
  },
  deleteIcon: {
    color: 'white !important',
    background: dangerColor[0],
    borderRadius: '50% !important',
    marginRight: '10px !important',
  },
  errorLabel: {
    '& .MuiFormHelperText-root': {
      marginTop: '-5px !important',
    },
  },
  deleteGroup: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonError: {
    color: dangerColor[0] + ' !important',
    fontFamily: 'Ubuntu',
    fontSize: '0.85rem',
    // display: "flex",
    // justifyContent: "center",
  },
  root: {
    borderRadius: '25px',
    backgroundColor: secondaryColor[1],
    padding: 50,
    marginBottom: 30,
  },
  paddingFromTo: {
    padding: 15,
  },
  centerDay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: secondaryColor[0],
  },
  days: {
    color: secondaryColor[0],
    fontSize: 25,
    marginBottom: 15,
    textAlign: 'left',
  },
  button: {
    border: `2px solid ${secondaryColor[0]}`,
    color: secondaryColor[0],
    textTransform: 'none',
    width: '14%',
  },
  buttonSelected: {
    border: `2px solid ${secondaryColor[0]}`,
    width: '14%',
    textTransform: 'none',
  },
  buttonSelectedDisabled: {
    border: `2px solid rgb(39,60,102,0.6)`,
    background: 'rgb(39,60,102,0.6)',
  },
  buttonDisabled: {
    border: `2px solid rgb(39,60,102,0.6)`,
    color: 'rgb(39,60,102,0.6)',
  },
  deleteLocation: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10,
  },
  formControl: {
    paddingTop: 9,
    '& .MuiInput-formControl': {
      border: '2px solid #273C66',
      borderRadius: '150px',
      padding: '4.5px',

      // borderColor: secondaryColor[0],
      // borderRadius: 10,
      // height: 50,
      // borderWidth: 1.5
    },
  },
  dropdownButton: {
    fontFamily: 'Ubuntu',
    width: '200px',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'transparent',
    color: whiteColor,
    borderRadius: 150,
    border: '2px solid ' + secondaryColor[0],
    paddingRight: '4.5rem',
    paddingLeft: '4.5rem',
    marginLeft: '0px',
    fontSize: '17.5px',
    textTransform: 'uppercase',
    lineHeight: '20px',
    textDecoration: 'none',
    margin: '0px',
    display: 'inline-flex',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginBottom: '5px',
      marginTop: '5px',
      textAlign: 'left',
      fontSize: '0.75rem',
      '& > span:first-child': {
        justifyContent: 'center',
      },
      marginLeft: 0,
      borderWidth: 0.5,
      borderColor: secondaryColor[0],
      borderStyle: 'solid',
    },
    '& $icons': {
      marginRight: '0px',
    },
    '&, &:hover, &:focus,&:active ': {
      color: secondaryColor[0],
      backgroundColor: 'transparent',
    },
  },
  input: {
    color: secondaryColor[0],
    height: 'unset',
    '&,&::placeholder': {
      color: secondaryColor[0],
      fontSize: '17px',
    },
    '&::placeholder': {
      color: secondaryColor[0],
      textAlign: 'center',
      textTransform: 'uppercase',
    },
  },
  textField: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: secondaryColor[0],
    },
    '& .MuiInputLabel-outlined': {
      color: secondaryColor[0],
    },
    '& .MuiOutlinedInput-input': {
      color: secondaryColor[0],
    },
  },
  disableButton: {
    backgroundColor: grayColor[0],
    color: whiteColor,
    borderRadius: 150,
    border: '2px solid ' + grayColor[0],
    paddingRight: '3.5rem',
    paddingLeft: '3.5rem',
    marginLeft: '0px',
    fontSize: '17.5px',
    textTransform: 'uppercase',
    lineHeight: '20px',
    textDecoration: 'none',
    margin: '0px',
    display: 'inline-flex',
    width: '200px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginBottom: '5px',
      marginTop: '5px',
      textAlign: 'left',
      fontSize: '0.75rem',
      '& > span:first-child': {
        justifyContent: 'center',
      },
      marginLeft: 0,
      borderWidth: 0.5,
      borderColor: grayColor[0],
      borderStyle: 'solid',
    },
    '& $icons': {
      marginRight: '0px',
    },
    '&, &:hover, &:focus,&:active ': {
      color: whiteColor,
      backgroundColor: grayColor[0],
    },
  },
});
