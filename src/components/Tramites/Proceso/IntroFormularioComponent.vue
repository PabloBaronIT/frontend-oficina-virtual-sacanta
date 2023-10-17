<template>
  <div>
    <div class="row">
      <h5 class="fecha">
        <i class="bi bi-calendar4-week" style="margin-right: 8px"></i
        ><strong>{{ new Date().toLocaleDateString() }}</strong>
      </h5>
    </div>
    <div class="row" style="margin-left: 4vw; margin-top: 7vw">
      <h5>Tasas y contribuciones</h5>
      <h1 class="tituloPrincipal">
        {{ this.$route.params.formularioTitle }}
        <h4 style="color: #4b4a49; font-weight: 100; margin-top: 1rem">
          Ingrese aquí su solicitud en caso de requerir del servicio de <br />
          limpieza en algún lugar en particular
        </h4>
      </h1>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style scoped>
.fecha {
  letter-spacing: 0px;
  position: absolute;
  text-align: right;
  padding-top: 2vh;
  padding-right: 3.5vw;
}
.tituloPrincipal {
  color: #4b4a49;
  font-weight: 900;
  padding-left: 3rem;
  font-size: 50px;
}
h5 {
  color: #4b4a49;
}
</style>
