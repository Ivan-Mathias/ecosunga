import React from 'react';
import Banner from '../../components/banner';
import Evento from '../../components/evento';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import Secao from '../../components/secao';
import './styles.css';

function Home(){
    return (
        <div className="page-home">
            <Navbar link={0}/>
            <Banner />
            <Secao titulo="Como funciona o evento?" fundo="#E7EAF2"
                subtitulo="São revezamentos de 55 minutos em que as equipes têm de nadar o máximo de metragem possivel!">
                <Evento />
            </Secao>
            <Secao titulo="Edições anteriores" subtitulo="Confira abaixo como foram as outras edições do nosso evento!" fundo="F2F2F2">
                Anos anteriores
            </Secao>
            <Footer />
        </div>
    );
}

export default Home;