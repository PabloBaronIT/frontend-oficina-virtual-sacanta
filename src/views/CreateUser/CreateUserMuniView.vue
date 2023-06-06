<template>
  <section>
    <h1>Creación de Usuario</h1>
    <RegisterComponentVue />
  </section>
</template>

<script>
import RegisterComponentVue from "@/components/Login&Register/RegisterComponent.vue";
export default {
  name: "CreateUserMuniView",
  components: {
    RegisterComponentVue,
  },
};
</script>
<style scoped>
section {
  width: 100vw;
  height: 100vh;

  padding-top: 2rem;
}
</style>
