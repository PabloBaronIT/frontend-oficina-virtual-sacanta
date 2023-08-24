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
          {{ item.procedure.title }}
        </td>
        <td>
          {{ item.id }}
        </td>
        <td>
          {{ new Date(item.created_at).toLocaleDateString() }}
        </td>
        <td>{{ item.user.firstname }} {{ item.user.lastname }}</td>
        <td>
          {{ item.user.cuil }}
        </td>
        <td>
          {{ item.status.status }}
        </td>
        <td>
          {{ item.deadlineDays }}
        </td>
        <td>{{ item.userMuni.firstname }}{{ item.userMuni.lastname }}</td>
      </tr>
    </table>
    <div v-else>
      <h1>No se encontraron trámites con los filtros especificados</h1>
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
