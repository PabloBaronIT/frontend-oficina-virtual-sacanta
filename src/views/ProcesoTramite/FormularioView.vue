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
      category: this.$route.params,
      questions: [
        {
          question_id: 9,
          title: "Tipo De Negocio",
          type: "radio",
          question: {
            2: [
              "Voy a realizar un trabajo independiente",
              "Venta de productos o servicios con o sin empleado.",
              1,
            ],
            3: [
              "Como miembro de una cooperativa",
              "La cooperativa debe estar registrada en AFIP y tenés que tener la CUIT.",
              2,
            ],
            4: [
              "Como trabajador promovido",
              "Opción especial para trabajadores en condiciones precarias.",
              5,
            ],
          },
        },
        {
          question_id: 5,
          title: " Ingreso anual bruto",
          type: "number",
          question: {
            1: ["Ingrese el número sin comas:", " ", 4],
          },
        },
        {
          question_id: 6,
          title: " Subir constancia de AFIP",
          type: "file",
          question: {
            1: [
              "Seleccione su constancia de AFIP:",
              "Solo en formato pdf digital o escaneado.",
              5,
            ],
          },
        },
      ],
      length: null,
      preguntas: [],
    };
  },
  components: {
    FormularioComponent,
  },
  created() {
    console.log(localStorage.getItem("token"));

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
