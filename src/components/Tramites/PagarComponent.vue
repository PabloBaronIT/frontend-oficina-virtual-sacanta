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
    </div>
  </div>
</template>

<script>
export default {
  name: "PagarComponent",
};
</script>

<style scoped>
.pagotic {
  max-width: 100px;
}

.container {
  width: 60%;
  margin: 20px;
  border: 1px solid var(--green);
  padding: 0;
  display: flex;

  height: 150px;
}

.text {
  width: 70%;
}

.img {
  width: 30%;
  background: var(--green);
}

.btn {
  background: var(--green);
  color: #000;
  width: 90%;
}

img {
  max-width: 40px;
  margin: 10px;
}
</style>
