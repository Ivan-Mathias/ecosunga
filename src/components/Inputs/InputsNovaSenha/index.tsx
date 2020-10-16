import React, { useState, useRef } from 'react';

interface camposCadastro {
    setSenha: (p: string) => void;
    setConfirmaSenha: (p: string) => void;
}

const InputsNovaSenha: React.FC<camposCadastro> = (props) => {
    const focusSenha = useRef<HTMLInputElement>(null);
    const focusConfirmaSenha = useRef<HTMLInputElement>(null);
    const [visibilidadeSenha, setVisibilidadeSenha] = useState(false);
    const [visibilidadeConfirmaSenha, setVisibilidadeConfirmaSenha] = useState(false);

    const toggleSenha = () => {
        setVisibilidadeSenha(visibilidadeSenha ? false : true);
        if (focusSenha.current !== null) {
            focusSenha.current.focus();
        }
    }

    const toggleConfirmaSenha = () => {
        setVisibilidadeConfirmaSenha(visibilidadeConfirmaSenha ? false : true);
        if (focusConfirmaSenha.current !== null) {
            focusConfirmaSenha.current.focus();
        }
    }
    return (
        <div className="inputsNovaSenha">
            <div className="inputs">
                <div className="textInput">
                    <input type={visibilidadeSenha ? "text" : "password"} name="senha" placeholder="Senha" ref={focusSenha}
                        onChange={(e) => {props.setSenha(e.target.value)}}/>
                    <input type="checkbox" className="inputCheckbox" id="checkboxSenha" />
                    <label htmlFor="checkboxSenha" onClick={toggleSenha}></label>
                </div>
                <div className="textInput">
                    <input type={visibilidadeConfirmaSenha ? "text" : "password"} name="senha" placeholder="Confirme a senha" ref={focusConfirmaSenha}
                        onChange={(e) => {props.setConfirmaSenha(e.target.value)}}/>
                    <input type="checkbox" className="inputCheckbox" id="checkboxConfirmaSenha" />
                    <label htmlFor="checkboxConfirmaSenha" onClick={toggleConfirmaSenha}></label>
                </div>
            </div>
        </div>
    );
}

export default InputsNovaSenha;