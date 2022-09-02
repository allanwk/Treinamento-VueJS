import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    alunos: [],
    aluno: {},
  },
  mutations: {
    ADD_ALUNO(state, aluno) {
      state.alunos.push(aluno);
    },
    SET_ALUNOS(state, alunos) {
      state.alunos = alunos;
    },
    SET_ALUNO(state, aluno) {
      state.aluno = aluno;
    },
    CREATE_PROVA(state, { prova, aluno }) {
      aluno.provas.push(prova);
    },
  },
  actions: {
    createAluno({ commit }, aluno) {
      aluno.id = Math.floor(Math.random() * 100000);
      commit("ADD_ALUNO", aluno);
      return Promise.resolve();
    },
    fetchAlunos() {
      // const alunos = [
      //   { nome: "Allan", id: 0, provas: [] },
      //   { nome: "Joao", id: 1, provas: [] },
      // ];
      // commit("SET_ALUNOS", alunos);
    },
    fetchAluno({ commit, getters }, idAluno) {
      let aluno = getters.getAlunoById(idAluno);
      commit("SET_ALUNO", aluno);
    },
    createProva({ commit, getters }, { prova, idAluno }) {
      const aluno = getters.getAlunoById(idAluno);
      commit("CREATE_PROVA", { prova, aluno });
      return Promise.resolve();
    },
  },
  getters: {
    getAlunoById: (state) => (id) => {
      return state.alunos.find((aluno) => aluno.id === id);
    },
    estatitsticasProvas: (state, getters) => (id) => {
      const aluno = getters.getAlunoById(id);
      const soma = aluno.provas.reduce((acc, prova) => acc + prova.nota, 0);
      const media = soma / aluno.provas.length || 0;
      const notas = Array.from(aluno.provas, (prova) => prova.nota);
      let maxima, minima;
      if (notas.length > 0) {
        minima = Math.min(...notas);
        maxima = Math.max(...notas);
      } else {
        minima = 0;
        maxima = 0;
      }

      return {
        media,
        minima,
        maxima,
      };
    },
    maiorNota: (state) => {
      const maximaPorAluno = Array.from(state.alunos, (aluno) => {
        const notas = Array.from(aluno.provas, (prova) => prova.nota);
        const max = Math.max(...notas);
        if (max === Infinity || max === -Infinity) return 0;
        return max;
      });
      const max = Math.max(...maximaPorAluno);
      const indice = maximaPorAluno.indexOf(max);
      const aluno = state.alunos[indice];
      console.log(max, indice, aluno);
      return {
        nota: max,
        aluno,
      };
    },
  },
  modules: {},
});
