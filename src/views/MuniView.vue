<template>
  <article>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand">OFICINA VIRTUAL</a>
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
              <a class="nav-link active" aria-current="page">Tamites</a>
            </li>
            <li class="nav-item">
              <a class="nav-link">Vecinos</a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Opciones
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item">Action</a></li>
                <li><a class="dropdown-item">Another action</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a @click="logOf()" class="dropdown-item">Cerrar sesión</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <h3 class="dropdown-item">Hola! {{ name }} {{ lastName }}</h3>
      <a @click="logOf()" class="dropdown-item" href="#">Cerrar sesión</a>
    </nav>

    <ModalGraficoComponent v-if="token" />

    <section><Tabla /></section>
    <section>
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home-tab-pane"
            type="button"
            role="tab"
            aria-controls="home-tab-pane"
            aria-selected="true"
          >
            Tareas por hacer
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile-tab-pane"
            type="button"
            role="tab"
            aria-controls="profile-tab-pane"
            aria-selected="false"
          >
            Tareas enviadas
          </button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="home-tab-pane"
          role="tabpanel"
          aria-labelledby="home-tab"
          tabindex="0"
        >
          <MyTasksComponentVue />
        </div>
        <div
          class="tab-pane fade"
          id="profile-tab-pane"
          role="tabpanel"
          aria-labelledby="profile-tab"
          tabindex="0"
        >
          <MySentTasksComponentVue />
        </div>
      </div>
    </section>

    <div class="section-container">
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
import MyTasksComponentVue from "@/components/Municipal/Tareas/MyTasksComponent.vue";
import MySentTasksComponentVue from "../components/Municipal/Tareas/MySentTasksComponent.vue";
export default {
  name: "MuniView",
  data() {
    return {
      token: localStorage.getItem("token"),
      name: localStorage.getItem("name"),
      lastName: localStorage.getItem("lastname"),
    };
  },
  components: {
    ModalGraficoComponent,
    RegisterComponent,
    Tabla,
    // GraficoComponent,
    BarComponent,
    MyTasksComponentVue,
    MySentTasksComponentVue,
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
h3 {
  color: red;
}
.section-container {
  width: 90%;
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
}

section {
  border-radius: 10px;
  width: 95%;
  margin-top: 3%;
  background: var(--white);
}

nav {
  width: 100%;
}

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
  justify-content: center;
  align-items: center;
}
</style>
