<template>
  <div class="modalFiltros">
    <div class="botonesFiltros">
      <button
        class="btn btn-success"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseExampleA"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        Filtros
      </button>
    </div>
    <!--TARJETAS QUE SE ABREN POR CADA BOTRON DE FILTROS-->
    <div class="collapse" id="collapseExampleA">
      <div class="card card-body asd">
        <div class="select">
          <label for="">Filtrar por estado</label>
          <select class="form-select" aria-label="Default select example">
            <option selected>Selecciona una opción</option>
            <option value="1">Presentado</option>
            <option value="2">En proceso</option>
            <option value="3">Pausados por requerimientos</option>
          </select>
          <label for="">Filtrar por Plazos</label>
          <select class="form-select" aria-label="Default select example">
            <option selected>Selecciona una opción</option>
            <option value="1">En plazo</option>
            <option value="2">Fuera de plazo</option>
            <option value="3">Pausado por requerimiento</option>
          </select>
          <label for="">Filtrar por Agente </label>
          <select class="form-select" aria-label="Default select example">
            <option selected>Selecciona una opción</option>
            <option value="1">Mis trámites</option>
            <option value="2">Todos los trámites</option>
          </select>
        </div>
        <div>
          <h5>Desde : {{ fechaA }}</h5>
          <VueDatePicker
            v-model="date"
            model-type="dd.MM.yyyy"
            placeholder="Seleccione fecha"
            position="center"
            @update:model-value="handleDate"
            auto-apply
          ></VueDatePicker>
          <h5>Hasta:</h5>
          <VueDatePicker
            v-model="dateB"
            model-type="dd.MM.yyyy"
            placeholder="Seleccione fecha"
            position="center"
            @update:model-value="handleDateB"
            auto-apply
          ></VueDatePicker>
        </div>
        <div class="boton-fecha">
          <button
            class="btn btn-outline-success"
            type="submit"
            @click="buscarFechas"
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
    <!--BUSCADOR POR CUIL DEL VECINO-->
    <div class="collapse" id="collapseExampleB">
      <div class="card card-body">
        <div class="flex">
          <input
            class="buscar"
            type="search"
            placeholder="Ingrese Cuil del vecino"
            aria-label="Buscar"
            v-model="searchCuil"
          />
          <button
            class="btn btn-outline-success"
            type="submit"
            @click="this.getFiltroByCuilUser(searchCuil)"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>

    <div class="collapse" id="collapseExampleD">
      <div class="card card-body fecha">
        <h5>Desde : {{ fechaA }}</h5>
        <VueDatePicker
          v-model="date"
          model-type="dd.MM.yyyy"
          placeholder="Seleccione fecha"
          position="center"
          @update:model-value="handleDate"
          auto-apply
        ></VueDatePicker>
        <h5>Hasta:</h5>
        <VueDatePicker
          v-model="dateB"
          model-type="dd.MM.yyyy"
          placeholder="Seleccione fecha"
          position="center"
          @update:model-value="handleDateB"
          auto-apply
        ></VueDatePicker>
      </div>
      <div class="boton-fecha">
        <button
          class="btn btn-outline-success"
          type="submit"
          @click="buscarFechas"
        >
          Buscar
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
export default {
  props: {
    setModalFiltros: Function,
    getFiltro: Function,
    getFiltroByTitle: Function,
    getFiltroByUserMuni: Function,
    searchValue: Function,
    getFiltroByCuilUser: Function,
  },
  components: { VueDatePicker },
  data() {
    return {
      search: "",
      searchCuil: "",
      date: null,
      dateB: null,
    };
  },
  methods: {
    handleDate() {
      console.log(this.date, "A");
    },
    handleDateB() {
      console.log(this.dateB, "B");
    },
    buscarFechas() {
      console.log(`las fechas seleccionadas son ${this.date} y ${this.dateB}`);
    },
  },
};
</script>
<style scoped>
.modalFiltros {
  width: 80%;
  position: relative;

  padding-top: 1rem;
  padding-bottom: 1rem;
  height: auto;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.3);
  /* box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); */
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  margin: auto;
  text-align: left;
}
.botonesFiltros {
  margin-bottom: 2rem;
}
.asd {
  position: absolute;
  z-index: 15;
  display: flex;
  flex-direction: row;
  height: 250px;
  width: 100%;
  justify-content: space-around;
}
.svg {
  max-width: 20px;
}

.buscar {
  margin-right: 1rem;
}

.fecha {
  width: 60%;
  margin: auto;
}
.boton-fecha {
  margin-top: 2rem;
}
h3 {
  margin-bottom: 2rem;
  text-decoration: underline;
}
.select {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
