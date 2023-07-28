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
    component: () => import("../views/HomeVecinoView.vue"),
    meta: { requiresAuth: true },
  },
  {
    //SectorTitle se pasa unicamente como prop para header de la vista
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
    path: "/pago/:idTramite",
    name: "pago",
    component: () => import("@/views/PruebaView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/pago-resultado",
    name: "pago-resultado",
    component: () => import("@/views/PagoVista/pagoResultadoView.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/formulario/:categoriaId/:formularioTitle/:formularioId",
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
    path: "/crear-cuenta",
    name: "createUser",
    component: () => import("@/views/CreateUserOfi/CuentaUsuarioView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/auth/reset-password/:token",
    name: "reset-password",
    component: () => import("@/views/ResetView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/municipales",
    name: "municipales",
    component: () => import("@/views/MuniView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/municipales/creacion-usuario",
    name: "createUserMuni",
    component: () => import("@/views/CreateUser/CreateUserMuniView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/municipales/pagos",
    name: "municipales-pagos",
    component: () => import("@/views/MuniPayments/MuniPaymentsView.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/municipales/assign-password",
    name: "asign-password",
    component: () => import("@/views/AsignarPassword/AsignarPasswordView.vue"),
    meta: { requiresAuth: false },
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
