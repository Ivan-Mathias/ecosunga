import React, { useEffect, useState } from 'react';
import Centered from '../Tabs';
import api from '../../services/api';
import './styles.css';
import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import { Tema } from '../../assets/styles/tema';

const useStyles = makeStyles({
    formControl: {
      margin: Tema.spacing(1),
      zIndex: 2,
    },
    selectEmpty: {
      color: '#02C532',
      fontSize: '2rem',
      paddingTop: '6px',
    },
    labelSelect: {
        fontSize: '1.6rem',
        color: '#DCDCE5',
        marginTop: '0.8rem',
        marginLeft: '-2.4rem',
        fontFamily: 'Roboto',
        fontWeight: 500,
    }
  });

interface SelectAno {
    anoSelecionado: number;
    setAnoSelecionado: (p: number) => void;
    opcoesDeAnos: Array<{
        value: string;
        label: string;
    }>;
}
  
function SelectAno(props: SelectAno) {
    const {anoSelecionado, setAnoSelecionado, opcoesDeAnos} = props;
    const classes = useStyles();
  
    const handleChangeSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
      setAnoSelecionado(event.target.value as number);
    };
  
    return(
        <FormControl className={classes.formControl}>
            <InputLabel className={classes.labelSelect} id="select-label-ano">Ano</InputLabel>
            <Select
            labelId="select-label-ano"
            id="select-ano"
            value={anoSelecionado}
            onChange={handleChangeSelect}
            autoWidth
            displayEmpty
            className={classes.selectEmpty}
            >
                {opcoesDeAnos.map(opcao => {
                    return <MenuItem key={opcao.value} value={opcao.value}>{opcao.label}</MenuItem>
                })}
            </Select>
        </FormControl>
    );
}

function Tabela () {

    const[anoSelecionado, setAnoSelecionado] = useState(2007);
    const[opcoesDeAnos, setOpcoesDeAnos] = useState([{value: "2007", label: ""}]);

    useEffect(() => {
        definirAnoRecente();
    }, []);

    async function definirAnoRecente() {
        await api.get('resultados').then((resposta) => {
            const ano = resposta.data.AnoMaisRecente;
            let opcoes = [];
            
            for (let i = ano; i >= 2007 ; i--) {
                opcoes.push({value: i.toString(), label: i.toString()});
                
            }            
            setOpcoesDeAnos(opcoes);
            setAnoSelecionado(ano);           
        }).catch((error) => {
            console.log(error.response);
        });
    }

    return (
        <div className="tabela">
            <div className="barraprincipal">
                <div className="seleconarAno">
                    <SelectAno anoSelecionado={anoSelecionado}
                    setAnoSelecionado={setAnoSelecionado} opcoesDeAnos={opcoesDeAnos}/>
                </div>
                <Centered anoSelecionado={anoSelecionado}/>
            </div>
        </div>
    );
}

export default Tabela;