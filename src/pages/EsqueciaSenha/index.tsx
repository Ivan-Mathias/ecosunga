import React, { useState, useEffect } from 'react';
import Sistema from '../../components/Sistema';
import { Route } from "react-router-dom";
import InputsEsqueciaSenha from '../../components/Inputs/InputsEsqueciaSenha';
import Sucesso from '../../components/Sucesso';
import api from '../../services/api';
import './styles.css';
import CheckToken from '../../components/CheckToken';
import InputsNovaSenha from '../../components/Inputs/InputsNovaSenha';

function EsqueciaSenha() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [erro, setErro] = useState('');

    const [novaSenhaDefinida, setNovaSenhaDefinida] = useState(false);

    const [tokenCorreto, setTokenCorreto] = useState(false);
    const [textosSistema, setTextosSistema] = useState({
        titulo: "Eita, esqueceu sua senha?!",
        subTitulo: "Não esquenta, vamos dar um jeito nisso.",
        textoBotao: "Enviar",
    });

    const [textosSucesso, setTextosSucesso] = useState({
        titulo: "Redefinição enviada!",
        subTitulo: "Boa, agora é só checar o e-mail que foi enviado para você redefinir sua senha e aproveitar os estudos.",
        textoBotao: "Voltar ao login",
        link: "/login",
    });

    function tokenVerificado() {
        setTextosSistema({
            titulo: "Vamos redefinir a sua senha",
            subTitulo: "Preencha os campos abaixo com a sua nova senha.",
            textoBotao: "Enviar",
        });

        setTextosSucesso({
            titulo: "Senha alterada!",
            subTitulo: "Sua senha foi alterada com sucesso, agora é só aproveitar os estudos.",
            textoBotao: "Entrar",
            link: "/minhainscricao",
        });

        setTokenCorreto(true);
    }

    async function handleRedefinirSenha() {
        if (email) {
            if (tokenCorreto && senha == confirmaSenha) {
                await api.post('esqueciasenha/', {
                    email,
                    senha,
                }).then(() => {
                    setNovaSenhaDefinida(true);
                }).catch((error) => {
                    console.log(error);
                });
            
            }else{
                await api.get('esqueciasenha/', {
                    params: {
                        email,
                    }
                }).then(() => {
                    setNovaSenhaDefinida(true);
                }).catch((error) => {
                    console.log(error);                    
                });
            }
        }
    }

    useEffect(() => {
        if (senha != confirmaSenha && confirmaSenha) {
            setErro('As senhas inseridas não são iguais.');
        }else {
            setErro('');
        }
    }, [senha, confirmaSenha]);

    function getPagina() {
        return (novaSenhaDefinida
        ?
            (<Sucesso
                titulo={textosSucesso.titulo}
                subTitulo={textosSucesso.subTitulo}
                textoBotao={textosSucesso.textoBotao}
                link={textosSucesso.link}
            />)
        :
            (<Sistema
                setaVoltar={true}
                titulo={textosSistema.titulo}
                subTitulo={textosSistema.subTitulo}
                quebrarsubtitulo={false}
                erro={erro}
                textoBotao={textosSistema.textoBotao}
                submitForm={handleRedefinirSenha}
            >
                {tokenCorreto 
                    ?(<InputsNovaSenha
                        setSenha={setSenha}
                        setConfirmaSenha={setConfirmaSenha}
                        />)
                    :(<InputsEsqueciaSenha
                        setEmail={setEmail}
                    />)
                }
                
                <Route path="/esqueciasenha/:token"
                    children={
                        <CheckToken
                            setTokenVerificado={tokenVerificado}
                            setEmail={setEmail}
                            setErro={setErro}
                        />
                    }
                />
            </Sistema>));        
    }

    return getPagina();
}

export default EsqueciaSenha;