<template>
  <div class="sector-container" v-if="setPermission">
    <Sector />
  </div>
</template>

<script>
import Sector from "../../components/MuniEnLinea/SectorComponent.vue";

export default {
  name: "SectorView",
  components: {
    Sector,
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
.sector-container {
  width: 100%;
  height: 100vh;

  display: flex;
  background: var(--grey-bk);
  /* border-top-left-radius: 30px;
  border-bottom-left-radius: 30px; */
  padding: 3vw;
}
</style>
