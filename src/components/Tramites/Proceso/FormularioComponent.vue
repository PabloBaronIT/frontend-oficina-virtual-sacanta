<template>
  <div class="question">
    <h4>{{ questionProp[this.paso].title }}</h4>
    <p>Completar las preguntas para cada tramite</p>

    <form class="option-container">
      <div
        class="option"
        v-for="(option, key) in questionProp[this.paso].question"
        :key="key"
      >
        <label class="option-text" for="option">
          <input
            v-if="questionProp[this.paso].type === 'radio'"
            :type="questionProp[this.paso].type"
            :value="key"
            v-model="this.selected"
          />

          {{ questionProp[this.paso].question[key][0] }}
        </label>
        <br />
        <label>
          <p>{{ questionProp[this.paso].question[key][1] }}</p> </label
        ><br />
        <input
          v-if="
            questionProp[this.paso].type != 'radio' &&
            questionProp[this.paso].type != 'file'
          "
          :type="questionProp[this.paso].type"
          v-model="this.textInput"
        />
        <div
          v-if="questionProp[this.paso].type === 'file'"
          class="file-container"
        >
          <img src="@/assets/tramite-logo.svg" alt="" />

          <hr />
          <input
            accept=".pdf"
            :type="questionProp[this.paso].type"
            v-model="this.textInput"
          />
        </div>
      </div>
    </form>
    <!-- v-if="this.paso + 1 == this.length" -->
    <input
      class="btn btn-success m-1"
      type="button"
      value="Submitt"
      @click="submitted"
    />
  </div>
</template>

<script>
import dbService from "@/services/dbService";

let procedure = {
  userId: 1,
  categoryId: 6,
  statusId: 1,
  questions: [],
};

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
      // procedure: {
      //   userId: null,
      //   categoryId: null,
      //   statusId: null,
      //   questions: [],
      // },
    };
  },
  watch: {
    paso(n, o) {
      if (n > o) {
        this.next();
      }
    },
  },
  methods: {
    next() {
      let selected = this.selected;
      let optionTitle;

      if (selected == 1) {
        optionTitle = this.textInput;
      } else {
        optionTitle = this.questionProp[this.paso - 1].question[selected][0];
      }

      console.log(selected);
      console.log(optionTitle);

      let q = {
        question: this.questionProp[this.paso - 1].question_id,
        options: [
          {
            questionOption:
              this.questionProp[this.paso - 1].question[this.selected][2],
            answer: optionTitle,
          },
        ],
      };

      procedure.questions.push(q);

      console.log(procedure);

      this.selected = 1;
      this.textInput = "";
    },
    submitted() {
      this.next();

      dbService
        .postProcedure(procedure)
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
