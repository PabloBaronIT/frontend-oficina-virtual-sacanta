<template>
  <div>
    <section>
      <h1>Crear cuenta</h1>
      <RegisterComponentVue />
    </section>
  </div>
</template>
<script>
import RegisterComponentVue from "@/components/Login&Register/RegisterComponent.vue";
export default {
  name: "CuentaUsuario",
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
