import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Home from './pages/Home';
import Resultados from './pages/Resultados';
import Sobre from './pages/Sobre';

function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={Home} />
            <Route path="/sobre/" exact component={Sobre} />
            <Route path="/resultados/" exact component={Resultados} />
        </BrowserRouter>
    )
}

export default Routes;