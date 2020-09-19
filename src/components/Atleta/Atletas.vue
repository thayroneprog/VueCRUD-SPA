<template>
  <div>  
    <titulo :texto="posicao.id != undefined ? 'Posição:' + posicao.nome: 'Todos os Atletas'"/>
    <div v-if="posicao.id != undefined">
      <input type="text" placeholder="Nome do Atleta" v-model="nome" @v-on:keyup.enter="addAtleta()">
      <b-button class="btnInput" @click="addAtleta()">Adicionar</b-button>
    </div>
    <table>
      <thead>
        <th>Código</th>
        <th>Nome</th>
        <th>Opções</th>
      </thead>
      <tbody v-if="atletas.length">
        <tr v-for="(atleta, index) in atletas" :key="index">
          <td>{{atleta.id}}</td>
          <router-link :to="`/atletaDetalhe/${atleta.id}`" tag="td">
            {{atleta.nome}} {{atleta.sobrenome}}
          </router-link>
          <td><b-button @click="removeAtleta(atleta)">Remover</b-button></td>
        </tr>
      </tbody>
      <tfoot v-else>
        Nenhum Atleta encontrado!
      </tfoot>
    </table> 
  </div>
</template>

<script>
import Titulo from '../_share/Titulo';
export default {
  components:{
    Titulo
  },
  data(){
    return{
      titulo: 'Atleta',
      posicaoId: this.$route.params.posicao_id,
      nome: '',
      atletas: [],
      posicao:{       
      }
    }
  },
  created(){
    if(this.posicaoId){
      this.getPosicoes();
      this.$http.get("http://localhost:3000/atletas?posicao.id=" + this.posicaoId).then(res => res.json()).then(atletas => this.atletas = atletas);
    }
    else{
      this.$http.get('http://localhost:3000/atletas').then(res => res.json()).then(atletas => this.atletas = atletas);
    }
    
  },
  props: {
  },
  methods: {
    addAtleta() {
      let _atleta = {
        nome: this.nome,
        sobrenome: "",
        posicao:{
          id: this.posicao.id,
          nome: this.posicao.nome
        }
      }
      this.$http
      .post('http://localhost:3000/atletas', _atleta)
      .then(res => res.json())
      .then(atletaRetornado =>{
        this.atletas.push(atletaRetornado);
        this.nome = '';
      })
    },

    removeAtleta(atleta){
      this.$http
      .delete(`http://localhost:3000/atletas/${atleta.id}`)
      .then(() => {
        let indice = this.atletas.indexOf(atleta);
        this.atletas.splice(indice, 1);
      })
      
    },

    getPosicoes(){
      this.$http.get('http://localhost:3000/posicoes/' + this.posicaoId).then(res => res.json()).then(posicao => {
        this.posicao = posicao;
      });
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  input{
    width: calc(100% - 100px);
    border: 0;
    padding: 10px;
    font-size: 1.3em;
    
  }
  .btnInput{
    display: inline;
    width: 100px;
    border: 0px;
    padding: 10px;
  }

</style>
