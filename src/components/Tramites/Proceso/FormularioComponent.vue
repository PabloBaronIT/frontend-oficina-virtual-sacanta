<template>
  <div class="question">
    <h4>{{ questionProp.title }}</h4>
    <p>Completar las preguntas para cada tramite</p>

    <!-- <form v-for="(option, key) in optionsLength" :key="key" class="option">
        <label class="option-text" :for="option">
          <input
            v-if="questions[questionsLength][option][1] === 'radio'"
            :name="key"
            :key="key"
            :value="key"
            required
            :type="questions[questionsLength][option][1]"
            :v-model="question"
          />

          {{ questions[questionsLength][option][0] }}
        </label>
        <br />
        <label>
          <p>{{ questions[questionsLength][option][2] }}</p>
        </label>
        <input
          v-if="questions[questionsLength][option][1] != 'radio'"
          placeholder="Escriba su respuesta..."
          class="input-option"
          :key="key"
          :value="key"
          v-model="textInput"
          required
          :type="questions[questionsLength][1]"
        />
      </form> -->

    <form class="option-container">
      <div
        class="option"
        v-for="(option, key) in questionProp.question"
        :key="key"
      >
        <label class="option-text" for="option">
          <input
            v-if="questionProp.type === 'radio'"
            :type="questionProp.type"
            :value="key"
            v-model="this.selected"
          />

          {{ questionProp.question[key][0] }}
        </label>
        <br />
        <label>
          <p>{{ questionProp.question[key][1] }}</p> </label
        ><br />
        <input
          v-if="questionProp.type != 'radio' && questionProp.type != 'file'"
          :type="questionProp.type"
          v-model="this.textInput"
        />
        <div v-if="questionProp.type === 'file'" class="file-container">
          <img src="@/assets/tramite-logo.svg" alt="" />

          <hr />
          <input accept=".pdf" :type="questionProp.type" />
        </div>
      </div>
    </form>

    <input
      v-if="this.paso + 1 == this.length"
      class="btn btn-success m-1"
      type="button"
      value="Submitt"
      @click="next"
    />
  </div>
</template>

<script>
// import dbService from "@/services/dbService";

export default {
  name: "FormularioComponent",
  props: {
    paso: Number,
    length: Number,
    question_id: Number,
    questionProp: {
      title: String,
      type: String,
      question: Object,
    },
  },
  data() {
    return {
      textInput: "",
      selected: null,
      nroPreguntas: 0,
      questionsLength: 0,
      optionsLength: 3,
      procedure: {
        userId: null,
        categoryId: null,
        statusId: null,
        questions: [],
      },
    };
  },

  methods: {
    next() {
      let selected = this.selected;
      let optionTitle;

      if (selected == 0) {
        optionTitle = this.textInput;
      } else {
        optionTitle = this.questionProp.question[selected][0];
      }

      console.log(selected);
      console.log(optionTitle);

      this.procedure.user_id = 1;
      this.procedure.categoryId = 6;
      this.procedure.status_id = 1;
      let question = {
        question: this.questionProp.question_id,
        options: [
          {
            questionOption: optionTitle,
            answer: optionTitle,
          },
        ],
      };

      this.procedure.questions.push(question);

      console.log(this.procedure);

      // this.submitted();
      this.selected = 0;
    },
    // submitted() {
    //   dbService
    //     .postProcedure(this.procedure)
    //     .then((response) => {
    //       console.log(response.data);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
  },
};
</script>

<style scoped>
.file-container {
  border: 1px solid var(--grey);
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
}

h1 {
  color: var(--red);
}

.option-text {
  font-size: 1.1em;
}

.input-option {
  width: 50%;
}

.options-container {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: flex-start;
}

.option {
  margin: 10px;
  text-align: left;
}

.option input {
  margin: 0 10px;
}

p {
  font-weight: 100;
}

.question {
  margin-top: 20px;
}
</style>
