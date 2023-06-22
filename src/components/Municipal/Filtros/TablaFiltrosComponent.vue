<template>
  <div>
    <div>
      <FiltrosComponent />
    </div>
    <table class="table table-striped">
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
  </div>
</template>
<script>
import FiltrosComponent from "./FiltrosComponent.vue";
export default {
  props: {
    history: Array,
  },
  components: {
    FiltrosComponent,
  },
};
</script>
<style scoped>
th,
tr {
  border-bottom: solid 1px grey;
  font-size: 15px;
}
</style>
