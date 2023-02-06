<template>
  <article>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link est" aria-current="page">Ver estadisticas</a>
            </li>

            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Herramientas
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item">Registrar usuario</a></li>
                <li><a class="dropdown-item" href="#">Gestionar cuenta</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="dropdown-item" href="#">Cerrar Sesion</a>
                </li>
              </ul>
            </li>

            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Perfil
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Alguna accion</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="dropdown-item" @click="logOf()">Cerrar Sesion</a>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link pointer" @click="refresh()">Refrescar</a>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Nombre del tramite"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Buscar
            </button>
          </form>
        </div>
      </div>
    </nav>
    <ModalGraficoComponent />
    <Tabla />
    <hr />
    <div class="article-container">
      <RegisterComponent />
      <BarComponent class="ms-5" />
    </div>
  </article>
</template>

<script>
import Tabla from "@/components/Municipal/TablaComponent.vue";
import RegisterComponent from "@/components/Login&Register/RegisterComponent.vue";
import ModalGraficoComponent from "@/components/Municipal/ModalGraficoComponent.vue";
// import GraficoComponent from "@/components/Municipal/GraficoComponent.vue";
import BarComponent from "@/components/Municipal/BarComponent.vue";

export default {
  name: "MuniView",
  components: {
    ModalGraficoComponent,
    RegisterComponent,
    Tabla,
    // GraficoComponent,
    BarComponent,
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
.pointer {
  cursor: pointer;
}

.est {
  color: var(--red);
}

.options {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

article {
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  background: rgb(235, 235, 235);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  padding: 30px;
  justify-content: center;
  align-items: center;
}

.article-container {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
}
</style>
