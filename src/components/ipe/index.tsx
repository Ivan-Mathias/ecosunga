import React from 'react';
import './styles.css';

import logo_ipe from '../../assets/images/logos/ipe.svg';

function Ipe () {
    return (
        <div className="ipe">
            <h2>Instituto de Pesquisas Ecológicas</h2>
            <div className="secao1">
                <img src={logo_ipe} alt="Instituto de Pesquisas Ecológicas"/>
                <p>A missão do IPÊ é desenvolver e disseminar modelos inovadores de conservação da biodiversidade e de desenvolvimento socioeconômico através de ciência, educação e negócios sustentáveis.</p>
            </div>
            <p>O IPÊ - Instituto de Pesquisas Ecológicas é uma das maiores ONGs socioambientais do Brasil e trabalha há mais de 15 anos pela conservação da biodiversidade. O Instituto desenvolve cerca de 30 projetos de conservação e desenvolvimento socioambiental, em diferentes locais do Brasil: Parque Nacional do Superagüi (PR), Pontal do Paranapanema, Nazaré Paulista e extremo litoral sul do estado (SP), Estação Ecológica de Anavilhanas (AM) e Pará (PA). Nessas regiões, o IPÊ atua com pesquisa de espécies ameaçadas, educação ambiental, com abordagem inovadora e participativa, buscando harmonizar as relações dos seres humanos e natureza, restauração de habitats, extensionismo rural, ecoturismo com base comunitária e geração de renda por meio de práticas sustentáveis. O IPÊ tem hoje cerca de 100 integrantes. Atualmente conta com 12 mestres, 04 mestrandos, 04 doutores e 07 doutorandos. Além disso, investe em estagiários, que muitas vezes acabam fazendo parte da equipe, assim que terminam a graduação. O IPÊ também possui em sua sede (Nazaré Paulista) um centro de treinamento e capacitação de profissionais para o trabalho com conservação, o CBBC - Centro Brasileiro de Biologia da Conservação, que já capacitou por meio de cursos de curta duração mais de 800 alunos do Brasil e exterior.</p>
            <p>Os trabalhos desenvolvidos pelo IPÊ têm obtido resultados expressivos e são reconhecidos pelo número de prêmios recebidos nos últimos anos. Entre eles, o Withley Gold Award (2000 e 2002) e o prêmio Especial Super Ecologia, da revista Superinteressante (2004), Rolex Award (2004), Prêmio Banco do Brasil de Tecnologia Social (2005) e Prêmio Ford de Conservação Ambiental (2006).</p>
            <p>Para maiores informações, visite: <a href="https://www.ipe.org.br">www.ipe.org.br</a></p>
        </div>
    );
}

export default Ipe;