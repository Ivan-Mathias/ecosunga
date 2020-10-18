import React, { FormEvent } from 'react';
import { Link } from "react-router-dom";
import './styles.css';

import logoImg from '../../assets/images/logos/logo.svg';

interface dados {
    setaVoltar: boolean;
    titulo: string;
    subTitulo?: string;
    erro?: string;
    quebrarsubtitulo?: boolean;
    textoBotao: string;
    footer?: React.ReactNode;
    submitForm: (event: React.FormEvent) => void;
}

const Sistema: React.FC<dados> = (props) => {
    function goTo(e: FormEvent) {
        e.preventDefault();
        props.submitForm(e);
    }
    const subTituloMaxWidth = props.quebrarsubtitulo ? "22rem" : "unset";
    return (
        <div id="page-sistema">
            <div id="page-sistema-content" className="container">
                {props.setaVoltar && 
                    <Link to="/login" className="botaoVoltar" />
                }
                <div className="sidebar">
                    <div className="logo-container">
                        <img src={logoImg} alt="Ecoswim"/>
                    </div>
                </div>
                <div className="content">
                    <div className="dados">
                        <strong>{props.titulo}</strong>
                        <p className="subTitulo"
                            style={{
                                maxWidth: subTituloMaxWidth
                            }}
                        >{props.subTitulo}</p>
                        {props.erro && <p className="erro">{props.erro}</p>}
                        <form onSubmit={goTo}>
                            {props.children}
                            <button type="submit">
                                {props.textoBotao}
                            </button>
                        </form>
                    </div>
                    {props.footer}
                </div>
            </div>
        </div>
    );
}

export default Sistema;