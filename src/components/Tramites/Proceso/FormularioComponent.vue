<template>
  <div class="container">
    <div v-if="this.loading" class="spinner-border" role="status">
      <span>cargando rey</span>
    </div>
    <div class="question" v-if="!this.loading">
      <div class="topquestion">
        <!-- <h1 class="fontB">{{ questionProp[0].question.title }}</h1> -->
        <h3>
          {{ this.preguntas[this.paso].question.title }}
        </h3>
        <p>Completar las preguntas</p>
      </div>
      <form action="" class="option-container">
        <!--detalle de opciones  -->
        <div
          :v-if="
            this.preguntas[this.paso].questionOption.length >= 1 &&
            this.paso > this.preguntas.length
          "
          v-for="(item, index) in this.preguntas[this.paso].questionOption"
          :key="item.id"
          class="questions"
        >
          <!-- INPUT TIPO RADIO -->
          <div class="tipoRadio" v-if="item.type == 'radio'">
            <input
              :name="item.title"
              :type="item.type"
              v-model="this.selected"
              :value="index"
            />
            <div>
              <label :for="item.title" class="option-text">
                {{ item.title }}</label
              >
              <br />
              <label :for="item.id" class=""
                ><p>
                  {{ item.description }}
                </p>
              </label>
            </div>
          </div>

          <!-- INPUT TIPO TEXTO -->
          <div
            v-if="item.type == 'number' || item.type == 'text'"
            class="tipoTexto"
          >
            <input
              class="form-control text-number-input"
              :type="item.type"
              v-model="this.textInput"
            />
          </div>

          <!-- INPUT TIPO FILE -->

          <div v-if="item.type == 'file'" class="file-container">
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
                :type="item.type"
                v-model="this.fileSelect"
                id="img-uploader"
                @change="selectFile($event)"
              />

              <!--INPUT PARA SUBIR EL ARCHIVO-->
              <div class="fileup">
                <input
                  v-if="this.fileSelect"
                  class="m-2 btn btn-secondary"
                  type="button"
                  value="Subir archivo"
                  @click="postFile()"
                />
              </div>
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
          class="boton"
          v-if="this.paso + 1 < this.preguntas.length"
          type="button"
          value="Siguiente"
          @click="preNext()"
        />

        <input
          v-if="this.paso + 1 > 1"
          class="boton"
          type="button"
          value="Anterior"
          @click="back()"
        />

        <input class="boton" type="button" value="Cancelar" @click="cancel()" />
      </div>

      <!-- Si esta en el ultimo paso se habilita el submitt -->
      <!--INPUT PARA ENVIAR TODAS LAS RESPUESTAS-->
      <div v-if="this.paso + 1 == this.preguntas.length" class="btn-submit">
        <input
          v-if="this.paso + 1 == this.preguntas.length"
          class="botonSubmit"
          type="button"
          value="Submitt"
          @click="submitt"
        />
        <input
          v-if="this.paso + 1 == this.preguntas.length"
          class="botonSubmit"
          type="button"
          value="Verpdf"
          @click="ver"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { jsPDF } from "jspdf";

var procedure = {
  // title: "",
  // userId: "",
  // categoryId: null,
  // statusId: 1,
  procedureId: null,
  // selected: null,
  // questions: [],
  // date: new Date(),
  questions: [],
};

export default {
  name: "FormularioComponent",

  props: {
    questionProp: Object,
  },
  data() {
    return {
      modal: false,
      paso: 0,
      validation: null,
      loading: false,
      textInput: "",
      selected: "",
      submitted: false,
      catId: null,
      file: null,
      fileSelect: null,
      asd: false,
      // idProcedure: null,
      preguntas: null,
    };
  },
  created() {
    // procedure.title = this.title;
    // procedure.userId = localStorage.getItem("id");
    this.setLoading();
    //console.log(this.questionProp);
  },
  methods: {
    dispatchClean() {
      this.$store.dispatch("cleanAction");
    },
    preNext() {
      if (this.selected == "" && this.textInput == "") {
        this.validation = false;
      } else if (this.selected == "" && this.textInput != "") {
        this.next();
      } else if (this.selected != "" && this.textInput == "") {
        this.next();
      }
      this.asd = false;
    },
    //elegir una archivo para enviar
    selectFile($event) {
      const imgPreview = document.getElementById("img-preview");

      this.file = $event.target.files[0];
      const objectURL = URL.createObjectURL(this.file);
      imgPreview.src = objectURL;
      console.log(this.file, "soy el archivo");
    },
    //GUARDAR EL ARCHIVO EN CLAUDINARY Y TOMAR SOLO LA URL
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
          this.asd = true;
          //console.log(data.secure_url, "secure_url");
          //console.log(data);
          console.log(this.textInput, "archivo cargado en textInput");
          //this.preNext();
        });
      this.fileSelect = null;
    },

    //SE GUARDA LA RESPUESTA EN UN ARRAY PARA LUEGO ENVIAR
    next() {
      let choice = this.selected;
      let optionTitle = "";

      if (this.textInput != "") {
        optionTitle = this.textInput;
        choice = 0;
      } else {
        optionTitle = this.preguntas[this.paso].questionOption[choice].title;
      }

      let q = {
        question: this.preguntas[this.paso].question.id,
        options: [
          {
            questionOption: this.preguntas[this.paso].questionOption[choice].id,
            answer: optionTitle,
          },
        ],
      };

      procedure.questions.push(q);
      console.log(procedure.questions, "RESPUESTAS");
      this.selected = "";
      choice = 0;
      this.textInput = "";
      this.validation = true;
      this.paso++;
    },

    //ENVIO DE LAS RESPUESTAS -FINAL DEL FORMULARIO-

    submitt() {
      if (this.selected == 0 && this.textInput == "") {
        this.validation = false;
      } else {
        this.validation = true;
      }

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
            questions: procedure.questions,
            procedureId: parseInt(this.$route.params.formularioId),
          })
          .then((response) => {
            if (response.status == 201) {
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
        console.log(this.procedure.questions);
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
    setLoading() {
      this.loading = true;
      this.preguntas = this.questionProp;
      if (this.preguntas.length) {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  text-align: left;
}
.questions {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  background-color: white;
  padding-left: 1rem;
}
.boton {
  width: 100px;
  height: 45px;
  background-color: gray;
  border-radius: 20px 20px 0px 0px;
  color: white;
  margin-left: 1rem;
  border-style: none;
}
.options-container {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: 100%;
  margin-bottom: 2rem;
}
.tipoRadio {
  display: flex;
  flex-direction: row;
}
.tipoRadio input[type="radio"] {
  height: 20px;
  width: 20px;
  margin-top: 22px;
  margin-right: 15px;
}
.tipoTexto {
  height: 4rem;
  padding: 1rem;
}
.tipoTexto input[type="number"] {
  width: 40%;
}
.tipoTexto input[type="text "] {
  width: 40%;
}
.file-container {
  border: 1px solid var(--grey);
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  width: 50%;
  margin: auto;
  margin-bottom: 2rem;
}
.file-intro {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
}

.file-intro input[type="file"] {
  margin: auto;
}
.imgFile {
  height: 4rem;
  width: 4rem;
  margin: auto;
}
.fileup {
  margin: auto;
}
.botonSubmit {
  width: 100px;
  height: 45px;
  background-color: var(--green);
  border-radius: 20px 20px 0px 0px;
  color: white;
  margin-left: 1rem;
  border-style: none;
}
.cargado {
  text-align: center;
}
.btn-submit {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: center;
}
.error {
  color: var(--red);
}
.btn-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: right;
  padding-right: 2rem;
}

/* 











.option-text {
  font-size: 1.1em;
}

.input-option {
  width: 50%;
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
.topquestion {
  background-color: white;
  padding-left: 4rem;
  padding-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 40px 40px 0px 0px;
  height: 7rem;
  width: 100%;
}


 */
</style>
