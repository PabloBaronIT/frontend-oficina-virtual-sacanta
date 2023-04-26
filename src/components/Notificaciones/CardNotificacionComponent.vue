<template>
  <main class="flex-container">
    <div class="top">
      <p>Tienes un mensaje</p>
    </div>
    <p class="descripcion">
      {{ dato.description }}
    </p>
  </main>
</template>
<script>
export default {
  name: "CardNotificacionesComponent",
  props: {
    dato: Object,
  },
};
</script>
<style scoped>
.flex-container {
  width: 50%;
  height: auto;
  margin-top: 2rem;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  font-weight: bold;
  box-shadow: 5px 5px 12px #444;
  text-align: left;
}
.top {
  background: #0575e6; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #0575e6,
    #021b79
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #0575e6,
    #021b79
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  width: 100%;
  color: white;
  padding: 2px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding-top: 5px;
  text-align: center;
}
.descripcion {
  padding: 1rem;
}
</style>
