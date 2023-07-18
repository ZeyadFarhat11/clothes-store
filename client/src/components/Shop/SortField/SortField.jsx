import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./sort-field.scss";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { cls } from "../../../utils/utils";
import { useState } from "react";
import { useEffect } from "react";

const sortBy = [
  "Featured",
  "Best selling",
  "Alphabetically, A-Z",
  "Alphabetically, Z-A",
  "Price, low to high",
  "Price, high to low",
  "Date, old to new",
  "Date, new to old",
];

function SortField() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Featured");
  const toggleOpen = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleDocumentClick = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    window.document.addEventListener("click", handleDocumentClick);
    return () =>
      window.document.removeEventListener("click", handleDocumentClick);
  }, []);
  return (
    <div className={cls("sort-field", isOpen ? "active" : "")}>
      <header onClick={toggleOpen}>
        <p>Sort By:</p>
        <FontAwesomeIcon icon={faAngleDown} />
      </header>
      <ul className="sort-menu">
        {sortBy.map((sort) => (
          <li
            key={sort}
            onClick={() => setSelected(sort)}
            className={selected === sort ? "active" : ""}
          >
            {sort}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SortField;
