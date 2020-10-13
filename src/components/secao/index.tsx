import React from 'react';
import './styles.css';

interface Secao {
    titulo: string;
    subtitulo?: string;
    fundo: string;
}

const Secao: React.FC<Secao> = ({titulo, subtitulo, fundo, children}) => {
    return (
        <div className="secao" style={{backgroundColor: fundo}}>
            <div className="indice">
                <h1>{titulo}</h1>
                {(subtitulo) ?  <h3>{subtitulo}</h3> : null}
            </div>
            <div className="conteudo">
                {children}
            </div>
        </div>
    );
}

export default Secao;