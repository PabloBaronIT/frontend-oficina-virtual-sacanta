<template>
  <div class="tabla-container">
    <table>
      <tr>
        <th>
          <input @click="select" type="checkbox" name="" id="" />
        </th>
        <th>Titulo</th>
        <th>ID</th>
        <th>Ultimo movimiento</th>
        <th>Asunto</th>
        <th>Estado</th>
      </tr>

      <tr class="fila-tabla" v-for="(p, key) in this.mostrados" :key="key">
        <td><input type="checkbox" name="" :id="p.id" /></td>
        <td>Escritura terreno</td>
        <td>{{ p.id }}</td>
        <td>{{ p.fecha }}</td>
        <td>{{ p.categoria }}</td>
        <td :class="'estado-fila'">
          <p :style="`background: ${p.color}`">
            {{ p.estado }}
          </p>
        </td>
      </tr>
    </table>
    <div class="filtro-filas">
      <div class="nav">
        <img
          class="svg"
          @click="backTramites"
          src="@/assets/previous.svg"
          alt=""
        />
        <!-- <div v-for="(i, k) in this.paginaActual" :key="k">
          {{ i }}
        </div> -->
        <img @click="nextPag" class="svg" src="@/assets/next.svg" alt="" />
      </div>
      <p class="msj" v-if="this.msj != ''">{{ this.msj }}</p>
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
      msj: "",
      length: null,
      activos: [],
      mostrados: [],
      paginas: 0,
      paginaActual: 1.0,
      cont: 0,
      l: 0,
    };
  },
  created() {
    //Pedir solamente los que vengan desde una prop del status
    const apiClient = axios.create({
      baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
      withCredentials: false,
      headers: {
        "auth-header": localStorage.getItem("token"),
      },
    });

    apiClient
      .get("/oficina/procedures/history/user")
      .then((response) => {
        let h = response.data;

        console.log(h);
        this.l = h.length;

        for (let i = 0; i < this.l; i++) {
          //Procedure
          let p = {
            id: null,
            fecha: null,
            categoria: "",
            estado: "",
            color: "",
          };

          let iso = h[i].created_at;
          let date = new Date(iso);
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();

          //Carga del procedure
          p.id = h[i].id;
          p.fecha = `${day}/${month}/${year}`;
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

        this.cantTramites();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    cantTramites() {
      this.paginas = this.l / 5;

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
    select() {
      alert("Terminar metodo");
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
    // backPag() {
    //   console.log("chau");
    //   if (parseFloat(this.paginaActual) > parseFloat(this.paginas)) {
    //     this.paginaActual--;
    //     this.backTramites(this.l);
    //   } else {
    //     console.log("No hay mas paginbas disponibles.");
    //   }
    // },
  },
};
</script>

<style scoped>
.msj {
  border: 1px solid red;
  width: 100%;
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
</style>
