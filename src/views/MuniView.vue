<template>
  <article>
    <ModalGraficoComponent />
    <Tabla />
    <hr />
    <div class="article-container">
      <RegisterComponent />
      <GraficoComponent />
    </div>
  </article>
</template>

<script>
import Tabla from "@/components/Municipal/TablaComponent.vue";
import RegisterComponent from "@/components/Login&Register/RegisterComponent.vue";
import ModalGraficoComponent from "@/components/Municipal/ModalGraficoComponent.vue";
import GraficoComponent from "@/components/Municipal/GraficoComponent.vue";

export default {
  name: "MuniView",
  components: {
    ModalGraficoComponent,
    RegisterComponent,
    Tabla,
    GraficoComponent,
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

.article-container {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
}
</style>
