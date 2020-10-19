import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Sucesso from '../../components/Sucesso';

function Semequipe () {
    const [semDados, setSemDados] = useState(false);
    const [temEquipe, setTemEquipe] = useState(false);

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
    
    return (
        semDados ? (
            <Redirect to="/login" />
        ) : (
            temEquipe ? (
                <Redirect to="/paginainscricao" />
            ) : (
                <Sucesso
                    titulo="Sem equipe :("
                    subTitulo="Parece que você ainda está sem equipe. Hora de criar ou se juntar a uma!"
                    textoBotao="Continuar"
                    link="/definirequipe/"
                    erro={true}
                />
            )
        )
    );
}

export default Semequipe;