<template>
  <main>
    <div class="tabla-container">
      <Tabla />
    </div>
  </main>
</template>

<script>
import Tabla from "@/components/Notificaciones/TablaComponent.vue";

export default {
  components: {
    Tabla,
  },
};
</script>

<style scoped>
main {
  width: 100%;
  display: flex;
  background: rgb(235, 235, 235);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  padding: 30px;
  justify-content: center;
  align-items: center;
}
</style>
