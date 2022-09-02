<template>
  <div v-if="aluno" class="aluno-info">
    <h3>{{ aluno.nome }}</h3>
    <p>Média: {{ estatisticas.media }}</p>
    <p>Maior nota: {{ estatisticas.maxima }}</p>
    <p>Menor nota: {{ estatisticas.minima }}</p>
    <p>Provas realizadas: {{ aluno.provas.length }}</p>
    <router-link :to="{ name: 'criarProva', params: { id: aluno.id } }"
      >Cadastrar prova para este aluno</router-link
    >
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["id"],
  computed: {
    ...mapState(["aluno"]),
    estatisticas() {
      return this.$store.getters.estatitsticasProvas(this.id);
    },
  },
  created() {
    this.fetchAluno(this.id);
  },
  methods: mapActions(["fetchAluno"]),
};
</script>

<style></style>
