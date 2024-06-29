import React, { useState, useEffect } from "react";
import { IdentificationIcon, NewspaperIcon, SunIcon, MoonIcon, Bars3Icon } from '@heroicons/react/24/solid';

const Navbar = () => {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkMode);
        document.body.classList.toggle('light-mode', !isDarkMode);
    }, [isDarkMode]);

    const toggleMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar">
            <button className="menu-toggle" onClick={toggleMenu}>
                <Bars3Icon className="icon" />
            </button>
            <a href="/" className="brand">Podev Web</a>
            <ul className={`menu-mobile ${menuOpen ? 'active' : ''}`}>
                <li className="menu-item">
                    <a className="menu-link" href="/CardEmail">
                        <IdentificationIcon className="icon" />
                        Consultar Usuario
                    </a>
                </li>
                <li className="menu-item">
                    <a className="menu-link" href="https://sites.google.com/umariana.edu.co/podevapp/inicio">
                        <NewspaperIcon className="icon" />
                        Informacion del Proyecto
                    </a>
                </li>
            </ul>
            <ul className="menu">
                <li className="menu-item">
                    <a className="menu-link" href="/CardEmail">
                        <IdentificationIcon className="icon" />
                        Consultar Usuario
                    </a>
                </li>
                <li className="menu-item">
                    <a className="menu-link" href="https://sites.google.com/umariana.edu.co/podevapp/inicio">
                        <NewspaperIcon className="icon" />
                        Informacion del Proyecto
                    </a>
                </li>
            </ul>
            <button className="toggle-button" onClick={toggleMode}>
                {isDarkMode ? <SunIcon className="icon" /> : <MoonIcon className="icon" />}
                {isDarkMode ? "Modo Claro" : "Modo Oscuro"}
            </button>
        </nav>
    )
}

export default Navbar