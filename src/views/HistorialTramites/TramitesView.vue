<template>
  <main v-if="setPermission">
    <div class="top">
      <h1>Mis trámites</h1>
    </div>
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
.top {
  text-align: left;
  margin-left: 3rem;
  margin-top: 2rem;
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
}
</style>
