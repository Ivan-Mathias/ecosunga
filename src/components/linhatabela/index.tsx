import React from 'react';
import './styles.css';

interface LinhaTabela {
    tipo: string;
    posicao: number;
    equipe: string;
    metragem?: number;
    membros?: number;
    horario?: number;
}

const LinhaTabela: React.FC<LinhaTabela> = ({tipo, posicao, equipe, metragem, membros, horario}) => {
    if(tipo === 'geral'){
        return (
            <div className="linha linha3">
                <p className="p1">{posicao}º</p>
                <p className="p2">{equipe}</p>
                <p className="p3">{metragem}</p>
            </div>
        );
    }else if(tipo === 'horario'){
        return (
            <div className="linha linha3">
                <p className="p1">{posicao}º</p>
                <p className="p2">{equipe}</p>
                <p className="p3">{metragem}</p>
            </div>
        );
    }else if(tipo === 'equipe'){
        return (
            <div className="linha linha3">
                <p className="p1">{posicao}º</p>
                <p className="p2">{equipe}</p>
                <p className="p3">{membros}</p>
            </div>
        );
    }else if(tipo === 'tudo'){
        return (
            <div className="linha linha-tudo">
                <p className="tabelatudoposicao">{posicao}º</p>
                <p className="tabelatudoequipe">{equipe}</p>
                <p className="tabelatudometragem">{metragem}</p>
                <p className="tabelatudomembros">{membros}</p>
                <p className="tabelatudohorario">{horario}</p>
            </div>
        );
    }else{
        return(<div></div>);
    }
}

export default LinhaTabela;