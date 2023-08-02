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
  width: 100%;
  height: auto;
  background: var(--grey-bk);
}
/* @media (max-width: 1000px) {
  .main {
    height: auto;
  }
} */
</style>
