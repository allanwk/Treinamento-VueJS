<template>
  <form @submit.prevent="criarAluno">
    <h4>Cadastro de aluno</h4>
    <label for="nomeAluno">Nome</label>
    <input type="text" id="nomeAluno" v-model="aluno.nome" />
    <button type="submit">Criar aluno</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      aluno: { nome: null, provas: [] },
    };
  },
  methods: {
    criarAluno() {
      this.$store.dispatch("createAluno", this.aluno).then(() => {
        this.$router.push({ name: "listaAlunos" });
      });
    },
  },
};
</script>

<style></style>
