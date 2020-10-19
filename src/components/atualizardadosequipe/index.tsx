import { FormControl, InputLabel, makeStyles, Select } from '@material-ui/core';
import React, { useState, FormEvent, ChangeEvent } from 'react';
import api from '../../services/api';
import InputTexto from '../Inputs/InputTexto';
import { DadosEquipe } from '../../pages/PaginaIndividual';
import './styles.css';

import semfoto from '../../assets/images/fotopadrao.svg';
import camera from '../../assets/images/icones/camera.svg';
import { Tema } from '../../assets/styles/tema';
import { Redirect } from 'react-router-dom';

interface AtualizarDadosEquipe {
    nomeEquipe: string;
    senhaEquipe: string;
    tipoEquipe: string;
    setDadosEquipe: (p: DadosEquipe) => void;
}

const useStyles = makeStyles({
    formControl: {
        margin: Tema.spacing(1),
        minWidth: 120,
        height: '5.6rem',
    },
    selectEmpty: {
        marginTop: Tema.spacing(2),
    },
    label: {
        position: 'relative',
        bottom: '0.8rem',
        fontFamily: 'Poppins',
        fontSize: '2.4rem',
        fontWeight: 400,
    },
    select: {            
        borderRadius: '8px',
        border: '1px solid #E6E6F0',
        background: '#FAFAFC',
        color: '#020928',
        fontFamily: 'Poppins',
        fontSize: '1.6rem',
        fontWeight: 400,
        width: 'max-content',
    }
}
);

function AtualizarDadosEquipe (props: AtualizarDadosEquipe) {
    const [fotoEquipeNova, setFotoEquipeNova] = useState(semfoto);
    const [nomeEquipeNovo, setNomeEquipeNovo] = useState('');
    const [senhaEquipeNova, setSenhaEquipeNova] = useState('');
    const [tipoEquipeNovo, setTipoEquipeNovo] = useState('');
    const [arquivoFotoEquipeNovo, setArquivoFotoEquipeNovo] = useState<File>();
    const [redirect, setRedirect] = useState(false);

    async function handleAtualizarDados (e: FormEvent) {
        e.preventDefault();
        const dadosSessionArquivo = JSON.parse(sessionStorage.getItem('loginSessionData') as string);
        const idEquipe = dadosSessionArquivo.equipe;
        const nomeEquipeAtualizarCadastro = (nomeEquipeNovo === '' ? props.nomeEquipe : nomeEquipeNovo);
        const tipoEquipeAtualizarCadastro = (tipoEquipeNovo === '' ? props.tipoEquipe : tipoEquipeNovo);
        const senhaEquipeAtualizarCadastro = (senhaEquipeNova === '' ? props.senhaEquipe : senhaEquipeNova);
        const fotoEquipeAtualizarCadastro = "https://ecoswim.com.br/api/avatares%20das%20equipes/" + idEquipe + ".jpg";
        
        const dadosAtualizarCadastroEquipe = new FormData();
        dadosAtualizarCadastroEquipe.append('alterardados', "alterar");
        dadosAtualizarCadastroEquipe.append('idequipe', idEquipe);
        dadosAtualizarCadastroEquipe.append('nomeequipe', nomeEquipeAtualizarCadastro);
        dadosAtualizarCadastroEquipe.append('tipo', tipoEquipeAtualizarCadastro);
        dadosAtualizarCadastroEquipe.append('senhaequipe', senhaEquipeAtualizarCadastro);
        
        if (arquivoFotoEquipeNovo){
            dadosAtualizarCadastroEquipe.append('fotoequipe', arquivoFotoEquipeNovo);
        }

        try {
            await api.post('sistemaequipe/', dadosAtualizarCadastroEquipe).then(() => {
                const dadosEquipe:DadosEquipe = {
                    id: idEquipe,
                    nome: nomeEquipeAtualizarCadastro,
                    senha: senhaEquipeAtualizarCadastro,
                    tipo: tipoEquipeAtualizarCadastro,
                    foto: fotoEquipeAtualizarCadastro,
                    horario: 0
                };
                props.setDadosEquipe(dadosEquipe);
                setFotoEquipeNova(semfoto);
                alert('Atualização realizada com sucesso!');
                setRedirect(true);
            });
        } catch (error) {
            alert('Erro ao mandar os dados!');
        }
    }

    const classes = useStyles();
    const [state, setState] = useState<{ tipo: string | number; name: string }>({
        tipo: '',
        name: 'hai',
    });
    
    const handleChangeTipo = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const name = event.target.name as keyof typeof state;
        setState({
            ...state,
            [name]: event.target.value,
        });
        setTipoEquipeNovo(event.target.value as string);        
    };

    const handleChangePhoto = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0]
            setFotoEquipeNova(URL.createObjectURL(img));
            setArquivoFotoEquipeNovo(img);
        }
    }

    return (
        <div className="atualizardadosequipe">
            <div className="opcoes">
                <form onSubmit={handleAtualizarDados}>
                    <legend>Dados da equipe</legend>
                    <hr/>
                    <div className="dadosequipe">
                        <div className="avatar">
                            <img src={fotoEquipeNova} alt="Insira a foto da sua equipe"/>
                            <label htmlFor="selecionar-foto">
                                <img src={camera} alt="Adicionar foto da equipe"/>
                            </label>
                        </div>
                        <input 
                            id="selecionar-foto"
                            type="file"
                            onChange={handleChangePhoto}
                        />
                        <div className="dados">
                            <div className="linha1">
                                <InputTexto name="nome-equipe-novo" label="Nome da equipe" placeholder={props.nomeEquipe}
                                    value={nomeEquipeNovo} onChange={(e) => {setNomeEquipeNovo(e.target.value)}} />
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel shrink htmlFor="select-atualizar-tipo-equipe" className={classes.label}>
                                        Tipo
                                    </InputLabel>
                                    <Select
                                    native
                                    value={state.tipo}
                                    onChange={handleChangeTipo}
                                    className={classes.select}
                                    inputProps={{
                                        name: 'tipo',
                                        id: 'select-atualizar-tipo-equipe',
                                    }}
                                    >
                                    <option value="">{props.tipoEquipe}</option>
                                    <option value="Academia">Academia</option>
                                    <option value="Amigos">Amigos</option>
                                    <option value="Atlética">Atlética</option>
                                    <option value="Clube">Clube</option>
                                    <option value="Família">Família</option>
                                    <option value="Outro">Outro</option>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="linha2">
                                <InputTexto name="senha-equipe" label="Senha da equipe" placeholder={props.senhaEquipe}
                                value={senhaEquipeNova} onChange={(e) => {setSenhaEquipeNova(e.target.value)}} />
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel shrink htmlFor="select-tipo-equipe" className={classes.label}>
                                        Horario
                                    </InputLabel>
                                    <Select
                                    disabled
                                    native
                                    value={tipoEquipeNovo}
                                    onChange={handleChangeTipo}
                                    className={classes.select}
                                    inputProps={{
                                        name: 'tipo',
                                        id: 'select-tipo-equipe',
                                    }}
                                    >
                                    <option value="">--</option>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                    <button type="submit">Salvar alterações</button>
                </form>
            </div>
            {redirect && <Redirect to="paginainscricao" />}
        </div>
    );
}

export default AtualizarDadosEquipe;