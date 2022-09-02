<template>
  <form @submit.prevent="createProva">
    <h4>Cadastro de prova para o aluno {{ aluno.nome }}</h4>
    <label for="notaProva">Nota</label>
    <input type="text" id="notaProva" v-model.number="prova.nota" />
    <button type="submit">Cadastrar prova</button>
  </form>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      prova: { nota: null },
    };
  },
  props: ["id"],
  computed: mapState(["aluno"]),
  methods: {
    createProva() {
      this.$store
        .dispatch("createProva", {
          prova: this.prova,
          idAluno: this.id,
        })
        .then(() => {
          this.$router.push({ name: "infoAluno", params: { id: this.id } });
        });
    },
  },
};
</script>

<style></style>
