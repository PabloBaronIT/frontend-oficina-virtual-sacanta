<template>
  <div class="main-container">
    <FormularioComponent />

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
      questions: [
        {
          title: "Tipo De Negocio",
          1: [
            "Voy a realizar un trabajo independiente",
            "radio",
            "Venta de productos o servicios con o sin empleado.",
          ],
          2: [
            "Como miembro de una cooperativa",
            "radio",
            "La cooperativa debe estar registrada en AFIP y tenés que tener la CUIT.",
          ],
          3: [
            "Como trabajador promovido",
            "radio",
            "Opción especial para trabajadores en condiciones precarias.",
          ],
        },
        {
          title: " Otro tipo de negocio Tipo De Negocio",
          1: [
            " un trabajo independiente",
            "radio",
            "Venta de productos o servicios con o sin empleado.",
          ],
          2: [
            " miembro de una cooperativa",
            "radio",
            "La cooperativa debe estar registrada en AFIP y tenés que tener la CUIT.",
          ],
          3: [
            " trabajador promovido",
            "radio",
            "Opción especial para trabajadores en condiciones precarias.",
          ],
        },
        {
          title: "Tipo De Negocio",
          1: [
            "Voy a realizar un trabajo independiente",
            "radio",
            "Venta de productos o servicios con o sin empleado.",
          ],
          2: [
            "Como miembro de una cooperativa",
            "radio",
            "La cooperativa debe estar registrada en AFIP y tenés que tener la CUIT.",
          ],
          3: [
            "Como trabajador promovido",
            "radio",
            "Opción especial para trabajadores en condiciones precarias.",
          ],
        },
      ],
    };
  },
  components: {
    FormularioComponent,
    PagarComponent,
  },

  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
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
