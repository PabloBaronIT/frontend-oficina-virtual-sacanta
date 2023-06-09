<template>
  <div class="containerGeneral">
    <div class="containerTramites">
      <div class="filtro-top">
        <div class="flex">
          <label for="">Filtros</label>
          <img
            class="filtro-img"
            src="@/assets/filtro.svg"
            alt=""
            @click="setModalFiltros"
          />
        </div>

        <form class="d-flex">
          <input
            class="buscar"
            type="search"
            placeholder="Ingrese ID"
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
        <select @change="getFiltro($event)" name="" id="">
          <option>Filtros</option>
          <option value="0">Todos mis trámites</option>
          <option value="1">Presentados</option>
          <option value="2">En proceso</option>
          <option value="3">Requeridos</option>
          <option value="4">Finalizados</option>
        </select>
      </div>
      <div class="container-medio">
        <!--SE MUESTRAN TODOS LOS TRAMITES EN PLAZO -->
        <div class="tabla-container">
          <h3>Trámites activos</h3>
          <div v-for="item in this.activos" :key="item.id">
            <CardComponentVue
              :obj="item"
              :ModalTarea="ModalTarea"
              :verTramite="verTramite"
              :ModalComunicacion="ModalComunicacion"
              :ModalRequerimiento="ModalRequerimiento"
            />
          </div>
          <div class="nav">
            <!-- <div class="pagNum">
              {{ this.paginaActual }}
            </div>-->
            <!--<div class="cant" v-if="this.activos">
              <p>Cantidad de tramites:</p>
              <p class="length">
                {{ this.activos.length || 0 }}
              </p>
            </div>-->
          </div>
        </div>

        <!--EN ESTA TABALA SE PUEDE VER TODOS LOS TRAMITES, A LA VEZ REALIZAR TAREAS, COMUNICACIONES O REQUERIMIENTOS A CUALQUIER DE ELLOS-->

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
            <div class="data-container" v-for="item in history" :key="item.id">
              <section v-if="item.id === selectedTramite">
                <div class="data-container">
                  <h3>Datos del vecino:</h3>
                  <div class="user-data-container">
                    <div class="user-data">
                      <p><b>Nombre:</b> {{ item.user.firstname }}</p>

                      <p><b>Apellido:</b> {{ item.user.lastname }}</p>

                      <p><b>Email:</b> {{ item.user.email }}</p>
                    </div>
                    <div class="user-data">
                      <p><b>CUIL:</b> {{ item.user.cuil }}</p>

                      <p><b>Dirección:</b> {{ item.user.adress }}</p>
                    </div>
                  </div>
                </div>

                <h3>Info tramite:</h3>
                <div
                  class="question"
                  v-for="(q, key) in item.questions"
                  :key="key"
                >
                  <div>
                    <h5>
                      <strong>
                        {{ q.question.title }}
                      </strong>
                    </h5>

                    <p v-if="q.question_option_history[0].answer">
                      {{ q.question_option_history[0].answer }}
                    </p>
                    <p v-else>No hay respuesta registrada</p>
                  </div>
                </div>
                <!--EL TRAMITE QUE TENGA REQUERIMIENTOS SE PODRA VER LOS MISMOS-->
                <div
                  v-if="Array.isArray(item.requirementHistory)"
                  class="requerimiento"
                >
                  <p>Requerimiento:</p>
                  {{ item.requirementHistory[0].info_req }}
                  <div
                    v-if="
                      item.requirementHistory[0].answer ||
                      item.requirementHistory[0].documentRequirement.file
                    "
                  >
                    <p>Respuesta</p>
                    {{ item.requirementHistory[0].answer || "" }}
                    {{
                      item.requirementHistory[0].documentRequirement.file || ""
                    }}
                  </div>

                  <span class="spanFecha"
                    >{{
                      new Date(
                        item.requirementHistory[0].created_at
                      ).toLocaleString()
                    }}
                  </span>
                </div>
                <input
                  class="btn btn-primary mx-2"
                  type="button"
                  value=" Tarea"
                  @click="ModalTarea(item.id)"
                />

                <input
                  class="btn btn-primary mx-2"
                  type="button"
                  value=" Comunicacion"
                  @click="ModalComunicacion(item.id)"
                />
                <input
                  class="btn btn-primary mx-2"
                  type="button"
                  value=" Requerimiento"
                  @click="ModalRequerimiento(item.id)"
                />
                <div class="finalizar">
                  <input
                    class="btn btn-success mx-2"
                    type="button"
                    value=" Finalizar tramite"
                    @click="FinalizarTramite()"
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
              <h3>Asignar Tarea. Trámite n°: {{ this.selectedTramite }}</h3>
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

        <!--MODAL DE COMUNICACIONES AL CIUDADANO-->

        <div class="modalTarea">
          <div v-if="this.modalComunicacion === true" class="modal-content">
            <div class="modal-top">
              <h3>Comunicado. Trámite n°:{{ this.selectedTramite }}</h3>
              <img
                @click="CloseComunicaciones()"
                class="svg"
                src="@/assets/close.svg"
                alt=""
              />
            </div>
            <div class="titleComunicacion">
              <label for="titleComunicacion">
                Asunto
                <input
                  type="text"
                  name="titleComunicacion"
                  id=""
                  v-model="this.titleComunicacion"
                />
              </label>
            </div>

            <textarea
              name="comunicado"
              id=""
              cols="30"
              rows="5"
              v-model="this.comunicacion"
            ></textarea>
            <input
              type="button"
              value="Enviar"
              @click="submitComunicacion"
              class="botonSubmit"
              v-if="this.comunicacion"
            />
            <p v-else class="enviado">{{ this.message }}</p>
          </div>
        </div>

        <!-- MODAL PARA HACER UN REQUERIMIETO AL TRAMITE-->
        <div class="modalTarea">
          <div v-if="this.modalRequerimiento === true" class="modal-content">
            <div class="modal-top">
              <h3>
                Asignar Requerimiento. <br />
                Trámite n°: {{ this.selectedTramite }}
              </h3>
              <img
                @click="CloseRequerimiento"
                class="svg"
                src="@/assets/close.svg"
                alt=""
              />
            </div>
            <CreateRequirementsComponentVue
              :id="this.selectedTramite"
              :getProceduresRequeridos="this.getProceduresRequeridos"
              :getProcedures="this.getProcedures"
            />
          </div>
        </div>

        <!--MODAL PARA VER LA RESPUESTA DEL REQUERIMIENTO-->
        <div class="modalRespuesta">
          <div v-if="this.modalresponse === true" class="modal-content">
            <div class="modal-top">
              <h3>Respuestas requerimiento:</h3>
              <img
                @click="CloseModalResponse"
                class="svg"
                src="@/assets/close.svg"
                alt=""
              />
            </div>
            <p>trámite N°: {{ this.selectedTramite }}</p>
            <div
              class="response"
              v-for="resp in this.selectedHistory.requerimientos"
              :key="resp.id"
            >
              <div class="respuestas" v-if="!resp.active">
                <strong>Asunto: {{ resp.info_req }}</strong>
                <p>* {{ resp.answer }}</p>
                <a
                  v-for="(file, index) in resp.documentRequirement"
                  :key="index"
                  :href="file.file"
                  target="blak"
                >
                  * {{ file.file }}
                </a>
                <br />
                <br />
                <p>fecha: {{ new Date(resp.finalized_at).toLocaleString() }}</p>
              </div>
              <div v-if="resp.active">
                <strong>Asunto: {{ resp.info_req }}</strong>
                <p>SIN RESPONDER</p>
              </div>
            </div>
          </div>
        </div>
        <!--VISTA DE TABLA CON TRAMITES FUERA DE PLAZOS-->
        <div class="tabla-container">
          <h3>Trámites fuera de plazo</h3>
          <div v-for="item in this.deadline" :key="item.id">
            <CardComponentVue
              :obj="item"
              :ModalTarea="ModalTarea"
              :verTramite="verTramiteDeadline"
              :ModalComunicacion="ModalComunicacion"
              :ModalRequerimiento="ModalRequerimiento"
            />
          </div>
          <div class="nav"></div>
        </div>

        <!--VISTA DE TABLA CON TRAMITES REQUERIDOS-->
        <div class="tabla-container">
          <h3>Trámites con requerimientos</h3>
          <div v-for="item in this.requeridos" :key="item.id">
            <CardComponentVue
              :obj="item"
              :ModalTarea="ModalTarea"
              :verTramite="verTramiteRequerido"
              :ModalComunicacion="ModalComunicacion"
              :ModalRequerimiento="ModalRequerimiento"
            />
          </div>
          <div class="nav">
            <!--<div class="cant" v-if="this.activos">
              <p>Cantidad de tramites:</p>
              <p class="length">
                {{ this.activos.length || 0 }}
              </p>
            </div>-->
          </div>
        </div>
        <!--MODAL PARA VER LOS FILTROS-->
        <div v-if="this.modalFiltros">
          <FiltrosComponentVue
            :setModalFiltros="this.setModalFiltros"
            :getFiltro="this.getFiltro"
            :getFiltroByTitle="this.getFiltroByTitle"
            :getFiltroByUserMuni="this.getFiltroByUserMuni"
            :searchValue="this.searchValue"
            :search="this.search"
            :getFiltroByCuilUser="getFiltroByCuilUser"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CreateTasksComponentVue from "../Tareas/CreateTasksComponent.vue";
import CreateRequirementsComponentVue from "../Requerimientos/CreateRequirementsComponent.vue";
import CardComponentVue from "../CardComponent.vue";
import FiltrosComponentVue from "../Filtros/FiltrosComponent.vue";
export default {
  props: {
    color: String,
  },
  components: {
    CreateTasksComponentVue,
    CreateRequirementsComponentVue,
    CardComponentVue,
    FiltrosComponentVue,
  },
  data() {
    return {
      modal: false,
      modalTarea: false,
      modalComunicacion: false,
      modalRequerimiento: false,
      trespuntos: false,
      selectedHistory: null,
      selectedTramite: null,
      checkbox: [],
      activos: [],
      history: null,
      paginas: null,
      paginaActual: 1,
      cont: 0,
      status: "",
      titleComunicacion: "",
      comunicacion: "",
      message: null,
      requerimiento: null,
      modalresponse: false,
      deadline: [],
      allDeadline: [],
      requeridos: [],
      modalFiltros: false,
      search: "",
    };
  },
  created() {
    this.getProcedures();
    this.getProceduresDeadline();
    this.getProceduresRequeridos();
  },
  methods: {
    //TRAE LOS TRAMITES DE SU AREA
    setModalFiltros() {
      this.modalFiltros = !this.modalFiltros;
    },
    getProcedures() {
      this.activos = [];

      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });

      apiClient
        .get("/oficina/procedures/history")
        .then((response) => {
          let h = response.data.HistoryOfProcedures;
          console.log(h + "hitorial");
          //let l = h.length;

          this.history = h;

          //console.log(response);

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
          }

          //this.length = response.data.HistoryOfProcedures.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //BUSCA LOS TRAMITES FUERA DE PLAZO
    getProceduresDeadline() {
      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get("/oficina/procedures/history/deadline/2")
        .then((response) => {
          console.log(
            response.data.ProceduresFiltered,
            "soy los tramites fuera de plazo"
          );
          this.allDeadline = response.data.ProceduresFiltered;
          this.history = this.history.concat(response.data.ProceduresFiltered);
          let h = response.data.ProceduresFiltered;

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

            this.deadline.push(p);
          }
        });
    },
    getProceduresRequeridos() {
      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get("/oficina/procedures/history/deadline/3")
        .then((response) => {
          console.log(
            response.data.ProceduresFiltered,
            "soy los tramites requeridos"
          );
          this.history = this.history.concat(response.data.ProceduresFiltered);
          let h = response.data.ProceduresFiltered;

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

            this.requeridos.push(p);
          }
        });
    },
    //PARA VER UN TRAMITE EN ESPECIFICO
    verTramite(id) {
      this.selectedTramite = id;
      // Buscamos el elemento en el array history con el mismo id que selectedTramite

      for (let i = 0; i < this.history.length; i++) {
        if (this.history[i].id === id) {
          this.selectedHistory = this.history[i];
          break;
        }
      }
      if (this.selectedHistory.status.status === "PRESENTADO") {
        this.status = "2";
        this.updateStatus();
        this.activos = [];
        this.getProcedures();
      }

      this.modal = true;
      //console.log(this.selectedHistory);

      //console.log(id);
    },
    verTramiteDeadline(id) {
      this.selectedTramite = id;
      for (let i = 0; i < this.allDeadline.length; i++) {
        if (this.allDeadline[i].id === id) {
          this.selectedHistory = this.allDeadline[i];
          break;
        }
      }
      if (this.selectedHistory.status.status === "PRESENTADO") {
        this.status = "2";
        this.updateStatus();
        this.activos = [];
        this.getProcedures();
      }
      this.modal = true;
    },
    verTramiteRequerido(id) {
      this.selectedTramite = id;
      for (let i = 0; i < this.requeridos.length; i++) {
        if (this.requeridos[i].id === id) {
          this.selectedHistory = this.requeridos[i];
          break;
        }
      }

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
    getFiltro($event) {
      let apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });

      this.activos = [];

      if ($event.target.value === "0") {
        this.getProcedures();
      } else {
        apiClient
          .get(
            "/oficina/procedures/history-procedures/status/" +
              $event.target.value
          )
          .then((response) => {
            this.activos = [];
            this.status = "";
            console.log(response);

            let h = response.data.Procedures;
            this.history = h;
            let l = h.length;

            for (let i = 0; i < l; i++) {
              //Procedure
              let p = {
                id: null,
                cuil: "",
                categoria: "",
                estado: "",
                procedure: "",
              };
              //Carga del procedure

              p.id = h[i].id;
              p.cuil = h[i].user.cuil;
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

              console.log(p);
            }
            console.log(response.data.history);

            console.log(h[0].status);
          })
          .catch((e) => {
            console.log(e);
            this.history = false;
          });
      }
    },
    // BUSCADOR POR CUIL DEL USUARIO
    getFiltroByCuilUser(cuil) {
      console.log(cuil);
      let apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
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
          .catch((err) => {
            console.log(err);
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
      //console.log(value);
      let asd = null;

      //SI EL TRAMITE NO ESTA EN SU AREA LO BUSCA EN OTRA
      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient.get("/oficina/procedures/history/" + value).then((response) => {
        console.log(response);
        asd = response.data.Procedure.procedure;
        this.history = asd;
        this.search = "";
        let p = {
          id: null,
          cuil: "",
          categoria: "",
          estado: "",
          procedure: "",
        };
        p.id = asd[0].id;
        p.cuil = asd[0].user.cuil;
        p.categoria = asd[0].category.title;
        p.estado = asd[0].status.status;
        p.procedure = asd[0].procedure.title;
        p.requerimientos = asd[0].requirementHistory
          ? asd[0].requirementHistory
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

        this.activos = [];
        this.activos.push(p);
        this.setModalFiltros();
      });
      //this.activos = asd;
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
    ModalComunicacion(id) {
      this.selectedTramite = id;
      this.modalComunicacion = true;
    },
    CloseComunicaciones() {
      this.modalComunicacion = false;
    },
    ModalRequerimiento(id) {
      this.selectedTramite = id;
      this.modalRequerimiento = !this.modalRequerimiento;
    },
    CloseRequerimiento() {
      this.modalRequerimiento = !this.modalRequerimiento;
    },
    //CAMBIAR EL ESTADO DE UN TRAMITE
    updateStatus() {
      console.log("cambiar estado");
      //console.log(this.selectedTramite);
      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
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
        .catch((e) => {
          console.log(e);
        });
      //this.ModalEstado();
    },

    //ENVIAR UN COMUNICADO DE UN TRAMITE
    submitComunicacion() {
      if (this.comunicacion) {
        console.log(this.comunicacion);
        const apiClient = axios.create({
          //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
          baseURL: process.env.VUE_APP_BASEURL,
          withCredentials: false,
          headers: {
            "auth-header": localStorage.getItem("token"),
          },
        });
        apiClient
          .post(
            "/communications/create-communication/" + this.selectedTramite,
            { title: this.titleComunicacion, description: this.comunicacion }
          )
          .then((response) => {
            if (response.status === 201) {
              //SE ACTUALIZA EL ESTADO DEL TRAMITE A COMUNICACION
              this.message = "Comunicacion enviada!";
              this.titleComunicacion = "";
              this.comunicacion = "";
            }
          })
          .catch((e) => {
            if (e.response.status === 401) {
              this.message = e.response.data.message;
            }
            console.log(e);
          });
      }
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
    FinalizarTramite() {
      this.status = "4";
      this.updateStatus();
      this.activos = [];
      this.getProcedures();
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
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  word-break: break-all;
}
.modalTarea {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  z-index: 15;
  position: absolute;
  top: 30%;
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
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
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
  top: 30%;
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

.cant {
  display: flex;
  margin: 0;
}

.nav {
  align-self: flex-start;
  position: absolute;
  bottom: 10px;
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
  width: 30%;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding-top: 1rem;
  position: relative;
  height: 70vh;
  overflow-y: scroll;
  padding: 0.5rem;
  background: rgb(235, 235, 235);
  border-radius: 20px 0px 0px 10px;
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
.finalizar {
  width: 30%;
  margin: auto;
  margin-top: 1rem;
}
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

.cardFiltros {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 2rem;
  padding-top: 2rem;
  border: 1px solid grey;
}
</style>
