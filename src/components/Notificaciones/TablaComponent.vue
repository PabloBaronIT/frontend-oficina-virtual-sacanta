<template>
  <div class="tabla-container">
    <table>
      <tr>
        <th><input type="checkbox" name="" id="" /></th>
        <th>Fecha</th>
        <th>Servicio</th>
        <th>Asunto</th>
        <th>Estado</th>
      </tr>
      <tr class="fila-tabla">
        <td><input type="checkbox" name="" id="" /></td>
        <td>Alfreds Futterkiste</td>
        <td>Alfreds Futterkiste</td>
        <td>Maria Anders</td>
        <td class="estado-fila"><p>Germany</p></td>
      </tr>
      <tr class="fila-tabla">
        <td><input type="checkbox" name="" id="" /></td>
        <td>Alfreds Futterkiste</td>
        <td>Alfreds Futterkiste</td>
        <td>Maria Anders</td>
        <td class="estado-fila"><p>Germany</p></td>
      </tr>
      <tr class="fila-tabla">
        <td><input type="checkbox" name="" id="" /></td>
        <td>Alfreds Futterkiste</td>
        <td>Alfreds Futterkiste</td>
        <td>Maria Anders</td>
        <td class="estado-fila"><p>Germany</p></td>
      </tr>
    </table>
    <div class="filtro-filas">
      <input type="number" name="" id="" />
    </div>
  </div>
</template>

<script>
import pruebasService from "@/services/pruebasService";

export default {
  components: {},
  data() {
    return {
      tablas: [],
    };
  },
  created() {
    pruebasService.getList().then(async (response) => {
      this.tablas.push(response.data.data);

      console.log(response.data.data);
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
.filtro-filas {
  color: var(--text-color);
  padding: 10px;
  display: flex;
  justify-content: right;
  border: 1px solid var(--grey);
  width: 100%;
  height: 40px;
}

.filtro-filas input {
  width: 20%;
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

input:hover {
  cursor: pointer;
  box-shadow: 0px 0px 15px rgba(70, 70, 70, 0.459);
}
</style>
