<template>
  <div class="tabla-container">
    <button @click="getFiltro(1)" class="btn btn-primary">SOLICITADOS</button>
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
      <tr class="fila-tabla" v-for="(p, key) in this.activos" :key="key">
        <td><input type="checkbox" name="" :id="p.id" /></td>
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
      activos: [],
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
    getFiltro(s) {
      const apiClient=
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
