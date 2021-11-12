import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
import Close from "@material-ui/icons/Close";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./errorModalStyle.js";
import strings from "constants/strings.js";

const useStyles = makeStyles(styles);

export default function ErrorModal(props) {
  const classes = useStyles();
  const { open, onClose, style, message } = props;
  const lang = useSelector((state) => state.lang);
  return (
    <Dialog
      classes={{
        root: classes.modalRoot,
        paper: classes.modal,
        container: classes.container,
      }}
      open={open}
      keepMounted
      onClose={onClose}
    >
      <DialogTitle disableTypography className={classes.modalHeader}>
        <Button
          simple
          className={classes.modalCloseButton}
          key="close"
          aria-label="Close"
          onClick={onClose}
        >
          <Close className={classes.modalClose} />
        </Button>
      </DialogTitle>
      <DialogContent className={classes.modalBody}>
        <GridContainer justify="center">
          <GridItem
            xs={12}
            sm={12}
            md={12}
            className={classes.gridItem}
            style={{ marginTop: 20 }}
            style={style}
          >
            <div className={classes.titleContainer}>
              <CancelIcon className={classes.cancelIcon} />
            </div>

            <p className={classes.modalBody}>{message ? message : strings.somethingWrong[lang]}</p>
            <div className={classes.buttonsContainer}></div>
            <Button
              justIcon
              round
              color="secondary"
              className={classes.modalButton}
              onClick={onClose}
            >
              {strings.ok[lang]}
            </Button>
          </GridItem>
        </GridContainer>
      </DialogContent>
    </Dialog>
  );
}
