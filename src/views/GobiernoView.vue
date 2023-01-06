<template>
  <topNavComponent />

  <div class="gob-container">
    <navOrganigramaComponent />

    <infoGobiernoComponent />
  </div>
</template>

<script>
import topNavComponent from "@/components/Home/TopNavComponent.vue";
import navOrganigramaComponent from "@/components/Gobierno/navOrganigramaComponent.vue";
import infoGobiernoComponent from "@/components/Gobierno/infoGobiernoComponent.vue";

export default {
  name: "GobiernoView",
  components: {
    topNavComponent,
    infoGobiernoComponent,
    navOrganigramaComponent,
  },
};
</script>

<style scoped>
.gob-container {
  display: flex;
  flex-flow: row wrap;
}
</style>
