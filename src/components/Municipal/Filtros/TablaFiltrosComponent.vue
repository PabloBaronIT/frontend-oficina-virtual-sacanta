<template>
  <div>
    <table class="table table-striped" v-if="this.message === false">
      <tr>
        <th>Titulo</th>
        <th>Id tramite</th>
        <th>Fecha</th>
        <th>Nombre</th>
        <th>cuil</th>
        <th>Estado</th>
        <th>Plazo</th>
        <th>agente</th>
      </tr>
      <tr v-for="item in this.history" :key="item.id">
        <td>
          {{ item.title }}
        </td>
        <td>
          {{ item.id }}
        </td>
        <td>
          {{ item.fecha }}
        </td>
        <td>{{ item.firstname }} {{ item.lastname }}</td>
        <td>
          {{ item.cuil }}
        </td>
        <td>
          {{ item.estado }}
        </td>
        <td>
          {{ item.plazo }}
        </td>
        <td>{{ item.agenteFirstname }}{{ item.agenteLastname }}</td>
      </tr>
    </table>
    <div v-else>
      <h1>No se encontraron tramites con los filtros especificados</h1>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    history: Array,
    message: Boolean,
  },

  data() {
    return {
      search: null,
      searchCuil: null,
      fromDate: null,
      toDate: null,
      status: null,
      deadline: null,
      userMuni: true,
      modalFiltros: false,
    };
  },
  methods: {},
};
</script>
<style scoped>
th,
tr {
  border-bottom: solid 1px grey;
  font-size: 15px;
}
</style>
