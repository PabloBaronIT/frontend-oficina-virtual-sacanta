<template>
  <div class="main-container">
    <h2>Test</h2>
  </div>
</template>

<script>
import dbService from "@/services/dbService";
export default {
  data() {
    return {
      questionsLength: 0,
    };
  },
  created() {
    dbService.getQuestions(this.$router).then((response) => {
      try {
        if (response.status == 200) {
          this.questionsLength = response.data.length();
        }
      } catch (error) {
        console.log(error);
      }
    });
  },
};
</script>

<style scoped>
.main-container {
  width: 100%;
  display: flex;
  padding: 20px;
  flex-flow: column wrap;
  background: rgb(235, 235, 235);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  justify-content: center;
  align-items: center;
}
</style>
