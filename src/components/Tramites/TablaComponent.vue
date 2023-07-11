<template>
  <div class="tabla-container">
    <table>
      <tr>
        <th>Titulo</th>
        <th>ID</th>
        <th>Ultimo movimiento</th>
        <th class="media">Asunto</th>
        <th>Estado</th>
        <th></th>
      </tr>

      <tr class="fila-tabla" v-for="(p, key) in this.mostrados" :key="key">
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
              @click="this.openModalComunicaciones(p.id)"
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
          <!--VISTA DE LA COMUNICACION -->
          <div class="card card-body">
            <p>Soy el modal comunicaciones</p>
            <!-- <div class="title">
              <strong>{{ p.comunicaciones[0].title || "" }} : </strong>
              {{ p.comunicaciones[0].description || "" }}
            </div>

            <div class="fecha">
              <span>
                {{
                  new Date(p.comunicaciones[0].created_at).toLocaleString() ||
                  ""
                }}
              </span>
            </div> -->
          </div>

          <!--VISTA VISTA DEL REQUERIMIENTO -->
          <div class="card card-body" v-if="p.requerido">
            <h3>Requerimiento de su trámite:</h3>
            <div class="title">
              <strong
                >{{ p.requerimientos[p.requerimientos.length - 1].title || "" }}
                :
              </strong>
              {{ p.requerimientos[p.requerimientos.length - 1].info_req || "" }}
            </div>
            <!--BOTON PARA MODAL DE RESPUESTA AL REQUERIMIENTO-->
            <input
              type="button"
              value="Responder"
              @click="
                OpenModalRespuesta(
                  p.requerimientos[p.requerimientos.length - 1].id
                )
              "
              class="botonSubmit"
            />
            <div class="fecha">
              <span>
                {{
                  new Date(
                    p.requerimientos[p.requerimientos.length - 1].created_at
                  ).toLocaleString() || ""
                }}
              </span>
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
          <h1>
            {{ this.selectTramite.procedure.procedure.title }}
          </h1>
          <img
            @click="this.modalVista = false"
            class="svg"
            src="@/assets/close.svg"
            alt=""
          />
        </div>
        <div class="data-container">
          <p>
            {{ this.selectTramite.procedure.category.title }}/
            {{ this.selectTramite.procedure.status.status }}
          </p>
          <div
            v-if="this.selectTramite.procedure.requirementHistory.length >= 1"
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
          v-if="this.paginaActual > 1"
        />
        <div class="pagNum">
          {{ this.paginaActual }}
        </div>
        <!-- <div v-for="(i, k) in this.paginas" :key="k">
          <span v-if="this.paginaActual < k" c>{{ k + 1 }}</span>
          <span v-if="this.paginaActual === k" class="pagNum"
            ><b>{{ k + 1 }}</b></span
          >
          <span v-if="this.paginaActual > k" class="pagNum">{{ k + 1 }}</span>
        </div>-->
        <img
          @click="nextPag"
          class="svg"
          src="@/assets/next.svg"
          alt=""
          v-if="this.paginaActual < this.paginas"
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
      loading: true,
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
    };
  },
  created() {
    //Pedir solamente los que vengan desde una prop del status
    this.getMyPorcedure();
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

          //console.log(response.data.MyProcedures + "mis tramites");
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

          this.cantTramites();
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.msj = err.response.data.message;
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
    cantTramites() {
      this.paginas = Math.ceil(this.length / 5);

      this.mostrados = [];
      console.log("paginas " + this.mostrados);
      for (let i = 0; i < 5; i++) {
        let p = this.activos[this.cont];

        if (p != undefined) {
          this.mostrados.push(p);
          this.cont++;
        }
      }
    },
    backTramites() {
      if (parseFloat(this.paginaActual) > 1) {
        this.paginaActual--;
        this.mostrados = [];
        this.cont = (this.paginaActual - 1) * 5;
        for (let i = 0; i < 5; i++) {
          let p = this.activos[this.cont];
          if (p != undefined) {
            this.mostrados.push(p);
            this.cont++;
          }
        }
      }
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
      // console.log("hola");
      // if (parseFloat(this.paginaActual) < parseFloat(this.paginas)) {
      //   this.paginaActual++;
      //   this.cantTramites(this.l);
      // } else {
      //   console.log("No hay mas páginas disponibles.");
      // }
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
  justify-content: space-around;
  align-items: flex-start;
}
.grafico-container {
  display: flex;
  flex-flow: column wrap;
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
  padding: 10px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}
.data-container {
  display: flex;
  flex-flow: column wrap;
  height: auto;
  width: 100%;
  align-items: center;
  /* text-align: left;  */
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
  flex-flow: row wrap;
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
  flex-direction: row;
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
