<template>
  <div class="main">
    <topNavComponent />
    <videoComponent />
    <btnServiciosComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import topNavComponent from "@/components/Home/TopNavComponent.vue";
import videoComponent from "@/components/Home/VideoComponent";
import btnServiciosComponent from "@/components/Home/BtnServiciosComponent.vue";

export default {
  name: "HomeView",
  components: {
    topNavComponent,
    videoComponent,
    btnServiciosComponent,
  },
};
</script>

<style scoped></style>
