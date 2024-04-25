import React, { useState } from 'react';
import { FiHome, FiUser, FiBook, FiBriefcase, FiMessageSquare } from 'react-icons/fi';
import { DASHBOARD } from "lib/routes";
import { RENDER_POST } from "lib/routes";
import { HERO } from "lib/routes";
import { Link, Link as RouterLink } from "react-router-dom";

const Navbar = () => {
    const [activeLink, setActiveLink] = useState('home'); // State to track active link

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return (
        <header className="header" id="header">
            <nav className="nav container">
                <a href="/" className="nav__logo">Hunger Free</a>
                <div className="nav__menu" id="nav-menu">
                    <ul className="nav__list">
                        <li className={`nav__item ${activeLink === 'home' ? 'active-link' : ''}`}>
                            <Link as={RouterLink} to={HERO}  className="nav__link" onClick={() => handleLinkClick('home')}>
                                <FiHome className='nav__icon' />
                                <span className={`nav__name ${activeLink === 'home' ? 'active-link' : ''}`}>Home</span>
                            </Link>
                        </li>
                        
                        <li className={`nav__item ${activeLink === 'about' ? 'active-link' : ''}`}>
                            <Link as={RouterLink} to={RENDER_POST}  className="nav__link" onClick={() => handleLinkClick('about')}>
                                <FiUser className='nav__icon' />
                                <span className={`nav__name ${activeLink === 'about' ? 'active-link' : ''}`}>About</span>
                            </Link>
                        </li>

                        <li className={`nav__item ${activeLink === 'skills' ? 'active-link' : ''}`}>
                            <Link as={RouterLink} to={DASHBOARD} className="nav__link" onClick={() => handleLinkClick('skills')}>
                                <FiBook className='nav__icon' />
                                <span className={`nav__name ${activeLink === 'skills' ? 'active-link' : ''}`}>Post</span>
                            </Link>
                        </li>

                        <li className={`nav__item ${activeLink === 'portfolio' ? 'active-link' : ''}`}>
                            <a href="/" className="nav__link" onClick={() => handleLinkClick('portfolio')}>
                                <FiBriefcase className='nav__icon' />
                                <span className={`nav__name ${activeLink === 'portfolio' ? 'active-link' : ''}`}>Portfolio</span>
                            </a>
                        </li>

                        <li className={`nav__item ${activeLink === 'contactme' ? 'active-link' : ''}`}>
                            <a href="/" className="nav__link" onClick={() => handleLinkClick('contactme')}>
                                <FiMessageSquare className='nav__icon' />
                                <span className={`nav__name ${activeLink === 'contactme' ? 'active-link' : ''}`}>Contactme</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <img src="" alt="img" className="nav__img" />
            </nav>
        </header>
    );
}

export default Navbar;
