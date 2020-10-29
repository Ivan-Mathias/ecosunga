import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import ItemPessoaAdmin from '../itempessoaadmin';
import './styles.css';


interface equipeitem {
    id: number;
    foto: string;
    nome: string;
    tipo: string;
    horario: string;
    membros: number;
}

function ListaInscricoes () {
    const [equipes, setEquipes] = useState([]);    
    const [listaMembros, setListaMembros] = useState([{id: 0, nome: "", inscricao: false}]);
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChangeAccordion = (idEquipe: number, panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
        setListaMembros([{id: 0, nome: "", inscricao: false}]);
        pegarInscritosEquipe(idEquipe);
    };
    
    async function pegarDadosInscricoes() {
        await api.get('sistemaequipe/').then((resposta) => {
            setEquipes(resposta.data);
        }).catch((error) => {
            console.log(error);
        });
    }
    
    async function pegarInscritosEquipe(idEquipe: number) {
        await api.get('sistemaequipe/', {
            params: {
                idequipe: idEquipe,
                dados: "membros",
            }
        }).then((resposta) => {
            setListaMembros(resposta.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        pegarDadosInscricoes();
    },[]);
    
    return (
        <div className="pesquisaequipes">
            <main>
                <div className="acordeons">
                    {equipes.length === 0 ? (
                        <div className="semresultados">
                            <p>Ainda não há equipes inscritas.</p>
                        </div>
                    ) : (
                        equipes.map((equipe: equipeitem) => {
                            return (
                                <Accordion key={equipe.id} expanded={expanded === equipe.nome} onChange={handleChangeAccordion(equipe.id, equipe.nome)}>
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
                                                {equipe.horario && <p>{equipe.horario}</p>}
                                            </div>
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className="listademembrosequipe">
                                            <div className="cabecalho">
                                                <p>Nome</p>
                                                <p>Inscrição</p>
                                            </div>
                                            {listaMembros.map((pessoa) => {  
                                                return (
                                                <ItemPessoaAdmin
                                                    key={pessoa.id}
                                                    id={pessoa.id}
                                                    nome={pessoa.nome}
                                                    inscricaoOriginal={pessoa.inscricao}
                                                />
                                                );
                                            })}
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

export default ListaInscricoes;