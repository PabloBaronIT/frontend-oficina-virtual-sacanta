<template>
  <div v-if="this.loading" class="spinner-border" role="status">
    <span>cargando rey</span>
  </div>
  <div class="question" v-if="!this.loading">
    <h3>{{ questionProp[0].question[this.paso].title }}</h3>
    <p>Completar las preguntas para cada tramite</p>

    <form action="" class="option-container">
      <div
        class="option cuestions"
        v-for="(opcion, key) in questionProp[0].question[this.paso]
          .question_options"
        :key="key"
      >
        <input
          class="radio-input"
          :id="key"
          :name="key"
          v-if="
            questionProp[0].question[this.paso].question_options[key].type ==
              'radio' ||
            questionProp[0].question[this.paso].question_options[key].type ==
              'checkbox'
          "
          :type="questionProp[0].question[this.paso].question_options[key].type"
          :value="key + 1"
          v-model="this.selected"
        />

        <label :for="key" class="option-text">{{
          questionProp[0].question[this.paso].question_options[key].title
        }}</label>
        <br />
        <label :for="key" class=""
          ><p>
            {{
              questionProp[0].question[this.paso].question_options[key]
                .description
            }}
          </p></label
        >

        <input
          class="form-control text-number-input"
          v-if="
            questionProp[0].question[this.paso].question_options[key].type ==
              'number' ||
            questionProp[0].question[this.paso].question_options[key].type ==
              'text'
          "
          :type="questionProp[0].question[this.paso].question_options[key].type"
          v-model="this.textInput"
        />

        <div
          v-if="
            questionProp[0].question[this.paso].question_options[key].type ==
            'file'
          "
          class="file-container"
        >
          <img src="@/assets/tramite-logo.svg" alt="" />

          <hr />
          <input
            accept=".pdf"
            :type="
              questionProp[0].question[this.paso].question_options[key].type
            "
            v-model="this.textInput"
          />
        </div>
      </div>
      <p class="error" v-show="validation == false">
        Debe seleccionar una opcion para continuar
      </p>
    </form>

    <div class="btn-div">
      <input
        class="btn btn-secondary"
        v-if="this.paso + 1 < this.length"
        type="button"
        value="Siguiente"
        @click="preNext()"
      />

      <input
        v-if="this.paso + 1 > 1"
        class="m-2 btn btn-secondary"
        type="button"
        value="Anterior"
        @click="back()"
      />

      <input
        class="m-2 btn btn-outline-secondary"
        type="button"
        value="Cancelar"
        @click="cancel()"
      />
    </div>

    <!-- Si esta en el ultimo paso se habilita el submitt -->
    <input
      v-if="this.paso + 1 == this.length"
      class="btn btn-success m-1"
      type="button"
      value="Submitt"
      @click="submitt"
    />
    <input
      v-if="this.paso + 1 == this.length"
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
  title: "",
  userId: 1,
  categoryId: null,
  statusId: 1,
  procedureId: null,
  selected: null,
  questions: [],
};

export default {
  name: "FormularioComponent",

  props: {
    length: Number,
    questionProp: Object,
    title: String,
    procedureId: Number,
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
      catId: null,
    };
  },
  created() {
    console.log(this.$route);
    this.catId = this.$route.params.categoriaId;
    procedure.categoryId = parseInt(this.$route.params.categoriaId);
    procedure.title = this.title;
    procedure.procedureId = this.procedureId;
    procedure.representativeId = 1;
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
      let choice = this.selected - 1;
      let optionTitle = "";

      if (this.textInput != "") {
        optionTitle = this.textInput;
        choice = 0;
      } else {
        optionTitle =
          this.questionProp[0].question[this.paso].question_options[choice]
            .title;
      }

      let q = {
        question: this.questionProp[0].question[this.paso].id,
        options: [
          {
            questionTitle: this.questionProp[0].question[this.paso].title,
            questionOption:
              this.questionProp[0].question[this.paso].question_options[choice]
                .id,
            answer: optionTitle,
          },
        ],
      };

      procedure.questions.push(q);

      this.selected = 0;
      choice = 0;
      this.textInput = "";
      this.validation = true;
      this.paso++;

      console.log(this.procedureId);
    },
    submitt() {
      this.preNext();
      this.loading = true;

      if (this.validation) {
        this.loading = true;
        this.modal = true;
        const apiClient = axios.create({
          baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
          withCredentials: false,
          headers: {
            "auth-header": localStorage.getItem("token"),
          },
        });

        apiClient
          .post("/oficina/procedures/submit-procedure", {
            representativeId: procedure.representativeId,
            categoryId: procedure.categoryId,
            statusId: procedure.statusId,
            questions: procedure.questions,
            procedureId: procedure.procedureId,
          })
          .then((response) => {
            if (response.status == 201) {
              this.$store.commit("cleanStore");
              this.$store.commit("saveProcedure", JSON.stringify(procedure));
              this.submitted = true;
              this.$router.replace({ path: "/prueba" });
              procedure.questions = [];
            }
          })
          .catch((err) => {
            if (err.response.status == 401) {
              alert("No esta autorizado para realizar este tramite.");
              this.$router.replace({ path: "/munienlinea" });
            }

            console.log(err);
          })
          .finally(() => {
            this.loading = false;
          });

        this.loading = false;
      }
    },
    back() {
      this.paso--;
      procedure.questions.pop();
    },
    cancel() {
      location.replace("/#/munienlinea");
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
.btn-div {
  margin-top: 5%;
}

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
  text-align: left;
  margin-top: 10px;
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
