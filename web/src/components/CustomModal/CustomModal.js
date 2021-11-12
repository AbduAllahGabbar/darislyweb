import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Close from "@material-ui/icons/Close";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import React from "react";
import styles from "./customModalStyle.js";

const useStyles = makeStyles(styles);

export default function CustomModal(props) {
  const classes = useStyles();
  const { open, onClose, children, style } = props;
  return (
    <Dialog
      classes={{
        root: classes.modalRoot,
        paper: classes.modal,
        container: classes.container
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
            {children}
          </GridItem>
        </GridContainer>
      </DialogContent>
    </Dialog>
  );
}
