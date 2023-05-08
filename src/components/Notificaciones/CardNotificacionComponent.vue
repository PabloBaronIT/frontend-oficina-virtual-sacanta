<template>
  <main class="flex-container">
    <div class="top">
      <p>Tenés un mensaje</p>
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
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  font-weight: bold;
  box-shadow: 5px 5px 12px #444;
  text-align: left;
  margin: auto;
  margin-top: 1rem;
}
.top {
  background-image: linear-gradient(
    to right,
    #399943,
    #4ea242,
    #62aa40,
    #75b23f,
    #88ba3e
  );
  width: 100%;
  color: white;
  padding-left: 2rem;
  height: 3rem;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding-top: 0.5rem;
  text-align: left;
}
.descripcion {
  padding: 1rem;
}
</style>
