<template>
  <div class="contenedor">
    <table class="table divTitulos">
      <thead>
        <tr>
          <th scope="col"><p>FECHA</p></th>
          <th scope="col"><p>SERVICIO</p></th>
          <th scope="col"><p>ASUNTO</p></th>
          <th scope="col"><p>ESTADO</p></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in this.comunicaciones" :key="index">
          <td>{{ new Date(item.created_at).toLocaleDateString() }}</td>
          <td>OFICINA VIRTUAL</td>
          <td>{{ item.subject }}</td>
          <td>Leida</td>
        </tr>
      </tbody>
    </table>

    <!-- <div
      v-for="(item, index) in this.comunicaciones"
      :key="index"
      class="divTitulos"
    >
      <p>{{ new Date(item.created_at).toLocaleDateString() }}</p>
      <p>Oficina Virtual</p>
      <p>{{ item.subject }}</p>
      <p>Leida</p>
    </div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      comunicaciones: null,
    };
  },
  props: {
    communications: Array,
  },
  created() {
    this.comunicaciones = this.communications;
  },
};
</script>
<style scoped>
.contenedor {
  width: 73vw;
  box-shadow: 4px 4px 7px 0px rgba(0, 0, 0, 0.25);
  border-top-right-radius: 20px;
}
.divTitulos {
  /* display: flex;
  flex-direction: row;
  justify-content: space-around; */
  background: white;
  padding: 1vw;
  /* border-bottom: 1px solid #9b9a9a; */
  text-align: left;
  border-radius: 0px 20px 0px 0px;
}
.divTitulos p {
  color: #4b4a49;
  font-weight: 600;
  font-size: 16px;
}
.datos {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 1vw;
  background: white;
  border-bottom: 1px solid #9b9a9a;
}
</style>
