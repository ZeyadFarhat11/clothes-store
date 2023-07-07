/* eslint-disable react/prop-types */
import "./form-error-message.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
function FormErrorMessage({ message }) {
  return (
    <div className="error-message">
      <FontAwesomeIcon icon={faCircleXmark} />
      <p>{message}</p>
    </div>
  );
}

export default FormErrorMessage;
