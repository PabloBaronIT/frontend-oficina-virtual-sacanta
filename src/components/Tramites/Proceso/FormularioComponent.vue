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
        <input v-if="questionProp.type != 'radio'" />
      </div>
    </form>

    <input
      class="btn btn-secondary"
      type="button"
      value="Siguiente"
      @click="sig"
    />
    <input
      class="btn btn-success m-1"
      type="button"
      value="Submitt"
      @click="next"
    />
  </div>
</template>

<script>
import dbService from "@/services/dbService";

export default {
  name: "FormularioComponent",
  props: {
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
        user_id: null,
        procedureTitle: "",
        procedureDescription: "",
        categoryId: null,
        questions: [
          {
            title: "",
            options: [
              {
                title: "",
                enabled: false,
              },
            ],
          },
        ],
      },
    };
  },
  created() {
    dbService.getQuestions(this.$router).then((response) => {
      try {
        if (response.status == 200) {
          this.questionsLength = response.data.length;
        }
      } catch (error) {
        console.log(error);
      }
    });
  },

  methods: {
    sig() {
      this.nroPreguntas++;
      console.log(this.nroPreguntas);
    },
    next() {
      let selected = this.selectedOption;
      let nroPregunta = this.questionsLength;
      console.log(selected);
      this.procedure.user_id = 1;
      this.procedure.procedureTitle = this.$route.params.formularioTitle;
      this.procedure.procedureDescription = this.questions[0].title;
      this.procedure.categoryId = 6;
      // this.procedure.questions[0].title = this.questions[0].title;
      // this.procedure.questions[0].options[0].title =
      //   this.questions[0][selected][0];
      // this.procedure.questions[this.questionsLength].options[0].enabled = true;

      let question = {
        title: this.questions[0].title,
        options: [
          {
            title: this.questions[0][selected][0],
            enabled: true,
          },
        ],
      };

      this.procedure.questions.push(question);

      nroPregunta++;
      console.log(this.selectedOption);
      console.log(this.procedure);
      console.log(nroPregunta);

      this.submitted();
    },
    submitted() {
      dbService
        .postProcedure(this.procedure)
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
