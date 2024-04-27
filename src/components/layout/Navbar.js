import React, { useState } from "react";
import { FiHome } from "react-icons/fi";
import { DASHBOARD } from "lib/routes";
import { RENDER_POST } from "lib/routes";
import { HERO } from "lib/routes";
import { Link, Link as RouterLink } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import { BiHistory } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { PROTECTED } from "lib/routes";
import { useAuth } from "hooks/auth";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("home"); // State to track active link

  const { user, isLoading: authLoading } = useAuth();
  if (authLoading) return "Loading...";

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  console.log(user.role);

  return (
    <header className="header " id="header">
      <nav className="nav container ">
        <a href="/" className="nav__logo ps-2">
          Hunger Free
        </a>
        <div className="nav__menu" id="nav-menu">
          <ul className="nav__list">
            <li
              className={`nav__item ${
                activeLink === "home" ? "active-link" : ""
              }`}
            >
              <Link
                as={RouterLink}
                to={HERO}
                className="nav__link"
                onClick={() => handleLinkClick("home")}
              >
                <FiHome className="nav__icon" />
                <span
                  className={`nav__name ${
                    activeLink === "home" ? "active-link" : ""
                  }`}
                >
                  Home
                </span>
              </Link>
            </li>

            {user.role === "contributor" && (
              <li
                className={`nav__item ${
                  activeLink === "donate" ? "active-link" : ""
                }`}
              >
                <Link
                  as={RouterLink}
                  to={DASHBOARD}
                  className="nav__link"
                  onClick={() => handleLinkClick("donate")}
                >
                  <IoMdAddCircleOutline className="nav__icon" />
                  <span
                    className={`nav__name ${
                      activeLink === "donate" ? "active-link" : ""
                    }`}
                  >
                    Donate
                  </span>
                </Link>
              </li>
            )}
            <li
              className={`nav__item ${
                activeLink === "about" ? "active-link" : ""
              }`}
            >
              <Link
                as={RouterLink}
                to={RENDER_POST}
                className="nav__link"
                onClick={() => handleLinkClick("about")}
              >
                <BiHistory className="nav__icon" />
                <span
                  className={`nav__name ${
                    activeLink === "about" ? "active-link" : ""
                  }`}
                >
                  Posts
                </span>
              </Link>
            </li>

            <li
              className={`nav__item ${
                activeLink === "portfolio" ? "active-link" : ""
              }`}
            >
              <Link
                as={Link}
                to={`${PROTECTED}/profile/${user.id}`}
                className="nav__link"
                onClick={() => handleLinkClick("portfolio")}
              >
                <CgProfile className="nav__icon" />
                <span
                  className={`nav__name ${
                    activeLink === "portfolio" ? "active-link" : ""
                  }`}
                >
                  Settings
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <img src={user.avatar} alt="img" className="nav__img" />
      </nav>
    </header>
  );
};

export default Navbar;
