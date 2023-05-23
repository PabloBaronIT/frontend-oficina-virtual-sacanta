<template>
  <div class="containerGeneral">
    <div class="containerTramites">
      <div class="filtro-container">
        <input type="button" value="Actualizar estado" />
        <img class="filtro-img" src="@/assets/filtro.svg" alt="" />
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
            @click="searchValue(search)"
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
      <div class="tabla-container">
        <table>
          <tr>
            <th>
              <input @click="select" type="checkbox" name="" id="" />
            </th>
            <th>Titulo</th>
            <th>ID</th>
            <th>Cuil vecino</th>
            <th>Asunto</th>
            <th>Estado</th>
            <th></th>
          </tr>

          <!--EN ESTA TABALA SE PUEDE VER TODOS LOS TRAMITES, A LA VEZ REALIZAR TAREAS, COMUNICACIONES O REQUERIMIENTOS A CUALQUIER DE ELLOS-->

          <tr class="fila-tabla" v-for="(p, key) in this.activos" :key="key">
            <td>
              <input type="checkbox" @click="check(p.id)" :value="p.id" />
            </td>
            <td @click="verTramite(p.id)">{{ p.procedure }}</td>
            <td @click="verTramite(p.id)">{{ p.id }}</td>
            <td @click="verTramite(p.id)">{{ p.cuil.cuil }}</td>
            <td @click="verTramite(p.id)">{{ p.categoria }}</td>
            <td :class="'estado-fila'" @click="verTramite(p.id)">
              <p :style="`background: ${p.color}`">{{ p.estado }}</p>
            </td>
            <!-- BOTON PARA MAS ACCIONES-->
            <td>
              <div class="dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ></button>
                <ul class="dropdown-menu">
                  <!--BOTON PARA REALIZAR TAREA RELACIONADO AL TRAMITE-->
                  <li>
                    <p class="dropdown-item" @click="ModalTarea(p.id)">Tarea</p>
                  </li>
                  <!--BOTON PARA REALIZAR COMUNICACION RELACIONADO AL TRAMITE-->

                  <li>
                    <p class="dropdown-item" @click="ModalComunicacion(p.id)">
                      Comunicacion
                    </p>
                  </li>
                  <!--BOTON PARA REALIZAR REQUERIMIENTO RELACIONADO AL TRAMITE-->

                  <li>
                    <a class="dropdown-item" @click="ModalRequerimiento(p.id)"
                      >Requerimiento</a
                    >
                  </li>
                </ul>
              </div>
            </td>
          </tr>

          <div class="modaltrespuntos" v-if="this.trespuntos === true">
            <div class="modal-top">
              <img
                @click="modalTrespuntos()"
                class="svg"
                src="@/assets/close.svg"
                alt=""
              />
            </div>
            <p>soy las taeas</p>
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
              <div
                class="data-container"
                v-for="item in history"
                :key="item.id"
              >
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
                        {{ q.question.title }}
                      </h5>
                      <p v-if="q.question_option_history.length">
                        {{ q.question_option_history[0].answer }}
                      </p>
                      <p v-else>No hay respuesta registrada</p>
                    </div>
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
              <CreateRequirementsComponentVue :id="this.selectedTramite" />
            </div>
          </div>
        </table>
        <div class="sinTramites" v-if="!this.history">
          <h2>No hay trámites registrados</h2>
        </div>

        <div class="filtro-filas">
          <div class="nav">
            <!-- <img
            class="svg"
            @click="backTramites"
            src="@/assets/previous.svg"
            alt=""
            v-if="this.paginaActual > 1"
          />-->

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

            <!-- <img
            @click="nextPag"
            class="svg"
            src="@/assets/next.svg"
            alt=""
            v-if="this.paginaActual < this.paginas"
          />-->
          </div>

          <!-- <div class="filtro-filas">
        <div v-for="(i, k) in this.paginas" :key="k">
          <span v-if="this.paginaActual < k" class="pagNum">{{ k + 1 }}</span>
          <span v-if="this.paginaActual === k" class="pagNum"
            ><b>{{ k + 1 }}</b></span
          >
          <span v-if="this.paginaActual > k" class="pagNum">{{ k + 1 }}</span>
        </div>
       



      <div class="nav">
        <img class="svg" src="@/assets/previous.svg" alt="" />
        <b>1</b> 2 3
        <img class="svg" src="@/assets/next.svg" alt="" />
      </div> -->

          <div class="cant" v-if="this.history">
            <p>Cantidad de tramites:</p>
            <p class="length">
              {{ this.history.length || 0 }}
            </p>

            <!-- <input type="number" class="cant-input" />-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
//import Config from "chart.js/dist/core/core.config";
import CreateTasksComponentVue from "./Tareas/CreateTasksComponent.vue";
import CreateRequirementsComponentVue from "./Requerimientos/CreateRequirementsComponent.vue";
export default {
  props: {
    color: String,
  },
  components: {
    CreateTasksComponentVue,
    CreateRequirementsComponentVue,
  },
  data() {
    return {
      modal: false,
      modalTarea: false,
      modalComunicacion: false,
      modalRequerimiento: false,
      trespuntos: false,
      selectedHistory: null,
      selectedTramite: null, //EN USO
      checkbox: [],
      activos: [],
      history: null,
      paginas: null,
      paginaActual: 1,
      cont: 0,
      //l: 0,
      search: "",
      status: "",
      titleComunicacion: "",
      comunicacion: "",
      message: null,
      requerimiento: null,
    };
  },
  created() {
    this.getProcedures();
  },
  methods: {
    //TRAE LOS TRAMITES DE SU AREA
    getProcedures() {
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

          console.log("Hola");
          //console.log(response);

          for (let i = 0; i < h.length; i++) {
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
            p.cuil = h[i].user;
            p.categoria = h[i].category.title;
            p.estado = h[i].status.status;
            p.procedure = h[i].procedure.title;

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
    //FILTRAR TRAMITES
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
      });
      //this.activos = asd;
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
  },
};
</script>

<style scoped>
.containerGeneral {
  display: flex;
  flex-direction: row;
  width: 100vw;
}
.containerTramites {
  width: 98%;
}
.containerTareas {
  width: 45%;
}
.pagNum {
  margin: 0 1.5px;
}
section h3 {
  text-decoration: underline;
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

.modal-top {
  display: flex;
  width: 100%;
  text-align: left;
  justify-content: space-around;
  align-items: flex-start;
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
  width: 95%;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
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
  max-width: 20px;
}

.filtro-container {
  width: 95%;
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
</style>
