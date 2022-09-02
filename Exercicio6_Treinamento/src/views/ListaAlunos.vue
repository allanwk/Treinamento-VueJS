<template>
  <div>
    <aluno-card
      v-for="(aluno, indice) in alunos"
      :key="indice"
      :aluno="aluno"
    />
  </div>
</template>

<script>
import AlunoCard from "@/components/AlunoCard.vue";
import { mapState } from "vuex";

export default {
  components: {
    AlunoCard,
  },
  created() {
    this.$store.dispatch("fetchAlunos");
  },
  computed: mapState(["alunos"]),
};
</script>

<style></style>
