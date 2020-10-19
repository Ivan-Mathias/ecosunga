import React from 'react';
import './styles.css';

interface Headersistema {
    foto: React.ReactNode;
    quadrante1: React.ReactNode;
    quadrante2: React.ReactNode;
    quadrante3: React.ReactNode;
    quadrante4: React.ReactNode;
}

function Headersistema (props: Headersistema) {
    return (
        <header className="page-headersistema">
            <div className="fotoheader">
                {props.foto}
            </div>
            <div className="header-content">
                <div className="linha1">
                    {props.quadrante1}
                    {props.quadrante2}
                </div>
                <div className="linha2">
                    {props.quadrante3}
                    {props.quadrante4}
                </div>
            </div>
        </header>
    );
}

export default Headersistema;