<template>
  <div class="contenedor">
    <input
      type="text"
      name="titulo"
      id=""
      class="inputTitulo"
      v-model="busqueda"
      placeholder="INGRESA UNA PALABRA RELACIONADA."
    />
    <img src="./../../assets/images/Search.svg" alt="" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      busqueda: "",
    };
  },
};
</script>
<style scoped>
.contenedor {
  display: flex;
  flex-direction: row;
  width: 58vw;
}
input {
  border-radius: 10px;
  background: #ffff;
  width: 10vw;
  height: 6vh;
  /* height: 36px; */
  margin-right: 1vw;
  border: none;
  padding-left: 1rem;
}
input[name="titulo"] {
  width: 33vw;
}
</style>
