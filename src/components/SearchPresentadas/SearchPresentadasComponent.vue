<template>
  <div class="contenedor">
    <input type="text" name="" id="" v-model="gestion" />
    <input type="text" name="" id="" v-model="fecha" />

    <input type="text" name="" id="" v-model="titulo" />
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
}
</style>
