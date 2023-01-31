<template>
  <div class="container">
    <div class="img">
      <img src="@/assets/mastercard.svg" alt="" />
      <img src="@/assets/visa.svg" alt="" />

      <img class="pagotic" src="@/assets/pagotic.svg" alt="" />
    </div>

    <div class="text">
      <h2>Tramite arancelado</h2>
      <p>Este tramite tiene un valor total de <b>$430</b></p>
      <input class="btn" type="button" value="Ir a PagoTic" />
      <input class="cancel" type="button" value="Cancelar" @click="cancel" />
    </div>
  </div>
</template>

<script>
export default {
  name: "PagarComponent",

  methods: {
    cancel() {
      alert("Terminar method y radio btns");
    },
  },
};
</script>

<style scoped>
.cancel {
  border: none;
  background: none;
  font-weight: 100;
  text-decoration: underline;
  color: var(--text-color);
}

.pagotic {
  max-width: 100px;
}

.container {
  border: 1px solid var(--green);
  padding: 0;
  display: flex;
  flex-flow: row wrap;
  height: 150px;
}

.text {
  width: 70%;
}

.img {
  width: 20%;
  background: var(--green);
}

.btn {
  background: var(--green);
  color: #000;
  width: 80%;
}

img {
  max-width: 40px;
  margin: 10px;
}
</style>
