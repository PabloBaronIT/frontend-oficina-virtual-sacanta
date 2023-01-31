<template>
  <div class="form-container">
    <div>
      <h2>Municipalidad de Campo Bravo</h2>
      <LoginComponent />
      <LoginMunicipal />
    </div>
  </div>
</template>

<script>
import LoginComponent from "@/components/Login&Register/LoginComponent.vue";
import LoginMunicipal from "@/components/Login&Register/LoginMunicipal.vue";

export default {
  name: "LoginView",
  components: {
    LoginComponent,
    LoginMunicipal,
  },
  created() {
    localStorage.clear();
  },
};
</script>

<style scoped>
.form-container {
  width: 100vw;
  margin-left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
