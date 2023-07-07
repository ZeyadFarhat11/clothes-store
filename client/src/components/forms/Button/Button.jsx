/* eslint-disable react/prop-types */
import { cls } from "../../../utils/utils";
import "./button.scss";

function Button({ children, mode = "primary", className, ...rest }) {
  return (
    <button {...rest} className={cls("main-button", mode, className)}>
      {children}
    </button>
  );
}

export default Button;
