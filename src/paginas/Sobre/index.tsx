import React from 'react';
import Banner from '../../components/banner';
import Contato from '../../components/contato';
import Footer from '../../components/footer';
import Ipe from '../../components/ipe';
import Navbar from '../../components/navbar';
import Secao from '../../components/secao';
import Wetrats from '../../components/wetrats';
import './styles.css';

function Sobre () {
    return (
        <div className="page-sobre">
            <Navbar link={1}/>
            <Banner />
            <Secao titulo="O que é o Ecoswim?" fundo="#ffffff">

            </Secao>
            <Secao titulo="Quem somos" fundo="#DCE0EC">
                <Wetrats />
            </Secao>
            <Secao titulo="Parceiros" fundo="#ffffff" subtitulo="Confira abaixo alguns de nossos parceiros">
                <Ipe />
            </Secao>
            <Secao titulo="Contato" subtitulo="Mande uma mensagem pra gente!" fundo="#DCE0EC">
                <Contato />
            </Secao>
            <Footer />
        </div>
    );
}

export default Sobre;