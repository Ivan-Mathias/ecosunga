import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Cadastro from './pages/Cadastro';
import DefinirEquipe from './pages/Definirequipe';
import EsqueciaSenha from './pages/EsqueciaSenha';
// import Home from './pages/Home';
import Login from './pages/Login';
import PaginaIndividual from './pages/PaginaIndividual';
// import Resultados from './pages/Resultados';
import Semequipe from './pages/Semequipe';
// import Sobre from './pages/Sobre';

function Routes(){
    return(
        <BrowserRouter basename="/inscricoes">
            {/* <Route path="/" exact component={Home} />
            <Route path="/sobre" component={Sobre} />
            <Route path="/resultados" component={Resultados} /> */}
            <Route path="/login" component={Login} />
            <Route path="/cadastro" component={Cadastro} />
            <Route path="/esqueciasenha" component={EsqueciaSenha} />
            <Route path="/semequipe" component={Semequipe} />
            <Route path="/definirequipe" component={DefinirEquipe} />
            <Route path="/paginainscricao" component={PaginaIndividual} />
        </BrowserRouter>
    )
}

export default Routes;