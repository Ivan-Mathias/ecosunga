import React from 'react';

interface camposEsqueciaSenha {
    setEmail: (p: string) => void;
}

const InputsEsqueciaSenha: React.FC<camposEsqueciaSenha> = (props) => {
    return (
        <div className="inputsLogin">
            <div className="inputs">
                <div className="textInput">
                    <input type="email" name="email" placeholder="E-mail"
                        onChange={(e) => {props.setEmail(e.target.value)}}/>
                </div>
            </div>
        </div>
    );
}

export default InputsEsqueciaSenha;