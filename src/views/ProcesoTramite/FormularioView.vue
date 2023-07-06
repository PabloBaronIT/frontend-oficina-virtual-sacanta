<template>
  <div class="main-container">
    <div class="header">
      <h2 class="tituloPrincipal">
        {{ this.$route.params.formularioTitle }}
      </h2>
    </div>

    <FormularioComponent :questionProp="this.preguntas" />

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
      preguntas: null,
      title: "",
      procedureId: null,
    };
  },
  components: {
    FormularioComponent,
  },
  created() {
    // Get a los templates de procedures para enviarlos por pro a formulario componente
    const apiClient = axios.create({
      //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
      baseURL: process.env.VUE_APP_BASEURL,
      withCredentials: false,
      headers: {
        "auth-header": localStorage.getItem("token"),
      },
    });

    apiClient
      .get("/oficina/procedures/template/" + this.$route.params.formularioId)
      .then((response) => {
        console.log(response.data);
        this.preguntas = response.data.Template.questionProcedure;

        // this.procedureId = r.id;
        // parseInt(r.id);
        // console.log(this.procedureId, "soy el procedureId");

        // this.title = r.title;
        // this.length = r.question.length;
        // this.preguntas.push(r);
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
.header {
  text-align: left;
  padding-left: 5rem;
}

.main-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: rgb(235, 235, 235);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  justify-content: center;
  padding-top: 0;
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
