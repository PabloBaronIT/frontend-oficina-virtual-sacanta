<template>
  <div class="tabla-container">
    <table>
      <tr>
        <th><input type="checkbox" name="" id="" /></th>
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
          <p :style="`background: ${color}`">{{ this.status }}</p>
        </td>
      </tr>
    </table>
    <div class="filtro-filas">
      <p>Cantidad de casos:</p>

      <input type="number" value="3" name="" id="" />
    </div>
  </div>
</template>

<script>
import dbService from "@/services/dbService";

export default {
  props: {
    status: String,
    color: String,
  },
  data() {
    return {
      activos: [],
    };
  },

  created() {
    //Pedir solamente los que vengan desde una prop del status
    dbService
      .getHistorialTramites()
      .then((response) => {
        let h = response.data.history;
        let l = h.length;

        for (let i = 0; i < l; i++) {
          //Procedure
          let p = {
            id: null,
            cuil: null,
            categoria: "",
          };
          //Carga del procedure
          p.id = h[i].id;
          p.cuil = h[i].user.cuil;
          p.categoria = h[i].category.title;

          if (h[i].status.status == this.status) {
            this.activos.push(p);
          }

          console.log(p);
        }

        this.length = response.data.length;

        console.log(response.data.history);

        console.log(h[0].status);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    update() {
      return "";
    },
  },
};
</script>

<style scoped>
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
  justify-content: right;
  border-bottom: 1px solid var(--grey);
  width: 100%;
  height: 40px;
}

.filtro-filas input {
  width: 5%;
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
