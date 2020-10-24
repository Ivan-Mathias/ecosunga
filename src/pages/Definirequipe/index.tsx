import React, { useEffect, useState } from 'react';
import Abasistema from '../../components/abasistema';
import './styles.css';

import logo from '../../assets/images/logos/logo.svg';
import Formcadastrarequipe from '../../components/formcadastrarequipe';
import Pesquisaequipes from '../../components/pesquisaequipes';
import Sucesso from '../../components/Sucesso';
// import api from '../../services/api';
import ModalDuvidasInscricoes from '../../components/modalduvidasinscricoes';
import { Redirect } from 'react-router-dom';

const foto = (
    <div className="fotoequipe">
        <img src={logo} alt="Ecoswim"/>
    </div>
    
);

const criarequipetitulo = (
    <div className="criarequipetitulo">
        <strong>Vamos criar a sua equipe!</strong>
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

// const numeroequipesinscritas = (numeroequipes: number) => (
//     <div className="numeroequipesinscritas">
//         <p>Já temos {numeroequipes} equipes inscritas esse ano!</p>
//     </div>
// );

function DefinirEquipe () {
    const [semDados, setSemDados] = useState(false);
    const [temEquipe, setTemEquipe] = useState(false);
    const [equipeDefinida, setEquipeDefinida] = useState(false);
    // const [numeroDeEquipes, setNumeroDeEquipes] = useState(0);
    const [sucesso, setSucesso] = useState<{ titulo: string, subtitulo: string, textoBotao: string, link: string }>({
        titulo: '', subtitulo: '', textoBotao: '', link: '',
    });

    useEffect(() => {
        const dadosSession = JSON.parse(sessionStorage.getItem('loginSessionData') as string);
        if (dadosSession && dadosSession.id) {
            if (dadosSession.equipe !== null) {
                setTemEquipe(true);
            }
        } else {
            setSemDados(true);
        }
    }, []);
    
    // async function getNumeroDeEquipes() {
    //     await api.get('sistemaequipe/', {
    //         params: {
    //             numerodeequipes: true,
    //         }
    //     }).then((resposta) => {
    //         setNumeroDeEquipes(resposta.data);
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    // }

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
                    labelTab1="Entrar em uma equipe"
                    labelTab2="Criar uma equipe"
                    foto={foto}
                    quadrante1={entarequipetitulo}
                    quadrante2={<ModalDuvidasInscricoes texto={0}/>}
                    quadrante3=""
                    quadrante4=""
                    // quadrante4={numeroequipesinscritas(32)}
                    conteudo={<Pesquisaequipes 
                                    setEquipeDefinida={setEquipeDefinida} 
                                    setSucesso={setSucesso}
                                />}
                    quadrante1tab2={criarequipetitulo}
                    quadrante2tab2={<ModalDuvidasInscricoes texto={0}/>}
                    quadrante3tab2={criarequipesubtitulo}
                    quadrante4tab2=""
                    conteudotab2={<Formcadastrarequipe 
                                setEquipeDefinida={setEquipeDefinida} 
                                setSucesso={setSucesso}
                            />}
                />
                {temEquipe && <Redirect to="/paginainscricao" />}
                {semDados && <Redirect to="/login" />}
            </div>)
        
    );
}

export default DefinirEquipe;