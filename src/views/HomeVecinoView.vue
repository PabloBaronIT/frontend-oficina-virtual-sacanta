<template>
  <main>
    <MainContainerComponent />
  </main>
</template>

<script>
import MainContainerComponent from "@/components/MuniEnLinea/MainContainerComponent.vue";

export default {
  name: "HomeVecinoView",
  components: {
    MainContainerComponent,
  },
};
</script>

<style scoped>
main {
  width: 80%;
  height: 100vh;
  background: var(--grey-bk);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}
/* @media (max-width: 1000px) {
  .main {
    height: auto;
  }
} */
</style>
