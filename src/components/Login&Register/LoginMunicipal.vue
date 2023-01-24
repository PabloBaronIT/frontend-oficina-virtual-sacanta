<template>
  <div class="login-container">
    <form action="">
      <h1>Login Municipal</h1>
      <FormKit
        type="text"
        name="Cuil"
        id="Cuil"
        label="Cuil"
        help="Your full name"
        placeholder="“Jon Doe”"
      />
      <FormKit
        type="text"
        name="password"
        id="password"
        label="Password"
        help="Your password"
        placeholder="********"
      />

      <input
        @click="login()"
        class="btn btn-primary"
        type="button"
        value="Ingresar"
      />
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      alert("Terminar funcion");
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  margin: 50px;
  justify-content: space-around;
  align-items: center;
}

form {
  box-shadow: 0px 0px 10px #333;
  display: flex;
  flex-flow: column wrap;
  padding: 120px 40px;
  position: relative;
  z-index: 1;
  background: #fff;
}
</style>
