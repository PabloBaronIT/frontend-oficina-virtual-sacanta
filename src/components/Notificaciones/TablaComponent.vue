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
      <tr>
        <td><input type="checkbox" name="" id="" /></td>
        <td>Alfreds Futterkiste</td>
        <td>Alfreds Futterkiste</td>
        <td>Maria Anders</td>
        <td>Germany</td>
      </tr>
      <tr>
        <td><input type="checkbox" name="" id="" /></td>
        <td>Alfreds Futterkiste</td>
        <td>Alfreds Futterkiste</td>
        <td>Maria Anders</td>
        <td>Germany</td>
      </tr>
      <tr>
        <td><input type="checkbox" name="" id="" /></td>
        <td>Alfreds Futterkiste</td>
        <td>Alfreds Futterkiste</td>
        <td>Maria Anders</td>
        <td>Germany</td>
      </tr>
    </table>
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
.tabla-container {
  width: 100%;
}

table {
  width: 70%;
}

th,
td {
  padding: 8px;
  border-bottom: 1px solid var(--green);
  background: #fff;
  height: 40px;
  color: var(--blue);
  font-size: 0.9em;
}

td {
}
</style>
