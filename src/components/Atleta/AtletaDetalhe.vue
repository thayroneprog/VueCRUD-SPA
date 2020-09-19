<template>
  <div>
      <titulo :texto="`Atleta: ${atleta.nome}`" :btnVoltar="!visualizando">
      <button v-show="visualizando" class="btn btnEditar" @click="editar()">Editar</button>
      </titulo>
      <table>
          <tbody>
              <tr>
                  <td class="colPequeno">Cod:</td>
                  <td>
                      <label>{{atleta.id}}</label>
                  </td>
              </tr>
              <tr>
                  <td class="colPequeno">Nome:</td>
                  <td>
                      <label v-if="visualizando">{{atleta.nome}}</label>
                      <input v-else v-model="atleta.nome" type="text" />
                  </td>
              </tr>
              <tr>
                  <td class="colPequeno">Sobrenome:</td>
                  <td>
                      <label v-if="visualizando">{{atleta.sobrenome}}</label>
                      <input v-else v-model="atleta.sobrenome" type="text" />
                  </td>
              </tr>
              <tr>
                  <td class="colPequeno">Data Nasc:</td>
                  <td>
                      <label v-if="visualizando">{{atleta.dataNascimento}}</label>
                      <input v-else v-model="atleta.dataNascimento" type="text" />
                  </td>
              </tr>
              <tr>
                  <td class="colPequeno">Posição:</td>
                  <td>
                      <label v-if="visualizando">{{atleta.posicao.nome}}</label>
                      <select v-else v-model="atleta.posicao">
                        <option v-for="(posicao, index) in posicoes" :key="index" v-bind:value="posicao">
                            {{posicao.nome}}
                        </option>
                      </select>
                  </td>
              </tr>
          </tbody>
      </table>
      <div style="margin-top: 10px;">
          <div v-if="!visualizando">
              <button class="btn btnSalvar" @click="salvar()">Salvar</button>
              <button class="btn btnCancelar" @click="cancelar()">Cancelar</button>
          </div>
      </div>  
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
            posicoes: [],
            atleta:{},
            id: this.$route.params.id,
            visualizando: true
        };
    },
    created(){
        this.$http.get("http://localhost:3000/atletas/" + this.id).then(res => res.json()).then(atleta => this.atleta = atleta);
        this.getPosicoes();
    },
    methods:{
        getPosicoes(){
          this.$http.get('http://localhost:3000/posicoes').then(res => res.json()).then(posicao => {this.posicoes = posicao;});
        },
        editar(){
            this.visualizando = !this.visualizando;
        },
        salvar(){
            let _atletaEditar = {
                id: this.atleta.id,
                nome: this.atleta.nome,
                sobrenome: this.atleta.sobrenome,
                dataNascimento: this.atleta.dataNascimento,
                posicao: this.atleta.posicao
            }
            this.$http.put(`http://localhost:3000/atletas/${_atletaEditar.id}`, _atletaEditar);
            this.visualizando = !this.visualizando;
        },
        cancelar(){
            this.visualizando = !this.visualizando;
        }
    }
};
</script>

<style lang="scss" scoped>
.colPequeno{
    width: 20%;
    text-align: right;
    background-color: rgb(125, 217, 245);
    font-weight: bold;
}
input,select{
    margin: 0%;
    padding: 5px 10px;
    font-size: 0.9em;
    border-radius: 5px;
    border: 1px silver;
    width: 95%;
    background: rgb(245, 245, 245);
}
select{
    height: 38px;
    width: 100%;
}
.btnEditar{
    float: right;
    background-color: rgb(76, 186, 249);;
}
.btnSalvar{
    float: right;
    background-color: rgb(0, 107, 168);;
}
.btnCancelar{
    float: left;
    background-color: rgb(255, 238, 0);;
}
</style>