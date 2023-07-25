<template>
  <Div class="container">
    <h1>
      Su pago ha sido exitoso! <br />
      Gracias por utilizar la oficina virtual de Sacanta
    </h1>
    <img src="@/assets/logoSacanta.svg" alt="Sacanta" class="imagenlogo" />
  </Div>
</template>

<script>
export default {
  name: "Pago-exitoso",
  created() {
    this.setValues();
  },
  data() {
    return {
      IdResultado: "",
      IdReferenciaOperacion: "",
    };
  },
  methods: {
    setValues() {
      this.IdResultado = this.$route.params.IdResultado;
      this.IdReferenciaOperacion = this.$route.params.IdReferenciaOperacion;
    },
  },
};
</script>

<style scoped>
.container {
  padding-top: 10rem;
}

.imagenlogo {
  width: 100px;
  height: 120px;
  margin-top: 2rem;
}
</style>
