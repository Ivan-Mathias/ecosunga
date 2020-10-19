import React from 'react';
import './styles.css';

import fundo from '../../assets/images/Banner teste.png';
import { Button } from '@material-ui/core';

function Banner () {
    const edicao = 2020;
    return (
        <div className="banner">
            <div className="informacoes">
                <h6>Inscreva-se já no</h6>
                <h2>Ecoswim {edicao}</h2>
                <Button className='botaoinscricoes' variant="contained" color="primary" size="large" href="//login">Inscrições</Button>
            </div>
            <img src={fundo} alt="inscrições"/>
        </div>
    );
}

export default Banner;