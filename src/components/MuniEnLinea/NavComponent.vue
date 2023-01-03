<template>
  <!-- Sidebar -->
  <div class="nav-container">
    <router-link to="/munienlinea">
      <img class="logo" src="@/assets/muni-en-linea-logo.png" alt="" />
    </router-link>

    <div class="usuario">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="86"
        height="86"
        fill="currentColor"
        class="bi bi-person-circle"
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
          <a href="">Mi cuenta</a>
          <a href="">
            <img
              class="svg"
              src="@/assets/comunicacion.svg"
              alt="comunicaciones"
            />
          </a>
        </div>
        <strong>
          {{ this.usuario }},<br />
          {{ this.apellido }}<br />
        </strong>
        <p>DNI: {{ this.dni }}</p>
      </div>
    </div>

    <nav id="sidebarMenu" class="btn-container">
      <router-link v-show="permission" :to="`/munienlinea`" class="bn3">
        Inicio
      </router-link>
      <router-link v-show="permission" :to="`/tramites`" class="bn3">
        Mis tramites
      </router-link>
      <router-link v-show="permission" :to="`/prueba`" class="bn3">
        Comprobantes
      </router-link>
      <router-link v-show="permission" :to="`/notificaciones`" class="bn3">
        Domicilio fiscal electronico
      </router-link>
      <router-link v-show="permission" :to="`/muni`" class="bn3">
        Back
      </router-link>
      <input
        @click="log"
        class="bn3"
        type="button"
        value="Representados"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      />

      <div class="modal">
        <div class="inside-modal">
          <ul>
            <li>holasd</li>
            <li>holasd</li>
            <li>holasd</li>
            <li>holasd</li>
            <li>holasd</li>
          </ul>
        </div>
      </div>

      <input @click="logOf" class="bn3" type="button" value="Cerrar Sesion" />
    </nav>

    <!-- <div
      class="z10 modal fade"
      id="exampleModal"
      tabindex="1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">opciones opciones opciones opciones</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "NavComponent",
  data() {
    return {
      ruta: this.$router.currentRoute.value.fullPath,
      usuario: localStorage.getItem("name"),
      apellido: localStorage.getItem("lastname"),
      dni: localStorage.getItem("cuil"),
      permission: true,
    };
  },
  methods: {
    log() {
      console.log(localStorage.getItem("token"));
    },
    logOf() {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("lastname");
      localStorage.removeItem("cuil");
    },
  },
};
</script>

<style scoped>
.svg {
  max-width: 25px;
  margin-left: 10px;
  animation-name: comunicacion;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}

@keyframes comunicacion {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(10deg);
  }
  50% {
    transform: rotate(-10deg);
  }
}

nav {
  padding: 15px;
}

nav a {
  font-weight: bold;
  color: var(--text-color);
}

.nav-container {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  width: 300px;
  padding: 0;
  height: 90vh;
}

.bn3:first-child {
  background-color: var(--red);
}

.bn3 {
  background: var(--blue);
  display: inline-block;
  padding: 5px;
  margin: 0 0.1em 0.1em 0;
  border: 0.16em solid rgb(255, 255, 255);
  border-radius: 2em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  color: #000;
  text-shadow: 0 0.04em 0.04em rgba(255, 255, 255, 0.253);
  text-align: center;
  transition: all 0.2s;
  width: 100%;
}

.bn3:hover {
  background-color: rgb(63, 119, 192);
}

.bn3:focus {
  background-color: rgb(63, 119, 192);
}

/* CSS */
a {
  text-decoration: none;
}
.usuario {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: left;
  width: 300px;
}

.logo {
  width: 70%;
  margin: 10% 0;
}

.usuario-img {
  width: 80px;
}

.usuario-details {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-flow: column wrap;
  padding-left: 20px;
  text-align: left;
}

/* CSS */
.nav-btn {
  background-color: #e1ecf4;
  border-radius: 3px;
  border: 1px solid #7aa7c7;
  box-shadow: rgba(255, 255, 255, 0.7) 0 1px 0 0 inset;
  color: #39739d;
  cursor: pointer;
  outline: none;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 15px;
  text-align: center;
  text-decoration: none;
  user-select: none;
}

.nav-btn:hover,
.nav-btn:focus {
  background-color: var(--yellow);
  color: #2c5777;
}

.nav-btn:focus {
  box-shadow: 0 0 0 4px rgba(0, 149, 255, 0.15);
}

.nav-btn:active {
  background-color: #a0c7e4;
  box-shadow: none;
  color: #2c5777;
}

@media (max-width: 800px) {
  .nav-container {
    display: none;
  }
}
</style>
