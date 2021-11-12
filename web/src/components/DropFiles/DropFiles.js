import React, { useState, useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import DeleteIcon from "@material-ui/icons/Delete";
import Table from "components/Table/Table";
import strings from "constants/strings";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import dropFilesStyle from "./dropFilesStyle";

const useStyles = makeStyles(dropFilesStyle);

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 15,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "white",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  marginBottom: 15,
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export default (props) => {
  const classes = useStyles();

  const lang = useSelector((state) => state.lang);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      if (props.maxFiles) {
        props.onDrop(acceptedFiles.slice(0, props.maxFiles));
      } else {
        props.onDrop(acceptedFiles);
      }
    }
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop }); // accept: "image/*"

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject]
  );

  let filesData = [];

  props.files.length > 0 &&
    props.files.forEach((file, index) => {
      filesData.push([
        <span key={index}>{file.name}</span>,
        <span key={index}>{file.name.split(".").pop().toUpperCase()}</span>,
        <DeleteIcon
          onClick={props.onFileRemoved(index)}
          className={classes.deleteIcon}
        />,
      ]);
    });

  return (
    <div className={classes.container}>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <CloudUploadIcon className={classes.uploadIcon} />
        <p style={{ marginBottom: 0 }}>
          {strings.dragAndDropFiles[lang]}
          {/* {props.files.length > 0
            ? `${props.files[0].name}${
                props.files.length > 1
                  ? ` and ${props.files.length - 1} more file${
                      props.files.length > 2 ? "s" : ""
                    }`
                  : ""
              }`
            : "Drag & Drop images here, or click to select files"} */}
        </p>
      </div>
      {props.files.length > 0 ? (
        <Table
          tableHead={[strings.name[lang], strings.fileType[lang], " "]}
          tableData={filesData}
          tableHeaderColor="secondary"
          round
          pagination
        />
      ) : null}
    </div>
  );
};
