<template>
  <div class="containerGeneral">
    <div class="containerTramites">
      <div class="filtro-top">
        <div>
          <button
            class="btn btn-secondary"
            type="button"
            @click="setModalFiltros"
          >
            Busquedas y filtros
          </button>
          <img
            class="filtro-img"
            src="@/assets/filtro.svg"
            alt=""
            type="button"
          />
        </div>

        <button @click="recargar" class="btn btn-secondary" type="button">
          <p>Recargar</p>
        </button>
        <button @click="SetVistaLista" class="btn btn-secondary" type="button">
          Vista de lista
        </button>

        <!-- BUSCADOR -->
        <form class="d-flex">
          <input
            class="buscar"
            type="search"
            placeholder="Ingrese ID del trámite"
            aria-label="Buscar"
            v-model="search"
          />
          <button
            class="btn btn-outline-success"
            type="submit"
            @click="searchValue(this.search)"
          >
            Buscar
          </button>
        </form>
      </div>
      <div v-if="this.message">
        <h3 style="text-decoration: none; margin-top: 1rem">
          No se encontraron trámites con los filtros especificados
        </h3>
      </div>
      <!-- FILTROS -->
      <div v-if="this.modalFiltros">
        <FiltrosComponent
          :functionFiltros="this.getFiltro"
          :setModalFiltros="this.setModalFiltros"
        />
      </div>
      <!-- VISTA EN TABLA DE TODOS LOS TRAMITES -->
      <div v-if="this.vista" class="containerTramites">
        <TablaFiltrosComponent
          :history="this.history"
          :message="this.message"
        />
      </div>
      <!-- CONTENEDOR DE TODOS LOS TRAMITES -->
      <div class="container-medio" v-else>
        <div class="container-medio">
          <!-- TRAMITES EN PLAZO -->
          <div class="tabla-container">
            <h3>Activos</h3>
            <div v-for="item in this.activos" :key="item.id">
              <CardComponentVue
                :obj="item"
                :ModalTarea="ModalTarea"
                :verTramite="verTramite"
                :ModalComunicacion="ModalComunicacion"
                :ModalRequerimiento="ModalRequerimiento"
                color="success"
              />
            </div>
          </div>
          <!--VISTA DE TABLA CON TRAMITES FUERA DE PLAZOS-->
          <div class="tabla-container">
            <h3>Fuera de plazo</h3>
            <div v-for="item in this.deadline" :key="item.id">
              <CardComponentVue
                :obj="item"
                :ModalTarea="ModalTarea"
                :verTramite="verTramite"
                :ModalComunicacion="ModalComunicacion"
                :ModalRequerimiento="ModalRequerimiento"
                color="danger"
              />
            </div>
          </div>
          <!--VISTA DE TABLA CON TRAMITES REQUERIDOS-->
          <div class="tabla-container">
            <h3>Requeridos</h3>
            <div v-for="item in this.requeridos" :key="item.id">
              <CardComponentVue
                :obj="item"
                :ModalTarea="ModalTarea"
                :verTramite="verTramite"
                :ModalComunicacion="ModalComunicacion"
                :ModalRequerimiento="ModalRequerimiento"
                color="warning"
              />
            </div>
          </div>
        </div>

        <!-- - - - - - - INICIO MODAL VISTA DE TRAMITE- - - - - -   -->
        <div class="grafico-container" v-if="this.modal === true">
          <div class="modal-content">
            <div class="modal-top">
              <h3>Historial del trámite Id: {{ selectedTramite }}</h3>
              <img
                @click="Modal()"
                class="svg"
                src="@/assets/close.svg"
                alt=""
              />
            </div>
            <div class="data-container">
              <section v-if="this.selectedHistory.id === selectedTramite">
                <div class="data-container">
                  <h3>Datos del vecino:</h3>
                  <div class="user-data-container">
                    <div class="user-data">
                      <p>
                        <b>Nombre:</b>
                        {{ selectedHistory.user.firstname }}
                      </p>

                      <p>
                        <b>Apellido:</b>
                        {{ selectedHistory.user.lastname }}
                      </p>

                      <p><b>Email:</b> {{ selectedHistory.user.email }}</p>
                    </div>
                    <div class="user-data">
                      <p><b>CUIL:</b> {{ selectedHistory.user.cuil }}</p>

                      <p>
                        <b>Dirección:</b>
                        {{ selectedHistory.user.adress }}
                      </p>
                    </div>
                  </div>
                </div>

                <h3>Info tramite:</h3>
                <div
                  class="question"
                  v-for="(q, key) in selectedHistory.questions"
                  :key="key"
                >
                  <div>
                    <h5>
                      <strong>
                        {{ q.question.title }}
                      </strong>
                    </h5>

                    <p v-if="q.question_option_history[0]?.answer">
                      {{ q.question_option_history[0]?.answer }}
                    </p>
                    <p v-else>No hay respuesta registrada</p>
                  </div>
                </div>
                <!--EL TRAMITE QUE TENGA REQUERIMIENTOS SE PODRA VER LOS MISMOS-->
                <div
                  class="requerimiento"
                  v-if="this.selectedHistory.requirementHistory.length >= 1"
                >
                  <p>Requerimiento:</p>
                  {{
                    this.selectedHistory.requirementHistory[
                      this.selectedHistory.requirementHistory.length - 1
                    ].info_req || ""
                  }}
                  <!-- SE MUESTRAN LAS RESPUESTAS SI EXISTEN -->
                  <div
                    v-if="
                      this.selectedHistory.requirementHistory[
                        this.selectedHistory.requirementHistory.length - 1
                      ].answer ||
                      this.selectedHistory.requirementHistory[
                        this.selectedHistory.requirementHistory.length - 1
                      ].documentRequirement[0]?.file
                    "
                  >
                    <p>Respuesta:</p>
                    *{{
                      this.selectedHistory.requirementHistory[
                        this.selectedHistory.requirementHistory.length - 1
                      ].answer || ""
                    }}
                    <br />
                    <!-- SE ABRE EL LINK DEL ARCHIVO MANDADO -->
                    Archivo:
                    <a
                      target="_blank"
                      :href="`${
                        this.selectedHistory.requirementHistory[
                          this.selectedHistory.requirementHistory.length - 1
                        ].documentRequirement[0]?.file
                      }`"
                      >{{
                        this.selectedHistory.requirementHistory[
                          this.selectedHistory.requirementHistory.length - 1
                        ].documentRequirement[0]?.file
                      }}
                    </a>
                    <!-- *{{
                      this.selectedHistory.procedure.requirementHistory[
                        this.selectedHistory.procedure.requirementHistory
                          .length - 1
                      ].documentRequirement[0]?.file || ""
                    }} -->
                  </div>
                  <!-- ------ -->
                  <span class="spanFecha"
                    >{{
                      new Date(
                        this.selectedHistory.requirementHistory[
                          this.selectedHistory.requirementHistory.length - 1
                        ].created_at
                      ).toLocaleString()
                    }}
                  </span>
                </div>
                <!-- BOTONES PARA ACCIONES  -->
                <div class="footer">
                  <input
                    class="btn btn-primary mx-2"
                    type="button"
                    value=" Tarea"
                    @click="ModalTarea(selectedHistory.id)"
                  />

                  <input
                    class="btn btn-primary mx-2"
                    type="button"
                    value="Comunicación"
                    @click="
                      ModalComunicacion(
                        selectedHistory.id,
                        selectedHistory.user.cuil,
                        selectedHistory.user.level.level
                      )
                    "
                  />
                  <input
                    class="btn btn-primary mx-2"
                    type="button"
                    value=" Requerimiento"
                    @click="ModalRequerimiento(selectedHistory.id)"
                  />
                  <input
                    class="btn btn-success mx-2"
                    type="button"
                    value=" Finalizar trámite"
                    @click="FinalizarTramite(selectedHistory.id)"
                  />
                </div>
              </section>
            </div>
          </div>
        </div>

        <!--MODAL PARA CREAR TAREA-->

        <div class="modalTarea">
          <div v-if="this.modalTarea === true" class="modal-content">
            <div class="modal-top">
              <h5>Asignar Tarea. Trámite n°: {{ this.selectedTramite }}</h5>
              <img
                @click="CloseTarea()"
                class="svg"
                src="@/assets/close.svg"
                alt=""
              />
            </div>
            <CreateTasksComponentVue :id="this.selectedTramite" />
          </div>
        </div>

        <!--MODAL DE NOTIFICACIONES AL CIUDADANO-->
        <div class="modalTarea">
          <div v-if="this.modalComunicacion === true" class="modal-content">
            <div class="modal-top">
              <h5>
                Enviar Notificación. <br />
                Trámite n°: {{ this.selectedTramite }}
              </h5>
              <img
                @click="this.modalComunicacion = false"
                class="svg"
                src="@/assets/close.svg"
                alt=""
              />
            </div>

            <ModalCreateRYCComponentVue
              :submitFunction="this.submitComunicacion"
              :datosEnviados="this.datosEnviados"
              :documents="true"
              :submitCidi="this.submitCidi"
              :level="this.level"
            />
          </div>
        </div>
        <!-- MODAL PARA HACER UN REQUERIMIETO AL TRAMITE-->
        <div class="modalTarea">
          <div v-if="this.modalRequerimiento === true" class="modal-content">
            <div class="modal-top">
              <h5>
                Asignar Requerimiento. <br />
                Trámite n°: {{ this.selectedTramite }}
              </h5>
              <img
                @click="this.modalRequerimiento = false"
                class="svg"
                src="@/assets/close.svg"
                alt=""
              />
            </div>
            <ModalCreateRYCComponentVue
              :submitFunction="this.submitRequerimiento"
              :datosEnviados="this.datosEnviados"
            />
          </div>
        </div>
        <!-- MODAL PARA FINALIZAR EL TRAMITE -->
        <div class="modalTarea">
          <div
            v-if="this.modalComunicacionFinal === true"
            class="modal-content"
          >
            <div class="modal-top">
              <h5>
                Enviar Notificación. <br />
                Trámite n°: {{ this.selectedTramite }}
              </h5>
              <img
                @click="this.modalComunicacionFinal = false"
                class="svg"
                src="@/assets/close.svg"
                alt=""
              />
            </div>

            <ModalCreateRYCComponentVue
              :submitFunction="this.submitComunicationFinalized"
              :datosEnviados="this.datosEnviados"
              :documents="true"
              :finalized="true"
            />
          </div>
        </div>
        <div class="modalRespuesta">
          <div v-if="this.messageBuscar === true" class="modal-content">
            <div class="modal-top">
              <p>No se encontro el trámite {{ this.search }}</p>
              <img
                @click="() => (this.messageBuscar = false)"
                class="svg"
                src="@/assets/close.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import setTokenMuni from "@/middlewares/setTokenMuni";
import CreateTasksComponentVue from "../Tareas/CreateTasksComponent.vue";
import ModalCreateRYCComponentVue from "../Requerimientos/ModalCreateRYCComponentVue.vue";
import CardComponentVue from "../CardComponent.vue";
import TablaFiltrosComponent from "../Filtros/TablaFiltrosComponent.vue";
import FiltrosComponent from "../Filtros/FiltrosComponent.vue";
import { BASE_URL } from "@/env";

export default {
  props: {
    color: String,
  },
  components: {
    CreateTasksComponentVue,
    ModalCreateRYCComponentVue,
    CardComponentVue,
    TablaFiltrosComponent,
    FiltrosComponent,
  },
  data() {
    return {
      modal: false,
      modalTarea: false,
      modalComunicacion: false,
      modalRequerimiento: false,
      modalComunicacionFinal: false,
      selectedHistory: null,
      selectedTramite: null,
      activos: [],
      history: [],
      paginas: null,
      paginaActual: 1,
      status: "",
      message: false,
      requerimiento: null,
      modalresponse: false,
      deadline: [],
      requeridos: [],
      search: "",
      vista: false,
      modalFiltros: false,
      messageBuscar: false,
      datosEnviados: "",
      cuilUserNotificacion: "",
      level: "",
    };
  },
  created() {
    //se obtienen todos los tramites
    this.getProcedures();
  },
  methods: {
    //TRAE LOS TRAMITES DE SU AREA
    SetVistaLista() {
      //this.modalFiltros = !this.modalFiltros;
      this.vista = !this.vista;
    },
    //FUNCION PARA BUSCAR TODOS LOS TRAMITES
    getProcedures() {
      this.activos = [];

      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });

      apiClient
        .get("/oficina/procedures/history")
        .then((response) => {
          let plazo = response.data.HistoryOfProcedures.OnTime;
          let fueraPlazo = response.data.HistoryOfProcedures.OutTime;
          let requeridos = response.data.HistoryOfProcedures.PausedTime;

          console.log(plazo);
          console.log(fueraPlazo);
          console.log(requeridos);
          this.activos = [];
          this.deadline = [];
          this.requeridos = [];

          // EN PLAZO
          for (let i = 0; i < plazo.length; i++) {
            this.activos.push(plazo[i]);
          }

          //FUERA DE PLAZO
          for (let i = 0; i < fueraPlazo.length; i++) {
            console.log(fueraPlazo[i]);
            this.deadline.push(fueraPlazo[i]);
          }
          //PAUSADOS POR REQUERIMIENTO
          for (let i = 0; i < requeridos.length; i++) {
            this.requeridos.push(requeridos[i]);
          }
          // SE CARGAT TODOS LOS TRAMITES EN HISTORY PARA MOSTRARLO EN LA VISTA DE LOS FILTROS
          this.history = [];
          //SE CONCATENAN TODOS LOS TRAMITES PARA PODER MOSTRAR EN GRILLA

          this.history = this.history
            .concat(this.activos)
            .concat(this.deadline)
            .concat(this.requeridos);
          this.message = false;
          console.log(this.history);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setTokenMuni();
              this.getProcedures();
            }
          }
        });
    },

    //PARA VER UN TRAMITE EN ESPECIFICO
    verTramite(id) {
      this.selectedTramite = id;

      let apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get("/oficina/procedures/history/" + id)
        .then((response) => {
          console.log(response.data);
          this.selectedHistory = response.data.Procedure;
          if (response.data.Procedure.status.status === "PRESENTADO") {
            this.status = "2";
            this.updateStatus();
            this.activos = [];
            this.getProcedures();
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setTokenMuni();
              this.verTramite(id);
            }
          }
        });

      this.modal = true;
    },

    verTarea(id) {
      this.selectedTramite = id;
      this.modalTareas = true;
    },
    selectEstado(event) {
      this.status = event.target.value;
      console.log(this.status);
    },
    check(id) {
      this.checkbox.push(id);
      console.log(this.checkbox);
    },
    //FILTRAR TRAMITES POR STATUS
    getFiltro(obj) {
      let apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .post("/oficina/procedures/history/filter", obj)
        .then((response) => {
          let asd = response.data.ProceduresFiltered || null;
          this.message = false;

          this.activos = [];
          this.deadline = [];
          this.requeridos = [];

          console.log(asd, "soy los filtrados");
          if (asd) {
            this.history = [];
            for (let i = 0; i < asd.length; i++) {
              switch (asd[i].deadline.deadline) {
                case "EN PLAZO":
                  this.activos.push(asd[i]);
                  break;
                case "FUERA DE PLAZO":
                  this.deadline.push(asd[i]);
                  break;
                case "PLAZO PAUSADO POR REQUERIMIENTO":
                  this.requeridos.push(asd[i]);
                  break;

                default:
                  break;
              }
              this.history.push(asd[i]);
            }
          }
        })
        .catch((error) => {
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setTokenMuni();
              this.getFiltro(obj);
            }
          }
          this.message = true;
          this.activos = [];
          this.deadline = [];
          this.requeridos = [];

          console.log(error.response.data);
        });
    },
    // BUSCADOR POR CUIL DEL USUARIO
    getFiltroByCuilUser(cuil) {
      console.log(cuil);
      let apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });

      if (cuil.length == 11) {
        this.activos = [];
        console.log(`el cuil ${cuil} tiene 11 digitos`);
        apiClient
          .get("/oficina/procedures/history/user/" + cuil)
          .then((response) => {
            console.log(response.data);
            let h = response.data.Procedures;
            for (let i = 0; i < h.length; i++) {
              //Procedure
              let p = {
                id: null,
                cuil: "",
                categoria: "",
                estado: "",
                procedure: "",
                requerimientos: null,
              };
              //Carga del procedure
              p.id = h[i].id;
              p.cuil = h[i].user;
              p.categoria = h[i].category.title;
              p.estado = h[i].status.status;
              p.procedure = h[i].procedure.title;
              p.requerimientos = Array.isArray(h[i].requirementHistory)
                ? h[i].requirementHistory
                : null;

              switch (p.estado) {
                case "PRESENTADO":
                  p.color = "var(--green)";
                  break;
                case "PAUSADO POR REQUERIMIENTO":
                  p.color = "var(--red)";
                  break;
                case "EN PROCESO":
                  p.color = "var(--yellow)";
                  break;
                case "FINALIZADO":
                  p.color = "var(--lblue)";
                  break;

                default:
                  break;
              }

              this.activos.push(p);
              this.setModalFiltros();
            }

            //this.length = response.data.HistoryOfProcedures.length;
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 500) {
              if (error.response.data.message === "Token de usuario expirado") {
                setTokenMuni();
                this.getFiltroByCuilUser(cuil);
              }
            }
          });
      } else {
        console.log(`el cuil ${cuil}NO!! tiene 11 digitos`);
      }
      //
    },
    //TOTAL DE TRAMITES
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
    //BUSCAR UN TRAMIATE POR ID
    searchValue(value) {
      let asd = null;
      this.history = [];
      this.activos = [];
      this.deadline = [];
      this.requeridos = [];
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get("/oficina/procedures/history/" + value)
        .then((response) => {
          console.log(response, "soy el tramite ");

          asd = response.data.Procedure;
          console.log(asd);
          this.search = "";

          switch (asd.deadline) {
            case "EN PLAZO":
              this.activos.push(asd);
              break;
            case "FUERA DE PLAZO":
              this.deadline.push(asd);
              break;
            case "PLAZO PAUSADO POR REQUERIMIENTO":
              this.requeridos.push(asd);
              break;

            default:
              break;
          }

          this.history.push(asd);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setTokenMuni();
              this.searchValue(value);
            }
          }
          this.messageBuscar = true;
        });
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
    nextPag() {
      console.log("hola");
      if (parseFloat(this.paginaActual) < parseFloat(this.paginas)) {
        this.paginaActual++;
        this.cantTramites(this.l);
      } else {
        console.log("No hay mas páginas disponibles.");
      }
    },
    recargar() {
      this.getProcedures();
    },
    //DISTINOS MODALES DE LA VISTA
    Modal() {
      this.selectedTramite = null;
      this.modal = false;
    },
    ModalTarea(id) {
      this.selectedTramite = id;
      this.modalTarea = !this.modalTarea;
    },
    CloseTarea() {
      this.modalTarea = false;
    },
    ModalComunicacion(id, cuil, level) {
      this.selectedTramite = id;
      this.cuilUserNotificacion = cuil;
      this.level = level;
      this.modalComunicacion = true;
    },

    ModalRequerimiento(id) {
      this.selectedTramite = id;
      this.modalRequerimiento = !this.modalRequerimiento;
    },

    //CAMBIAR EL ESTADO DE UN TRAMITE
    updateStatus() {
      console.log("cambiar estado");
      //console.log(this.selectedTramite);
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .put(
          "/oficina/procedures/procedure/update-status/" + this.selectedTramite,
          { statusId: this.status }
        )
        .then((response) => {
          if (response.status === 200) {
            console.log("Estado actualizado");
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setTokenMuni();
              this.updateStatus();
            }
          }
        });
      //this.ModalEstado();
    },

    //ENVIAR UN COMUNICADO DE UN TRAMITE EN GENERAL
    submitComunicacion(a, b, c) {
      console.log(a, b, c);
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .post("/communications/send-communication/" + this.selectedTramite, {
          subject_communication: a,
          message_communication: b,
          documents: c,
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            this.datosEnviados = response.data.message;
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.datosEnviados = error.response.data.message;
          }
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setTokenMuni();
              this.submitComunicacion(a, b, c);
            }
          }
          console.log(error);
        });
    },
    //COMUNICACION VIA CIDI SOLO PARA NIVELES 2
    submitCidi(a, b, c) {
      console.log(a, b, c);
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      if (c.length > 0) {
        console.log("tengo archivos para guaradar");
        apiClient
          .post(
            `/auth/send-communication/ ${this.selectedTramite}/${this.$store.state.CidiCookie} `,
            {
              user_cuil: this.cuilUserNotificacion,
              subject_communication: a,
              message_communication: b,
              documents: c,
            }
          )
          .then((response) => {
            console.log(response.data);
            if (response.status === 200) {
              this.datosEnviados = response.data.message;
            }
          })
          .catch((error) => {
            if (error.response.status === 401) {
              this.datosEnviados = error.response.data.message;
            }
            if (error.response.status === 500) {
              if (error.response.data.message === "Token de usuario expirado") {
                setTokenMuni();
                this.submitCidi(a, b, c);
              }
            }
            console.log(error);
          });
      } else {
        console.log("no hay archivos para guardar");
        apiClient
          .post(
            `/auth/send-communication/ ${this.selectedTramite}/${this.$store.state.CidiCookie} `,
            {
              user_cuil: this.cuilUserNotificacion,
              subject_communication: a,
              message_communication: b,
            }
          )
          .then((response) => {
            console.log(response.data);
            if (response.status === 201) {
              this.datosEnviados = response.data;
            }
          })
          .catch((error) => {
            if (error.response.status === 401) {
              this.datosEnviados = error.response.data.message;
            }
            if (error.response.status === 500) {
              if (error.response.data.message === "Token de usuario expirado") {
                setTokenMuni();
                this.submitCidi(a, b, c);
              }
            }
            console.log(error);
          });
      }
    },
    //ENVIAR UN REQUERIMIENTO DEL TRAMITE
    submitRequerimiento(a, b) {
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .post("/requirements/send-requirement/" + this.selectedTramite, {
          title: a,
          info_req: b,
        })
        .then((response) => {
          if (response.status === 201) {
            console.log(response.data.message);
            this.datosEnviados = response.data.message;
          }

          this.getProcedures();
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setTokenMuni();
              this.submitRequerimiento(a, b);
            }
          }
          this.datosEnviados = error.response.data.message;
        });
    },
    submitComunicationFinalized(a, b) {
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .put("/oficina/procedures/finish-procedure/" + this.selectedTramite, {
          message_communication: a,
          documents: b,
        })
        .then((response) => {
          console.log(response.data);
          this.datosEnviados = response.data.message;
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.datosEnviados = error.response.data.message;
          }
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setTokenMuni();
              this.submitComunicationFinalized(a, b);
            }
          }
          console.log(error);
        });
    },
    ModalResponse(id) {
      this.selectedTramite = id;
      for (let i = 0; i < this.activos.length; i++) {
        if (this.activos[i].id === id) {
          this.selectedHistory = this.activos[i];
          break;
        }
      }
      //console.log(id);
      this.modalresponse = true;
      console.log(this.selectedHistory);
    },
    CloseModalResponse() {
      this.modalresponse = false;
    },
    FinalizarTramite(id) {
      this.selectedTramite = id;
      this.modalComunicacionFinal = true;
      // this.status = "4";
      // // this.updateStatus();
      // this.activos = [];
      // this.deadline = [];
      // this.requeridos = [];
      // this.getProcedures();
    },
    setModalFiltros() {
      this.modalFiltros = !this.modalFiltros;
    },
  },
};
</script>

<style scoped>
.containerGeneral {
  display: flex;
  flex-direction: row;
  width: 94vw;
  position: relative;
}
.containerTramites {
  width: 100%;
  padding-bottom: 2rem;
  padding-top: 2rem;
}
.container-medio {
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
  justify-content: space-around;
  width: 100%;
}
.containerTareas {
  width: 45%;
}
.pagNum {
  margin: 0 1.5px;
}
section h3 {
  text-decoration: underline;
  margin-bottom: 2rem;
}

.user-data-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}

.user-data {
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-around;
  align-items: flex-start;
}
.response {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.filtro-top {
  width: 100%;
  color: var(--text-color);
  display: flex;
  justify-content: space-around;
  background: var(grey);
  height: 3rem;
}

.modal-content {
  height: 100%;
  width: 90%;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}
.modalRespuesta {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 15;
  position: absolute;
  top: 10rem;
  right: 30rem;
  margin-left: auto;
  margin-right: auto;
  height: auto;
  width: 550px; /* Need a specific value to work */
  text-align: center;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  word-break: break-all;
}
.modalTarea {
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
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  /* border: 1px solid rgba(255, 255, 255, 0.18); */
  border-radius: 10px;
  height: auto;
}
.data-container {
  display: flex;
  flex-flow: column wrap;
  height: auto;
  width: 100%;
  align-items: flex-start;
  text-align: left;
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
  width: 40rem; /* Need a specific value to work */
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

.cant {
  display: flex;
  margin: 0;
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

/*input:hover {
  border: 1px solid var(--green);
}*/

.filtro-filas {
  color: var(--text-color);
  padding: 10px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  width: 100%;
  height: 40px;
}

.filtro-filas input {
  width: 15%;
  height: 20px;
}

.tabla-container {
  width: 33%;
  display: flex;
  flex-direction: column;
  /* border: 1px solid black; */
  padding-top: 1rem;
  position: relative;
  height: 70vh;
  overflow-y: scroll;
  /* padding: 0.5rem; */
  background: rgb(235, 235, 235);
  border-radius: 10px;
}

table {
  width: 100%;
}

th,
td {
  padding: 5px;
  border-bottom: 1px solid var(--grey);
  background: #fff;
  height: 40px;
  color: var(--blue);
  font-size: 0.9em;
  white-space: normal;
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

.filtro-img {
  max-width: 30px;
  margin-left: 1rem;
}

.filtro-container {
  width: 50%;
  color: var(--text-color);
  padding: 10px;
  display: flex;
  justify-content: space-around;
}

.filtro-container input {
  margin: 0 20px;
  background: inherit;
  color: var(--text-color);
  border: none;
  border-bottom: 1px solid var(--red);
}

.filtro-container input:hover {
  border-bottom: 2px solid var(--green);
  animation-name: border-animation;
  animation-duration: 2s;
}

select {
  margin: 0 10px;
  color: var(--text-color);
  text-align: center;
  background: none;
  border-radius: 20px;
  border: 1px solid var(--red);
  outline: none;
  padding: 5px;
}

select option {
  background: none;
  border: 1px solid var(--red);
  outline: none;
}
select option:hover {
  background: var(--green);
  outline: none;
  border: none;
}
.length {
  border: 1px solid gray;
  padding: 0px 5px;
}
.svg {
  max-width: 20px;
}
.modal-top {
  display: flex;
  width: 100%;
  text-align: left;
  justify-content: space-around;
  align-items: flex-start;
}
.sinTramites {
  position: relative;
  width: 100%;
  height: 150px;
  text-align: center;
  padding-top: 2rem;
}
.question {
  word-break: break-all;
}
.titleComunicacion {
  margin-bottom: 2rem;
  width: 100%;
}
.titleComunicacion input {
  width: 60%;
  border-radius: 10px;
  padding-left: 1rem;
}
textarea {
  border-radius: 10px 10px 0px 0px;
  padding-left: 1rem;
  margin-bottom: 2rem;
}
.botonSubmit {
  width: 100px;
  height: 45px;
  background-color: var(--green);
  border-radius: 20px 20px 0px 0px;
  color: white;
  border-style: none;
  margin: auto;
  margin-bottom: 2rem;
}
.contentCirculo {
  display: flex;
  flex-direction: column;
  width: 15px;
  margin: auto;
}
.circulo {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: black;
  margin-top: 2px;
}
.enviado {
  color: green;
  font-size: 25px;
  margin-left: 2rem;
}
.respuestas {
  border-radius: 10px;
  border: 1px solid #666;
  width: 100%;
  margin-top: 1rem;
  text-align: left;
  padding: 5px;
}
.respuestas a {
  text-decoration: none;
}
/* .finalizar {
  width: 30%;
  margin: auto;
  margin-top: 1rem;
} */
.title {
  position: absolute;
  top: 1rem;
  background-color: #666;
  height: 100px;
}
.requerimiento {
  border: 1px solid red;
  padding: 1rem;
  margin-bottom: 1rem;
  position: relative;
  max-width: 33rem;
  word-break: break-all;
}
.requerimiento p {
  text-decoration: underline;
}
.spanFecha {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 12px;
}
.footer {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}

.cardFiltros {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 2rem;
  padding-top: 2rem;
  border: 1px solid grey;
}
</style>
