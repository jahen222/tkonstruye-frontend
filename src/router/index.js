import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import FindWork from "../views/FindWork.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/find-work",
    name: "FindWork",
    component: FindWork,
    meta: {
      requiresAuth: true,
    },
  }
];

const router = new VueRouter({
  linkActiveClass: "active",
  routes,
  mode: "history",
});

export default router;
