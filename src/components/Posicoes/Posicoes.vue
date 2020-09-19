<template>
    <div>
        <titulo texto="Posições"/>
        <table>
      <thead>
        <th>Código</th>
        <th>Nome</th>
        <th>Atletas</th>
      </thead>
      <tbody v-if="Posicoes.length">
        <tr v-for="(posicao, index) in Posicoes" :key="index">
          <td>{{posicao.id}}</td>
            <router-link :to="'/atletas/' + posicao.id" tag="td" style="cursor: pointer">
              {{posicao.nome}} {{posicao.sobrenome}}
            </router-link>
          <td>{{posicao.qtdAtletas}}</td>
        </tr>
      </tbody>
      <tfoot v-else>
        Nenhum Atleta encontrado!
      </tfoot>
    </table> 
    </div>
</template>

<script>
import Titulo from '../_share/Titulo'
    export default {
      components:{
        Titulo
      },
      data(){
        return{
          Posicoes:[],
          Atletas:[]        
        }
      },
      created(){
        this.getAtletas();
      },
      props:{

      },
      methods:{ 
        getQtdAtletaPosicao(){
          this.Posicoes.forEach((posicao, index) =>{
            posicao = {
              id: posicao.id,
              nome: posicao.nome,
              qtdAtletas: this.Atletas.filter(atletas => atletas.posicao.id == posicao.id).length
            },
            this.Posicoes[index] = posicao;
          });
        },
        getPosicoes(){
          this.$http.get('http://localhost:3000/posicoes').then(res => res.json()).then(posicao => {
            this.Posicoes = posicao;
            this.getQtdAtletaPosicao();
          });
        },
        getAtletas(){
          this.$http.get('http://localhost:3000/atletas').then(res => res.json()).then(atletas => {
            this.Atletas = atletas;
            this.getPosicoes();
          });
        }
      }  
    }
</script>

<style lang="scss" scoped>

</style>