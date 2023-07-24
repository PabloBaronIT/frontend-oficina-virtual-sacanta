<template>
  <Div class="container">
    <h1>Su pago no se pudo procesar! <br /></h1>
    <h5>Gracias por utilizar la oficina virtual de Sacanta</h5>
    <img src="@/assets/logoSacanta.svg" alt="Sacanta" class="imagenlogo" />
  </Div>
</template>

<script>
export default {
  name: "Pago-exitoso",
};
</script>

<style scoped>
.container {
  padding-top: 10rem;
}
h1 {
  color: red;
}

.imagenlogo {
  width: 100px;
  height: 120px;
  margin-top: 2rem;
}
</style>
