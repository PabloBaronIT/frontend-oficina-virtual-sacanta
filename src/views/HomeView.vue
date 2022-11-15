<template>
  <div class="main">
    <topNavComponent />
    <videoComponent />
    <btnServiciosComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import topNavComponent from "@/components/TopNavComponent.vue";
import videoComponent from "@/components/VideoComponent";
import btnServiciosComponent from "@/components/BtnServiciosComponent.vue";

export default {
  name: "HomeView",
  components: {
    topNavComponent,
    videoComponent,
    btnServiciosComponent,
  },
};
</script>
