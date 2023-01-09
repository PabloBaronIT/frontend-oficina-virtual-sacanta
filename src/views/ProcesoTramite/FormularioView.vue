<template>
  <div class="main-container">
    <h1>
      <img src="@/assets/back-arrow.svg" alt="Volver" />
      {{ this.$route.params.formularioId }}
    </h1>
    <div class="question" v-for="(question, key) in questions" :key="key">
      {{ question["question"] }}
      <div class="options-container">
        <form
          class="option"
          v-for="(option, key2) in Object.keys(question).length - 1"
          :key="key2"
        >
          <label for="option"
            >{{ question[key2 + 1][0] }}
            <input :type="question[key2 + 1][1]" name="option" />
          </label>
        </form>
      </div>
    </div>
    <PagarComponent />
  </div>
</template>

<script>
import PagarComponent from "@/components/Tramites/PagarComponent.vue";
import dbService from "@/services/dbService";
export default {
  data() {
    return {
      questionsLength: 0,
      questions: [
        {
          question: "Que modelo es su automovil?",
          1: [2002, "checkbox"],
          2: [2003, "checkbox"],
          3: [2004, "checkbox"],
          4: ["Otro año", "number"],
        },
        {
          question: "De que pais es su automovil?",
          1: ["Argentina", "checkbox"],
          2: ["Brasil", "checkbox"],
          3: ["Devoto", "checkbox"],
          4: ["Japon", "checkbox"],
          5: ["Japon", "color"],
          6: ["Otro año", "number"],
        },
        {
          question: "De que pais es su automovil?",
          1: ["Argentina", "checkbox"],
          2: ["Brasil", "checkbox"],
          3: ["Devoto", "checkbox"],
          4: ["Japon", "checkbox"],
          5: ["Japon", "color"],
          6: ["Otro año", "number"],
        },
      ],
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
  components: {
    PagarComponent,
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

.options-container {
  width: 500px;
  padding: 15px 5px;
  border: 1px solid var(--red);
  text-align: left;
  border-radius: 10px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
}

.option {
  margin: 10px;
}

.btn {
  margin: 10px;
  background: var(--red);
}

h1 {
  display: flex;
}
</style>
