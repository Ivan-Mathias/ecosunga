import React, { useEffect, useState } from 'react';
import { makeStyles, Paper, Tab, Tabs, ThemeProvider } from '@material-ui/core';
import { Tema } from '../../assets/styles/tema';
import './styles.css';
import TabPanel from '../tabpanel';
import Headersistema from '../headersistema';

const useStyles = makeStyles({
    abasistema: {
        width: '100%',
    },
    tabssistema: {
        background: '#132C84',
        height: '6rem',
    },
    tabsistema: {
        color: ' #DCDCE5',
        fontFamily: 'Roboto',
        fontSize: '1.8rem',
        fontWeight: 500,
        textTransform: 'none',
        height: '6rem',
        padding: '0 2.4rem',
        margin: '0 2rem',
        width: 'fit-content',
        [Tema.breakpoints.down('md')]: {
            margin: '0',
            padding: '0 1.8rem',
        }
    },
});

interface Abasistema {
    labelTab1: string;
    labelTab2: string;
    labelTab3?: string;
    foto: string;
    quadrante1: React.ReactNode;
    quadrante2: React.ReactNode;
    quadrante3: React.ReactNode;
    quadrante4: React.ReactNode;
    conteudo: React.ReactNode;
    quadrante1tab2?: React.ReactNode;
    quadrante2tab2?: React.ReactNode;
    quadrante3tab2?: React.ReactNode;
    quadrante4tab2?: React.ReactNode;
    conteudotab2?: React.ReactNode;
    quadrante1tab3?: React.ReactNode;
    quadrante2tab3?: React.ReactNode;
    quadrante3tab3?: React.ReactNode;
    quadrante4tab3?: React.ReactNode;
    conteudotab3?: React.ReactNode;
}

function Abasistema (props: Abasistema) {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [aba2, setAba2] = useState<React.ReactNode>('');
    const [aba3, setAba3] = useState<React.ReactNode>('');

    const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);  
    };

    useEffect(() => {
        if (props.quadrante1tab2) {
            setAba2(<Headersistema 
                        foto={props.foto}
                        quadrante1={props.quadrante1tab2}
                        quadrante2={props.quadrante2tab2}
                        quadrante3={props.quadrante3tab2}
                        quadrante4={props.quadrante4tab2}
                    />);
        }else {
            setAba2(<Headersistema 
                        foto={props.foto}
                        quadrante1={props.quadrante1}
                        quadrante2={props.quadrante2}
                        quadrante3={props.quadrante3}
                        quadrante4={props.quadrante4}
                    />);
        }
        
        if (props.quadrante1tab3) {
            setAba3(<TabPanel value={value} index={1} padding={false}>
                        <div className="conteudotab">
                            <Headersistema 
                                foto={props.foto}
                                quadrante1={props.quadrante1tab3}
                                quadrante2={props.quadrante2tab3}
                                quadrante3={props.quadrante3tab3}
                                quadrante4={props.quadrante4tab3}
                            />
                            {props.conteudotab3}
                        </div>
                    </TabPanel>
            );
        }
    }, []);

    return (
        <ThemeProvider theme={Tema}>
            <Paper elevation={0} className={classes.abasistema} >
                <Tabs
                    value={value}
                    onChange={handleChangeTab}
                    className={classes.tabssistema}
                    textColor="primary"
                    indicatorColor="primary"
                >
                    <Tab className={classes.tabsistema} label={props.labelTab1} />
                    <Tab className={classes.tabsistema} label={props.labelTab2} />
                    {props.labelTab3 && <Tab className={classes.tabsistema} label={props.labelTab3} />}
                </Tabs>
                <TabPanel value={value} index={0} padding={false}>
                    <div className="conteudotab">
                        <Headersistema 
                            foto={props.foto}
                            quadrante1={props.quadrante1}
                            quadrante2={props.quadrante2}
                            quadrante3={props.quadrante3}
                            quadrante4={props.quadrante4}
                        />
                        {props.conteudo}
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1} padding={false}>
                    <div className="conteudotab">
                        {aba2}
                        {props.conteudotab2}
                    </div>
                </TabPanel>
                {props.quadrante1tab3 && aba3}
            </Paper>
        </ThemeProvider>
    );
}

export default Abasistema;