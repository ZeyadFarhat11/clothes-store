import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./back-to-top-button.scss";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { cls } from "../../utils/utils";
import { useWindowScroll } from "@uidotdev/usehooks";

function BackToTopButton() {
  const [{ y }] = useWindowScroll();

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <button
      className={cls("back-to-top", y > 750 ? "active" : "")}
      onClick={handleClick}
    >
      <span className="arrow">
        <FontAwesomeIcon icon={faArrowUp} />
      </span>
      <span className="text">back to top</span>
    </button>
  );
}

export default BackToTopButton;
