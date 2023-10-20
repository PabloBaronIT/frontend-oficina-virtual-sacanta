<template>
  <div>
    <div v-if="this.loading" class="spinner-border" role="status">
      <span></span>
    </div>
    <!-- <div> -->
    <div class="topquestion" v-if="this.preguntas">
      <h5 style="color: #019939; font-weight: 900; font-size: 24px">
        {{ this.preguntas[this.paso].question.title }}
      </h5>
    </div>
    <!-- <div class="modalReclamo" v-if="this.modalReclamo">
        <h3>Su reclamo ha sido enviado! gracias por confiar en nosotros!</h3>
        <p @click="setModal">cerrar</p>
      </div> -->
    <form action="" style="margin-bottom: 17vh">
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
          v-if="item.title !== `Indique la ubicación` && item.type === 'text'"
          class="tipoTexto"
        >
          <!-- <label class="option-text">{{ item.title }}</label -->
          <!-- ><br /> -->
          <label for=""> {{ item.description }}</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            style="width: 27vw; margin-left: 1rem"
          ></textarea>

          <!-- <textarea
            class="form-control text-number-input"
            :type="item.type"
            v-model="this.textInput"
          /> -->
        </div>
        <div
          v-if="item.title !== `Indique la ubicación` && item.type === 'number'"
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
          v-if="item.type == 'text' && item.title == `Indique la ubicación`"
          class="tipoMap"
        >
          <div
            style="
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
            "
          >
            <label>Calle</label>
            <input
              class="form-control text-number-input"
              :type="item.type"
              v-model="this.calle"
            />
            <label>Numero</label>
            <input
              class="form-control text-number-input"
              :type="item.type"
              v-model="this.numero"
            />
          </div>
          <div
            style="
              margin-bottom: 4vh;
              display: flex;
              flex-direction: row;
              align-items: center;
            "
          >
            <label>Entre calles</label>
            <input
              class="form-control text-number-input"
              :type="item.type"
              v-model="this.entrecalles"
            />
          </div>

          <!-- <label>{{ item.title }}</label
          ><br />
          <label for=""> {{ item.description }}</label> -->
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
    <!-- <div class="btn-div">
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
    </div> -->
    <div class="volver">
      <div style="display: flex; flex-direction: row">
        <!-- <router-link
          :to="`/formulario/${this.sectorTitle}/${this.formularioTitle}`"
        > -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 71 70"
          fill="none"
          @click="back()"
        >
          <path
            d="M38.13 69.3C36.42 69.3 34.71 69.3 33 69.3C32.18 69.19 31.35 69.1 30.53 68.98C22.29 67.71 15.32 64.01 9.78999 57.77C2.71999 49.78 -0.0700368 40.4 1.35996 29.85C2.46996 21.61 6.22997 14.66 12.43 9.11997C20.49 1.91997 29.97 -0.890046 40.64 0.599954C48.81 1.72995 55.65 5.50995 61.2 11.6C65.66 16.5 68.46 22.21 69.6 28.74C69.81 29.93 69.94 31.14 70.11 32.34C70.11 34 70.11 35.67 70.11 37.33C70.07 37.53 70.02 37.72 70 37.92C69.81 39.94 69.51 41.94 68.92 43.88C64.91 57 56.24 65.23 42.92 68.56C41.35 68.94 39.73 69.06 38.13 69.3ZM35.65 5.62998C19.62 5.59998 6.43997 18.7 6.45997 34.75C6.47997 50.85 19.37 63.81 35.49 63.86C51.69 63.9 64.69 50.76 64.68 34.75C64.67 18.53 51.65 5.72998 35.65 5.62998Z"
            fill="url(#paint0_linear_128_960)"
          />
          <path
            d="M40.99 32.05C45.51 31.9 50.26 31.93 55 31.92C56.07 31.92 56.09 31.94 56.09 33.02C56.09 34.23 56.0801 35.45 56.1001 36.66C56.1101 37.2 55.91 37.46 55.36 37.44C55.09 37.43 54.82 37.44 54.55 37.44C45.71 37.46 36.8701 37.47 28.0401 37.49C27.4301 37.49 26.8301 37.54 26.2201 37.57C26.0701 37.58 25.87 37.53 25.81 37.72C25.76 37.9 25.9301 38 26.0401 38.1C27.0901 39.15 28.1401 40.2 29.1901 41.24C31.6001 43.63 34.0101 46.02 36.4501 48.39C36.9301 48.85 36.9901 49.14 36.4701 49.63C35.5501 50.49 34.7001 51.42 33.8201 52.32C33.2301 52.92 33.18 52.92 32.59 52.33C29.05 48.81 25.5201 45.28 21.9701 41.77C19.8501 39.66 17.7201 37.56 15.5701 35.48C15.0801 35.01 15.0901 34.72 15.5701 34.23C21.1901 28.59 26.79 22.94 32.4 17.29C33.05 16.63 33.05 16.64 33.71 17.29C34.6 18.18 35.48 19.09 36.4 19.95C36.85 20.37 36.7901 20.63 36.3801 21.04C32.9601 24.45 29.5501 27.89 26.1401 31.31C26.0101 31.44 25.8801 31.56 25.7601 31.7C25.5801 31.91 25.6601 32.02 25.9101 32.04C26.1101 32.05 26.31 32.05 26.52 32.05C31.28 32.05 36.03 32.05 40.99 32.05Z"
            fill="url(#paint1_linear_128_960)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_128_960"
              x1="1.00776"
              y1="34.75"
              x2="70.1135"
              y2="34.75"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#9CBD1D" />
              <stop offset="1" stop-color="#038638" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_128_960"
              x1="15.219"
              y1="34.7911"
              x2="56.1099"
              y2="34.7911"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#9CBD1D" />
              <stop offset="1" stop-color="#038638" />
            </linearGradient>
          </defs>
        </svg>
        <!-- </router-link> -->

        <h4>Volver atrásssss</h4>
      </div>
      <div style="display: flex; flex-direction: row" @click="preNext()">
        <h4>Siguiente</h4>

        <!-- <router-link
          :to="`/formulario/cuestionario/${this.$route.params.formularioTitle}/${this.$route.query.formularioId}?sector=${this.$route.params.sectorTitle}`"
        > -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="66"
          height="66"
          viewBox="0 0 66 66"
          fill="none"
        >
          <path
            d="M34.1034 43.3125L44.3359 33L34.1034 22.6875M42.9141 33H22.1641"
            stroke="url(#paint0_linear_998_1721)"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8.5 33C8.5 19.3359 19.5859 8.25 33.25 8.25C46.9141 8.25 58 19.3359 58 33C58 46.6641 46.9141 57.75 33.25 57.75C19.5859 57.75 8.5 46.6641 8.5 33Z"
            stroke="url(#paint1_linear_998_1721)"
            stroke-width="5"
            stroke-miterlimit="10"
          />
          <defs>
            <linearGradient
              id="paint0_linear_998_1721"
              x1="16"
              y1="33"
              x2="53"
              y2="33"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FFCC03" />
              <stop offset="1" stop-color="#019939" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_998_1721"
              x1="-3"
              y1="33"
              x2="65"
              y2="33"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FFCC03" />
              <stop offset="1" stop-color="#019939" />
            </linearGradient>
          </defs>
        </svg>
        <!-- </router-link> -->
      </div>
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
    <div v-if="this.mensaje != null">
      <p>
        {{ this.mensaje }}
      </p>
    </div>
    <div v-if="this.paso + 1 === this.preguntas.length" class="btn-submit">
      <input
        class="botonSubmit"
        type="button"
        value="Submitt"
        @click="submitt"
      />
      <!-- <input
        v-if="this.paso + 1 == this.preguntas.length"
        class="botonSubmit"
        type="button"
        value="Verpdf"
        @click="ver"
      /> -->
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
      mensaje: null,
      sectorTitle: "",
      formularioTitle: "",
      calle: "",
      numero: "",
      entrecalles: "",
    };
  },
  created() {
    // procedure.title = this.title;
    // procedure.userId = localStorage.getItem("id");
    this.loading = true;
    this.setLoading();
    this.sectorTitle = this.$route.query.sector;
    this.formularioTitle = this.$route.params.formularioTitle;
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
      this.textInput = this.calle + this.numero + this.entrecalles;
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
      this.coordenadas = "";
      this.validation = true;

      this.paso++;
    },

    //ENVIO DE LAS RESPUESTAS -FINAL DEL FORMULARIO-

    submitt() {
      if (
        this.selected == 0 &&
        this.textInput == "" &&
        this.coordenadas == ""
      ) {
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
            } else {
              this.mensaje = "Se ha producido un error, vuelva a interntarlo.";
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
/* CSS NUEVO */
.volver {
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 3.5%;
  bottom: 0;
}
.volver h4 {
  /* margin-left: 14px; */
  color: #808081;
  font-weight: 100;
  margin-top: 1.5vh;
  margin-left: 1vw;
  margin-right: 1vw;
}
.tipoMap {
  padding: 1rem;
}
.tipoMap input {
  width: 20vw;
  margin-left: 1rem;
  border-radius: 10px;
  margin-top: 1rem;
}
.questions {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  /* background-color: white; */
  padding-left: 1rem;
  width: 50vw;
  margin: auto;
}

.topquestion {
  /* background-color: white; */
  padding-left: 3rem;
  padding-top: 1rem;
  margin: auto;
  /* margin-bottom: 1rem; */
  /* border-radius: 40px 40px 0px 0px; */
  height: 5rem;
  width: 50vw;
}
.tipoTexto {
  height: 7rem;
  padding: 1rem;
  display: flex;
  flex-direction: row;
}

.tipoTexto input[type="number"] {
  width: 40%;
  margin-left: 1rem;
  border-radius: 10px;
  margin-top: 1rem;
}
.tipoTexto input[type="text"] {
  width: 40%;
  margin-left: 1rem;
  border-radius: 10px;
  margin-top: 1rem;
}
.error {
  color: var(--red);
  text-align: center;
  font-size: 27px;
  font-weight: 700;
}
/* ---------- */

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
