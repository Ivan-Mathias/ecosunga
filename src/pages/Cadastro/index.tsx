import React, { useEffect, useState } from 'react';
import './styles.css';
import Sistema from '../../components/Sistema';
import InputsCadastro from '../../components/Inputs/InputsCadastro';
import Sucesso from '../../components/Sucesso';
import api from '../../services/api';
import { DadosSession } from '../../routes';
import { usuario } from '../Login';

function Cadastro(props: DadosSession) {
    const {setDadosSession} = props;
    const [cadastroConcluido, setCadastroConcluido] = useState(false);

    const [erro, setErro] = useState('');
    
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [repetirSenha, setRepetirSenha] = useState('');

    async function handleCadastro () {
        if (nome !== '' && email !== '' && senha !== '' && senha === repetirSenha) {
            await api.post('sistema/', {
                nome,
                email,
                senha,
            }).then((response) => {
                const usuario: usuario = {id: response.data.id, nome: nome, email: email, equipe: null, chefe: false, admin: false};
                sessionStorage.setItem('loginSessionData', JSON.stringify(usuario));
                setDadosSession(usuario);
                setErro('');
                setCadastroConcluido(true);
            });
        }        
    }

    useEffect(() => {
        if (senha !== repetirSenha && repetirSenha !== "") {
            setErro('As senhas digitadas não são iguais.')
        }else if(senha === repetirSenha) {
            setErro('');
        }
    }, [senha, repetirSenha]);

    function getPagina() {
        return (cadastroConcluido
        ?
            (<Sucesso
                titulo={'Bem vindo, '+ nome.split(' ')[0] + '!'}
                subTitulo="O seu cadastro foi realizado com sucesso.
                Agora você pode criar ou entrar em uma equipe"
                textoBotao="Continuar"
                link="/definirequipe/"
            />)
        :
            (<Sistema
                setaVoltar={true}
                titulo="Cadastro"
                subTitulo="Preencha os dados abaixo para começar."
                erro={erro}
                quebrarsubtitulo={true}
                textoBotao="Concluir cadastro"
                submitForm={handleCadastro}
            >
                <InputsCadastro
                    setNome={setNome}
                    setEmail={setEmail}
                    setSenha={setSenha}
                    setRepetirSenha={setRepetirSenha}
                />
            </Sistema>));        
    }

    return getPagina();
}

export default Cadastro;