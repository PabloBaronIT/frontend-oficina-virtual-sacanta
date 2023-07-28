<template>
  <div class="navMuni">
    <h3>Hola! {{ name }} {{ lastName }}</h3>
    <button type="button" class="btn btn-light" @click="logOf()">
      Cerrar sesión
    </button>
    <router-link to="/municipales/creacion-usuario">
      <button type="button" class="btn btn-light">Crear Usuarios</button>
    </router-link>
    <router-link to="/municipales/pagos">
      <button type="button" class="btn btn-light">Registro de pagos</button>
    </router-link>
  </div>
</template>
<script>
export default {
  name: "NavMunicipalesComponet",
  data() {
    return {
      token: localStorage.getItem("token"),
      name: localStorage.getItem("name"),
      lastName: localStorage.getItem("lastname"),
    };
  },
  methods: {
    refresh() {
      location.reload();
    },
    logOf() {
      localStorage.clear();
      location.reload();
      this.$router.push("login");
      window.dispatchEvent(
        new CustomEvent("token-localstorage-changed", {
          detail: {
            storage: localStorage.getItem("token"),
          },
        })
      );
    },
  },
};
</script>

<style scoped>
.navMuni {
  width: 100%;
  height: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-top: 1rem;
}
</style>
