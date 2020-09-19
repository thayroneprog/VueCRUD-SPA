<template>
  <div id="app">
    <Nav></Nav>
    <div class="marginPrincipal">
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import Atletas from './components/Atleta/Atletas'
import Posicao from './components/Posicoes/Posicoes'
import Sobre from './components/Sobre/Sobre'
import Nav from './components/_nav/Nav.vue'

export default {
  name: 'App',
  components: {
    Atletas,
    Posicao,
    Sobre,
    Nav,
  },
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,700");

.marginPrincipal{
  width: 50%;
  margin: auto;
}

#app{
  width: 100%;
}

body{
  background-color: #eee;
  font-family: "Montserrat", sans-serif;
  display: grid;
  justify-items: center;
}
body, html {
  margin: 0;
  height: 100%;
}
table {
  margin: 0px;
  padding: 0px;
  list-style-type: none;
  width: 100%;
}
table tr td{
  padding: 20px;
  font-size: 1.3em;
  background-color: #e0edf4;
  margin-bottom: 2px;
  color: #3e5252;
}
table thead th{
  background-color: rgb(184, 208, 216) !important;
  font-size: 1.2em;
  padding: 10px 0px;
  text-align: center !important;
}
.colPequeno {
  width: 5%;
}
</style>
