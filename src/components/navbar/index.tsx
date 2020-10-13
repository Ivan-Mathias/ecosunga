import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

import logo from '../../assets/images/logos/logo.svg';

interface NavbarLinks{
    link: number;
}

const Navbar: React.FC<NavbarLinks> = ({link}) => {
    return (
        <div className="navbar">
            <Link to="/">
                <img src={logo} alt="Ecoswim"/>
            </Link>
            <div className="links">
                <Link to="/sobre/">
                    <div className="link" style={link === 1 ? {color: 'var(--cor-verde-primario)'} : {}}>Sobre</div>
                </Link>
                <Link to="/resultados/">
                    <div className="link" style={link === 2 ? {color: 'var(--cor-verde-primario)'} : {}}>Resultados</div>
                </Link>
                <Link to="/fotos/">
                    <div className="link" style={link === 3 ? {color: 'var(--cor-verde-primario)'} : {}}>Fotos</div>
                </Link>
                <Link to="/blog/">
                    <div className="link" style={link === 4 ? {color: 'var(--cor-verde-primario)'} : {}}>Blog</div>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;