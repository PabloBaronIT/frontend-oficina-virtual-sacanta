import { createRouter, createWebHashHistory } from "vue-router";

import store from "@/store";

const routes = [
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
  },
  {
    path: "/login",
    name: "login", //para usar el router link sin modificar la ruta web
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/munienlinea",
    name: "munienlinea",
    component: () => import("../views/MuniEnLineaView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/sector/:sectorId",
    name: "sector",
    component: () => import("../views/SectorView.vue"),

    // children: [
    //   {
    //     path: "/munienlinea/:tramiteId",
    //     component: () =>
    //       import("@/components/Tramites/FormularioComponent.vue"),
    //   },
    // ],
    meta: { requiresAuth: true },
  },
  {
    path: "/tramites",
    name: "tramites",
    component: () => import("@/views/TramitesView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/notificaciones",
    name: "notificaciones",
    component: () => import("@/views/NotificacionesView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/prueba",
    name: "prueba",
    component: () => import("@/views/PruebaView.vue"),
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (!store.state.loggedIn) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
