<template>
  <div class="question">
    <h4>{{ questionProp[this.paso].title }}</h4>
    <p>Completar las preguntas para cada tramite</p>

    <div v-show="this.loading" class="spinner-border" role="status">
      <span>cargando rey</span>
    </div>

    <form v-show="!modal" class="option-container">
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
    <input
      class="btn btn-success m-1"
      type="button"
      value="Verpdf"
      @click="ver"
    />
  </div>
</template>

<script>
import axios from "axios";
import { jsPDF } from "jspdf";
import { mapActions } from "vuex";

let procedure = {
  userId: 1,
  categoryId: 5,
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
      modal: false,
      paso: 0,
      validation: null,
      loading: false,
      textInput: "",
      selected: 0,
      submitted: false,
    };
  },
  methods: {
    ...mapActions(["saveP"]),

    preNext() {
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
        selected = 1;
      } else {
        optionTitle = this.questionProp[this.paso].question[this.selected][0];
      }

      console.log(selected);

      let q = {
        question: this.questionProp[this.paso].question_id,
        options: [
          {
            questionOption: this.questionProp[this.paso].question[selected][2],
            answer: optionTitle,
          },
        ],
      };

      console.log(procedure);

      procedure.questions.push(q);

      this.selected = 0;
      this.textInput = "";
      this.validation = true;
      this.paso++;
    },
    submitt() {
      this.preNext();

      console.log(procedure);

      if (this.validation) {
        this.loading = true;
        this.modal = true;
        const apiClient = axios.create({
          baseURL: "//localhost:3000/",
          withCredentials: false,
          headers: {
            "auth-header": localStorage.getItem("token"),
          },
        });

        apiClient
          .post("/oficina/procedures/submit-procedure", {
            userId: procedure.userId,
            categoryId: procedure.categoryId,
            statusId: procedure.statusId,
            questions: procedure.questions,
          })
          .then((response) => {
            if (response.status == 201) {
              this.submitted = true;
              this.$router.replace({ path: "/prueba" });
            }

            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });

        // dbService
        //   .postProcedure(procedure)
        //   .then((response) => {
        //     if (response.status == 201) {
        //       this.submitted = true;
        //       this.$router.replace({ path: "/prueba" });
        //     }

        //     console.log(response);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
        this.loading = false;
      }
    },
    ver() {
      var doc = new jsPDF();
      doc.setTextColor(120, 12, 3);
      doc.setFontSize(22);

      doc.text(20, 20, `${procedure.questions[0].options[0].answer}`);

      doc.setTextColor(20);
      doc.setFontSize(16);
      doc.text(20, 30, "This is some normal sized text underneath.");

      doc.save("a4.pdf");
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
