import React, { useState } from 'react';
import Abasistema from '../../components/abasistema';
import './styles.css';

import logo from '../../assets/images/logos/logo.svg';
import interrogacao from '../../assets/images/icones/interrogacao.svg';
import Formcadastrarequipe from '../../components/formcadastrarequipe';
import Pesquisaequipes from '../../components/pesquisaequipes';
import Sucesso from '../../components/Sucesso';
import api from '../../services/api';

const criarequipetitulo = (
    <div className="criarequipetitulo">
        <strong>Vamos criar a sua equipe!</strong>
    </div>
);

const comofuncionamasinscricoes = (
    <div className="duvidainscricao">
        <p>Como funcionam as inscrições</p>
        <img src={interrogacao} alt="Dúvidas na inscrição"/>
    </div>
);

const criarequipesubtitulo = (
    <div className="criarequipesubtitulo">
        <p>O primeiro passo, é preencher esse formulário de inscrição.</p>
    </div>
);

const entarequipetitulo = (
    <div className="entrarequipetitulo">
        <strong>Estas são as equipes inscritas.</strong>
    </div>
);

const numeroequipesinscritas = (numeroequipes: number) => (
    <div className="numeroequipesinscritas">
        <p>Já temos {numeroequipes} equipes inscritas esse ano!</p>
    </div>
);

function DefinirEquipe () {
    const [equipeDefinida, setEquipeDefinida] = useState(false);
    const [numeroDeEquipes, setNumeroDeEquipes] = useState(0);
    const [sucesso, setSucesso] = useState<{ titulo: string, subtitulo: string, textoBotao: string, link: string }>({
        titulo: '', subtitulo: '', textoBotao: '', link: '',
    });
    
    async function getNumeroDeEquipes() {
        await api.get('sistemaequipe/', {
            params: {
                numerodeequipes: true,
            }
        }).then((resposta) => {
            setNumeroDeEquipes(resposta.data);
            console.log(resposta.data);
            
        }).catch((error) => {
            console.log(error);
        });
    }

    return (equipeDefinida
        ?
            (<Sucesso
                titulo={sucesso.titulo}
                subTitulo={sucesso.subtitulo}
                textoBotao={sucesso.textoBotao}
                link={sucesso.link}
            />)
        :
            (<div className="page-definirequipe">
                <Abasistema 
                    labelTab1="Criar uma equipe"
                    labelTab2="Entrar em uma equipe"
                    foto={logo}
                    quadrante1={criarequipetitulo}
                    quadrante2={comofuncionamasinscricoes}
                    quadrante3={criarequipesubtitulo}
                    quadrante4=""
                    conteudo={<Formcadastrarequipe setEquipeDefinida={setEquipeDefinida} setSucesso={setSucesso}/>}
                    quadrante1tab2={entarequipetitulo}
                    quadrante2tab2={numeroequipesinscritas(32)}
                    quadrante3tab2=""
                    quadrante4tab2=""
                    conteudotab2={<Pesquisaequipes setEquipeDefinida={setEquipeDefinida} setSucesso={setSucesso}/>}
                />
            </div>)
        
    );
}

export default DefinirEquipe;