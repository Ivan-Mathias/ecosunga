import React from 'react';
import { Link } from "react-router-dom";
import './styles.css';

import checkIcon from '../../assets/images/icones/success-check-icon.svg';
import errorIcon from '../../assets/images/icones/erro-x-icon.svg';

interface dados {
    titulo: string;
    subTitulo: string;
    textoBotao: string;
    link: string;
    erro?: boolean;
}

const Sucesso: React.FC<dados> = (props) => {
    return (
        <div id="page-sucesso">
            <div id="page-sucesso-content" className="container">
                <div className="fundo">
                    <div className="conteudosucesso">
                        <div className="mensagem">
                            {props.erro ? <img src={errorIcon} alt="Sucesso"/> : <img src={checkIcon} alt="Sucesso"/>}                        
                            <strong>{props.titulo}</strong>
                            <p className="subTitulo">{props.subTitulo.split('.')[0]}.<br/>{props.subTitulo.split('.')[1]}</p>
                        </div>
                        <Link className="button" to={props.link}>
                            {props.textoBotao}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sucesso;