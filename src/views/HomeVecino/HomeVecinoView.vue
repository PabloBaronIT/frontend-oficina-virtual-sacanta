<template>
  <main v-if="setPermission">
    <MainContainerComponent />
    <!-- <div v-else class="spinner-border loading" role="status">
      <span class="sr-only"></span>
    </div> -->
  </main>
</template>

<script>
import MainContainerComponent from "@/components/MuniEnLinea/MainContainerComponent.vue";

export default {
  name: "HomeVecinoView",
  components: {
    MainContainerComponent,
  },
  created() {
    // this.loading = true;
    // this.role = localStorage.getItem("role");
    // this.loading = false;
  },
  data() {
    return {
      // role: null,
      // loading: false,
    };
  },
  computed: {
    setPermission() {
      if (this.$store.state.user?.cuil) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
main {
  width: 100%;
  height: auto;
  background: var(--grey-bk);
}
/* @media (max-width: 1000px) {
  .main {
    height: auto;
  }
} */
</style>
