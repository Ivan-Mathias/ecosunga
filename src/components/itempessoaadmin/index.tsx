import React, { useState } from 'react';
import api from '../../services/api';
import './styles.css';

import iconeInscricaoConfirmada from '../../assets/images/icones/inscricao-confirmada.svg';
import iconeInscricaoPendente from '../../assets/images/icones/inscricao-pendente.svg';

interface ItemPessoaAdmin {
    id: number;
    nome: string;
    inscricaoOriginal: boolean;
}

function ItemPessoaAdmin (props: ItemPessoaAdmin) {
    const {id, nome, inscricaoOriginal} = props;
    const [statusInscricao, setStatusInscricao] = useState(inscricaoOriginal);

    async function handleStatusInscricao (atualizarinscricao: boolean) {
        await api.post('sistema/', {
            id,
            atualizarinscricao,
        }).then(() => {
            setStatusInscricao(atualizarinscricao);
        });
    }

    return (
        <div key={id} className="itempessoaadmin">
            <h3>{nome}</h3>
            <button onClick={() => {handleStatusInscricao(!statusInscricao)}}>
                {statusInscricao ? (
                    <img src={iconeInscricaoConfirmada} alt="Inscrição confirmada"/>
                    ) : (
                    <img src={iconeInscricaoPendente} alt="Inscrição pendente"/>
                )}
            </button>
        </div>
    );
}

export default ItemPessoaAdmin;