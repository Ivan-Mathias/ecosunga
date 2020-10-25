import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Abasistema from '../../components/abasistema';
import ListaInscricoes from '../../components/listainscricoes';
import api from '../../services/api';
import { IconButton } from '@material-ui/core';
import './styles.css';

import logoEcoswim from '../../assets/images/logos/logo.svg';
import botaoLogout from '../../assets/images/icones/logout.svg';

const divFoto = (
    <div className="fotoequipe">
        <img src={logoEcoswim} alt="Ecoswim"/>
    </div>
);

const tituloAdmin = (
    <div className="titulo">
        <strong>Painel de Admin</strong>
    </div>
);

function Admin () {
    const [admin, setAdmin] = useState(true);
    const [semDados, setSemDados] = useState(false);
    const [semEquipe, setSemEquipe] = useState(false);
    const [nomeUsuario, setNomeUsuario] = useState("");
    const [numerosInscricoes, setNumerosInscricoes] = useState<React.ReactNode>('');
    const [numeroEquipes, setNumeroEquipes] = useState(0);
    const [numeroPessoasInscritas, setNumeroPessoasInscritas] = useState(0);
    const [fezLogout, setFezLogout] = useState(false);
    
    async function getDados() {
        const dadosSession = JSON.parse(sessionStorage.getItem('loginSessionData') as string);
        if (dadosSession && dadosSession.id) {
            if (!dadosSession.admin) {
                if (dadosSession.equipe === null) {
                    setSemEquipe(true);
                }
                setAdmin(false);
            }
            console.log("Com dados");
            
        } else {
            setSemDados(true);
            console.log("Sem dados");
        }

        await api.get('sistemaequipe/', {
            params: {
                numerodeequipes: true,
            }
        }).then((resposta) => {
            setNumeroEquipes(resposta.data.numerodeequipes);
        }).catch((error) => {
            console.log(error);
        });
        
        await api.get('sistema/', {
            params: {
                numerodepessoasinscritas: true,
            }
        }).then((resposta) => {
            setNumeroPessoasInscritas(resposta.data.numerodepessoasinscritas);
        }).catch((error) => {
            console.log(error);
        });
    }

    function getNome() {
        const dadosSession = JSON.parse(sessionStorage.getItem('loginSessionData') as string);
        setNomeUsuario(dadosSession.nome);
    }

    useEffect(() => {
        getDados();
        getNome();
    }, []);

    function alterarNumeroInscicoes(pessoas: number, equipes: number) {
        setNumerosInscricoes(
            <div className="numerosinscricoes">
                Já temos {pessoas} pessoas inscritas em {equipes} equipes.
            </div>
        );
    }

    useEffect(() => {
        alterarNumeroInscicoes(numeroPessoasInscritas, numeroEquipes);
    }, [numeroPessoasInscritas, numeroEquipes]);

    function handleLogout () {
        sessionStorage.clear();
        sessionStorage.setItem('loginautomatico', "impedir");
        setFezLogout(true);
    }
    
    return (
        <div className="page-paginaadmin">
            <Abasistema
                labelTab1="Equipes"
                labelTab2="Alguma coisa futura"
                foto={divFoto}
                quadrante1={tituloAdmin}
                quadrante2=""
                quadrante3={numerosInscricoes}
                quadrante4=""
                conteudo={<ListaInscricoes />}
                conteudotab2="atualizarCadastro}"
            />
            <div className="logout">
                <span>{nomeUsuario.split(" ")[0]}</span>
                <IconButton onClick={handleLogout}><img src={botaoLogout} alt="Logout"/></IconButton>
            </div>
            {semDados ? (
                <Redirect to="/login" />
            ) : (
                !admin && (
                    semEquipe ? (
                        <Redirect to="/definirequipe" />
                        ) : (
                        <Redirect to="/paginainscricao" />                        
                    )
                )
            )}            
            {fezLogout && <Redirect to="/login" />}
        </div>
    );
}

export default Admin;