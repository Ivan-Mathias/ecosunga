import React, { useState } from 'react';
import { makeStyles, Modal } from '@material-ui/core';
import './styles.css';

import interrogacao from '../../assets/images/icones/interrogacao.svg';
import { Tema } from '../../assets/styles/tema';

interface ModalDuvidasInscricoes {
    texto: number;
}

const useStyles = makeStyles(() => ({
    paper: {
        position: 'absolute',
        width: '90%',
        maxWidth: '500px',
        backgroundColor: '#F0F0F7',
        border: '1px solid #E6E6F0',
        borderRadius: '8px',
        boxShadow: Tema.shadows[5],
        padding: Tema.spacing(6, 8, 6),
        [Tema.breakpoints.down('md')]: {
            padding: Tema.spacing(2, 4, 3),
        }
    },
  }));

function ModalDuvidasInscricoes (props: ModalDuvidasInscricoes) {
    const classes = useStyles();    
    const [open, setOpen] = useState(false);

    return (
        <div className="duvidainscricao">
            <button onClick={() => {setOpen(true)}}>
                {props.texto === 0 && <p>Como funcionam as inscrições</p>}
                {props.texto === 1 && <p>Como funcionam as doações</p>}                
                <img src={interrogacao} alt="Dúvidas na inscrição"/>
            </button>
            <Modal
                open={open}
                onClose={() => {setOpen(false)}}
                aria-labelledby="titulo-modal-duvida-inscricao"
                aria-describedby="descricao-modal-duvida-inscricao"
                className="janelamodalduvidasinscricao"
            >
                <div className={classes.paper}>
                    {props.texto === 0 &&
                        <div className="conteudomodal">
                            <h2 id="titulo-modal-duvida-inscricao">
                                Como funcionam as doações?
                            </h2>
                            <p id="descricao-modal-duvida-inscricao">
                                Primeiramente, deve ser realizado o cadastro da equipe no site do Ecoswim. 
                                O responsável de cada grupo deverá criar a equipe e definir uma senha de acesso.
                                <br/><br/>
                                Com posse da senha de acesso, os demais participantes devem se cadastrar e entrar 
                                na equipe. <br/><br/><hr/><br/>
                                Após realizado o cadastro da equipe no site do Ecoswim, cada participante deverá
                                fazer a sua doação para a ONG IPÊ, de no mínimo R$ 20,00, no link de doação 
                                divulgado. Além disso, o participante deverá sinalizar a sua equipe, no campo 
                                correspondente.
                            </p>
                        </div>
                    }
                    {props.texto === 1 &&
                        <div className="conteudomodal">
                            <h2 id="titulo-modal-duvida-inscricao">
                                Como funcionam as inscrições?
                            </h2>
                            <p id="descricao-modal-duvida-inscricao">
                                Agora que você já escolheu a sua equipe, para confirmar a sua participação no evento, 
                                você deve fazer a sua doação para ONG IPÊ, de no mínimo R$20,00 clicando no botão de doação.  
                                <br/><br/>
                                Na página de doação, você poderá escolher entre realizar uma doação única ou se deseja contribuir 
                                mensalmente com a ONG IPÊ. Você deve indicar a sua equipe no campo correspondente, além de preencher
                                 seus dados pessoais.
                            </p>
                        </div>
                    }
                </div>
            </Modal>
        </div>
    );
}

export default ModalDuvidasInscricoes;