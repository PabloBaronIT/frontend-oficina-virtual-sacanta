<template>
  <div class="datos-container">
    <p>Nombre completo: {{ this.name }} {{ this.lastname }}</p>
    <p>CUIL: {{ this.cuil }}</p>
    <p>Contraseña: *********</p>
    <p>Email: {{ this.email }}</p>
    <p>Dirección: {{ this.adress }}</p>
    <p>Cuenta creada el {{ this.fecha_creacion }}</p>
  </div>
</template>

<script>
export default {
  name: "DatosCompnent",
  data() {
    return {
      name: localStorage.getItem("name"),
      lastname: localStorage.getItem("lastname"),
      cuil: localStorage.getItem("cuil"),
      email: localStorage.getItem("email"),
      adress: localStorage.getItem("adress"),
      fecha_creacion: localStorage.getItem("fecha-creacion"),
    };
  },
};
</script>

<style scoped>
.datos-container {
  display: flex;
  flex-flow: column wrap;
  text-align: left;
}
</style>
