import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import OpenIcon from '@material-ui/icons/OpenWith';
import { Button, FormControl, MenuItem, Select, ThemeProvider } from '@material-ui/core';
import LinhaTabela from '../linhatabela';
import api from '../../services/api';
import './styles.css';
import { Tema } from '../../assets/styles/tema';
import TabPanel from '../tabpanel';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    background: '#ffffff',
  },
  tabs: {
    background: '#1E3FB2',
    borderRadius: '8px',
  },
  tabGeral: {
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: '2.4rem',
    textTransform: 'none' ,
    marginLeft: '27%',
    color: '#DCDCE5',
  },
  tabHorario: {
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: '2.4rem',
    textTransform: 'none',
    width: '18rem',
    color: '#DCDCE5',
  },
  tabEquipe: {
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: '2.4rem',
    textTransform: 'none' ,
    color: '#DCDCE5',
  },
  tabTudo: {
    height: '7.6rem',
    minHeight: '7.6rem',
    marginLeft: '15%',
    position: 'relative',
    right: 0,
    color: '#DCDCE5',
  },
  iconeTudo: {
    fontSize: '4rem',
  },
  formControl: {
    margin: Tema.spacing(1),
  },
  selectEmpty: {
    color: '#02C532',
    fontSize: '2rem',
    paddingTop: '6px',
  },
  botaoMostrarMais: {
    color: 'white',
    fontFamily: 'Archivo',
    fontWeight: 500,
    fontSize: '1.6rem',
    textTransform: 'none',
    marginTop: '4.8rem',
  }
});

interface SelectHorario {
  horarioSelecionado: number;
  setHorarioSelecionado: (p: number) => void;
}

function SelectHorário(props: SelectHorario) {
  const {horarioSelecionado, setHorarioSelecionado} = props;
  const classes = useStyles();

  const handleChangeSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    setHorarioSelecionado(event.target.value as number);
  };

  return(
    <FormControl className={classes.formControl}>
      <Select
        value={horarioSelecionado}
        onChange={handleChangeSelect}
        autoWidth
        displayEmpty
        className={classes.selectEmpty}
      >
        <MenuItem value={8}>8h</MenuItem>
        <MenuItem value={9}>9h</MenuItem>
        <MenuItem value={10}>10h</MenuItem>
        <MenuItem value={11}>11h</MenuItem>
        <MenuItem value={12}>12h</MenuItem>
        <MenuItem value={13}>13h</MenuItem>
        <MenuItem value={14}>14h</MenuItem>
        <MenuItem value={15}>15h</MenuItem>
        <MenuItem value={16}>16h</MenuItem>
        <MenuItem value={17}>17h</MenuItem>
      </Select>
    </FormControl>
  );
}

interface CenteredTabs {
  anoSelecionado: number;
}

export default function CenteredTabs(props: CenteredTabs) {
  const {anoSelecionado} = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [horarioSelecionado, setHorarioSelecionado] = useState(8);
  const [horarioFoiSelecionado, setHorarioFoiSelecionado] = useState(false);
  const [ilimitado, setIlimitado] = useState(false);

  const [dadosGeral, setDadosGeral] = useState([{classificacao: 0, nomeEquipe: '', metragem: 0}]);
  const [dadosEquipe, setDadosEquipe] = useState([{classificacao: 0, nomeEquipe: '', membros: 0}]);
  const [dadosHorario, setDadosHorario] = useState([{classificacao: 0, nomeEquipe: '', metragem: 0}]);
  const [dadosTudo, setDadosTudo] = useState([{classificacao: 0, nomeEquipe: '', metragem: 0, membros: 0, horario: 0}]);

    useEffect(() => {
      getDadosGeral();
      getDadosHorario();
      getDadosEquipe();
      getDadosTudo();
    }, [anoSelecionado, horarioSelecionado, ilimitado]);

    async function getDadosGeral() {
      var params;
      ilimitado ? params = {ano: anoSelecionado, geral: true}
        : params = {ano: anoSelecionado, limitar: 10, geral: true};
      await api.get('resultados/', { params }).then((resposta) => {
        const equipes = resposta.data;
        var n, dadosEquipes=[];
        for (n in equipes){
          dadosEquipes.push({classificacao: parseInt(n)+1, nomeEquipe: equipes[n].Equipe, metragem: equipes[n].Metragem});
        }
        setDadosGeral(dadosEquipes);        
      }).catch((error) => {
        console.log(error.response);
      });
    }

    async function getDadosHorario() {
      await api.get('resultados/', {
        params: {
          ano: anoSelecionado,
          horario: horarioSelecionado,
        }
      }).then((resposta) => {
        const equipes = resposta.data;
        var n, dadosEquipes=[];
        for (n in equipes){
          dadosEquipes.push({classificacao: parseInt(n)+1, nomeEquipe: equipes[n].Equipe, metragem: equipes[n].Metragem});
        }
        setDadosHorario(dadosEquipes);        
      }).catch((error) => {
        console.log(error.response);
      });
    }

    async function getDadosEquipe() {
      var params;
      ilimitado ? params = {ano: anoSelecionado, equipe: true}
        : params = {ano: anoSelecionado, limitar: 10, equipe: true};
      await api.get('resultados/', { params }).then((resposta) => {
        const equipes = resposta.data;
        var n, dadosEquipes=[];
        for (n in equipes){
          dadosEquipes.push({classificacao: parseInt(n)+1, nomeEquipe: equipes[n].Equipe, membros: equipes[n].Membros});
        }
        setDadosEquipe(dadosEquipes);                
      }).catch((error) => {
        console.log(error.response);
      });
    }

    async function getDadosTudo() {
      var params;
      ilimitado ? params = {ano: anoSelecionado}
        : params = {ano: anoSelecionado, limitar: 10};
      await api.get('resultados/', { params }).then((resposta) => {
        const equipes = resposta.data;
        var n, dadosEquipes=[];
        for (n in equipes){
          dadosEquipes.push({
            classificacao: parseInt(n)+1,
            nomeEquipe: equipes[n].Equipe,
            metragem: equipes[n].Metragem,
            membros: equipes[n].Membros,
            horario: equipes[n].Horário,
          });
        }
        setDadosTudo(dadosEquipes);                
      }).catch((error) => {
        console.log(error.response);
      });
    }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    if (newValue === 1) {
      setHorarioFoiSelecionado(true);
    }else {
      setHorarioFoiSelecionado(false);
    }    
  };

  return (
    <ThemeProvider theme={Tema}>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          className={classes.tabs}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab className={classes.tabGeral} label="Geral" />
          <Tab className={classes.tabHorario} label={horarioFoiSelecionado 
            ? <div className="horarioClicado">Horário <SelectHorário 
              horarioSelecionado={horarioSelecionado} setHorarioSelecionado={setHorarioSelecionado}/></div>  
            : "Horário"} />
          <Tab className={classes.tabEquipe} label="Equipe" />
          <Tab className={classes.tabTudo}icon={<OpenIcon className={classes.iconeTudo}/>} />
        </Tabs>
        <TabPanel value={value} index={0} padding={true}>
          <div className="cabecalho-3">
            <p className="p1">Classificação</p>
            <p className="p2">Equipe</p>
            <p className="p3">Metragem</p>
          </div>
          {dadosGeral.map((equipe) => {
            return <LinhaTabela key={equipe.classificacao} tipo="geral" posicao={equipe.classificacao} equipe={equipe.nomeEquipe} metragem={equipe.metragem} />
          })}
          {!ilimitado && <Button className={classes.botaoMostrarMais} variant="contained" color="primary" size="large" onClick={() => {setIlimitado(true)}}>Ver Tudo</Button>}
        </TabPanel>
        <TabPanel value={value} index={1} padding={true}>
          <div className="cabecalho-3">
            <p className="p1">Classificação</p>
            <p className="p2">Equipe</p>
            <p className="p3">Metragem</p>
          </div>
          {dadosHorario.map((equipe) => {
            return <LinhaTabela key={equipe.classificacao} tipo="horario" posicao={equipe.classificacao} equipe={equipe.nomeEquipe} metragem={equipe.metragem} />
          })}
        </TabPanel>
        <TabPanel value={value} index={2} padding={true}>
          <div className="cabecalho-3">
              <p className="p1">Classificação</p>
              <p className="p2">Equipe</p>
              <p className="p3">Membros</p>
          </div>
          {dadosEquipe.map((equipe) => {
            return <LinhaTabela key={equipe.classificacao} tipo="equipe" posicao={equipe.classificacao} equipe={equipe.nomeEquipe} membros={equipe.membros} />
          })}
          {!ilimitado && <Button className={classes.botaoMostrarMais} variant="contained" color="primary" size="large" onClick={() => {setIlimitado(true)}}>Ver Tudo</Button>}
        </TabPanel>
        <TabPanel value={value} index={3} padding={true}>
            <div className="cabecalho-5">
              <p className="p1">Classificação</p>
              <p className="p2">Equipe</p>
              <p className="p3">Metragem</p>
              <p className="p4">Membros</p>
              <p className="p5">Horário</p>
            </div>
            {dadosTudo.map((equipe) => {
              return <LinhaTabela tipo="tudo" 
                key={equipe.classificacao}
                posicao={equipe.classificacao}
                equipe={equipe.nomeEquipe}
                metragem={equipe.metragem}
                membros={equipe.membros}
                horario={equipe.horario}/>
            })}
            {!ilimitado && <Button className={classes.botaoMostrarMais} variant="contained" color="primary" size="large" onClick={() => {setIlimitado(true)}}>Ver Tudo</Button>}
        </TabPanel>
      </Paper>
    </ThemeProvider>
  );
}