/* eslint-disable react/prop-types */
import { cls } from "../../../utils/utils";
import "./breadcrumb.scss";
import { Link } from "react-router-dom";

function Breadcrumb({ children, paths = [], className, ...rest }) {
  return (
    <div className={cls("main-breadcrumb", className)} {...rest}>
      <h2>{children}</h2>
      <div className="wrapper">
        <Link to="/">home</Link>
        <span className="separator">&gt;</span>
        {paths.map((path) => (
          <>
            <Link to={path.path}>{path.title}</Link>
            <span className="separator">&gt;</span>
          </>
        ))}
        <span>{children}</span>
      </div>
    </div>
  );
}

export default Breadcrumb;
