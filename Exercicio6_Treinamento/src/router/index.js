import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "listaAlunos",
    component: () => import("@/views/ListaAlunos.vue"),
  },
  {
    path: "/aluno/:id",
    name: "infoAluno",
    component: () => import("@/views/InfoAluno.vue"),
    props: true,
  },
  {
    path: "/aluno/criar",
    name: "criarAluno",
    component: () => import("@/views/CriarAluno.vue"),
  },
  {
    path: "/aluno/:id/criar_prova",
    name: "criarProva",
    component: () => import("@/views/CriarProva.vue"),
    props: true,
  },
  {
    path: "/maior_nota",
    name: "maiorNota",
    component: () => import("@/views/MaiorNota.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
