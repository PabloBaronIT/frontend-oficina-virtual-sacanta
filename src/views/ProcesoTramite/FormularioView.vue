<template>
  <div class="main-container">
    <div class="header">
      <h2 class="tituloPrincipal">
        {{ this.$route.params.formularioTitle }}
      </h2>
    </div>

    <FormularioComponent
      :questionProp="this.preguntas"
      :nivel="this.nivel"
      :dispatchProcedure="this.dispatchProcedure"
      :setProcedure="this.setProcedure"
      :outProcedure="this.outProcedure"
      v-if="this.preguntas"
    />

    <!-- Armar componente de formulario con props -->
  </div>
</template>

<script>
import FormularioComponent from "@/components/Tramites/Proceso/FormularioComponent.vue";
import axios from "axios";
import setToken from "@/middlewares/setToken";
import setTokenRelations from "@/middlewares/setTokenRelations";
var procedure = {
  title: "",
  // userId: "",
  // categoryId: null,
  // statusId: 1,
  procedureId: null,
  // selected: null,
  // questions: [],
  // date: new Date(),
  questions: [],
};
export default {
  data() {
    return {
      // Extrayendo  datos de categoria y tramite desde el path con VUE ROUTER
      category: this.$route.params,
      // length: null,
      preguntas: "",
      nivel: "",
      // procedure: {
      //   title: "",
      //   procedureId: "",
      //   questions: [],
      // },
    };
  },
  components: {
    FormularioComponent,
  },
  created() {
    // Get a los templates de procedures para enviarlos por pro a formulario componente
    this.getTemplate();
    procedure.questions = [];
  },
  methods: {
    setProcedure(asd) {
      procedure.questions.push(asd);
    },
    outProcedure() {
      procedure.questions.pop();
    },
    back() {
      this.$router.go(-1);
    },
    dispatchProcedure() {
      this.$store.dispatch("saveP", procedure);
    },
    getTemplate() {
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
          this.nivel = response.data.Template.level.level;
          procedure.procedureId = response.data.Template.id;
          // parseInt(r.id);
          // console.log(this.procedureId, "soy el procedureId");

          procedure.title = response.data.Template.title;
          // this.length = r.question.length;
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.getTemplate();
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.getTemplate();
            }
          }
        });
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
