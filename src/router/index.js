import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
  },
  {
    path: "/login",
    name: "login", //para usar el router link sin modificar la ruta web
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
  },
  {
    path: "/munienlinea",
    name: "munienlinea",
    component: () => import("../views/MuniEnLineaView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/sector/:sectorTitle/:sectorId",
    name: "sector",
    component: () => import("../views/ProcesoTramite/SectorView.vue"),

    meta: { requiresAuth: true },
  },
  {
    path: "/tramites",
    name: "tramites",
    component: () => import("@/views/HistorialTramites/TramitesView.vue"),
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
    meta: { requiresAuth: true },
  },
  {
    path: "/muni",
    name: "muni",
    component: () => import("@/views/MuniView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/formulario/:formularioTitle/:formularioId",
    name: "formulario",
    component: () => import("@/views/ProcesoTramite/FormularioView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/micuenta",
    name: "micuenta",
    component: () => import("@/views/CuentaView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/comunicaciones",
    name: "comunicaciones",
    component: () => import("@/views/comunicacionesView.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  let actual = localStorage.getItem("token");

  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (actual != null) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
