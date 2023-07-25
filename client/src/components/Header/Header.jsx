/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faSearch,
  faUserCircle,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import "./header.scss";
import { useState } from "react";
import logo from "../../assets/img/logo-dark.webp";
import { NavLink } from "react-router-dom";
import useGlobalContext from "../../context/global.context";
const CURRENCIES = ["AU", "CA", "IN", "AE", "GB", "US"];
const LANGUAGES = ["English", "Français", "Deutsche"];

function Header() {
  const { setCartIsActive } = useGlobalContext();

  const openCart = () => {
    setCartIsActive(true);
  };

  return (
    <div id="header">
      <header>
        <div className="container-fluid">
          <div className="mini-menus">
            <MiniMenu options={CURRENCIES} defaultOption="US" />
            <MiniMenu options={LANGUAGES} defaultOption="English" />
          </div>
          <p>Free Shipping on Orders over $140</p>
          <div className="social">
            <button>TW</button> - <button>FB</button> - <button>IN</button>
          </div>
        </div>
      </header>
      <div className="main">
        <div className="container-fluid">
          <img src={logo} alt="logo" className="logo" />
          <nav>
            <NavLink to="/">home</NavLink>
            <NavLink to="/shop">shop</NavLink>
            <NavLink to="/blog">blog</NavLink>
            <NavLink to="/about">about</NavLink>
            <NavLink to="/contact">contact</NavLink>
            <NavLink to="/faq">FAQ</NavLink>
          </nav>
          <div className="other">
            <button>
              <FontAwesomeIcon icon={faSearch} />
            </button>
            <button onClick={openCart}>
              <FontAwesomeIcon icon={faBagShopping} />
            </button>
            <button>
              <FontAwesomeIcon icon={faUserCircle} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

function MiniMenu({ options = [], defaultOption = "" }) {
  const [selected, setSelected] = useState(defaultOption);
  const [active, setActive] = useState(false);
  return (
    <div className="mini-menu">
      <button onClick={() => setActive((p) => !p)}>
        {selected} <FontAwesomeIcon icon={faAngleDown} />
      </button>
      <ul className={active ? "active" : ""}>
        {options.map((o) => (
          <li
            key={o}
            onClick={() => {
              setSelected(o);
              setActive(false);
            }}
          >
            {o}
          </li>
        ))}
      </ul>
    </div>
  );
}
