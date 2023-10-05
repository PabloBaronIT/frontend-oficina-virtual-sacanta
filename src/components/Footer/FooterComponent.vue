<template>
  <footer class="general">
    <div class="linea"></div>
    <h6 style="margin-right: 2rem; margin-top: 2rem">
      Municipalida de Sacanta - 25 de Mayo 292, Sacanta, Cordoba - CP X5945 -
      TEL. 03533 15-41-7923- munienlinea@sacanta.com
    </h6>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style scoped>
.general {
  /* position: fixed; */
  z-index: 15;
  height: 8vh;
  background-color: white;
  width: 81vw;
  bottom: 0;
  right: 0;
  text-align: right;
}
.linea {
  height: 5px;
  width: 100%;
  background-image: linear-gradient(
    to right,
    #f9b100,
    #fa9400,
    #f87400,
    #f45011,
    #ec1c21
  );
  margin-bottom: 10px;
}
h6 {
  font-size: 18px;
  font-weight: 400;
  color: #858585;
}

@media (max-width: 800px) {
  .general {
    position: absolute;
    width: 84vw;
    z-index: 20;
    /* width: 100vw; */
    /* margin-left: 0; */
  }
  h6 {
    font-size: 15px;
    font-weight: 500;
  }
}
</style>
