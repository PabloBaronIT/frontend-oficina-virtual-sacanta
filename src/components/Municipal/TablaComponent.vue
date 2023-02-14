<template>
  <div class="filtro-container">
    <input type="button" @click="updateStatus()" value="Actualizar estado" />
    <img class="filtro-img" src="@/assets/filtro.svg" alt="" />
    <select name="" id="">
      <option>
        <input type="button" @click="getFiltro(1)" value="Solicitados" />
      </option>
      <option>
        <input type="button" value="En proceso" @click="getFiltro(2)" />
      </option>
      <option>
        <input type="button" value="Finalizado" @click="getFiltro(4)" />
      </option>
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
        <th>Cuil</th>
        <th>Asunto</th>
        <th>Estado</th>
      </tr>
      <tr
        class="fila-tabla"
        v-for="(p, key) in this.activos"
        @click="verTramite(p.id)"
        :key="key"
      >
        <div class="grafico-container" v-if="selectedTramite === p.id">
          <div class="modal-content">
            <h1>Historial del trámite "{{ selectedTramite }}"</h1>

            <div v-for="item in history" :key="item.id">
              <span v-if="item.id === selectedTramite">
                <span
                  class="question"
                  v-for="(q, key) in item.questions"
                  :key="key"
                >
                  {{ q.question.title }}
                </span>
              </span>
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

        <td><input type="checkbox" @click="check(p.id)" :value="p.id" /></td>
        <td>Escritura terreno</td>
        <td>{{ p.id }}</td>
        <td>{{ p.cuil }}</td>
        <td>{{ p.categoria }}</td>
        <td :class="'estado-fila'">
          <p :style="`background: ${p.color}`">{{ p.estado }}</p>
        </td>
      </tr>
    </table>
    <div class="filtro-filas">
      <div class="nav">
        <img class="svg" src="@/assets/previous.svg" alt="" />
        <b>1</b> 2 3
        <img class="svg" src="@/assets/next.svg" alt="" />
      </div>

      <div class="cant">
        <p>Cantidad de tramites:</p>

        <input type="number" value="3" class="cant-input" />
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
      selectedHistory: null,
      selectedTramite: null,
      checkbox: [],
      activos: [],
      history: null,
    };
  },
  created() {
    //Pedir solamente los que vengan desde una prop del status
    const apiClient = axios.create({
      baseURL: "//localhost:3000/",
      withCredentials: false,
      headers: {
        "auth-header": localStorage.getItem("token"),
      },
    });

    apiClient
      .get("/oficina/procedures/history")
      .then((response) => {
        let h = response.data.history;
        let l = h.length;

        this.history = h;

        console.log("Hola");
        console.log(response);

        for (let i = 0; i < l; i++) {
          //Procedure
          let p = {
            id: null,
            cuil: null,
            categoria: "",
            estado: "",
            color: "",
          };
          //Carga del procedure
          p.id = h[i].id;
          p.cuil = h[i].user.cuil;
          p.categoria = h[i].category.title;
          p.estado = h[i].status.status;

          switch (p.estado) {
            case "SOLICITADO":
              p.color = "var(--green)";
              break;
            case "EN PROCESO":
              p.color = "var(--red)";
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
      .catch((err) => {
        console.log(err);
      });

    // dbService
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
    verTramite(id) {
      this.selectedTramite = id;

      // Buscamos el elemento en el array history con el mismo id que selectedTramite

      for (let i = 0; i < this.history.length; i++) {
        if (this.history[i].id === id) {
          this.selectedHistory = this.history[i];
          break;
        }
      }

      // Mostramos el estado del elemento encontrado
      console.log(this.selectedHistory);

      this.modal = !this.modal;
      console.log(id);
    },

    check(id) {
      this.checkbox.push(id);
      console.log(this.checkbox);
    },

    getFiltro(s) {
      let apiClientAuth = axios.create({
        baseURL: "//localhost:3000/",
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });

      this.activos = [];

      apiClientAuth
        .get("/oficina/procedures/history-procedures/status/" + s)
        .then((response) => {
          console.log(response);
          let h = response.data;

          let l = h.length;

          for (let i = 0; i < l; i++) {
            //Procedure
            let p = {
              id: null,
              cuil: null,
              categoria: "",
              estado: "",
              color: "",
            };
            //Carga del procedure
            p.id = h[i].id;
            // p.cuil = h[i].user.cuil;
            p.categoria = h[i].category.title;
            p.estado = h[i].status.status;

            switch (p.estado) {
              case "SOLICITADO":
                p.color = "var(--green)";
                break;
              case "EN PROCESO":
                p.color = "var(--red)";
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
    },
    select() {
      alert("Terminar metodo");
    },
    update() {
      return "";
    },
  },
};
</script>

<style scoped>
.modal-content {
  border: 1px solid red;
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
}

.question {
}

.grafico-container {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  z-index: 15;
  position: absolute;
  top: 5%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 500px; /* Need a specific value to work */
  height: auto;
  border-radius: 10px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5.5px);
  -webkit-backdrop-filter: blur(5.5px);
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
  max-width: 15px;
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
  background: var(--green);
  border-radius: 20px;
  border: none;
  outline: none;
}

select option {
  background: var(--green);
  color: var(--text-color);
  border: none;
  outline: none;
}
select option:hover {
  background: var(--green);
  outline: none;
  border: none;
}

@keyframe border-animation {
  0% {
    background-color: var(--red);
    left: 0px;
    top: 0px;
  }
  50% {
    background-color: var(--blue);
    left: 200px;
    top: 200px;
  }
  100% {
    background-color: var(--green);
    left: 0px;
    top: 0px;
  }
}
</style>
