import defaultImage from "assets/images/image_placeholder.jpg";
import Button from "components/CustomButtons/Button.js";
import strings from "constants/strings";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

export default function ImageUpload(props) {
  let {
    avatar,
    addButtonProps,
    // changeButtonProps,
    removeButtonProps,
    className,
    image,
  } = props;
  const [file, setFile] = React.useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(
    image ? image : defaultImage
  );
  let fileInput = React.createRef();
  const lang = useSelector((state) => state.lang);

  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
      if (props.onChange) {
        props.onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };
  // eslint-disable-next-line
  const handleSubmit = (e) => {
    e.preventDefault();
    // file is the file/image uploaded
    // in this function you can save the image (file) on form submit
    // you have to call it yourself
  };
  const handleClick = () => {
    fileInput.current.click();
  };
  const handleRemove = () => {
    if (props.onChange) {
      props.onChange(null);
    }
    setFile(null);
    setImagePreviewUrl(defaultImage);
    fileInput.current.value = null;
  };

  let rootClasses = "fileinput text-center " + className;
  return (
    <div className={rootClasses}>
      <input type="file" onChange={handleImageChange} ref={fileInput} />
      <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
        <img src={imagePreviewUrl} alt="..." />
      </div>
      <div>
        {imagePreviewUrl === defaultImage ? (
          <Button {...addButtonProps} onClick={() => handleClick()}>
            {avatar ? "Add Photo" : strings.selectImage[lang]}
          </Button>
        ) : (
          <span>
            {/* <Button {...changeButtonProps} onClick={() => handleClick()}>
              Change
            </Button> */}
            {avatar ? <br /> : null}
            <Button {...removeButtonProps} onClick={() => handleRemove()}>
              {strings.remove[lang]}
            </Button>
          </span>
        )}
      </div>
    </div>
  );
}

ImageUpload.propTypes = {
  avatar: PropTypes.bool,
  addButtonProps: PropTypes.object,
  changeButtonProps: PropTypes.object,
  removeButtonProps: PropTypes.object,
  // it is a function from which you can get the files and fileNames that were uploaded
  // more can be read here: https://github.com/creativetimofficial/ct-material-kit-pro-react/issues/64
  onChange: PropTypes.func,
};
