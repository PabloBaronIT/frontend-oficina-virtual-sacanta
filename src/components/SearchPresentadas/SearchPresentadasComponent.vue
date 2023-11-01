<template>
  <div class="contenedor">
    <input
      type="text"
      name=""
      id=""
      v-model="gestion"
      placeholder="Nº GESTIÓN"
    />
    <input type="text" name="" id="" v-model="fecha" placeholder="FECHA" />
    <h5 style="margin-top: 5px"><i class="bi bi-calendar4-week"></i></h5>
    <input
      type="text"
      name="titulo"
      id=""
      class="inputTitulo"
      v-model="titulo"
      placeholder="TITULO"
    />
    <img src="./../../assets/images/Search.svg" alt="" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      gestion: "",
      fecha: "",
      titulo: "",
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
  padding-left: 5px;
  width: 10vw;
  height: 6vh;
  /* height: 36px; */
  margin-right: 1vw;
  border: none;
  padding-left: 1rem;
}
input[name="titulo"] {
  width: 33vw;
  margin-left: 1vw;
}
.circuloVerde {
  /* position: absolute; */
  /* z-index: 15; */
  /* right: -3rem; */
  /* top: 0.2rem; */
  font-size: 28px;
  /* margin-left: 2rem; */
  /* color: linear-gradient(to right, #399943, #4ea242, #62aa40, #75b23f, #88ba3e); */
  height: 50px;
  width: 50px;
  /* border-radius: 50%; */
  /* padding-top: 6px; */
  /* padding-left: 11px; */
  cursor: pointer;
}
@media (max-width: 800px) {
  .contenedor {
    width: 100vw;
    justify-content: left;
  }
  input {
    width: 15vw;
    font-size: 12px;
  }
}
</style>
