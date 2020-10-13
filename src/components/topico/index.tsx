import React from 'react';
import './styles.css';

interface Topico {
    imagem: string;
    topico: string;
    descricao: string;
}

const Topico: React.FC<Topico> = ({imagem, topico, descricao}) => {
    return (
        <div className="topico">
            <img src={imagem} alt={topico}/>
            <h3>{topico}</h3>
            <p>{descricao}</p>
        </div>
    );
}

export default Topico;