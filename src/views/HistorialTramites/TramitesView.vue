<template>
  <main v-if="setPermission" class="sector-container">
    <!-- <div class="row">
      <h1 style="margin-top: 7vh; font-size: 50px">Mis trámites</h1>
    </div> -->
    <h1 class="tituloPrincipal">
      Presentadas
      <h4 style="color: #4b4a49; font-weight: 100">
        Gestiones presentadas hasta la fecha.
      </h4>
    </h1>
    <Tabla color="var(--green)" />
  </main>
</template>

<script>
import Tabla from "@/components/Tramites/TablaComponent.vue";
export default {
  name: "TramitesView",
  components: {
    Tabla,
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
@media (max-width: 800px) {
  .tituloPrincipal {
    font-weight: 700;
    font-size: 30px;
  }
}
</style>
