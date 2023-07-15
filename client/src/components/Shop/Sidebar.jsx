import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./sidebar.scss";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { cls } from "../../utils/utils";
import { useState } from "react";

function Sidebar() {
  const [activeFilterItem, setActiveFilterItem] = useState();
  return (
    <div className="sidebar">
      <Filter_ProductType {...{ activeFilterItem, setActiveFilterItem }} />
      <Filter_Size {...{ activeFilterItem, setActiveFilterItem }} />
      <Filter_Price {...{ activeFilterItem, setActiveFilterItem }} />
      <Filter_Brand {...{ activeFilterItem, setActiveFilterItem }} />
      <Filter_Color {...{ activeFilterItem, setActiveFilterItem }} />
    </div>
  );
}
function FilterItem({
  children,
  label,
  activeFilterItem,
  setActiveFilterItem,
}) {
  const toggleOpen = () =>
    setActiveFilterItem((prev) => (prev === label ? null : label));
  const isOpen = activeFilterItem === label;
  return (
    <div className="filter-item">
      <button type="button" className="header" onClick={toggleOpen}>
        <h3>{label}</h3>
        <FontAwesomeIcon icon={isOpen ? faAngleUp : faAngleDown} />
      </button>
      <div className={cls("content", isOpen ? "active" : "")}>{children}</div>
    </div>
  );
}
function Filter_ProductType({ ...rest }) {
  return (
    <FilterItem label="Product Type" {...rest}>
      content
    </FilterItem>
  );
}
function Filter_Size({ ...rest }) {
  return (
    <FilterItem label="Size" {...rest}>
      Size
    </FilterItem>
  );
}
function Filter_Price({ ...rest }) {
  return (
    <FilterItem label="Price" {...rest}>
      Price
    </FilterItem>
  );
}
function Filter_Brand({ ...rest }) {
  return (
    <FilterItem label="Brand" {...rest}>
      Brand
    </FilterItem>
  );
}
function Filter_Color({ ...rest }) {
  return (
    <FilterItem label="Color" {...rest}>
      Color
    </FilterItem>
  );
}
export default Sidebar;
