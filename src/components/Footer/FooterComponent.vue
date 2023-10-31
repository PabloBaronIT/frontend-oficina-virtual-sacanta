<template>
  <footer class="general">
    <div class="linea"></div>
    <div
      style="display: flex; flex-direction: row; justify-content: space-between"
    >
      <div class="grupoRedes">
        <i class="bi bi-facebook redes"></i>
        <i class="bi bi-instagram redes"></i>
        <i class="bi bi-envelope-fill redes"></i>
      </div>
      <h6 style="margin-right: 2rem; margin-top: 1rem">
        <strong>Municipalida de Sacanta | </strong>
        25 de Mayo 292, Sacanta, Cordoba | CP X5945 | TEL.: 03533 15 417923
      </h6>
    </div>
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
  height: 13vh;
  background-color: #f5f5f5;
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
.grupoRedes {
  margin-left: 3vw;
  width: 12vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.redes {
  /* color: linear-gradient(90deg, #019939 4.26%, #ffcc03 126.04%); */
  background: linear-gradient(
    to right,
    #ffcc03,
    #ffa800,
    #fb8200,
    #f3590d,
    #e52320
  );
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  font-size: 40px;
}

@media (max-width: 800px) {
  .general {
    position: absolute;
    width: 100vw;
    z-index: 20;
    /* width: 100vw; */
    /* margin-left: 0; */
  }
  h6 {
    font-size: 12px;
    font-weight: 200;
  }
  .redes {
    font-size: 25px;
  }
  .grupoRedes {
    width: 15vw;
  }
}
@media (max-width: 600px) {
  .general {
    position: absolute;
    width: 100vw;
    z-index: 20;
    /* width: 100vw; */
    /* margin-left: 0; */
  }
  h6 {
    font-size: 10px;
    font-weight: 200;
  }
  .redes {
    font-size: 20px;
  }
  .grupoRedes {
    width: 20vw;
  }
}
</style>
