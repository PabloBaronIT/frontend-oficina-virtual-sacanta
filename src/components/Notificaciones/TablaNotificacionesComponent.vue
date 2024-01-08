<template>
  <div>
    <div class="modalTramite">
      <div class="divTitulos">
        <p>FECHA</p>
        <p>SERVICIO</p>
        <p>ASUNTO</p>
        <p>ESTADO</p>

        <!-- <p>{{ this.pagina }}</p> -->
      </div>
      <div
        v-for="(item, index) in this.comunicaciones"
        :key="index"
        @click="this.verComunicacion(item.id)"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style="cursor: pointer"
        class="encabezado"
      >
        <p>{{ new Date(item.created_at).toLocaleDateString() }}</p>
        <p>OFICINA VIRTUAL</p>
        <p>{{ item.subject }}</p>
        <p v-if="item.leido === false" style="color: red">Sin leer</p>
        <p v-else>Leido</p>
      </div>
    </div>
    <!-- MODAL PARA VER UNA COMUNICACION -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Notificación
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div v-if="this.comunicacion">
              <h5>Asunto:</h5>
              <p>{{ this.comunicacion[0]?.subject }}</p>
              <h5>Mensaje:</h5>
              <p>{{ this.comunicacion[0].message }}</p>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
          </div>
        </div>
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
    //this.comunicaciones = this.communications;
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
  width: 100%;
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
  /* justify-content: center; */
  /* align-items: center; */
  z-index: 15;
  position: absolute;
  top: 40%;
  left: 0;
  right: 0;
  margin: auto;
  width: 50%;
  /* width: 500px; Need a specific value to work */
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
.close {
  position: absolute;
  right: 2rem;
  top: 0.5rem;
}

/* ____________________________ */
.modalTramite {
  box-shadow: 4px 4px 7px 0px rgba(0, 0, 0, 0.25);
  border-top-right-radius: 20px;
  margin-bottom: 6vh;
  width: 100%;
}
.divTitulos {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: white;
  padding: 1vw;
  border-bottom: 1px solid #9b9a9a;
  text-align: center;
  border-radius: 0px 20px 0px 0px;
}
.divTitulos p {
  color: #4b4a49;
  font-weight: 600;
  font-size: 16px;
  min-width: 20%;
}
.encabezado {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1vw;
  background: white;
  border-bottom: 1px solid #9b9a9a;
  text-align: center;
}
.encabezado p {
  font-weight: 400;
  color: #4b4a49;
  min-width: 20%;
  /* background: rebeccapurple; */
}
</style>
