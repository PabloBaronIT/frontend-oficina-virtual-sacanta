<template>
  <main class="flex-container">
    <div class="top">
      <p>Haz recibido un mensaje</p>
      <p>
        {{ new Date(dato.created_at).toLocaleDateString() }}
      </p>
    </div>
    <div
      class="descripcion"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      <p>{{ dato.subject }}</p>

      <!-- <div class="leido" v-if="dato.LeidoPortal === `S`"><p>Leido</p></div> -->
    </div>
  </main>
</template>
<script>
export default {
  name: "CardNotificacionesComponent",
  props: {
    dato: Object,
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.flex-container {
  width: 90%;
  height: auto;
  /* border-top-left-radius: 30px; */
  /* border-top-right-radius: 30px; */
  box-shadow: 5px 5px 12px #444;
  text-align: left;
  margin: auto;
  margin-top: 1rem;
  cursor: pointer;
}
.top {
  background-image: linear-gradient(
    to right,
    #399943,
    #4ea242,
    #62aa40,
    #75b23f,
    #88ba3e
  );
  width: 100%;
  color: white;
  padding-left: 2rem;
  height: 3rem;
  /* border-top-left-radius: 30px; */
  /* border-top-right-radius: 30px; */
  padding-top: 0.5rem;
  padding: 0 1rem;

  text-align: left;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.descripcion {
  height: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}
.leido {
  height: 1.5rem;
  width: 4rem;
  background: green;
  align-items: center;
  padding-left: 0.7rem;
  justify-content: center;
  border-radius: 10px;
  color: white;
}
</style>
