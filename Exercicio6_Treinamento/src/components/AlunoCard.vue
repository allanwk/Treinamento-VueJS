<template>
  <router-link
    class="aluno-link"
    :to="{ name: 'infoAluno', params: { id: aluno.id } }"
  >
    <div class="aluno-card -shadow">
      <h4>{{ aluno.nome }}</h4>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    aluno: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.aluno-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.aluno-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.aluno-card > .title {
  margin: 0;
}
.aluno-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>
