<template>
  <NavTopVue
    v-if="
      this.role != 'MUNI_ROLE' &&
      // this.role != undefined &&
      // this.role != null &&
      this.setPermission
    "
  />
  <component :is="children"></component>
</template>
<script>
// import NavComponent from "@/components/MuniEnLinea/NavComponent.vue";
import NavTopVue from "@/components/MuniEnLinea/NavTop.vue";
// import FooterComponentVue from "@/components/Footer/FooterComponent.vue";
export default {
  name: "LayoutComponent",
  data() {
    return {
      role: "",
      cuil: "",
      ancho: "",
      margin: "",
      posision: "",
      derecha: "",
    };
  },
  components: {
    //  NavComponent,
    NavTopVue,
    // FooterComponentVue,
  },
  watch: {
    $route() {
      this.role = localStorage.getItem("role");
    },
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
