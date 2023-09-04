<template>
  <footer class="general">
    <div class="linea"></div>
    <h6>
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
  width: 85vw;
  /* height: 10vh; */
  margin-left: 15vw;
  text-align: center;
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
  font-weight: 700;
  color: #858585;
}
</style>
