import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Home from './paginas/Home';
import Sobre from './paginas/Sobre';

function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={Home} />
            <Route path="/sobre/" exact component={Sobre} />
        </BrowserRouter>
    )
}

export default Routes;