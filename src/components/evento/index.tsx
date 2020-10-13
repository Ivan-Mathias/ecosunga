import React from 'react';
import './styles.css';

import trofeu from '../../assets/images/trofeu_pag_inicial.png';

function Evento () {
    return (
        <div className="comofunciona">
            <img src={trofeu} alt="Troféu Ecoswim"/>
            <div className="itens">
                <div className="item">
                    <h3>Sustentável</h3>
                    O evento é sem fins lucrativos. Toda a verba arrecadada é destinada ao projeto de reflorestamento "Nascente verdes, Rios vivos" da ONG IPÊ.
                </div>
                <div className="item">
                    <h3>Quantidade de membros</h3>
                    Não há limites de participantes da sua equipe, porém, colocamos como um mínimo de 10 pessoas para que vocês não se desgastem tanto :. Chame o máximo de amigos e familiares para ajudar!
                </div>
                <div className="item">
                    <h3>Premiação</h3>
                    Premiamos as equipes que obtiverem a maior metragem dentro de seu horário, maior metragem no geral e, também, a maior equipe participante!
                </div>
            </div>
        </div>
    );
}

export default Evento;