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
        <tr
          v-for="(item, index) in this.comunicaciones"
          :key="index"
          @click="this.verComunicacion(item.id)"
          style="cursor: pointer"
        >
          <td>{{ new Date(item.created_at).toLocaleDateString() }}</td>
          <td>OFICINA VIRTUAL</td>
          <td>{{ item.subject }}</td>
          <td v-if="item.leido === false" style="color: red">Sin leer</td>
          <td v-else>Leido</td>
        </tr>
      </tbody>
    </table>
    <!-- MODAL PARA VER UNA COMUNICACION -->
    <div v-if="this.comunicacion" class="grafico-container">
      <!-- <p>{{ new Date(item.created_at).toLocaleDateString() }}</p>
      <p>Oficina Virtual</p>
      <p>{{ item.subject }}</p>
      <p>Leida</p> -->
      <div class="modal-top">
        <img
          @click="this.comunicacion = null"
          class="svg"
          src="@/assets/images/close.svg"
          alt=""
        />
      </div>
      <div class="d-flex">
        <h5>Asunto: {{ "  " }}</h5>
        <p>{{ this.comunicacion[0].subject }}</p>
      </div>
      <div class="d-flex">
        <h5>Mensaje: {{ "  " }}</h5>
        <p>{{ this.comunicacion[0].message }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      comunicaciones: [],
      comunicacion: null,
      leida: false,
    };
  },
  props: {
    communications: Array,
  },
  created() {
    // this.comunicaciones = this.communications;
    this.getComunicaciones();
  },
  methods: {
    verComunicacion(id) {
      this.comunicacion = this.communications.filter((item) => {
        return item.id === id;
      });
      this.comunicacion[0].leido = true;
    },
    getComunicaciones() {
      for (let index = 0; index < this.communications.length; index++) {
        const element = this.communications[index];
        element.leido = false;
        this.comunicaciones.push(element);
      }
      console.log(this.comunicaciones, "soy las comunicaciones");
    },
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
.grafico-container {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  z-index: 15;
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;
  margin: auto;
  width: 500px; /* Need a specific value to work */
  height: auto;
  padding: 1rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.modal-top {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: flex-end;
}
.svg {
  max-width: 15px;
  margin-left: 1rem;
}
</style>
