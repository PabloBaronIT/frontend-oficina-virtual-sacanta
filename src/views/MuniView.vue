<template>
  <article>
    <RegisterComponent />
  </article>
</template>

<script>
import RegisterComponent from "@/components/Login&Register/RegisterComponent.vue";
export default {
  name: "MuniView",
  components: {
    RegisterComponent,
  },
};
</script>

<style scoped>
article {
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
