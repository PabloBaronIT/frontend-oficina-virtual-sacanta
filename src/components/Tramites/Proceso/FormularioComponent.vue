<template>
  <div class="container">
    <div v-if="this.loading" class="spinner-border" role="status">
      <span></span>
    </div>
    <!-- <div> -->
    <div class="topquestion" v-if="this.preguntas">
      <h3>
        {{ this.preguntas[this.paso].question.title }}
      </h3>
      <p>Completar las preguntas</p>
    </div>
    <!-- <div class="modalReclamo" v-if="this.modalReclamo">
        <h3>Su reclamo ha sido enviado! gracias por confiar en nosotros!</h3>
        <p @click="setModal">cerrar</p>
      </div> -->
    <form action="">
      <!--DETALLES DE OPCIONES-->
      <div
        :v-if="
          this.preguntas[this.paso].questionOption?.length >= 1 &&
          this.paso > this.preguntas.length
        "
        v-for="(item, index) in this.preguntas[this.paso].questionOption"
        :key="item.id"
        class="questions"
      >
        <!-- INPUT TIPO RADIO -->
        <div class="tipoRadio" v-if="item.type == 'radio'">
          <input
            :name="this.preguntas[this.paso].question.title"
            :type="item.type"
            v-model="this.selected"
            :value="index + 1"
          />
          <div>
            <label :for="item.title" class="option-text">
              {{ item.title }}</label
            >
            <br />
            <label :for="item.id" class="">
              {{ item.description }}
            </label>
          </div>
        </div>

        <!-- INPUT TIPO TEXTO -->
        <div
          v-if="
            item.title !== `Marque la ubicacion en el mapa` &&
            item.type === 'text'
          "
          class="tipoTexto"
        >
          <label class="option-text">{{ item.title }}</label
          ><br />
          <label for=""> {{ item.description }}</label>

          <input
            class="form-control text-number-input"
            :type="item.type"
            v-model="this.textInput"
          />
        </div>
        <div
          v-if="
            item.title !== `Marque la ubicacion en el mapa` &&
            item.type === 'number'
          "
          class="tipoTexto"
        >
          <label class="option-text">{{ item.title }}</label
          ><br />
          <label for=""> {{ item.description }}</label>

          <input
            class="form-control text-number-input"
            :type="item.type"
            v-model="this.textInput"
          />
        </div>
        <!-- PARA VER MAPA Y PODER ESCRIBIR DIRECCION -->
        <div
          v-if="
            item.type == 'text' &&
            item.title == `Marque la ubicacion en el mapa`
          "
          class="tipoMap"
        >
          <label>{{ item.title }}</label
          ><br />
          <label for=""> {{ item.description }}</label>
          <MapaLocationComponentVue :setTextInput="this.setTextInput" />
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
    <div
      class="alert alert-success text-center"
      role="alert"
      v-if="this.servicio === true"
    >
      <h5>
        Gracias por utilizar la Oficina Virtual de la municipalidad de Sacanta!
        <h6>Su reclamo ha sido presentado!</h6>
      </h5>
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
    <!-- </div> -->
    <!-- MODAL DE VISTA DE SERVICIO PRESENTADO -->
  </div>
</template>

<script>
import axios from "axios";
import { jsPDF } from "jspdf";
import setToken from "@/middlewares/setToken";
import setTokenRelations from "@/middlewares/setTokenRelations";
import { BASE_URL } from "@/env";
import MapaLocationComponentVue from "../../Mapa/MapaLocationComponent.vue";
// var procedure = {
//   title: "",
//   userId: "",
//   categoryId: null,
//   statusId: 1,
//   procedureId: null,
//   selected: null,
//   questions: [],
//   date: new Date(),
//   questions: [],
// };

export default {
  name: "FormularioComponent",

  props: {
    questionProp: Array,
    nivel: Number,
    dispatchProcedure: Function,
    setProcedure: Function,
    outProcedure: Function,
  },
  components: {
    MapaLocationComponentVue,
  },
  data() {
    return {
      modalReclamo: false,
      paso: 0,
      validation: null,
      loading: false,
      textInput: "",
      coordenadas: "",
      selected: "",
      //submitted: false,
      catId: null,
      file: null,
      fileSelect: null,
      asd: false,
      // idProcedure: null,
      preguntas: null,
      respuestas: [],
      servicio: false,
    };
  },
  created() {
    // procedure.title = this.title;
    // procedure.userId = localStorage.getItem("id");
    this.loading = true;
    this.setLoading();
    console.log(this.nivel, "soy el nivel");
  },
  methods: {
    setTextInput(a, b) {
      console.log(a, b, "soy las coordenadas");
      let valor = `${a},${b}`;
      this.coordenadas = valor;
    },
    setModal() {
      this.modalReclamo = !this.modalReclamo;
    },
    dispatchClean() {
      this.$store.dispatch("cleanAction");
    },

    preNext() {
      if (
        this.selected == "" &&
        this.textInput == "" &&
        this.coordenadas == ""
      ) {
        this.validation = false;
      } else if (
        this.selected != "" &&
        this.textInput == "" &&
        this.coordenadas == ""
      ) {
        this.next();
      } else if (
        this.selected == "" &&
        this.textInput != "" &&
        this.coordenadas == ""
      ) {
        this.next();
      } else if (
        this.selected == "" &&
        this.textInput == "" &&
        this.coordenadas != ""
      ) {
        this.next();
      } else if (
        this.selected == "" &&
        this.textInput != "" &&
        this.coordenadas != ""
      ) {
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
      let CLOUDINARY_UPLOAD_PRESET = "lylceews";
      let CLOUDINARY_URL =
        "https://api.cloudinary.com/v1_1/ddko88otf/image/upload";
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
      // let choice = this.selected - 1;
      // let optionTitle = "";

      // if (this.textInput != "") {
      //   optionTitle = this.textInput;
      //   choice = 0;
      // } else {
      //   optionTitle = this.preguntas[this.paso].questionOption[choice].title;
      // }

      // let q = {
      //   question: this.preguntas[this.paso].question.id,
      //   question_option_history: [
      //     {
      //       questionOption: this.preguntas[this.paso].questionOption[choice].id,
      //       answer: optionTitle,
      //     },
      //   ],
      // };

      let choice = this.selected - 1;
      let optionTitle = "";
      let optionTitle2 = "";
      let q = "";
      if (this.textInput != "" && this.coordenadas == "") {
        optionTitle = this.textInput;
        choice = 0;
        q = {
          question: this.preguntas[this.paso].question.id,
          question_option_history: [
            {
              questionOption:
                this.preguntas[this.paso].questionOption[choice].id,
              answer: optionTitle,
            },
          ],
        };
      } else if (this.textInput == "" && this.coordenadas != "") {
        optionTitle = this.coordenadas;
        choice = 1;
        q = {
          question: this.preguntas[this.paso].question.id,
          question_option_history: [
            {
              questionOption:
                this.preguntas[this.paso].questionOption[choice].id,
              answer: optionTitle,
            },
          ],
        };
      } else if (this.textInput != "" && this.coordenadas != "") {
        optionTitle = this.textInput;
        optionTitle2 = this.coordenadas;
        choice = 0;
        let choice2 = 1;
        q = {
          question: this.preguntas[this.paso].question.id,
          question_option_history: [
            {
              questionOption:
                this.preguntas[this.paso].questionOption[choice].id,
              answer: optionTitle,
            },
            {
              questionOption:
                this.preguntas[this.paso].questionOption[choice2].id,
              answer: optionTitle2,
            },
          ],
        };
      } else {
        optionTitle = this.preguntas[this.paso].questionOption[choice].title;
        q = {
          question: this.preguntas[this.paso].question.id,
          question_option_history: [
            {
              questionOption:
                this.preguntas[this.paso].questionOption[choice].id,
              answer: optionTitle,
            },
          ],
        };
      }

      this.setProcedure(q);
      this.respuestas.push(q);
      console.log(this.respuestas, "!respuestas ");
      // this.procedure.questions.push(q);
      //console.log(this.procedure.questions, "RESPUESTAS");
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
        //this.modal = true;
        const apiClient = axios.create({
          baseURL: BASE_URL,
          withCredentials: false,
          headers: {
            "auth-header": localStorage.getItem("token"),
          },
        });

        apiClient
          .post("/oficina/procedures/submit-procedure", {
            // questions: this.procedure.questions,
            questions: this.respuestas,
            procedureId: parseInt(this.$route.params.formularioId),
          })
          .then((response) => {
            console.log(response);
            if (response.status == 201) {
              let idTramite = response.data.procedure_history_id;

              //   //this.submitted = true;
              //this.procedure.questions = [];
              if (this.nivel === 2) {
                this.$router.push(`/pago/${idTramite}`);
              } else {
                this.textInput = "";
                alert(
                  "Su reclamo fue presentado! Gracia por utilizar nuestra Oficina Virtual."
                );
              }
              this.dispatchClean();
              this.dispatchProcedure();
              //   //console.log(this.$store.procedure[0]);
            }
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status == 401) {
              alert("No esta autorizado para realizar este tramite.");
              this.$router.replace({ path: "/munienlinea" });
            }
            if (error.response.status === 500) {
              if (error.response.data.message === "Token de usuario expirado") {
                setToken();
                this.submitt();
              }
              if (
                error.response.data.message ===
                "Token de representante expirado"
              ) {
                setTokenRelations();
                this.submitt();
              }
            }
          })
          .finally(() => {
            this.loading = false;
          });

        this.loading = false;
        //console.log(this.procedure.questions);
      }
    },
    back() {
      this.paso--;
      this.outProcedure();
      this.preguntas.pop();
    },
    cancel() {
      this.$router.replace({ path: "/munienlinea" });
      this.preguntas = [];
    },
    ver() {
      var doc = new jsPDF();
      doc.setTextColor(120, 12, 3);
      doc.setFontSize(22);
      //doc.text(20, 20, `${procedure.questions[0].options[0].answer}`);
      doc.setTextColor(20);
      doc.setFontSize(16);
      doc.text(20, 30, "This is some normal sized text underneath.");
      doc.save("a4.pdf");
    },
    setLoading() {
      this.preguntas = this.questionProp;
      this.loading = false;
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
.topquestion {
  background-color: white;
  padding-left: 3rem;
  padding-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 40px 40px 0px 0px;
  height: 8rem;
  width: 100%;
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
  height: 7rem;
  padding: 1rem;
}
.tipoMap {
  padding: 1rem;
}
.tipoTexto input[type="number"] {
  width: 40%;
}
.tipoTexto input[type="text"] {
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
.option-text {
  font-size: 1.1em;
}
.modalReclamo {
  position: absolute;
  top: 15rem;
  left: 30rem;
  height: 10rem;
  width: 20rem;
  background: white;
  display: flex;
  flex-direction: column;
  z-index: 15;
  text-align: center;
  color: var(--green);
}

/* 













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



 */
</style>
