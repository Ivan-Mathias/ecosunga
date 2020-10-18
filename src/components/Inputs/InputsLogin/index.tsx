import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import './styles.css';

interface camposLogin {
    setEmail: (p: string) => void;
    setSenha: (p: string) => void;
    setLembrarme: (p: boolean) => void;
}

const InputsLogin: React.FC<camposLogin> = (props) => {
    const focusSenha = useRef<HTMLInputElement>(null);
    const [visibilidadeSenha, setVisibilidadeSenha] = useState(false);

    const toggleSenha = () => {
        setVisibilidadeSenha(visibilidadeSenha ? false : true);
        if (focusSenha.current !== null) {
            focusSenha.current.focus();
        }
    }

    return (
        <div className="inputsLogin">
            <div className="inputs">
                <div className="textInput">
                    <input type="email" name="email" placeholder="E-mail"
                        onChange={(e) => {props.setEmail(e.target.value)}}/>
                </div>
                <div className="textInput">
                    <input type={visibilidadeSenha ? "text" : "password"} name="senha" placeholder="Senha" ref={focusSenha}
                        onChange={(e) => {props.setSenha(e.target.value)}}/>
                    <input type="checkbox" className="inputCheckbox" id="checkboxSenha"/>
                    <label htmlFor="checkboxSenha"onClick={toggleSenha}></label>
                </div>
            </div>
            <div className="entrelinhas">
                <input type="checkbox" className="lembrarCheckbox" id="checkboxLembrar"
                    onChange={(e) => {props.setLembrarme(e.target.checked);}}/>
                <label htmlFor="checkboxLembrar">
                    <p>Lembrar-me</p>
                </label>
                <Link to="/esqueciasenha" >Esqueci minha senha</Link>
            </div>
        </div>
    );
}

export default InputsLogin;