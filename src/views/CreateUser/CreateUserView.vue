<template>
  <section>
    <RegisterComponentVue />
  </section>
</template>

<script>
import RegisterComponentVue from "../../components/Login&Register/RegisterComponent.vue";
export default {
  name: "CreateUserView",
  components: {
    RegisterComponentVue,
  },
};
</script>
<style scoped>
section {
  border-radius: 10px;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  padding-top: 2rem;
}
</style>
