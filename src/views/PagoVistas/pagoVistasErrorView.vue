<template>
  <Div class="container">
    <h1>Su pago no se pudo procesar! <br /></h1>
    <h5>Gracias por utilizar la oficina virtual de Sacanta</h5>
    <img src="@/assets/logoSacanta.svg" alt="Sacanta" class="imagenlogo" />
    <router-link :to="`/munienlinea`" class="bn3"> Inicio </router-link>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.bn3 {
  height: 3rem;
  width: 11rem;
  border: 0.16em solid rgb(255, 255, 255);
  text-align: center;
  background-image: linear-gradient(
    to right,
    #399943,
    #4ea242,
    #62aa40,
    #75b23f,
    #88ba3e
  );
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding-top: 0.8rem;
  margin-top: 1rem;
  transition: all 0.2s;
  border-style: none;
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
