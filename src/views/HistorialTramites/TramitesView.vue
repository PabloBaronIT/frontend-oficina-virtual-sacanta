<template>
  <main v-if="setPermission && !this.loading" class="sector-container">
    <h1 class="tituloPrincipal">
      Presentadas
      <h4 style="color: #4b4a49; font-weight: 100">
        Gestiones presentadas hasta la fecha.
      </h4>
    </h1>
    <Tabla :setLoading="this.setLoading" />
  </main>
  <div class="prueba-container l" v-else>
    <div class="spinner-grow text-success" role="status">
      <span class="sr-only"></span>
    </div>
    <div class="spinner-grow text-success" role="status">
      <span class="sr-only"></span>
    </div>
    <div class="spinner-grow text-success" role="status">
      <span class="sr-only"></span>
    </div>
  </div>
</template>

<script>
import Tabla from "@/components/Tramites/TablaComponent.vue";
export default {
  name: "TramitesView",
  components: {
    Tabla,
  },
  data() {
    return {
      loading: true,
    };
  },
  created() {
    // setTimeout(() => {
    this.loading = false;
    // }, 1000);
  },
  computed: {
    setPermission() {
      if (this.$store.state.loggedIn === true) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    setLoading() {
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.tituloPrincipal {
  color: #4b4a49;
  font-weight: 900;
  font-size: 50px;
  margin-top: 7vh;
  margin-left: 4vw;
}
.prueba-container {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 84vw;
  background-color: #f5f5f5;
}

.l {
  flex-direction: row;
}
/* h1 {
  margin-top: 4vh;
  margin-left: 4vw;
  margin-bottom: 4vh;
} */
.sector-container {
  width: 100%;
  height: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}
.menu {
  width: 100%;
  display: flex;
  justify-content: left;
  text-align: left;
}
h4 {
  width: 100%;
  text-align: left;
  color: var(--blue);
}

main {
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;

  flex-flow: column wrap;
  background: var(--grey-bk);
}

@media (max-width: 800px) {
  .main-container {
    width: 100%;
    height: auto;
  }
  .tituloPrincipal {
    font-weight: 700;
    font-size: 45px;
  }
}
@media (max-width: 600px) {
  .tituloPrincipal {
    font-weight: 700;
    font-size: 30px;
  }
}
</style>
