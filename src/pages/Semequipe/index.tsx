import React from 'react';
import Sucesso from '../../components/Sucesso';

function Semequipe () {
    return (
        <Sucesso
            titulo="Sem equipe :("
            subTitulo="Parece que você ainda está sem equipe. Hora de criar ou se juntar a uma!"
            textoBotao="Continuar"
            link="/definirequipe/"
            erro={true}
        />
    );
}

export default Semequipe;