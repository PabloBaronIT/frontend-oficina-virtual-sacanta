<template>
  <div class="form-container">
    <div>
      <!-- <LoginComponent /> -->
      <LoginMunicipal />
    </div>
  </div>
</template>

<script>
// import LoginComponent from "@/components/Login&Register/LoginComponent.vue";
import LoginMunicipal from "@/components/Login&Register/LoginMunicipal.vue";

export default {
  name: "LoginView",
  components: {
    // LoginComponent,
    LoginMunicipal,
  },
  created() {
    localStorage.clear();

    window.dispatchEvent(
      new CustomEvent("token-localstorage-changed", {
        detail: {
          storage: localStorage.getItem("token"),
        },
      })
    );
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
