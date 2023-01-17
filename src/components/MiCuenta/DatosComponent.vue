<template>
  <div class="datos-container">
    <p>
      Nombre completo: <b> {{ this.name }} {{ this.lastname }}</b>
    </p>
    <p>
      CUIL: <b>{{ this.cuil }}</b>
    </p>
    <div class="edit">
      <p>Contraseña: *********</p>
      <img src="@/assets/edit.svg" alt="edit" />
    </div>
    <p>
      Email: <b>{{ this.email }}</b>
    </p>
    <p>
      Dirección: <b>{{ this.adress }}</b>
    </p>
    <p>
      Cuenta creada el <b>{{ fecha }}</b>
    </p>
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
  flex-flow: row wrap;
  text-align: left;
  width: 100%;
  border: 1px solid var(--grey);
  border-radius: 10px;
}

p {
  margin: 20px;
  padding: 10px;
  background: var(--grey);
  height: auto;
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
