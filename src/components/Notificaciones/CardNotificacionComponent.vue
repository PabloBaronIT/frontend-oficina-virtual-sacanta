<template>
  <main class="flex-container">
    <div class="top">
      <p>Tenes un mensaje</p>
    </div>
    <p>
      {{ dato.description }}
    </p>
  </main>
</template>
<script>
export default {
  name: "CardNotificacionesComponent",
  props: {
    dato: Object,
  },
};
</script>
<style scoped>
.flex-container {
  width: 50%;
  height: auto;
  margin-top: 2rem;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  font-weight: bold;
  box-shadow: 5px 5px 12px #444;
}
.top {
  background-color: var(--green);
  width: 100%;
  color: white;
  padding: 2px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding-left: 5px;
}
</style>
