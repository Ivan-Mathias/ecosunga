import React from 'react';
import './styles.css';

import icone_telefone from '../../assets/images/logos/telefone.svg';
import icone_email from '../../assets/images/logos/email.svg';
import logo_instagram from '../../assets/images/logos/instagram-logo-escuro.svg';

function Contato () {
    return (
        <div className="contatos">
            <div className="contato">
                <img src={icone_telefone} alt="Telefone"/>
                <p>(11) 9 9408-9654 - Ivan - Diretor</p>
            </div>
            <div className="contato">
                <img src={icone_telefone} alt="Telefone"/>
                <p>(27) 9 9265-8968 - Henrique - Diretor</p>
            </div>
            <div className="contato">
                <img src={icone_email} alt="Email"/>
                <p>contato@ecoswim.com.br</p>
            </div>
            <div className="contato">
                <img className="instagram" src={logo_instagram} alt="Telefone"/>
                <p>@ecoswim</p>
            </div>
        </div>
    );
}

export default Contato;