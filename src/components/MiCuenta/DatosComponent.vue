<template>
  <div class="datos-container">
    <p>
      Nombre completo:
      <b> {{ this.name }} {{ this.lastname }} </b>
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
import axios from "axios";
export default {
  name: "DatosCompnent",
  data() {
    return {
      name: "",
      lastname: "",
      cuil: "",
      email: "",
      adress: "",
      fecha_creacion: "",
    };
  },
  created() {
    const apiClient = axios.create({
      baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
      //baseURL: process.env.VUE_APP_BASEURL,

      withCredentials: false,
      headers: {
        "auth-header": localStorage.getItem("token"),
      },
    });
    apiClient
      .get("/oficina/user/profile")
      .then((response) => {
        console.log(response.data);
        let res = response.data.UserProfile;
        this.name = res.user.firstname;
        this.lastname = res.user.lastname;
        this.cuil = res.user.cuil;
        this.email = res.user.email;
        this.adress = res.user.adress;

        this.fecha_creacion = res.user.created_at;
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
