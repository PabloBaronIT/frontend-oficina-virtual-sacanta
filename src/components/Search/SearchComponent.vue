<template>
  <div class="container">
    <div class="containerSearch">
      <input
        type="text"
        class="search"
        v-model="this.value"
        placeholder="Escribinos algo relacionado o elegí alguna opción de abajo"
        @keyup="this.searchValue"
      />

      <span class="circuloVerde"> <i class="bi bi-search"></i></span>
    </div>
    <div
      v-if="this.values"
      style="position: absolute; z-index: 15; width: 50vw"
    >
      <div class="vistaValues" v-for="item in this.values" :key="item.id">
        <router-link :to="`/formulario/${item.title}/${item.id}`">
          <a>{{ item.title }}</a>
        </router-link>
        <!-- <p>
          {{ item.title }}
        </p> -->
      </div>
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
      values: null,
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
        this.values = null;
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  margin-bottom: 4rem;
  margin-top: -15px;
}
.containerSearch {
  width: 54vw;
  position: relative;
  /* display: flex; */
  /* flex-direction: row; */
  /* margin-top: 4rem; */
}
.search {
  width: 54vw;
  position: relative;
  margin-left: 4vw;
  height: 55px;
  border-color: transparent;
  padding-left: 1rem;
  border-radius: 0px 20px;
  box-shadow: 4px 4px 7px 0px rgba(0, 0, 0, 0.25);
}
.vistaValues {
  width: 50vw;
  background: white;
  text-align: left;
  margin-left: 5vw;
  height: 45px;
  padding-left: 1rem;
  z-index: 15;
  border-bottom: solid 1px grey;
}
.circuloVerde {
  position: absolute;
  z-index: 15;
  right: -3rem;
  top: 0.2rem;
  color: green;
  font-size: 28px;
  margin-left: 2rem;
  /* color: linear-gradient(to right, #399943, #4ea242, #62aa40, #75b23f, #88ba3e); */
  height: 50px;
  width: 50px;
  border-radius: 50%;
  padding-top: 6px;
  padding-left: 11px;
  cursor: pointer;
}
.vistaValues a {
  cursor: pointer;
  text-decoration: none;
  color: black;
}
@media (max-width: 800px) {
  .search {
    width: 90%;
    margin-left: 0;
  }
  .container {
    width: 90%;
  }
}
</style>
