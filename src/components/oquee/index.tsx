import React from 'react';
import './styles.css';

import foto1 from '../../assets/images/oquee1.png';
import foto2 from '../../assets/images/oquee2.png';
import foto3 from '../../assets/images/oquee3.png';

function Oquee () {
    return (
        <div className="sobre">
            <div className="linha1">
                <div className="natacao">
                    <h3>Natação</h3>
                    <p>O Ecoswim é um evento de natação, com o objetivo de reunir as pessoas em equipes de revezamento, nadando durante 55 minutos. Além do caráter competitivo, pregamos pela diversão e integração.<br/><br/>

Não há restrições com relação a idade. Pedimos somente que crianças menores de 14 anos estejam acompanhadas pelos seus respectivos responsáveis.</p>
                </div>
                <div className="foto1">
                    <img src={foto1} alt="Natação"/>
                </div>
                <div className="sustentabilidade">
                    <h3>Sustentabilidade</h3>
                    <p>O evento é sem fins lucrativos. Toda a verba arrecadada é destinada ao projeto de reflorestamento "Nascente Verdes, Rios Vivos" da ONG IPÊ. Este projeto tem como foco o reflorestamento da mata ciliar de uma das reservas do sistema Cantereira - SP. O dinheiro é destinado a manutenção de viveiros de mudas das espécies típicas da região.</p>
                </div>
            </div>
            <div className="linha2">
                <div className="foto2">
                    <img src={foto2} alt="Competição"/>
                </div>
                <div className="competicao">
                    <h3>Competição</h3>
                    <p>Premiamos as equipes que obtiverem a maior metragem dentro de seu horário, maior metragem no geral e, também, a maior equipe participante!</p>
                </div>
                <div className="foto3">
                    <img src={foto3} alt="Sustentabilidade"/>
                </div>
            </div>
        </div>
    );
}

export default Oquee;