import React, { useEffect, useState } from 'react';
import Abasistema from '../../components/abasistema';
import './styles.css';
import api from '../../services/api';
import AtualizarDadosUsuario from '../../components/atualizardadosusuario';
import { Redirect } from 'react-router-dom';
import AtualizarDadosEquipe from '../../components/atualizardadosequipe';
import ModalDuvidasInscricoes from '../../components/modalduvidasinscricoes';

import logoEcoswim from '../../assets/images/logos/logo.svg';
import botaoLogout from '../../assets/images/icones/logout.svg';
import { IconButton } from '@material-ui/core';
import iconeInscricaoConfirmada from '../../assets/images/icones/inscricao-confirmada.svg';
import iconeInscricaoPendente from '../../assets/images/icones/inscricao-pendente.svg';

export interface DadosEquipe {
    id: number;
    nome: string;
    senha: string;
    tipo: string;
    foto: string;
    horario: number;
}

const tituloequipe = (nome: string, tipo: string) => (
    <div className="tituloequipe">
        <strong>{nome}</strong>
        <p>{tipo}</p>
    </div>
);

const informacoesequipe = (senha: string, horario: number) => (
    <div className="informacoesequipe">
        <div className="senhaequipe">
            <p>Senha da equipe:</p>
            <h3>{senha}</h3>
        </div>
        {horario && 
            <div className="horarioequipe">
                <p>Horário:</p>
                <h3>{horario}</h3>
            </div>  
        }
            
</div>
);

const itemPessoa = (nome: string, inscricao: boolean) => (
    <div className="itempessoa">
        <h3>{nome}</h3>
        {inscricao ? (
            <img src={iconeInscricaoConfirmada} alt="Inscrição confirmada"/>
            ) : (
            <img src={iconeInscricaoPendente} alt="Inscrição pendente"/>
        )}
    </div>
);

function PaginaIndividual () {
    const [semDados, setSemDados] = useState(false);
    const [semEquipe, setSemEquipe] = useState(false);
    const [labelTab2, setLabelTab2] = useState("Minha inscrição");
    const [chefeEquipe, setChefeEquipe] = useState(false);
    const [nomeUsuario, setNomeUsuario] = useState("");
    const [emailUsuario, setEmailUsuario] = useState("");
    const [dadosEquipe, setDadosEquipe] = useState<DadosEquipe>({id: 0, nome: "", senha: "", tipo: "", foto: "", horario: 0});
    const [listaMembros, setListaMembros] = useState([{nome: "", inscricao: false}]);
    const [listaPessoas, setListaPessoas] = useState<React.ReactNode>('');
    const [atualizarCadastro, setAtualizarCadastro] = useState<React.ReactNode>('');
    const [divFoto, setDivFoto] = useState<React.ReactNode>('');
    const [saiuEquipe, setSaiuEquipe] = useState(false);
    const [fezLogout, setFezLogout] = useState(false);

    
    function alterarDivFoto () {
        setDivFoto(
            <div className="fotoequipe">
                <img src={`${dadosEquipe.foto}?${new Date().getTime()}`} alt={dadosEquipe.nome}/>
            </div>
        );
    };
    
    const botaoDoar = (
        <div className="botaodoar">
            <button type="button" onClick={(event) => {event.preventDefault(); window.open("https://ipe.colabore.org/Ecoswim/single_step")}}>Doar</button>
        </div>
    );

    function listarMembros () {
        setListaPessoas(
            <div className="paginainscricao">
                <div className="listademembros">
                    <div className="cabecalho">
                        <p>Nome</p>
                        <p>Inscrição</p>
                    </div>
                    {listaMembros.map((pessoa) => {  
                        return itemPessoa(pessoa.nome, pessoa.inscricao);
                    })}
                </div>
            </div>
        );        
    }

    useEffect(() => {
        listarMembros();
    }, [listaMembros]);

    function gerarCadastro () {
        setAtualizarCadastro(
            <div className="paginainscricao">
                <AtualizarDadosUsuario 
                    setSaiuEquipe={setSaiuEquipe}
                    nome={nomeUsuario} 
                    email={emailUsuario}
                    chefeEquipe={chefeEquipe}
                />
                {chefeEquipe && 
                    <AtualizarDadosEquipe 
                        nomeEquipe={dadosEquipe.nome}
                        senhaEquipe={dadosEquipe.senha}
                        tipoEquipe={dadosEquipe.tipo}
                        setDadosEquipe={setDadosEquipe}
                    />}
            </div>
        );
    }
    
    useEffect(() => {
        listarMembros();
        gerarCadastro();
        alterarDivFoto();
    }, [nomeUsuario, emailUsuario, chefeEquipe, dadosEquipe]);

    async function getDados() {
        const dadosSession = JSON.parse(sessionStorage.getItem('loginSessionData') as string);
        if (dadosSession && dadosSession.id) {
            if (dadosSession.equipe === null) {
                setSemEquipe(true);
            }
        } else {
            setSemDados(true);
        }
        const idEquipe = dadosSession.equipe;
        const chefe = dadosSession.chefe;
        setNomeUsuario(dadosSession.nome);
        setEmailUsuario(dadosSession.email);

        if (chefe) {
            setLabelTab2("Inscrição");
            setChefeEquipe(true);
        }

        await api.get('sistemaequipe/', {
            params: {
                idequipe: idEquipe,
                dados: "equipe",
            }
        }).then((resposta) => {
            setDadosEquipe(resposta.data[0]);
        }).catch((error) => {
            console.log(error);
        });   

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
        getDados();
    }, []);

    function handleLogout () {
        sessionStorage.clear();
        sessionStorage.setItem('loginautomatico', "impedir");
        setFezLogout(true);
    }

    return (
        <div className="page-paginaindividual">
            <Abasistema
                labelTab1="Minha equipe"
                labelTab2={labelTab2}
                foto={divFoto}
                quadrante1={tituloequipe(dadosEquipe.nome, dadosEquipe.tipo)}
                quadrante2={<ModalDuvidasInscricoes texto={1}/>}
                quadrante3={informacoesequipe(dadosEquipe.senha, dadosEquipe.horario)}
                quadrante4={botaoDoar}
                conteudo={listaPessoas}
                conteudotab2={atualizarCadastro}
            />
            <img src={logoEcoswim} alt="Ecoswim"/>
            <div className="logout">
                <span>{nomeUsuario.split(" ")[0]}</span>
                <IconButton onClick={handleLogout}><img src={botaoLogout} alt="Logout"/></IconButton>
            </div>
            {(saiuEquipe || semEquipe) && <Redirect to="/definirequipe" />}
            {(fezLogout || semDados) && <Redirect to="/login" />}
        </div>
    );
}

export default PaginaIndividual;