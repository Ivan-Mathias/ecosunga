import React, { useState } from 'react';
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import Cadastro from './pages/Cadastro';
import DefinirEquipe from './pages/Definirequipe';
import EsqueciaSenha from './pages/EsqueciaSenha';
import Home from './pages/Home';
import Login, { usuario } from './pages/Login';
import Resultados from './pages/Resultados';
import Semequipe from './pages/Semequipe';
import Sobre from './pages/Sobre';

export interface DadosSession {
    setDadosSession: (p: usuario) => void;
}

function Routes(){
    const [dadosSession, setDadosSession] = useState<usuario>(JSON.parse(sessionStorage.getItem('loginSessionData') as string));
    return(
        <BrowserRouter>
            <Route path="/" exact component={Home} />
            <Route path="/sobre/" component={Sobre} />
            <Route path="/resultados/" component={Resultados} />
            <Route path="/login/"><Login setDadosSession={setDadosSession} /></Route>
            <Route path="/cadastro/"><Cadastro setDadosSession={setDadosSession} /></Route>
            <Route path="/esqueciasenha/" component={EsqueciaSenha} />
            <Route path="/semequipe/">
                {dadosSession && dadosSession.id ? (
                    dadosSession.equipe === null ?(
                        <Semequipe />
                    ) : (
                        dadosSession.chefe ? (
                            <Redirect to="/minhaequipe/" />
                        ) : (
                            <Redirect to="/minhainscricao/" />
                        )
                    )
                ) : (
                    <Redirect to={"/" + JSON.stringify(dadosSession) + "/"} />
                )}
            </Route>
            <Route path="/definirequipe/">
                {dadosSession && dadosSession.id ? (
                        dadosSession.equipe === null ?(
                            <DefinirEquipe />
                        ) : (
                            dadosSession.chefe ? (
                                <Redirect to="/minhaequipe/" />
                            ) : (
                                <Redirect to="/minhainscricao/" />
                            )
                        )
                    ) : (
                        <Redirect to="/login/" />
                    )}
            </Route>
        </BrowserRouter>
    )
}

export default Routes;