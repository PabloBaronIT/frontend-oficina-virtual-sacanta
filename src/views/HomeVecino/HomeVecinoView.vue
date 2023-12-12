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
main {
  width: 82%;
  background-color: #f5f5f5;
  position: absolute;
  right: 0;
  padding-top: 10%;
  padding-bottom: 10%;
  /*  */
  padding-left: 4%;
  padding-right: 4%;
  /* z-index: 5; */
  /* height: auto; */
  /* top: 17%; */
}
/* @media (max-width: 1000px) {
  .main {
    height: auto;
  }
} */
</style>
