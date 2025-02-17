import "./UploadImageWindow.css";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";
import share from "../../assets/icons/share.svg";

export const UploadImageWindow = ({ onImageUpload }) => {
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onImageUpload(imageUrl);
    }
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: "image/*",
    noClick: true,
    onKeyboard: true,
  });

  return (
    <div className="upload-image-window">
      <div {...getRootProps()} className="image-dropzone">
        <input {...getInputProps()} />
        <div className="dropzone-inside">
          <div className="dropzone-img-icon-container">
            <img src={share} alt="share" />
          </div>
          <p className="dropzone-text m-0">
            Перетащите картинку или
            <button type="button" className="img-btn upload-btn" onClick={open}>
              загрузите
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

UploadImageWindow.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
};
