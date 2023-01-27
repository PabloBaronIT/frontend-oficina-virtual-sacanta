<template>
  <article>
    <GraficoComponent />
    <Tabla />
    <hr />
    <RegisterComponent />
  </article>
</template>

<script>
import Tabla from "@/components/Tramites/TablaComponent.vue";
import RegisterComponent from "@/components/Login&Register/RegisterComponent.vue";
import GraficoComponent from "@/components/Municipal/GraficoComponent.vue";

export default {
  name: "MuniView",
  components: {
    GraficoComponent,
    RegisterComponent,
    Tabla,
  },
};
</script>

<style scoped>
article {
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  background: rgb(235, 235, 235);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  padding: 30px;
  justify-content: center;
  align-items: center;
}
</style>
