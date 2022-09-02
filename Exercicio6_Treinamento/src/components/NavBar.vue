<template>
  <div class="nav">
    <nav>
      <router-link :to="{ name: 'listaAlunos' }">Ver alunos</router-link> |
      <router-link :to="{ name: 'criarAluno' }">Novo aluno</router-link> |
      <router-link :to="{ name: 'maiorNota' }">Ver maior nota</router-link>
    </nav>
  </div>
</template>

<script>
export default {};
</script>
