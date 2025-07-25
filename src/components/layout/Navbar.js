import React, { useState } from "react";
import { FiHome } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { BiHistory } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { Link, Link as RouterLink } from "react-router-dom";
import { DASHBOARD, RENDER_POST, HERO, PROTECTED } from "lib/routes";
import { useAuth } from "hooks/auth";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("home");

  const { user, isLoading: authLoading } = useAuth();
  if (authLoading) return "Loading...";
  if (!user) return null;

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <header className="header" id="header">
      <nav className="nav container-fluid position-fixed  bottom-0 d-flex justify-content-between align-items-center bg-primary text-white p-2 w-100 mt-5" >
        <ul className="nav__list list-unstyled d-flex justify-content-around w-100 mb-0">
          <li className={`nav__item ${activeLink === "home" ? "active" : ""}`}>
            <Link
              as={RouterLink}
              to={HERO}
              className="nav__link d-flex flex-column align-items-center text-decoration-none"
              onClick={() => handleLinkClick("home")}
            >
              <FiHome className="nav__icon mb-1 text-white" />
              <span className="nav__name text-white">Home</span>
            </Link>
          </li>

          {user.role === "contributor" && (
            <li className={`nav__item ${activeLink === "donate" ? "active" : ""}`}>
              <Link
                as={RouterLink}
                to={DASHBOARD}
                className="nav__link d-flex flex-column align-items-center text-decoration-none"
                onClick={() => handleLinkClick("donate")}
              >
                <IoMdAddCircleOutline className="nav__icon mb-1 text-white" />
                <span className="nav__name text-white">Donate</span>
              </Link>
            </li>
          )}
          
          <li className={`nav__item ${activeLink === "about" ? "active" : ""}`}>
            <Link
              as={RouterLink}
              to={RENDER_POST}
              className="nav__link d-flex flex-column align-items-center text-decoration-none"
              onClick={() => handleLinkClick("about")}
            >
              <BiHistory className="nav__icon mb-1 text-white" />
              <span className="nav__name text-white">Posts</span>
            </Link>
          </li>

          <li className={`nav__item ${activeLink === "portfolio" ? "active" : ""}`}>
            <Link
              as={RouterLink}
              to={`${PROTECTED}/profile/${user.id}`}
              className="nav__link d-flex flex-column align-items-center text-decoration-none"
              onClick={() => handleLinkClick("portfolio")}
            >
              <CgProfile className="nav__icon mb-1 text-white" />
              <span className="nav__name text-white">Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
