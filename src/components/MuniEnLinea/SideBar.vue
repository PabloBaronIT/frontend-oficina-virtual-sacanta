<template>
  <button
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasScrolling"
    aria-controls="offcanvasScrolling"
  >
    <img class="svg" src="@/assets/menu.svg" alt="" />
  </button>

  <div
    class="offcanvas offcanvas-start"
    daa-bs-scroll="true"
    data-bs-backdrop="false"
    tabindex="-1"
    id="offcanvasScrolling"
    aria-labelledby="offcanvasScrollingLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasScrollingLabel">
        <img
          class="logo"
          src="https://github.com/PabloBaronIT/frontend-oficina-virtual/blob/main/src/assets/muni-en-linea-logo.png?raw=true"
          alt="Logo"
        />
      </h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      >
        <img class="svg" src="@/assets/close.svg" alt="" />
      </button>
    </div>
    <div class="offcanvas-body body-container">
      <div class="usuario">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="86"
          height="86"
          fill="currentColor"
          class="bi bi-person-circle scale-up-center"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path
            fill-rule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
          />
        </svg>
        <div class="usuario-details">
          <div class="datos">
            <router-link :to="`/micuenta`"> Mi cuenta </router-link>
            <router-link :to="`/comunicaciones`">
              <a href="">
                <img
                  class="svg"
                  src="@/assets/comunicacion.svg"
                  alt="comunicaciones"
                />
              </a>
            </router-link>
          </div>
          <strong>
            {{ this.usuario }},<br />
            {{ this.apellido }}<br />
          </strong>
          <p>CUIL: {{ this.dni }}</p>
        </div>
      </div>
      <router-link :to="`/munienlinea`" class="bn3"> Inicio </router-link>
      <router-link :to="`/tramites`" class="bn3"> Mis tramites </router-link>
      <!-- <router-link
        :to="`/auth/reset-password/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjc2NTc5MjM4LCJleHAiOjE2NzY1ODAxMzh9.sWwDOv_FoM8ruehI3NIcYgeyFzYCSe4aJWOe_8c3dx0`"
        class="bn3"
      >
        Mis tramites
      </router-link> -->

      <input @click="logOf" class="bn3" type="button" value="Cerrar Sesion" />
    </div>
  </div>

  <div
    class="offcanvas offcanvas-start"
    data-bs-scroll="true"
    data-bs-backdrop="false"
    tabindex="-1"
    aria-labelledby="offcanvasScrollingLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvas">
        Offcanvas with body scrolling
      </h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
  </div>
</template>
<script>
export default {
  name: "SideBar",
  data() {
    return {
      ruta: this.$router.currentRoute.value.fullPath,
      usuario: localStorage.getItem("name"),
      apellido: localStorage.getItem("lastname"),
      dni: localStorage.getItem("cuil"),
      permission: true,
      user_id: localStorage.getItem("id"),
      role: localStorage.getItem("role"),
    };
  },
  created() {
    this.role = localStorage.getItem("role");
  },
  watch: {},

  methods: {
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
.body-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
}
.bn3 {
  background: var(--blue);
  display: inline-block;
  padding: 5px;
  margin: 8px 5px;
  border: 0.16em solid rgb(255, 255, 255);
  border-radius: 2em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  color: #2d2d2d;
  text-align: center;
  transition: all 0.2s;
  width: 100%;
}

.logo {
  max-width: 100px;
}

.svg {
  max-width: 30px;
}

button {
  border: none;
  background: none;
  display: none;
}

.svg:hover {
  max-width: 45px;
}

@media (max-width: 1000px) {
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin: 10px;
  }
}
</style>
