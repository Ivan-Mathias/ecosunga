import React from 'react';
import Topico from '../topico';
import './styles.css';

import logo_wetrats from '../../assets/images/logos/wetrats.svg';
import topico1 from '../../assets/images/valor1.png';

function Wetrats () {
    return (
        <div className="quemsomos">
            <div className="wetrats">
                <img src={logo_wetrats} alt="Wetrats"/>
                <div className="equipe">
                    <h5>Equipe de Natação - Poli USP</h5>
                    O Ecoswim é um evento beneficente que visa a conscientização ambiental e o incentivo às práticas esportivas. É Idealizado e Organizado pelos Wetrats, equipe de natação da Escola Politécnica da Universidade de São Paulo. A equipe busca, por meio do Ecoswim, difundir o ideal verde e ainda ajudar na preservação do Meio Ambiente, apoiando a ONG IPÊ.
                </div>
            </div>
            <div className="valores">
                <h1>Nossos valores</h1>
                <h3>A equipe possui valores, sob os quais põe empenho para a realização do Ecoswim</h3>
                <div className="topicos">
                    <Topico imagem={topico1} topico="Respeito e honestidade"
                        descricao="Nós, os Wetrats, construímos esse evento com muito apego e dedicação. Visamos o respeito e a honestidade, que formam as mais profundas bases para o sucesso do Ecoswim." />
                    <Topico imagem={topico1} topico="Trabalho em equipe"
                        descricao="Com muita descontração e empenho, a equipe se reúne semanalmente para discutir a organização e cada detalhe do evento. É o trabalho em equipe que faz com que o Ecoswim seja tão empolgante!" />
                    <Topico imagem={topico1} topico="Engajamento ambiental"
                        descricao="Sendo o objetivo ajudar o meio ambiente, procuramos passar esse valor a frente, trabalhando somente com materiais recicláveis, evitando desperdício e tentando ao máximo conscientizar o próximo!" />
                </div>
            </div>
        </div>
    );
}

export default Wetrats;