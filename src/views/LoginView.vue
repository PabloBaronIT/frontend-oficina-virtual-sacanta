<template>
  <div class="form-container">
    <div>
      <h2>Municipalidad de Campo Bravo</h2>

      <LoginComponent />
    </div>
  </div>
</template>

<script>
import LoginComponent from "@/components/Login&Register/LoginComponent.vue";

export default {
  name: "LoginView",
  components: {
    LoginComponent,
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
