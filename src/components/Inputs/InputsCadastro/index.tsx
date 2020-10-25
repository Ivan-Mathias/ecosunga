import React, { useState, useRef } from 'react';

interface camposCadastro {
    setNome: (p: string) => void;
    setEmail: (p: string) => void;
    setSenha: (p: string) => void;
    setRepetirSenha: (p: string) => void;
}

const InputsCadastro: React.FC<camposCadastro> = (props) => {
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
    
    return (
        <div className="inputsLogin">
            <div className="inputsCadastro">
                <div className="textInput">
                    <input autoComplete="off" type="text" name="nome" placeholder="Nome"
                        onChange={(e) => {props.setNome(e.target.value)}}/>
                </div>
                <div className="textInput">
                    <input autoComplete="off" type="email" name="email" placeholder="E-mail"
                        onChange={(e) => {props.setEmail(e.target.value)}}/>
                </div>
                <div className="textInput">
                    <input autoComplete="off" type={visibilidadeSenha ? "text" : "password"} name="senha" placeholder="Senha" ref={focusSenha}
                        onChange={(e) => {props.setSenha(e.target.value)}}/>
                    <input type="checkbox" className="inputCheckbox" id="checkboxSenha" checked={visibilidadeSenha}/>
                    <label style={{cursor: "pointer"}} htmlFor="checkboxSenha" onClick={toggleSenha}></label>
                </div>
                <div className="textInput">
                    <input autoComplete="off" type={visibilidadeSenha ? "text" : "password"} name="senha" placeholder="Repita a senha" ref={focusRepetirSenha}
                        onChange={(e) => {props.setRepetirSenha(e.target.value)}}/>
                    <input type="checkbox" className="inputCheckbox" id="checkboxRepetirSenha" checked={visibilidadeSenha}/>
                    <label style={{cursor: "pointer"}} htmlFor="checkboxRepetirSenha" onClick={toggleRepetirSenha}></label>
                </div>
            </div>
        </div>
    );
}

export default InputsCadastro;