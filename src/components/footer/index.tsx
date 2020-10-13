import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

import logo_facebook from '../../assets/images/logos/facebook-logo.svg';
import logo_instagram from '../../assets/images/logos/instagram-logo.svg';

function Footer () {
    return (
        <div className="footer">
            <div className="links">
                <Link to="/sobre/">
                    <div className="link">Sobre o ecoswim</div>
                </Link>
                <Link to="/sobre/">
                    <div className="link">Parceiros</div>
                </Link>
                <Link to="/blog/">
                    <div className="link">Blog</div>
                </Link>
                <Link to="/sobre/">
                    <div className="link">Contato</div>
                </Link>
                <Link to="/regulamento/">
                    <div className="link">Regulamento</div>
                </Link>
            </div>
            <div className="social">
                <div className="logos">
                    <img src={logo_instagram} alt="Ecoswim no instagram"/>
                    <img src={logo_facebook} alt="Ecoswim no facebook"/>
                </div>
                © 2020 Ecoswim
            </div>
        </div>
    );
}

export default Footer;