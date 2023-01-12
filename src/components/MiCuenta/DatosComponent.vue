<template>
  <div class="datos-container">
    <p>Nombre completo: {{ this.name }} {{ this.lastname }}</p>
    <p>CUIL: {{ this.cuil }}</p>
    <div class="edit">
      <p>Contraseña: *********</p>
      <img src="@/assets/edit.svg" alt="edit" />
    </div>
    <p>Email: {{ this.email }}</p>
    <p>Dirección: {{ this.adress }}</p>
    <p>Cuenta creada el {{ fecha }}</p>
  </div>
</template>

<script>
import dbservice from "@/services/dbService";

export default {
  name: "DatosCompnent",
  data() {
    return {
      name: "",
      lastname: localStorage.getItem("lastname"),
      cuil: localStorage.getItem("cuil"),
      email: localStorage.getItem("email"),
      adress: localStorage.getItem("adress"),
      fecha_creacion: localStorage.getItem("fecha-creacion"),
    };
  },
  created() {
    dbservice
      .getMunicipal(1)
      .then((response) => {
        console.log(response.data);
        let res = response.data;
        this.name = res.firstname;
        this.lastname = res.lastname;
        this.cuil = res.cuil;
        this.email = res.email;
        this.fecha_creacion = res.created_at;
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  },
  computed: {
    fecha() {
      let iso = this.fecha_creacion;
      let date = new Date(iso);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    },
  },
};
</script>

<style scoped>
.datos-container {
  display: flex;
  flex-flow: column wrap;
  text-align: left;
}

.datos-container img {
  max-width: 20px;
  margin: 0 10px;
  cursor: pointer;
}
.datos-container img:hover {
  max-width: 22px;
  fill: var(--red);
}

.edit {
  display: flex;
  align-items: baseline;
}
</style>
