<template>
  <div class="main-container">
    <h1>
      {{ this.$route.params.formularioTitle }}
    </h1>

    <FormularioComponent :questionProp="preguntas" :length="this.length" />

    <!-- Armar componente de formulario con props -->
  </div>
</template>

<script>
import FormularioComponent from "@/components/Tramites/Proceso/FormularioComponent.vue";
// import dbService from "@/services/dbService";
import axios from "axios";

export default {
  data() {
    return {
      // Extrayendo  datos de categoria y tramite desde el path con VUE ROUTER
      category: this.$route.params,
      length: null,
      preguntas: [],
    };
  },
  components: {
    FormularioComponent,
  },
  created() {
    // Get a los templates de procedures para enviarlos por pro a formulario componente
    const apiClient = axios.create({
      baseURL: "//localhost:3000/",
      withCredentials: false,
      headers: {
        "auth-header": localStorage.getItem("token"),
      },
    });

    apiClient
      .get("/oficina/procedures/template/" + this.$route.params.formularioId)
      .then((response) => {
        console.log(response.data);
        let r = response.data;

        this.length = r.question.length;
        this.preguntas.push(r);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
h1 {
  color: var(--red);
}

.main-container {
  width: 100%;
  height: 100vh;
  display: flex;
  padding: 20px;
  flex-flow: column wrap;
  background: rgb(235, 235, 235);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  justify-content: center;
  align-items: center;
}

.options-container {
  width: 500px;
  padding: 0px 5px;
  border-top: 1px solid var(--red);
  text-align: left;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
}
</style>
