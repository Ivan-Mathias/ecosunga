import React, { useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import './styles.css';
import Sistema from '../../components/Sistema';
import InputsLogin from '../../components/Inputs/InputsLogin';
import api from '../../services/api';
import { DadosSession } from '../../routes';

export interface usuario {
    id: number,
    nome: string,
    email: string,
    equipe: number | null,
    chefe: boolean,
    admin: boolean,
}

function Login(props: DadosSession) {
    const {setDadosSession} = props;
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [lembrarme, setLembrarme] = useState(false);
    const [redirect, setRedirect] = useState('/');

    const [usuario, setUsuario] = useState<usuario | undefined>(undefined);
    const [logado, setLogado] = useState(false);
    
    const [erro, setErro] = useState('');

    async function handleLogin() {
        await api.get<usuario>('sistema/', {
            params: {
                email,
                senha,
            }
        }).then((resposta) => {
            const {data: {id, nome, email, equipe, chefe, admin}} = resposta;
            setUsuario({id, nome, email, equipe, chefe, admin});
        }).catch(function (error) {
            if (error.response) {
                if (error.response.status === 401 || error.response.status === 404) {
                    setErro(error.response.data.error);
                }
            }
        });        
    }

    async function criarToken (usuario: usuario) {
        const {id, nome, email, equipe, chefe, admin} = usuario;
        await api.get('jwt/', {
            params: {id, nome, email, equipe: equipe == null ? "" : equipe, chefe, admin}
        }).then((resposta) => {            
            localStorage.setItem('loginToken', resposta.data);
        }).catch((error) => console.log(error));
    }

    async function conferirToken (token: string) {
        await api.get('jwt/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((resposta) => {
            if (resposta.data.tokenCorreto) {
                const usuarioToken = JSON.parse(atob(token.split(".")[1]));
                criarDadosSession(usuarioToken);
            }
        }).catch((error) => {
            if (error.response.data && !error.response.data.tokenCorreto) {
                localStorage.removeItem('loginToken');
            }else{
                console.log(error.response)
            }
        });
    }

    useEffect(() => {
        const token = localStorage.getItem('loginToken');
        if (token) {
            conferirToken(token);
        }else if(usuario){
            if (lembrarme) {
                criarToken(usuario);
                criarDadosSession(usuario);
            }else {
                criarDadosSession(usuario);
            }
        }
    }, [usuario, lembrarme]);

    function criarDadosSession (usuario: usuario) {
        sessionStorage.setItem('loginSessionData', JSON.stringify(usuario));
        setDadosSession(usuario);
        if (usuario.admin) {
            setRedirect('/admin/');
        }else if (usuario.chefe) {
            setRedirect('/minhaequipe/');
        }else if (usuario.equipe == null) {
            setRedirect('/semequipe/');
        }else {
            setRedirect('/minhainscricao/');
        }
    }

    useEffect(() => {
        if(redirect !== '/') {
            setLogado(true);          
        }
    }, [redirect]);

    return(
        <Sistema
            setaVoltar={false}
            titulo="Consultar inscrição"
            erro={erro}
            textoBotao="Entrar"
            submitForm={handleLogin}
            footer={
                <div className="loginFooter">
                    <div className="footer">
                        <span className="cadastro">
                            Não se inscreveu ainda?
                        </span>
                    </div>
                    <Link to="/cadastro" >Cadastre-se</Link>
                </div>
            }
            
        >
            <InputsLogin
                setEmail={setEmail}
                setSenha={setSenha}
                setLembrarme={setLembrarme}
            />
            {logado && <Redirect to={redirect} />}
        </Sistema>
    );
}

export default Login;