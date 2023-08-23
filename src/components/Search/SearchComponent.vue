<template>
  <div class="container">
    <div class="containerSearch">
      <input
        type="text"
        class="search"
        v-model="this.value"
        placeholder="Escribí algo relacionado(ej.acta de nacimiento), o elegí en los grupos de abajo"
        @keyup="this.searchValue"
      />

      <span
        style="
          color: white;
          font-size: 25px;
          margin-left: 2rem;
          background-image: linear-gradient(
            to right,
            #399943,
            #4ea242,
            #62aa40,
            #75b23f,
            #88ba3e
          );
          height: 50px;
          width: 50px;
          border-radius: 50%;
          padding-top: 0.4rem;
          cursor: pointer;
        "
      >
        <i class="bi bi-search"></i
      ></span>
    </div>

    <div class="vistaValues">
      <p v-for="item in this.values" :key="item.id">
        {{ item.title }}
      </p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import setTokenRelations from "@/middlewares/setTokenRelations";
import { BASE_URL } from "@/env";
import setToken from "@/middlewares/setToken";

export default {
  name: "SearchComponent",
  data() {
    return {
      value: "",
      values: "",
    };
  },
  methods: {
    searchValue() {
      console.log(this.value);
      if (this.value != "") {
        console.log("no soy null");

        const apiClient = axios.create({
          baseURL: BASE_URL,
          withCredentials: false,
          headers: {
            "auth-header": localStorage.getItem("token"),
          },
        });
        apiClient
          .post("/oficina/procedures/search-procedures", {
            query: this.value,
          })
          .then((response) => {
            this.values = response.data.Search;
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 500) {
              if (error.response.data.message === "Token de usuario expirado") {
                setToken();
                this.searchValue();
              }
              if (
                error.response.data.message ===
                "Token de representante expirado"
              ) {
                setTokenRelations();
                this.searchValue();
              }
            }
            if (error.response.status === 401) {
              this.$router.push("micuenta-update");
            }
          });
      } else {
        console.log(" soy null");
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 100vw;
}
.containerSearch {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 4rem;
}
.search {
  width: 70%;
  position: relative;
  margin-left: 4rem;
  height: 55px;
  border-color: transparent;
  padding-left: 1rem;
}
.vistaValues {
  background: red;
  width: 70%;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 4rem;
  height: 55px;
  border-color: transparent;
  padding-left: 1rem;
}
</style>
