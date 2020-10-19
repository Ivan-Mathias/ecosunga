import React, { useState, useRef, FormEvent } from 'react';
import api from '../../services/api';
import InputTexto from '../Inputs/InputTexto';
import './styles.css';

interface AtualizarDadosUsuario {
    nome: string;
    email: string;
    chefeEquipe: boolean;
    setSaiuEquipe?: (p: boolean) => void;
}

function AtualizarDadosUsuario (props: AtualizarDadosUsuario) {
    const [nomeNovo, setNomeNovo] = useState('');
    const [senhaNova, setSenhaNova] = useState('');
    const [repetirSenhaNova, setRepetirSenhaNova] = useState('');

    const focusSenha = useRef<HTMLInputElement>(null);
    const focusRepetirSenha = useRef<HTMLInputElement>(null);
    const [visibilidadeSenha, setVisibilidadeSenha] = useState(false);

    const toggleSenha = () => {
        setVisibilidadeSenha(visibilidadeSenha ? false : true);
        if (focusSenha.current !== null) {
            focusSenha.current.focus();
        }
    }

    const toggleRepetirSenha = () => {
        setVisibilidadeSenha(visibilidadeSenha ? false : true);
        if (focusRepetirSenha.current !== null) {
            focusRepetirSenha.current.focus();
        }
    }

    async function handleAtualizarDados (e: FormEvent) {
        e.preventDefault();
        const dadosSessionArquivo = JSON.parse(sessionStorage.getItem('loginSessionData') as string);
        const idusuario = dadosSessionArquivo.id;
        if (senhaNova === repetirSenhaNova) {
            if (nomeNovo !== '' && senhaNova !== '') {
                await api.post('sistema/', {
                    id: idusuario,
                    nome: nomeNovo,
                    senha: senhaNova,
                    atualizar: true,
                }).then(() => {
                    const dadosSessionAtualizado = {...dadosSessionArquivo, nome: nomeNovo};
                    sessionStorage.setItem('loginSessionData', JSON.stringify(dadosSessionAtualizado));
                    alert('Atualização realizada com sucesso!');
                }).catch((e) => {
                    console.log(e);
                    alert('Erro na atualização!')
                });
            } else if (nomeNovo !== '') {
                await api.post('sistema/', {
                    id: idusuario,
                    nome: nomeNovo,
                    atualizar: true,
                }).then(() => {
                    const dadosSessionAtualizado = {...dadosSessionArquivo, nome: nomeNovo};
                    sessionStorage.setItem('loginSessionData', JSON.stringify(dadosSessionAtualizado));
                    alert('Atualização realizada com sucesso!');
                }).catch((e) => {
                    console.log(e);
                    alert('Erro na atualização!')
                });
            } else if (senhaNova !== '') {
                await api.post('sistema/', {
                    id: idusuario,
                    senha: senhaNova,
                    atualizar: true,
                }).then(() => {
                    alert('Atualização realizada com sucesso!');
                }).catch((e) => {
                    console.log(e);
                    alert('Erro na atualização!')
                });
            }
        }
    }

    async function handleSairEquipe () {
        const dadosSessionArquivo = JSON.parse(sessionStorage.getItem('loginSessionData') as string);
        const idusuario = dadosSessionArquivo.id;
        await api.post('sistema/', {
            id: idusuario,
            sair: true,
        }).then(() => {
            const dadosSessionAtualizado = {...dadosSessionArquivo, equipe: null};
            sessionStorage.setItem('loginSessionData', JSON.stringify(dadosSessionAtualizado));
            if (props.setSaiuEquipe) {
                props.setSaiuEquipe(true);
            }
        }).catch((e) => {
            console.log(e);
        });
    }

    return (
        <div className="atualizardadosusuario">
            <div className="opcoes">
                <form onSubmit={handleAtualizarDados}>
                    <legend>Meus dados</legend>
                    <hr/>
                    <InputTexto name="nome" label="Nome" placeholder={props.nome}
                        value={nomeNovo} onChange={(e) => {setNomeNovo(e.target.value)}} />
                    <div className="campoemail">
                        <label htmlFor="email-usuario">Email</label>
                        <span>{props.email}</span>
                    </div>
                    <div className="senhas">
                        <p>Alterar a senha</p>
                        <div className="inputsenhas">
                            <div className="textInput">
                                <input type={visibilidadeSenha ? "text" : "password"} name="senha" placeholder="Senha" ref={focusSenha}
                                    onChange={(e) => {setSenhaNova(e.target.value)}}/>
                                <input type="checkbox" className="inputCheckbox" id="checkboxSenha" checked={visibilidadeSenha}/>
                                <label htmlFor="checkboxSenha" onClick={toggleSenha}></label>
                            </div>
                            <div className="textInput">
                                <input type={visibilidadeSenha ? "text" : "password"} name="senha" placeholder="Repita a senha" ref={focusRepetirSenha}
                                    onChange={(e) => {setRepetirSenhaNova(e.target.value)}}/>
                                <input type="checkbox" className="inputCheckbox" id="checkboxRepetirSenha" checked={visibilidadeSenha}/>
                                <label htmlFor="checkboxRepetirSenha" onClick={toggleRepetirSenha}></label>
                            </div>
                        </div>
                    </div>
                    <button type="submit">Salvar alterações</button>
                </form>
                {!props.chefeEquipe && <div className="botaosairequipe"><hr/><button onClick={handleSairEquipe}>Sair da equipe</button></div>}
            </div>
        </div>
    );
}

export default AtualizarDadosUsuario;