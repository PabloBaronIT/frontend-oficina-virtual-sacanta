<template>
  <div class="container">
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
            :type="
              questionProp[0].question[this.paso].question_options[key].type
            "
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
            :type="
              questionProp[0].question[this.paso].question_options[key].type
            "
            v-model="this.textInput"
          />

          <div
            v-if="
              questionProp[0].question[this.paso].question_options[key].type ==
              'file'
            "
            class="file-container"
          >
            <div v-if="!asd" class="file-intro">
              <img
                src="@/assets/tramite-logo.svg"
                alt=""
                id="img-preview"
                class="imgFile"
              />

              <hr />
              <input
                accept=".jpg, .jpeg, .png, .webp"
                :type="
                  questionProp[0].question[this.paso].question_options[key].type
                "
                v-model="this.fileSelect"
                id="img-uploader"
                @change="selectFile($event)"
              />

              <!--INPUT PARA SUBIR EL ARCHIVO-->
              <input
                v-if="this.fileSelect"
                class="m-2 btn btn-secondary"
                type="button"
                value="Subir archivo"
                @click="postFile()"
              />
            </div>
            <div v-else class="cargado">
              <img
                src="@/assets/red-check-mark-icon.svg"
                alt=""
                id="img-preview"
                class="imgFile"
              />
              <p>Archivo cargado</p>
            </div>
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
      <!--INPUT PARA ENVIAR TODAS LAS RESPUESTAS-->
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
  </div>
</template>

<script>
import axios from "axios";
import { jsPDF } from "jspdf";
// import { mapActions } from "vuex";

var procedure = {
  title: "",
  userId: "",
  categoryId: null,
  statusId: 1,
  procedureId: null,
  selected: null,
  questions: [],
  date: new Date(),
};

export default {
  name: "FormularioComponent",

  props: {
    length: Number,
    questionProp: Object,
    title: String,
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
      file: null,
      fileSelect: null,
      asd: false,
      // idProcedure: null,
    };
  },
  created() {
    // Get a los templates de procedures para enviarlos por pro a formulario componente
    // const apiClient = axios.create({
    //   baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
    //   //baseURL: process.env.VUE_APP_BASEURL,
    //   withCredentials: false,
    //   headers: {
    //     "auth-header": localStorage.getItem("token"),
    //   },
    // });

    // apiClient
    //   .get("/oficina/procedures/template/" + this.$route.params.formularioId)
    //   .then((response) => {
    //     console.log("Id desde componente: " + response.data.Template.id);
    //     this.idProcedure = response.data.Template.id;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    this.catId = this.$route.params.categoriaId;
    procedure.categoryId = parseInt(this.$route.params.categoriaId);
    procedure.title = this.title;
    // procedure.procedureId = this.idProcedure;
    //procedure.representativeId = 1;
    procedure.userId = localStorage.getItem("id");
    console.log(procedure.procedureId, "soy el procedur.procedureid");
  },
  methods: {
    // ...mapActions(["saveP"]),
    dispatchClean() {
      this.$store.dispatch("cleanAction");
    },
    preNext() {
      if (this.selected == 0 && this.textInput == "") {
        this.validation = false;
      } else if (this.selected == 0 && this.textInput != "") {
        this.next();
      } else if (this.selected != 0 && this.textInput == "") {
        this.next();
      }
      this.asd = false;
    },
    selectFile($event) {
      const imgPreview = document.getElementById("img-preview");

      this.file = $event.target.files[0];
      const objectURL = URL.createObjectURL(this.file);
      imgPreview.src = objectURL;
      console.log(this.file, "soy el archivo");
    },
    postFile: async function () {
      const CLOUDINARY_URL =
        "https://api.cloudinary.com/v1_1/ddko88otf/image/upload";
      const CLOUDINARY_UPLOAD_PRESET = "lylceews";
      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          this.textInput = data.secure_url;
          console.log(data.secure_url, "secure_url");
          console.log(data);
          console.log(this.textInput, "archivo cargado en textInput");
          //this.preNext();
          this.fileSelect = null;
          this.asd = true;
        });

      //console.log(res.secure_url, "soy la url de la imagen");
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
      console.log(procedure.questions);
      this.selected = 0;
      choice = 0;
      this.textInput = "";
      this.validation = true;
      this.paso++;
    },

    //ENVIO DE LAS RESPUESTAS -FINAL DEL FORMULARIO-

    submitt() {
      //console.log(this.questionProp + "holaaa");
      if (this.selected == 0 && this.textInput == "") {
        this.validation = false;
      } else {
        this.validation = true;
      }
      // this.loading = true;
      //console.log(procedure.procedureId + "procedureId");

      if (this.validation) {
        this.preNext();

        this.loading = true;
        this.modal = true;
        const apiClient = axios.create({
          //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
          baseURL: process.env.VUE_APP_BASEURL,
          withCredentials: false,
          headers: {
            "auth-header": localStorage.getItem("token"),
          },
        });

        apiClient
          .post("/oficina/procedures/submit-procedure", {
            //representativeId: procedure.representativeId,
            categoryId: procedure.categoryId,
            statusId: procedure.statusId,
            questions: procedure.questions,
            procedureId: parseInt(this.$route.params.formularioId),
          })
          .then((response) => {
            if (response.status == 201) {
              // this.$store.commit("cleanStore");
              this.dispatchClean();
              this.$store.commit("saveProcedure", JSON.stringify(procedure));
              this.submitted = true;
              procedure.questions = [];
              this.$router.replace({ path: "/prueba" });
              console.log(this.$store.procedure[0]);
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
      this.$router.replace({ path: "/munienlinea" });
      procedure.questions = [];
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
.container {
  text-align: left;
}
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
.file-intro {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
}
.cargado {
  text-align: center;
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
.imgFile {
  height: 4rem;
  width: 4rem;
  margin: auto;
}
</style>
