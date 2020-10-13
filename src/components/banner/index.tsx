import React from 'react';
import './styles.css';

import fundo from '../../assets/images/Banner teste.png';

function Banner () {
    return (
        <div className="banner">
            <img src={fundo} alt="inscrições"/>
        </div>
    );
}

export default Banner;