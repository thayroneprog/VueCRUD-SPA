import Vue from 'vue';
import Router from 'vue-router';
import Atletas from './components/Atleta/Atletas'
import AtletaDetalhe from './components/Atleta/AtletaDetalhe'
import Posicao from './components/Posicoes/Posicoes'
import Sobre from './components/Sobre/Sobre'

Vue.use(Router);

export default new Router({
    routes:[
        {
            path: '/posicoes',
            nome: 'Posicoes',
            component: Posicao
        },
        {
            path: '/atletas/:posicao_id',
            nome: 'Atletas',
            component: Atletas
        },
        {
            path: '/atletas',
            nome: 'Atletas',
            component: Atletas
        },
        {
            path: '/atletaDetalhe/:id',
            nome: 'AtletaDetalhe',
            component: AtletaDetalhe
        },
        {
            path: '/sobre',
            nome: 'Sobre',
            component: Sobre
        }
        
    ]
})