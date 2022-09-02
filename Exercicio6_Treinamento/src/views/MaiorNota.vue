<template>
  <div>
    <h1>Maior nota</h1>
    <p>{{ maiorNota.nota }} do usuario {{ maiorNota.aluno.nome }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: mapGetters(["maiorNota"]),
};
</script>

<style></style>
