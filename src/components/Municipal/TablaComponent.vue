<template>
  <div>
    <div class="filtro-container">
      <input type="button" @click="updateStatus()" value="Actualizar estado" />
      <img class="filtro-img" src="@/assets/filtro.svg" alt="" />
      <form class="d-flex">
        <input
          class="buscar"
          type="search"
          placeholder="Dato a buscar"
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
        <option value="0">Todos</option>
        <option value="1">Solicitado</option>
        <option value="2">En proceso</option>
        <option value="3">Finalizados</option>
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
        </tr>

        <tr
          class="fila-tabla"
          v-for="(p, key) in this.activos"
          @click="verTramite(p.id)"
          :key="key"
        >
          <td>
            <input type="checkbox" @click="check(p.id)" :value="p.id" />
          </td>
          <td>{{ p.procedure }}</td>
          <td>{{ p.id }}</td>
          <td>{{ p.cuil.cuil }}</td>
          <td>{{ p.categoria }}</td>
          <td :class="'estado-fila'">
            <p :style="`background: ${p.color}`">{{ p.estado }}</p>
          </td>
        </tr>

        <!--   -->

        <!-- - - - - - - Inicio modal - - - - - -   -->
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
                <section
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
                    <p v-else>no hay respuesa regitrada</p>
                  </div>
                </section>
                <input
                  class="btn btn-primary mx-2"
                  type="button"
                  value="Modificar Estado"
                  @click="ModalEstado()"
                />

                <input
                  class="btn btn-outline-primary"
                  type="button"
                  value="Documento"
                />
              </section>
            </div>
          </div>

          <!-- <h2>{{ p.id }}</h2>

          {{ p.cuil }}

          {{ this.selectedHistory }} -->

          <!-- <div v-for="(option, key) in this.history" :key="key">
            <h2>{{ key }}</h2>
            <section v-for="(q, key) in option.questions" :key="key">
              {{ q.question.title }}
              {{ q.question_option_history[0].answer }}
            </section>
          </div> -->
        </div>
        <!--modalestado-->
        <div class="modalEstado">
          <div v-if="this.modalEstado === true" class="modal-content">
            <div class="modal-top">
              <h2>Cambiar estado</h2>
              <img
                @click="ModalEstado($event)"
                class="svg"
                src="@/assets/close.svg"
                alt=""
              />
            </div>
            <div>
              <div>
                <p value="2">
                  <input
                    @click="selectEstado($event)"
                    type="checkbox"
                    name=""
                    value="2"
                  />En proceso
                </p>
              </div>

              <div>
                <p value="2">
                  <input
                    @click="selectEstado($event)"
                    type="checkbox"
                    name=""
                    value="3"
                  />Requerido
                </p>
              </div>
              <div>
                <p value="2">
                  <input
                    @click="selectEstado"
                    type="checkbox"
                    name=""
                    value="4"
                  />Finalizado
                </p>
              </div>
            </div>
            <input
              class="btn btn-primary mx-2"
              type="button"
              value="Modificar"
              @click="updateStatus()"
            />
          </div>
        </div>
      </table>
      <div class="sinTramites" v-if="!this.history || !this.activos.length">
        <h2>No hay trámites registrados</h2>
      </div>
      <div class="filtro-filas">
        <div v-for="(i, k) in this.paginas" :key="k">
          <span v-if="this.paginaActual < k" class="pagNum">{{ k + 1 }}</span>
          <span v-if="this.paginaActual === k" class="pagNum"
            ><b>{{ k + 1 }}</b></span
          >
          <span v-if="this.paginaActual > k" class="pagNum">{{ k + 1 }}</span>
        </div>
        <!-- 



      <div class="nav">
        <img class="svg" src="@/assets/previous.svg" alt="" />
        <b>1</b> 2 3
        <img class="svg" src="@/assets/next.svg" alt="" />
      </div> -->

        <div class="cant">
          <p>Cantidad de tramites:</p>
          <p class="length" v-if="this.history">
            {{ this.history.length }}
          </p>

          <!-- <input type="number" class="cant-input" />-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import dbService from "@/services/dbService";
import axios from "axios";
//import Config from "chart.js/dist/core/core.config";

export default {
  props: {
    color: String,
  },
  data() {
    return {
      modal: false,
      modalEstado: false,
      selectedHistory: null,
      selectedTramite: null,
      checkbox: [],
      activos: [],
      history: null,
      paginas: null,
      paginaActual: 1,
      cont: 0,
      l: 0,
      search: "",
      status: "",
    };
  },
  created() {
    this.getProcedures();

    //Pedir solamente los que vengan desde una prop del status
    //   .getHistorialTramites()
    //   .then((response) => {
    //     let h = response.data.history;
    //     let l = h.length;
    //     for (let i = 0; i < l; i++) {
    //       //Procedure
    //       let p = {
    //         id: null,
    //         cuil: null,
    //         categoria: "",
    //         estado: "",
    //         color: "",
    //       };
    //       //Carga del procedure
    //       p.id = h[i].id;
    //       p.cuil = h[i].user.cuil;
    //       p.categoria = h[i].category.title;
    //       p.estado = h[i].status.status;
    //       switch (p.estado) {
    //         case "SOLICITADO":
    //           p.color = "var(--green)";
    //           break;
    //         case "EN PROCESO":
    //           p.color = "var(--red)";
    //           break;
    //         default:
    //           break;
    //       }
    //       this.activos.push(p);
    //       console.log(p);
    //     }
    //     this.length = response.data.length;
    //     console.log(response.data.history);
    //     console.log(h[0].status);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },
  methods: {
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
          let l = h.length;

          this.history = h;

          console.log("Hola");
          //console.log(response);

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
            p.cuil = h[i].user;
            p.categoria = h[i].category.title;
            p.estado = h[i].status.status;
            p.procedure = h[i].procedure.title;

            switch (p.estado) {
              case "SOLICITADO":
                p.color = "var(--green)";
                break;
              case "REQUERIDO":
                p.color = "var(--yellow)";
                break;
              case "EN PROCESO":
                p.color = "var(--red)";
                break;
              case "FINALIZADO":
                p.color = "var(--lblue)";
                break;

              default:
                break;
            }

            this.activos.push(p);
          }

          this.length = response.data.HistoryOfProcedures.length;
        })
        .catch((err) => {
          console.log(err);
        });

      // dbService
    },

    verTramite(id) {
      this.selectedTramite = id;
      this.modal = true;
      // Buscamos el elemento en el array history con el mismo id que selectedTramite

      for (let i = 0; i < this.history.length; i++) {
        if (this.history[i].id === id) {
          this.selectedHistory = this.history[i];
          break;
        }
      }

      // Mostramos el estado del elemento encontrado
      console.log(this.selectedHistory);

      console.log(id);
    },
    selectEstado(event) {
      this.status = event.target.value;
      console.log(this.status);
    },
    check(id) {
      this.checkbox.push(id);
      console.log(this.checkbox);
    },

    getFiltro(event) {
      let apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });

      this.activos = [];

      if (event.target.value == 0) {
        this.getProcedures();
      } else {
        apiClient
          .get(
            "/oficina/procedures/history-procedures/status/" +
              event.target.value
          )
          .then((response) => {
            console.log(response);
            let h = response.data.Procedures;

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
                case "SOLICITADO":
                  p.color = "var(--green)";
                  break;
                case "REQUERIDO":
                  p.color = "var(--yellow)";
                  break;
                case "EN PROCESO":
                  p.color = "var(--red)";
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

            this.length = response.data.length;

            console.log(response.data.history);

            console.log(h[0].status);
          })
          .catch((e) => {
            console.log(e);
          });
      }
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
    nextPag() {
      console.log("hola");
      if (parseFloat(this.paginaActual) < parseFloat(this.paginas)) {
        this.paginaActual++;
        this.cantTramites(this.l);
      } else {
        console.log("No hay mas páginas disponibles.");
      }
    },

    Modal() {
      this.selectedTramite = null;
      this.modal = false;
    },
    ModalEstado() {
      this.modalEstado = !this.modalEstado;
    },
    updateStatus() {
      console.log("cambiar estado");
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
          { status: this.status }
        )
        .then((response) => {
          if (response.status === 200) {
            alert("estado actualizado");
          }
        })
        .catch((e) => {
          console.log(e);
        });
      this.ModalEstado();
    },
    searchValue(value) {
      //console.log(value);
      let asd = this.history.filter((e) => {
        return e.id == value;
      });
      console.log("soy el" + asd[0].id);
      //this.activos = asd;
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
        case "SOLICITADO":
          p.color = "var(--green)";
          break;
        case "REQUERIDO":
          p.color = "var(--yellow)";
          break;
        case "EN PROCESO":
          p.color = "var(--red)";
          break;
        case "FINALIZADO":
          p.color = "var(--lblue)";
          break;

        default:
          break;
      }

      this.activos = [];
      this.activos.push(p);
      console.log(p);
    },
  },
};
</script>

<style scoped>
.pagNum {
  margin: 0 1.5px;
}
section h3 {
  text-decoration: underline;
}

.user-data-container {
  display: flex;
  justify-content: space-evenly;
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
  justify-content: space-between;
  align-items: flex-start;
}

.modal-content {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}
.modalEstado {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  z-index: 15;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 400px; /* Need a specific value to work */
  border-radius: 10px;
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

input:hover {
  border: 1px solid var(--green);
}

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
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
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
  width: 100%;
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
</style>
