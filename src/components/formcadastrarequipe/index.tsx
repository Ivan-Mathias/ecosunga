import React, { ChangeEvent, FormEvent, useState } from 'react';
import InputTexto from '../Inputs/InputTexto';
import './styles.css';

import semfoto from '../../assets/images/fotopadrao.svg';
import iconeAviso from '../../assets/images/icones/warning.svg';
import camera from '../../assets/images/icones/camera.svg';
import { FormControl, InputLabel, makeStyles, Select } from '@material-ui/core';
import { Tema } from '../../assets/styles/tema';
import api from '../../services/api';

interface Formcadastrarequipe {
    setEquipeDefinida: (p: boolean) => void;
    setSucesso: React.Dispatch<React.SetStateAction<{
        titulo: string, subtitulo: string, textoBotao: string, link: string
    }>>;
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
            fontSize: '1.4rem',
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
            width: 'max-content'
        }
    }
);

function Formcadastrarequipe (props: Formcadastrarequipe) {
    const [nomeEquipe, setNomeEquipe] = useState('');
    const [tipoDaEquipe, setTipoDaEquipe] = useState('');
    const [senhaEquipe, setSenhaEquipe] = useState('');
    const [fotoEquipe, setFotoEquipe] = useState(semfoto);
    const [arquivoFotoEquipe, setArquivoFotoEquipe] = useState<File>();

    async function handleCadastrarEquipe(e: FormEvent) {
        e.preventDefault();

        if (nomeEquipe !== '' && tipoDaEquipe !== '' && senhaEquipe !== ''){
            const dados = new FormData();

            const dadosSessionArquivo = JSON.parse(sessionStorage.getItem('loginSessionData') as string);
            const idUsuario = dadosSessionArquivo.id;

            dados.append('id', idUsuario);
            dados.append('nomeequipe', nomeEquipe);
            dados.append('tipo', tipoDaEquipe);
            dados.append('senhaequipe', senhaEquipe);
            if (arquivoFotoEquipe){
                dados.append('fotoequipe', arquivoFotoEquipe);
            }
            

            try {
                await api.post('sistemaequipe/', dados).then((resultado) => {
                    props.setSucesso({
                        titulo: "Equipe criada!",
                        subtitulo: "Boa, agora é só enviar a senha da sua equipe para os participantes. Você também podera gerir a sua equipe na proxima página.",
                        textoBotao: "Entrar",
                        link: "/paginainscricao",
                    });
                    const foto = 'https://ecoswim.com.br/api/avatares%20das%20equipes/' + resultado.data.id + '.jpg';
                    const dadosSessionAtualizado = {...dadosSessionArquivo, equipe: resultado.data.id, chefe: true};
                    sessionStorage.setItem('loginSessionData', JSON.stringify(dadosSessionAtualizado));
                    props.setEquipeDefinida(true);
                });
            } catch (error) {
                alert('Erro ao mandar os dados!');
            }
        }else {
            alert('Preencha todos os dados!');
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
        setTipoDaEquipe(event.target.value as string);        
    };

    const handleChangePhoto = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0]
            setFotoEquipe(URL.createObjectURL(img));
            setArquivoFotoEquipe(img);
        }
    }

    return (
        <div className="formcadastroequipe">
            <main>
                <form onSubmit={handleCadastrarEquipe}>
                    <fieldset>
                        <legend>Dados da equipe</legend>
                        <div className="linha1dadosequipe">
                            <div className="avatar">
                                <img src={fotoEquipe} alt="Insira a foto da sua equipe"/>
                                <label htmlFor="selecionar-foto">
                                    <img src={camera} alt="Adicionar foto da equipe"/>
                                </label>
                            </div>
                            <input 
                                id="selecionar-foto"
                                type="file"
                                onChange={handleChangePhoto}
                            />
                            <div className="nomeequipe">
                                <InputTexto name="nomeequipe" label="Nome da equipe" value={nomeEquipe}
                                    onChange={(e) => {setNomeEquipe(e.target.value)}} />
                            </div>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel shrink htmlFor="select-tipo-equipe" className={classes.label}>
                                    Tipo
                                </InputLabel>
                                <Select
                                native
                                value={tipoDaEquipe}
                                onChange={handleChangeTipo}
                                className={classes.select}
                                inputProps={{
                                    name: 'tipo',
                                    id: 'select-tipo-equipe',
                                }}
                                >
                                <option value="">Selecione</option>
                                <option value="Academia">Academia</option>
                                <option value="Amigos">Amigos</option>
                                <option value="Atlética">Atlética</option>
                                <option value="Clube">Clube</option>
                                <option value="Família">Família</option>
                                <option value="Outro">Outro</option>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="senhasequipe">
                            <InputTexto name="senhaequipe" label="Senha da equipe" value={senhaEquipe}
                                onChange={(e) => {setSenhaEquipe(e.target.value)}} />
                        </div>
                        <p className="entrelinhassenhaequipe">A senha da equipe haverá de ser compartilhada entre os membros de seu time, portanto não use uma senha pessoal!</p>
                    </fieldset>
                    <footer>
                        <img src={iconeAviso} alt="Aviso importante"/>
                        <div className="avisos">
                            <p>Importante</p>
                            <p>Preencha todos os dados</p>
                        </div>
                        <button type="submit">
                            Cadastrar equipe
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    );
}

export default Formcadastrarequipe;