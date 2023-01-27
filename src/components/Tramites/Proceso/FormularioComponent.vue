<template>
  <div class="question">
    <h4>{{ questionProp[this.paso].title }}</h4>
    <p>Completar las preguntas para cada tramite</p>

    <div v-show="this.loading" class="spinner-border" role="status">
      <span>cargando rey</span>
    </div>

    <form class="option-container">
      <div
        class="option"
        v-for="(option, key) in questionProp[this.paso].question"
        :key="key"
      >
        <input
          :id="key"
          :name="key"
          v-if="questionProp[this.paso].type === 'radio'"
          :type="questionProp[this.paso].type"
          :value="key"
          v-model="this.selected"
        />

        <label class="option-text" :for="key">
          {{ questionProp[this.paso].question[key][0] }}
        </label>

        <br />
        <label>
          <p>{{ questionProp[this.paso].question[key][1] }}</p> </label
        ><br />

        <div class="form-outline">
          <input
            class="form-control"
            v-if="
              questionProp[this.paso].type != 'radio' &&
              questionProp[this.paso].type != 'file'
            "
            :type="questionProp[this.paso].type"
            v-model="this.textInput"
          />
        </div>

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

      <p class="error" v-show="validation == false">
        Debe seleccionar una opcion para continuar
      </p>
    </form>

    <div class="">
      <input
        class="btn btn-secondary"
        v-if="this.paso + 1 < this.length"
        type="button"
        value="Siguiente"
        @click="preNext()"
      />

      <input
        class="m-2 btn btn-secondary"
        type="button"
        value="Anterior"
        @click="back()"
      />
    </div>

    <!-- v-if="this.paso + 1 == this.length" -->
    <input
      v-if="this.paso + 1 == this.length"
      class="btn btn-success m-1"
      type="button"
      value="Submitt"
      @click="submitt"
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
      paso: 0,
      validation: null,
      loading: false,
      textInput: "",
      selected: 0,
      submitted: false,
    };
  },
  methods: {
    preNext() {
      console.log(this.selected);
      if (this.selected == 0 && this.textInput == "") {
        this.validation = false;
      } else if (this.selected == 0 && this.textInput != "") {
        this.next();
      } else if (this.selected != 0 && this.textInput == "") {
        this.next();
      }
    },

    next() {
      //   debugger;
      let selected = this.selected;
      let optionTitle = "";

      if (this.textInput != "") {
        optionTitle = this.textInput;
      } else {
        optionTitle = this.questionProp[this.paso].question[this.selected][0];
      }

      console.log(selected);

      console.log(optionTitle);

      let q = {
        question: this.questionProp[this.paso].question_id,
        options: [
          {
            questionOption: 1,
            // this.questionProp[this.paso].question[this.selected][2],
            answer: optionTitle,
          },
        ],
      };

      procedure.questions.push(q);

      console.log(procedure);

      this.selected = 0;
      this.textInput = "";
      this.validation = true;
      this.paso++;
    },
    submitt() {
      this.preNext();
      if (this.validation) {
        this.loading = true;
        dbService
          .postProcedure(procedure)
          .then((response) => {
            alert(response.data);
            if (response.status == 201) {
              this.submitted = true;
              this.$router.replace({ path: "/munienlinea" });
            }

            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
        this.loading = false;
      }
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

h1,
.error {
  color: var(--red);
}

.option-text {
  font-size: 1.1em;
  margin: 0 5px;
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
  margin: 0 0px;
}

p {
  font-weight: 100;
}

.question {
  margin-top: 20px;
}
</style>
