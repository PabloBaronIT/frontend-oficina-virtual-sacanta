<template>
  <div style="width: 100%">
    <div v-if="this.areas && !this.loading" class="container">
      <p>Seleccione el area al cual corresponde:</p>
      <select
        class="form-select"
        aria-label="Default select example"
        v-model="this.areaId"
      >
        <option v-for="item in this.areas" :key="item.id" :value="item.id">
          {{ item.area_name }}
        </option>
      </select>
      <button type="button" class="btn btn-light" @click="AsignarArea()">
        Asignar
      </button>
    </div>
    <div v-if="this.loading" class="spinner-border loading" role="status">
      <span class="sr-only"></span>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "AsignarAreaView",
  data() {
    return {
      areas: null,
      areaId: null,
      user: null,
      loading: false,
    };
  },
  created() {
    this.loading = true;
    this.getAreas();
  },
  methods: {
    getAreas() {
      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });

      apiClient
        .get("/areas/all-areas")
        .then((response) => {
          //console.log(response.data);
          this.areas = response.data.Areas;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error.data);
        });
    },
    AsignarArea() {
      //console.log(this.areaId);
      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .put("/municipales/assign-area", {
          areaId: this.areaId,
        })
        .then((response) => {
          if (response.status === 200) {
            this.loading = true;
            this.getMyProfile();
            this.$router.push("/muni");
          }
        })
        .catch((error) => {
          console.log(error.data);
        });
    },
    dispatchLogin() {
      this.$store.dispatch("mockLoginAction", this.user);
    },
    getMyProfile() {
      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient.get("/municipales/muni-profile").then((response) => {
        console.log(response.data);
        this.user = response.data.MuniProfile.muni;
        this.dispatchLogin();

        window.localStorage.setItem(
          "name",
          response.data.MuniProfile.muni.firstname
        );
        window.localStorage.setItem(
          "lastname",
          response.data.MuniProfile.muni.lastname
        );
        window.localStorage.setItem(
          "cuil",
          response.data.MuniProfile.muni.cuil
        );

        window.localStorage.setItem(
          "email",
          response.data.MuniProfile.muni.email
        );
        window.localStorage.setItem("id", response.data.MuniProfile.muni.id);
        window.localStorage.setItem(
          "fecha-creacion",
          response.data.MuniProfile.muni.created_at
        );
        window.localStorage.setItem(
          "role",
          response.data.MuniProfile.muni.role
        );
      });
    },
  },
};
</script>
<style scoped>
.container {
  width: 90%;
  background: white;
  padding: 2rem 0px;
  border-radius: 20px;
  margin-top: 10rem;
}
select {
  width: 50%;
  margin-top: 1.5rem;
  margin: auto;
}
</style>
