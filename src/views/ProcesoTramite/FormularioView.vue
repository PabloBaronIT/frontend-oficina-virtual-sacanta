<template>
  <div class="main-container">
    <h1>
      {{ this.$route.params.formularioTitle }}
    </h1>

    <FormularioComponent
      :questionProp="questions"
      :length="questions.length"
      :paso="this.paso"
    />

    <div class="">
      <input
        class="btn btn-secondary"
        v-if="this.paso + 1 < questions.length"
        type="button"
        value="Siguiente"
        @click="sig"
      />

      <input
        class="m-2 btn btn-secondary"
        type="button"
        value="Anterior"
        @click="ant"
      />
    </div>

    <!-- Armar componente de formulario con props -->

    <PagarComponent />
  </div>
</template>

<script>
import PagarComponent from "@/components/Tramites/PagarComponent.vue";
import FormularioComponent from "@/components/Tramites/Proceso/FormularioComponent.vue";

export default {
  data() {
    return {
      paso: 0,
      questions: [
        {
          question_id: 1,
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
          question_id: 2,
          title: " Ingreso anual bruto",
          type: "number",
          question: {
            1: ["Ingrese el número sin comas:", "", 4],
          },
        },
        {
          question_id: 333,
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
    };
  },
  components: {
    FormularioComponent,
    PagarComponent,
  },

  methods: {
    sig() {
      this.paso++;
    },
    ant() {
      this.paso--;
      alert("Borrar data de la question");
    },
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
