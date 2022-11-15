<template>
  <div class="main">
    <topNavComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import topNavComponent from "@/components/TopNavComponent.vue";
export default {
  name: "HomeView",
  components: {
    topNavComponent,
  },
};
</script>
