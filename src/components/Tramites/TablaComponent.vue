<template>
  <div class="tabla-container">
    <div
      style="
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        background: gray;
        color: aliceblue;
        padding: 0.5rem;
      "
    >
      <p>Titulo</p>
      <P>ID</P>
      <P>asunto</P>
      <p>Estado</p>
      <p>Más</p>
      <p>Historial</p>
    </div>
    <div v-for="(item, index) in this.activos" :key="index">
      <div class="encabezado">
        <p>{{ item.titulo }}</p>
        <p>{{ item.id }}</p>
        <p>{{ item.categoria }}</p>
        <p>{{ item.estado }}</p>
        <p
          style="cursor: pointer; text-decoration: underline"
          @click="verTramite(item.id)"
        >
          Ver Tramite
        </p>
        <p
          @click="this.open(item.id)"
          style="cursor: pointer; text-decoration: underline"
        >
          ver
        </p>
      </div>

      <div :class="item.open ? `open` : `noOpen`">
        <p>Historial del tramite {{ item.id }}:</p>
        <p>
          Fecha de presentación:
          {{ new Date(this.presentacionTramite).toLocaleDateString() }}

          <i class="bi bi-arrow-down-square" @click="createPDFsubmitt(item.id)">
          </i>
        </p>
        <p v-if="this.inicioTramite">
          Fecha de Inicio:
          {{ new Date(this.inicioTramite).toLocaleDateString() }}
        </p>
        <div v-if="this.requerimientoTramite">
          <p v-for="element in this.requerimientoTramite" :key="element.id">
            Fecha de Requerimiento/s:

            {{ new Date(element.created_at).toLocaleDateString() }} -
            <i
              class="bi bi-arrow-down-square"
              @click="createPDFrequirement(item.id, element.id)"
            >
            </i>
          </p>
        </div>

        <p v-if="this.finalizacionTramite">
          Fecha de Finalización:
          {{ new Date(this.finalizacionTramite).toLocaleDateString() }}
          <i
            class="bi bi-arrow-down-square"
            @click="createPDFfinalized(item.id)"
          >
          </i>
        </p>
      </div>
    </div>
    <!-- <table v-if="!this.loading"> -->

    <!-- <tr class="fila-tabla" v-for="(p, key) in this.activos" :key="key">
        <td @click="verTramite(p.id)">{{ p.titulo || "" }}</td>
        <td @click="verTramite(p.id)">{{ p.id || "" }}</td>
        <td class="media" @click="verTramite(p.id)">{{ p.categoria || "" }}</td>
        <td :class="'estado-fila'" @click="verTramite(p.id)">
          <p :style="`background: ${p.color}`" @click="verTramite(p.id)">
            {{ p.estado || "" }}
          </p>
        </td>
        <td>
          <p><i class="bi bi-arrow-down-square-fill"></i></p>
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
             
              <i class="bi bi-bell-fill"></i>
            </a>
          </p>
        </td> -->

    <!-- MODAL VISTA COMUNICACIONES-->
    <!-- <div
          class="modalComunicacion"
          id="collapseExample"
          v-if="this.selectTramite === p.id && this.modalComunicaciones"
        >
          <div class="card card-body">
            <div class="title">
              <strong>{{ this.comunicaciones.subject || "" }} : </strong>

              {{ this.comunicaciones.message || "" }}
            </div>

            <span>
              {{
                new Date(this.comunicaciones.created_at).toLocaleString() || ""
              }}
            </span>
            <div
              style="
                padding-top: 0.3rem;
                margin-bottom: 1rem;
                background: rgba(0, 128, 0, 0.075);
                font-size: 12px;
              "
            >
              <p>
                Ingrese a la seccion mis Comunicaciones para ver su historial, o
                al detalle del trámite para mas información.
              </p>
            </div>
          </div>
        </div> -->
    <!-- </tr> -->

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
        <div>Tramite n°:{{ this.selectTramite.procedure.id }}</div>

        <p>
          Nombre de trámite:
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

    <!-- MODAL PARA PDF -->
    <div v-if="modalPDF === true" class="grafico-container pdf">
      <div v-if="pdfSubmitt" style="width: 90%; margin: auto" id="content1">
        <div class="modal-top">
          <h3>Constancia de trámite Nº: {{ this.pdfSubmitt.id }}</h3>
        </div>
        <h5>Nombre: {{ this.pdfSubmitt.procedure.title }}</h5>
        <p>
          Fecha de creación:
          {{ new Date(this.pdfSubmitt?.created_at).toLocaleDateString() }}
        </p>
        <p style="width: 100%">
          {{ this.pdfSubmitt.communication[0].message }}
        </p>
        <p>
          Usuario Municipal asignado:
          <strong
            >{{ this.pdfSubmitt.userMuni.firstname }}
            {{ this.pdfSubmitt.userMuni.lastname }}</strong
          >
        </p>
        <p>
          Fecha de emisión:
          {{ new Date(this.pdfSubmitt?.actual_date).toLocaleDateString() }}
        </p>
      </div>
      <div v-if="pdfRequirement" id="content2" style="width: 90%; margin: auto">
        <div class="modal-top">
          <h3>
            Constancia de requerimiento Nº:
            {{ this.pdfRequirement.procedureHistory.id }}
          </h3>
        </div>
        <h5>Nombre: {{ this.pdfRequirement.title }}</h5>
        <p>
          Fecha de creación:
          {{ new Date(this.pdfRequirement?.created_at).toLocaleDateString() }}
        </p>
        <p>
          Fecha de cierre de requerimiento:
          {{ new Date(this.pdfRequirement?.finalized_at).toLocaleDateString() }}
        </p>
        <p style="width: 100%">{{ this.pdfRequirement.info_req }}</p>

        <p>
          Fecha de emisión:
          {{ new Date(this.pdfRequirement?.actual_date).toLocaleDateString() }}
        </p>
      </div>
      <!-- PARA FINALIZACION -->
      <div
        v-if="this.pdfFinalized"
        id="content3"
        style="width: 90%; margin: auto"
      >
        <div class="modal-top">
          <h3>
            Constancia de finalización trámite Nº:
            {{ this.pdfFinalized.id }}
          </h3>
        </div>
        <h5>Nombre: {{ this.pdfFinalized.procedure.title }}</h5>
        <p>
          Fecha de finalización:
          {{
            new Date(this.pdfFinalized?.resolution__date).toLocaleDateString()
          }}
        </p>
        <p style="width: 100%">
          {{ this.pdfFinalized.communication[0].message }}
        </p>
        <p>
          Usuario Municipal asignado:
          <strong
            >{{ this.pdfFinalized.userMuni.firstname }}
            {{ this.pdfFinalized.userMuni.lastname }}</strong
          >
        </p>
        <p>
          Fecha de emisión:
          {{ new Date(this.pdfFinalized?.actual_date).toLocaleDateString() }}
        </p>
      </div>

      <div
        style="
          width: 50%;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        "
      >
        <button
          type="button"
          class="btn btn-secondary"
          data-bs-dismiss="modal"
          @click="this.modalPDF = false"
        >
          Cerrar
        </button>
        <button
          type="button"
          @click="download(this.content)"
          class="btn btn-primary"
        >
          Descargar
        </button>
      </div>
    </div>
    <!-- </table> -->

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
          v-if="this.l > 5"
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
import setToken from "@/middlewares/setToken";
import setTokenRelations from "@/middlewares/setTokenRelations";
import { BASE_URL } from "@/env";
import jsPDF from "jspdf";
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
      presentacionTramite: null,
      inicioTramite: null,
      requerimientoTramite: null,
      finalizacionTramite: null,
      pdfSubmitt: null,
      pdfRequirement: null,
      pdfFinalized: null,
      modalPDF: false,
      content: "",
    };
  },
  created() {
    //Pedir solamente los que vengan desde una prop del status
    this.getMyProcedure();

    // this.getComunicaciones();
  },
  methods: {
    download(content) {
      // window.print();
      let asd = document.getElementById("content" + content);
      var doc = new jsPDF("p", "pt", "A4");

      doc.html(asd, {
        y: 2,
        x: 2,

        callback: function (doc) {
          doc.save("constancia.pdf");
        },
      });
    },
    verTramite(id) {
      //console.log("soy el trmite,", id);
      this.idTramite = id;
      const apiClient = axios.create({
        baseURL: BASE_URL,
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
        .catch((error) => {
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.verTramite(id);
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.verTramite(id);
            }
          }
        });
    },
    getMyProcedure() {
      this.activos = [];
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });

      apiClient
        .get(`/oficina/procedures/history/my-procedures?page=${this.pagina}`)
        .then((response) => {
          let h = response.data.MyProcedures;

          console.log(response + "mis tramites");
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
              open: false,
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
        .catch((error) => {
          console.log(error);
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.getMyProcedure();
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.getMyProcedure();
            }
          }
          if (error.response.status === 401) {
            this.$router.push("micuenta-update");
          }
          //this.msj = err.response.data.message;
        });
    },
    getComunicaciones(id) {
      const apiClient = axios.create({
        baseURL: BASE_URL,
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
        .catch((error) => {
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.getComunicaciones(id);
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.getComunicaciones(id);
            }
          }
          //console.log(err.response.data);
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

    selectFile($event) {
      const imgPreview = document.getElementById("img-preview");

      this.file = $event.target.files[0];
      const objectURL = URL.createObjectURL(this.file);
      imgPreview.src = objectURL;
      console.log(this.file, "soy el archivo");
    },
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
        baseURL: BASE_URL,
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
              this.activos = [];
              this.getMyProcedure();
              this.modalComunicaciones = false;
              this.respuestaA = "";
              this.respuestaB = "";
            }
          })
          .catch((error) => {
            console.log(error.response);
            if (error.response.status === 500) {
              if (error.response.data.message === "Token de usuario expirado") {
                setToken();
                this.sentRespuesta();
              }
              if (
                error.response.data.message ===
                "Token de representante expirado"
              ) {
                setTokenRelations();
                this.sentRespuesta();
              }
            }
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
              this.getMyProcedure();
              this.modalComunicaciones = false;

              this.respuestaA = "";
              this.respuestaB = "";
            }
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 500) {
              if (error.response.data.message === "Token de usuario expirado") {
                setToken();
                this.sentRespuesta();
              }
              if (
                error.response.data.message ===
                "Token de representante expirado"
              ) {
                setTokenRelations();
                this.sentRespuesta();
              }
            }
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
              this.getMyProcedure();
              this.modalComunicaciones = false;

              this.respuestaA = "";
              this.respuestaB = "";
            }
          })
          .catch((error) => {
            if (error.response.status === 500) {
              if (error.response.data.message === "Token de usuario expirado") {
                setToken();
                this.sentRespuesta();
              }
              if (
                error.response.data.message ===
                "Token de representante expirado"
              ) {
                setTokenRelations();
                this.sentRespuesta();
              }
            }
          });
      } else {
        this.messageResponse = true;
      }
      console.log(this.respuestaA, this.respuestaB);
    },
    nextPag() {
      this.pagina++;
      this.getMyProcedure();
    },
    backTramites() {
      this.pagina--;
      this.getMyProcedure();
    },
    //ABRIR UN TRAMITE
    open(id) {
      this.activos.forEach((item) => {
        if (item.id === id) {
          item.open = !item.open;
        } else {
          item.open = false;
        }
        if (item.open === true) {
          this.getHistory(id);
        }
      });
      // let asd = this.activos.map((item) => {
      //   if (item.id === id) {
      //     item.open = !item.open;
      //     if (item.open === true) {
      //       this.getHistory(id);
      //     }
      //   } else {
      //     item.open = false;
      //   }
      //   return asd;
      // });
    },
    //BUSQUEDA DE HISTORIAL DE UN TRAMITE
    getHistory(id) {
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient.get("/oficina/procedures/timeline/" + id).then((response) => {
        console.log(response.data);
        this.presentacionTramite = response.data.CreatedDate;
        this.inicioTramite = response.data.InProcessDate;
        this.requerimientoTramite = response.data.RequirementDates;
        this.finalizacionTramite = response.data.FinalizedDate;
      });
    },
    createPDFsubmitt(id) {
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get("/oficina/procedures/submitted-procedure-data/" + id)
        .then((response) => {
          this.pdfSubmitt = response.data;
          this.pdfRequirement = null;
          this.pdfFinalized = null;
          this.content = "1";
          this.modalPDF = true;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.createPDFsubmitt(id);
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.createPDFsubmitt(id);
            }
          }
        });
    },
    createPDFrequirement(tramite, id) {
      console.log(tramite, id, "soy el tramite y el requer");
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get(
          "/oficina/procedures/requirement-procedure-data/" + tramite + "/" + id
        )
        .then((response) => {
          console.log(response.data);
          this.pdfRequirement = response.data;
          this.pdfSubmitt = null;
          this.pdfFinalized = null;
          this.content = "2";

          this.modalPDF = true;
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.createPDFrequirement(tramite, id);
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.createPDFrequirement(tramite, id);
            }
          }
        });
    },
    createPDFfinalized(id) {
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get("/oficina/procedures/finalized-procedure-data/" + id)
        .then((response) => {
          console.log(response);
          (this.pdfFinalized = response.data), (this.pdfSubmitt = null);
          this.pdfRequirement = null;
          this.content = "3";

          this.modalPDF = true;
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.createPDFfinalized(id);
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.createPDFfinalized(id);
            }
          }
        });
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
  top: 20%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 500px; /* Need a specific value to work */
  height: auto;
  padding: 1rem;
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
.pdf {
  width: 50vw;
  height: 60vh;
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
  margin-left: 3rem;
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
/* TABLA DE TRAMITES */
.tabla-container {
  width: 80vw;
  height: auto;
  margin: auto;
  /* display: flex;
  flex-flow: column;
  align-items: center; */
  justify-content: flex-start;
  /* position: relative; */
  /* margin-left: 2rem; */
}
.encabezado {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  background: #66666656;
  border-bottom: 1px solid black;
}
.encabezado p {
  width: 20%;
}
.open {
  max-height: 250px;
  text-align: left;
  padding: 1rem;
}
.noOpen {
  max-height: 0;
  overflow: hidden;
}

/*  */
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
  flex-flow: column;
  justify-content: center;
  align-items: center;
  z-index: 20;
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;
  margin-left: 25%;
  margin-right: auto;
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
  justify-content: center;
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
/* .fecha {
  margin-top: 3rem;
} */
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
  margin-top: 2rem;
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
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bi {
  font-size: 1.5rem;
  color: black;
  margin: auto;
}
</style>
