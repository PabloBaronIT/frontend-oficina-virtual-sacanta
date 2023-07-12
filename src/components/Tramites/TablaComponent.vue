<template>
  <div class="tabla-container">
    <table v-if="!this.loading">
      <tr>
        <th>Titulo</th>
        <th>ID</th>
        <th>Ultimo movimiento</th>
        <th class="media">Asunto</th>
        <th>Estado</th>
        <th></th>
      </tr>

      <tr class="fila-tabla" v-for="(p, key) in this.activos" :key="key">
        <td @click="verTramite(p.id)">{{ p.titulo || "" }}</td>
        <td @click="verTramite(p.id)">{{ p.id || "" }}</td>
        <td @click="verTramite(p.id)">{{ p.fecha || "" }}</td>
        <td class="media" @click="verTramite(p.id)">{{ p.categoria || "" }}</td>
        <td :class="'estado-fila'" @click="verTramite(p.id)">
          <p :style="`background: ${p.color}`" @click="verTramite(p.id)">
            {{ p.estado || "" }}
          </p>
        </td>

        <td>
          <p v-if="p.comunicaciones >= 1">
            <a
              data-bs-toggle="collapse"
              href="#collapseExample"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
              @click="this.getComunicaciones(p.id)"
            >
              <img
                class="svg"
                src="@/assets/comunicacion.svg"
                alt="comunicaciones"
              />
            </a>
          </p>
        </td>

        <!-- MODAL VISTA COMUNICACIONES-->
        <div
          class="modalComunicacion"
          id="collapseExample"
          v-if="this.selectTramite === p.id && this.modalComunicaciones"
        >
          <div class="card card-body">
            <!-- <div v-if="this.loading" class="spinner-border loading" role="status">
      <span class="sr-only"></span>
    </div> -->

            <div class="title">
              <strong>{{ this.comunicaciones.subject || "" }} : </strong>

              {{ this.comunicaciones.message || "" }}
            </div>

            <div class="fecha">
              <span>
                {{
                  new Date(this.comunicaciones.created_at).toLocaleString() ||
                  ""
                }}
              </span>
            </div>
            <div style="padding-top: 0.3rem">
              <p>
                Ingrese a la seccion mis Comunicaciones para ver su historial.
              </p>
            </div>
          </div>
        </div>
      </tr>

      <!--MODAL PARA RESPONDER AL REQUERIMIENTO-->
      <div class="modalRespuesta">
        <div v-if="this.modalresponse === true" class="modal-content">
          <div class="modal-top">
            <h3 v-if="!this.message">Enviar respuesta</h3>
            <p>Nº Tramite: {{ this.idTramite }}</p>
            <img
              @click="CloseModalRespuesta($event)"
              class="svg"
              src="@/assets/close.svg"
              alt=""
            />
          </div>
          <!--RESPUESTA ESCRITA-->

          <div class="response" v-if="!message">
            <label for="asunto">Respuesta</label>
            <textarea
              aria-multiline="true"
              name="asunto"
              id=""
              v-model="this.respuestaA"
            />

            <!--SUBIR ARCHIVOS-->

            <div class="file-container2">
              <div v-if="!asd" class="file-intro">
                <img
                  v-if="!this.messageResponse"
                  src="@/assets/tramite-logo.svg"
                  alt=""
                  id="img-preview"
                  class="imgFile"
                />

                <hr />
                <input
                  accept=".jpg, .jpeg, .png, .webp"
                  type="file"
                  id="img-uploader"
                  @change="selectFile($event)"
                />

                <!--INPUT PARA SUBIR EL ARCHIVO-->
                <div class="fileup">
                  <input
                    v-if="this.file"
                    class="m-2 btn btn-secondary"
                    type="button"
                    value="Subir archivo"
                    @click="postFile()"
                  />
                </div>
              </div>
              <!--CUANDO SE TEMRINO DE CARGAR EL ARCHIVO-->

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

            <input
              class="botonSubmit"
              type="button"
              value="Enviar"
              @click="sentRespuesta"
              v-if="this.respuestaA || this.respuestaB"
            />
          </div>
          <p v-if="message" class="enviado">{{ this.message }}</p>
        </div>
      </div>

      <!-- MODAL DE VISTA DEL TRAMITE -->
      <div v-if="modalVista" class="grafico-container">
        <div class="modal-top">
          <h3>
            {{ this.selectTramite.procedure.category.title }}
          </h3>
          <img
            @click="this.modalVista = false"
            class="svg"
            src="@/assets/close.svg"
            alt=""
          />
        </div>
        <div class="data-container">
          <div>
            Tramite n°:{{ this.selectTramite.procedure.id }}
            <br />
            Presentado el dia:
            {{
              new Date(
                this.selectTramite.procedure.created_at
              ).toLocaleDateString()
            }}
          </div>

          <p>
            Nombre de tramite:
            {{ this.selectTramite.procedure.procedure.title }}
            <br />

            Estado:{{ this.selectTramite.procedure.status.status }}
          </p>
          <!-- SI EXISTE REQUERIMIENTO ACTIVO SE PUEDE VER Y CONTESTAR -->
          <div
            v-if="
              this.selectTramite.procedure.requirementHistory.length >= 1 &&
              this.selectTramite.procedure.requirementHistory[
                this.selectTramite.procedure.requirementHistory.length - 1
              ].active === true
            "
            class="requerimiento"
          >
            <p>
              Requerimiento:
              <strong>{{
                this.selectTramite.procedure.requirementHistory[
                  this.selectTramite.procedure.requirementHistory.length - 1
                ].info_req
              }}</strong>
            </p>

            <!--BOTON PARA MODAL DE RESPUESTA AL REQUERIMIENTO-->
            <input
              v-if="
                this.selectTramite.procedure.requirementHistory[
                  this.selectTramite.procedure.requirementHistory.length - 1
                ].active === false
              "
              type="button"
              value="Responder"
              @click="
                OpenModalRespuesta(
                  this.selectTramite.procedure.requirementHistory[
                    this.selectTramite.procedure.requirementHistory.length - 1
                  ].id
                )
              "
              class="botonSubmit"
            />
          </div>
          <!-- SI EXISTEN DOCUMENTOS RELACIONADOS A ESTE TRAMITE SE PUEDEN VER Y DESCARGAR -->
          <div
            v-if="this.selectTramite.procedure.documents.length >= 1"
            class="divDocumentos"
          >
            <h5>Documentación disponible para descargar</h5>
            <div
              v-for="item in this.selectTramite.procedure.documents"
              :key="item.id"
              style="display: flex; flex-direction: row"
            >
              <p>*{{ item.title }}</p>
              <a target="_blank" :href="`${item.link}`">Descargar </a>
            </div>
          </div>
        </div>
      </div>
    </table>

    <div class="loader">
      <div
        v-if="this.loading == true && this.msj === ''"
        class="spinner-grow text-secondary"
        role="status"
      >
        <span class="sr-only"></span>
      </div>
      <div
        v-if="this.loading == true && this.msj === ''"
        class="spinner-grow text-secondary"
        role="status"
      >
        <span class="sr-only"></span>
      </div>
      <div
        v-if="this.loading == true && this.msj === ''"
        class="spinner-grow text-secondary"
        role="status"
      >
        <span class="sr-only"></span>
      </div>

      <h2 v-if="this.msj !== ''" class="sinTramites">{{ this.msj }}</h2>
    </div>
    <div class="filtro-filas">
      <div class="nav">
        <img
          class="svg"
          @click="backTramites"
          src="@/assets/previous.svg"
          alt=""
          v-if="this.pagina > 1"
        />
        <div class="pagNum">
          {{ this.pagina }}
        </div>

        <img
          @click="nextPag"
          class="svg"
          src="@/assets/next.svg"
          alt=""
          v-if="this.l > 10"
        />
      </div>

      <div v-if="this.msj == ''" class="cant">
        <p>
          Cantidad total de tramites: <b>{{ this.activos.length }}</b>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// import dbService from "@/services/dbService";
import axios from "axios";

export default {
  props: {
    color: String,
  },

  data() {
    return {
      loading: false,
      msj: "",
      length: null,
      activos: [],
      cont: 0,
      l: 0,
      paginas: null,
      modalComunicaciones: false,
      modalVista: false,
      modalresponse: false,
      selectTramite: null,
      selectRequerimiento: null,
      respuestaA: null,
      respuestaB: [],
      asd: false,
      file: "",
      pagina: 1,
      idTramite: null,
      comunicaciones: "",
    };
  },
  created() {
    //Pedir solamente los que vengan desde una prop del status
    this.getMyPorcedure();
    this.getComunicaciones();
  },
  methods: {
    verTramite(id) {
      //console.log("soy el trmite,", id);
      this.idTramite = id;
      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get("/oficina/procedures/my-procedure/" + id)
        .then((response) => {
          console.log(response.data);
          this.selectTramite = response.data.MyProcedure;
          this.modalVista = true;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    getMyPorcedure() {
      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });

      apiClient
        .get(`/oficina/procedures/history/my-procedures?page=${this.pagina}`)
        .then((response) => {
          let h = response.data.MyProcedures;

          console.log(response.data.MyProcedures + "mis tramites");
          this.l = h.length;

          for (let i = 0; i < h.length; i++) {
            //Procedure
            let p = {
              id: null,
              fecha: null,
              categoria: "",
              estado: "",
              color: "",
              titulo: "",
              comunicaciones: null,
              // requerimientos: null,
              // comunicado: false,
              // requerido: false,
            };

            let iso = h[i].updated_at;
            let date = new Date(iso);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            //Carga del procedure
            p.id = h[i].id;
            p.fecha = `${day}/${month}/${year}`;
            p.categoria = h[i].category.title;
            p.estado = h[i].status.status;
            p.titulo = h[i].procedure.title;
            p.comunicaciones = h[i].communicationCount;
            //   ? h[i].communication
            //   : null;
            // p.comunicado = Array.isArray(h[i].communication) ? true : false;
            // p.requerimientos = Array.isArray(h[i].requirementHistory)
            //   ? h[i].requirementHistory
            //   : null;

            switch (p.estado) {
              case "PRESENTADO":
                p.color = "var(--green)";
                break;
              case "EN PROCESO":
                p.color = "var(--yellow)";
                break;
              case "PAUSADO POR REQUERIMIENTO":
                p.color = "var(--red)";
                p.requerido = true;
                break;
              case "FINALIZADO":
                p.color = "var(--lblue)";
                break;

              default:
                break;
            }

            this.activos.push(p);

            //console.log(p);
          }

          this.length = response.data.MyProcedures.length;

          //this.cantTramites();
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.msj = err.response.data.message;
        });
    },
    getComunicaciones(id) {
      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get("/oficina/procedures/my-procedure/" + id)
        .then((response) => {
          console.log(response.data);
          this.comunicaciones =
            response.data.MyProcedure.procedure.communication[
              response.data.MyProcedure.procedure.communication.length - 1
            ];
          this.openModalComunicaciones(id);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    openModalComunicaciones(id) {
      this.selectTramite = id;
      this.modalComunicaciones = !this.modalComunicaciones;
      //this.comunicado = false;
    },
    OpenModalRespuesta(id) {
      this.selectRequerimiento = id;
      this.modalresponse = !this.modalresponse;
      console.log(this.selectRequerimiento);
    },
    CloseModalRespuesta() {
      this.modalresponse = false;
      this.respuestaA = "";
      this.respuestaB = "";
    },

    backTramites() {
      // if (parseFloat(this.paginaActual) > 1) {
      //   this.paginaActual--;
      //   this.mostrados = [];
      //   this.cont = (this.paginaActual - 1) * 5;
      //   for (let i = 0; i < 5; i++) {
      //     let p = this.activos[this.cont];
      //     if (p != undefined) {
      //       this.mostrados.push(p);
      //       this.cont++;
      //     }
      //   }
      // }
      this.pagina--;
      this.getMyPorcedure();
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
          this.respuestaB.push({ file: data.secure_url });
          console.log(data.secure_url, "secure_url");
          console.log(data);
          //this.preNext();
          this.fileSelect = null;
          this.asd = true;
        });

      //console.log(res.secure_url, "soy la url de la imagen");
    },
    //ENVIAR RESPUESTA DE REQUERIMIENTO
    sentRespuesta() {
      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      if (this.respuestaA && this.respuestaB.length >= 1) {
        apiClient
          .post(
            "/requirements/answer-requirement/" + this.selectRequerimiento,
            {
              answer: this.respuestaA,
              documentRequirement: this.respuestaB,
            }
          )
          .then((response) => {
            if (response.status === 200) {
              this.message = "Respuesta enviada!";
              this.getMyPorcedure();
              this.modalComunicaciones = false;
              this.respuestaA = "";
              this.respuestaB = "";
            }
          })
          .catch((e) => {
            console.log(e);
            this.message = e.response.data.message;
          });
      }
      if (this.respuestaA && this.respuestaB.length === 0) {
        apiClient
          .post(
            "/requirements/answer-requirement/" + this.selectRequerimiento,
            {
              answer: this.respuestaA,
            }
          )
          .then((response) => {
            if (response.status === 200) {
              this.message = "Respuesta enviada!";
              this.getMyPorcedure();
              this.modalComunicaciones = false;

              this.respuestaA = "";
              this.respuestaB = "";
            }
          })
          .catch((e) => {
            console.log(e);
            this.message = e.response.data.message;
          });
      }
      if (!this.respuestaA && Array.isArray(this.respuestaB)) {
        apiClient
          .post(
            "/requirements/answer-requirement/" + this.selectRequerimiento,
            {
              documentRequirement: this.respuestaB,
            }
          )
          .then((response) => {
            if (response.status === 200) {
              this.message = "Respuesta enviada!";
              this.getMyPorcedure();
              this.modalComunicaciones = false;

              this.respuestaA = "";
              this.respuestaB = "";
            }
          })
          .catch((e) => {
            console.log(e);
            this.message = e.response.data.message;
          });
      } else {
        this.messageResponse = true;
      }
      console.log(this.respuestaA, this.respuestaB);
    },
    nextPag() {
      this.pagina++;
      this.getMyPorcedure();
    },
  },
  computed: {
    pags() {
      return "a";
    },
  },
};
</script>

<style scoped>
.modal-top {
  display: flex;
  width: 100%;
  text-align: left;
  justify-content: space-between;
  align-items: flex-start;
}
.grafico-container {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  z-index: 15;
  position: absolute;
  top: 10%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 500px; /* Need a specific value to work */
  height: auto;
  border-radius: 10px;
  /* padding: 5px; */
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.data-container {
  display: flex;
  flex-flow: column wrap;
  height: auto;
  width: 90%;
  /* align-items: s; */

  text-align: left;
}
.file-intro {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
}
.fila-tabala {
  display: flex;
  flex-direction: column;
}
.sinTramites {
  position: relative;
  width: 100%;
  height: 150px;
  text-align: center;
  padding-top: 2rem;
}
.pagNum {
  margin: 0 2px;
  font-size: 20px;
}

.loader {
  margin: 10px;
  width: 100vw;
}
.loader div {
  margin: 10px;
}

.cant {
  display: flex;
  margin: 0;
}

.nav {
  align-self: flex-start;
}

.svg {
  max-width: 20px;
}

input[type="checkbox"] {
  appearance: none;
  border: 1px solid #666;
  border-radius: 0.125rem;
  box-shadow: inset 0 0 0 0.125rem #fff;
  display: inline-block;
  height: 1rem;
  width: 1rem;
  vertical-align: bottom;
}

input[type="checkbox"]:checked {
  background: var(--green);
}

input:hover {
  border: 1px solid var(--green);
}

.filtro-filas {
  color: var(--text-color);
  padding: 10px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  border-bottom: 1px solid var(--grey);
  width: 95%;
  height: 40px;
}

.filtro-filas input {
  width: 15%;
  height: 10px;
}

.tabla-container {
  width: 80%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  margin-left: 2rem;
}
.file-container2 {
  border: 1px solid var(--grey);
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  width: 100%;
  margin: auto;
  margin-top: 2rem;
}

table {
  width: 100%;
}
img {
  height: 25px;
  width: 25px;
}

th,
td {
  padding: 8px;
  border-bottom: 1px solid var(--grey);
  background: #fff;
  height: 40px;
  color: var(--blue);
  font-size: 0.9em;
}

.fila-tabla:hover {
  outline: 1px solid var(--blue);
  cursor: pointer;
  user-select: none;
}

.estado-fila p {
  background: var(--grey-bk);
  border-radius: 20px;
  padding: 3px;
}
.modalComunicacion {
  width: 80%;
  height: auto;
  padding: 1rem;
  position: absolute;
  right: 8rem;
  background: var(--grey-bk);
  z-index: 10;
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
}
.modalRespuesta {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  z-index: 20;
  position: absolute;
  top: 0;
  height: auto;
  width: 600px; /* Need a specific value to work */
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  right: 15rem;
}
.modal-content {
  min-height: 300px;
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}
.modal-top {
  display: flex;
  width: 100%;
  text-align: left;
  justify-content: space-around;
  align-items: flex-start;
}
span {
  font-size: 15px;
  position: absolute;
  right: 4px;
  bottom: 2px;
}
.fileup {
  margin: auto;
}
.imgFile {
  height: 4rem;
  width: 4rem;
  margin: auto;
}
.fecha {
  margin-top: 1rem;
}
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.botonSubmit {
  margin: auto;
  width: 100px;
  height: 45px;
  background-color: var(--green);
  border-radius: 20px 20px 0px 0px;
  color: white;
  border-style: none;
  margin-top: 1rem;
}

.response {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.response textarea {
  width: 100%;
}
.enviado {
  color: green;
  font-size: 25px;
  margin-left: 2rem;
}
h3 {
  text-align: left;
}
.divDocumentos {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background: rgba(128, 128, 128, 0.473);
  align-items: center;
}

.divDocumentos a {
  margin-left: 2rem;
}
/* @media (max-width: 1000px) {
  table {
    width: 90%;
  }
} */
@media (max-width: 480px) {
  .media {
    display: none;
  }
}
.requerimiento {
  border: solid 1px red;
  padding: 1rem;
}
</style>
