import React, { useEffect, useState } from 'react';
import InputTexto from '../Inputs/InputTexto';
import './styles.css';

import iconePesquisa from '../../assets/images/icones/search.svg';
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import api from '../../services/api';

interface equipeitem {
    id: number;
    foto: string;
    nome: string;
    tipo: string;
    horario: string;
    membros: number;
}

interface Pesquisaequipe {
    setEquipeDefinida: (p: boolean) => void;
    setSucesso: React.Dispatch<React.SetStateAction<{
        titulo: string, subtitulo: string, textoBotao: string, link: string
    }>>;
}

function Pesquisaequipes (props: Pesquisaequipe) {
    const [nomeDaEquipe, setNomeDaEquipe] = useState('');
    const [equipes, setEquipes] = useState([]);
    const [senhaDaEquipe, setSenhaDaEquipe] = useState('');

    async function handlePesquisaEquipe() {
        await api.get('sistemaequipe/', {
            params: {
                nomeequipe: nomeDaEquipe,
            }
        }).then((resposta) => {
            setEquipes(resposta.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        handlePesquisaEquipe();
    },[]);

    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
        setSenhaDaEquipe('');
    };

    async function handleEntrarEquipe (idEquipe: number, nomeEquipe: string) {
        const dadosSessionArquivo = JSON.parse(sessionStorage.getItem('loginSessionData') as string);
        const idusuario = dadosSessionArquivo.id;
        
        await api.get('sistemaequipe/', {
            params: {
                id: idusuario,
                idequipe: idEquipe,
                senhaequipe: senhaDaEquipe,
            }
        }).then(() => {
            props.setSucesso({
                titulo: "Equipe confirmada!",
                subtitulo: "Agora você faz parte da equipe "+ nomeEquipe +". Acesse a pagina de usuário para finalizar a inscrição.",
                textoBotao: "Entrar",
                link: "/paginainscricao",
            });
            const dadosSessionAtualizado = {...dadosSessionArquivo, equipe: idEquipe};
            sessionStorage.setItem('loginSessionData', JSON.stringify(dadosSessionAtualizado));
            props.setEquipeDefinida(true);
        }).catch((error) => {
            console.log(error);                
        });
    }

    return (
        <div className="pesquisaequipes">
            <main>
                <div className="barrapesquisa">
                    <InputTexto name="pesquisarnomeequipe" label="Nome da equipe" value={nomeDaEquipe} 
                        onChange={(e) => {setNomeDaEquipe(e.target.value)}} />
                    <button type="button" onClick={handlePesquisaEquipe}>
                        <img src={iconePesquisa} alt="Pesquisar"/>
                    </button>
                </div>
                <div className="acordeons">
                    {equipes.length === 0 ? (
                        <div className="semresultados">
                            <p>Nenhuma equipe encontrada com a sua pesquisa.</p>
                        </div>
                    ) : (
                        equipes.map((equipe: equipeitem) => {
                            return (
                                <Accordion key={equipe.id} expanded={expanded === equipe.nome} onChange={handleChange(equipe.nome)}>
                                    <AccordionSummary>
                                        <div className="sumario">
                                            <div className="bloco1">
                                                <img src={equipe.foto} alt={equipe.nome}/>
                                                <div className="dados1">
                                                    <strong>{equipe.nome}</strong>
                                                    <p>{equipe.tipo}</p>
                                                </div>
                                            </div>
                                            <div className="dados2">
                                                <p>{equipe.membros} pessoas</p>
                                                <p>{equipe.horario}17h</p>
                                            </div>
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className="detalhes">
                                            <input type="text" value={senhaDaEquipe} onChange={(e) => {setSenhaDaEquipe(e.target.value)}} placeholder="Digite a senha da equipe"/>
                                            <button onClick={() => {handleEntrarEquipe(equipe.id, equipe.nome)}} >Entrar na equipe</button>
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            );
                        })
                    )}
                </div>
            </main>
        </div>
    );
}

export default Pesquisaequipes;