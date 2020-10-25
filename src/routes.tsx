import React, {lazy, Suspense} from 'react';
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import Cadastro from './pages/Cadastro';
import DefinirEquipe from './pages/Definirequipe';
import EsqueciaSenha from './pages/EsqueciaSenha';
// import Home from './pages/Home';
import Login from './pages/Login';
import PaginaIndividual from './pages/PaginaIndividual';
// import Resultados from './pages/Resultados';
import Semequipe from './pages/Semequipe';
// import Sobre from './pages/Sobre';

const Admin = lazy(() => import('./pages/Admin'));

function Routes(){
    return(
        <BrowserRouter basename="/inscricoes">
            <Route path="/" exact><Redirect to="/login" /></Route>
            {/* <Route path="/" exact component={Home} />
            <Route path="/sobre" component={Sobre} />
            <Route path="/resultados" component={Resultados} /> */}
            <Route path="/login" component={Login} />
            <Route path="/cadastro" component={Cadastro} />
            <Route path="/esqueciasenha" component={EsqueciaSenha} />
            <Route path="/semequipe" component={Semequipe} />
            <Route path="/definirequipe" component={DefinirEquipe} />
            <Route path="/paginainscricao" component={PaginaIndividual} />
            <Route path="/admin">
                <Suspense fallback={<div>Carregando...</div>}>
                    <Admin />
                </Suspense>
            </Route>
        </BrowserRouter>
    )
}

export default Routes;