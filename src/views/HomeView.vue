<template>
  <div class="main">
    <NavComponent />
  </div>
</template>

<script>
// @ is an alias to /src

import NavComponent from "@/components/NavComponent.vue";

export default {
  name: "HomeView",
  components: {
    NavComponent,
  },
};
</script>
