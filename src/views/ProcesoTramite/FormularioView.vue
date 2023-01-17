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
    return {};
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
