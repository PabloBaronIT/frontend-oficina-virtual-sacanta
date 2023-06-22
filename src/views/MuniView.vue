<template>
  <article>
    <div class="navMuni">
      <h3>Hola! {{ name }} {{ lastName }}</h3>
      <button type="button" class="btn btn-light" @click="logOf()">
        Cerrar sesión
      </button>
      <router-link to="/muni/creacion-usuario">
        <button type="button" class="btn btn-light">Crear Usuarios</button>
      </router-link>
    </div>

    <ModalGraficoComponent v-if="token" />

    <section>
      <Tabla />
    </section>

    <!--SECCION DE TAREAS-->
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
      <BarComponent class="ms-5" />
    </div>
  </article>
</template>

<script>
import Tabla from "@/components/Municipal/Tramites/TablaComponent.vue";
import ModalGraficoComponent from "@/components/Municipal/Tramites/ModalGraficoComponent.vue";
// import GraficoComponent from "@/components/Municipal/GraficoComponent.vue";
import BarComponent from "@/components/Municipal/Tramites/BarComponent.vue";
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
a {
  text-decoration: none;
  color: var(--text);
  background: var(--white);
  border-radius: 10px;
}
h3 {
  color: red;
}
.navMuni {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-top: 1rem;
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
