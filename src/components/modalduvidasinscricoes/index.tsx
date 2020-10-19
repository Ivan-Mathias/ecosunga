import React, { useState } from 'react';
import { makeStyles, Modal } from '@material-ui/core';
import './styles.css';

import interrogacao from '../../assets/images/icones/interrogacao.svg';
import { Tema } from '../../assets/styles/tema';

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

function ModalDuvidasInscricoes () {
    const classes = useStyles();    
    const [open, setOpen] = useState(false);

    return (
        <div className="duvidainscricao">
            <button onClick={() => {setOpen(true)}}>
                <p>Como funcionam as inscrições</p>
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
                    <h2 id="titulo-modal-duvida-inscricao">
                        Como funcionam as inscrições?
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
            </Modal>
        </div>
    );
}

export default ModalDuvidasInscricoes;