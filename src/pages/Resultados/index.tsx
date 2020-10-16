import React from 'react';
import Banner from '../../components/banner';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import Secao from '../../components/secao';
import Tabela from '../../components/tabela';
import './styles.css';

function Resultados () {
    return (
        <div className="page-resultados">
            <Navbar link={2} />
            <Banner />
            <Secao titulo="Resultados" subtitulo="Confira os resultados de todas as nossas edições!" fundo="#ffffff">
                <Tabela />
            </Secao>
            <Footer />
        </div>
    );
}

export default Resultados;