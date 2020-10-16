import React, { useEffect, useState } from 'react';
import './styles.css';
import Sistema from '../../components/Sistema';
import InputsCadastro from '../../components/Inputs/InputsCadastro';
import Sucesso from '../../components/Sucesso';
import api from '../../services/api';

function Cadastro() {
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
            }).then(() => {
                setErro('');
                setCadastroConcluido(true);
            }).catch(function (error) {
                if (error.response) {
                    if (error.response.status === 409) {
                        setErro(error.response.data.error);
                    }
                }
            });
        }        
    }

    useEffect(() => {
        if (senha !== repetirSenha && repetirSenha !== "") {
            setErro('As senhas digitadas não são iguais.')
        }else if(senha === repetirSenha) {
            setErro('');
        }
    }, [senha, repetirSenha])

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