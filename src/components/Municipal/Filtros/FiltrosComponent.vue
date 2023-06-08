<template>
  <div class="modalFiltros">
    <div class="modal-top">
      <h3>Filtros</h3>
      <img
        @click="this.setModalFiltros()"
        class="svg"
        src="@/assets/close.svg"
        alt=""
      />
    </div>

    <div>
      <div class="botonesFiltros">
        <button
          class="btn btn-primary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExampleA"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          Trámites
        </button>
        <button
          class="btn btn-primary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExampleB"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          Usuarios
        </button>
        <button
          class="btn btn-primary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExampleC"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          Buscador
        </button>
        <button
          class="btn btn-primary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExampleD"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          Fechas
        </button>
      </div>
      <!--TARJETAS QUE SE ABREN POR CADA BOTRON DE FILTROS-->
      <div class="collapse" id="collapseExampleA">
        <div class="card card-body">
          <div class="divSelects">
            Filtro por estado
            <select @change="this.getFiltro($event)" name="" id="">
              <option>Filtros</option>
              <option value="0">Todos mis trámites</option>
              <option value="1">Presentados</option>
              <option value="2">En proceso</option>
              <option value="4">Finalizados</option>
            </select>
          </div>
          <div class="divSelects">
            Filtro por tipo de trámite
            <select @change="this.getFiltroByTitle($event)" name="" id="">
              <option>Filtros</option>
              <option value="0">Todos mis trámites</option>
              <option value="1">Presentados</option>
              <option value="2">En proceso</option>
              <option value="4">Finalizados</option>
            </select>
          </div>
          <div class="divSelects">
            Filtro por agente municipal
            <select @change="this.getFiltroByUserMuni($event)" name="" id="">
              <option>Filtros</option>
              <option value="0">Todos mis trámites</option>
              <option value="1">Presentados</option>
              <option value="2">En proceso</option>
              <option value="4">Finalizados</option>
            </select>
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
              @click="this.searchValueById(searchCuil)"
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
      <!--BUSCADOR POR ID DEL TRAMITE-->

      <div class="collapse" id="collapseExampleC">
        <div class="card card-body">
          <div class="flex">
            <input
              class="buscar"
              type="search"
              placeholder="Ingrese ID del tramite"
              aria-label="Buscar"
              v-model="search"
            />
            <button
              class="btn btn-outline-success"
              type="submit"
              @click="this.searchValue(search)"
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
      <div class="collapse" id="collapseExampleD">
        <div class="card card-body fecha">
          <h5>Desde :</h5>
          <VueDatePicker
            v-model="date"
            model-type="dd.MM.yyyy"
            placeholder="Seleccione fecha"
            position="center"
            @update:model-value="this.handleDate"
          ></VueDatePicker>
          <h5>Hasta:</h5>
          <VueDatePicker
            v-model="dateB"
            model-type="dd.MM.yyyy"
            placeholder="Seleccione fecha"
            position="center"
            @update:model-value="this.handleDateB"
          ></VueDatePicker>
        </div>
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
    handleDate: (modelData) => {
      console.log(this.date);
      // do something else with the data
    },
    handleDateB: (modelData) => {
      console.log(this.dateB);
      // do something else with the data
    },
  },
};
</script>
<style scoped>
.modalFiltros {
  position: absolute;
  top: 1em;
  left: 10rem;
  z-index: 15;
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 50vw; /* Need a specific value to work */
  height: auto;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  word-break: break-all;
}
.svg {
  max-width: 20px;
}
.modal-top {
  display: flex;
  width: 100%;
  text-align: left;
  justify-content: space-around;
  align-items: flex-start;
}
.botonesFiltros {
  width: 80%;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-around;
  margin: auto;
  padding-bottom: 1rem;
}
.divSelects {
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-left: 2rem;
}
.buscar {
  margin-right: 1rem;
}
select {
  margin: 0 10px;
  color: var(--text-color);
  text-align: center;
  background: none;
  border-radius: 20px;
  border: 1px solid var(--red);
  outline: none;
  padding: 5px;
}

select option {
  background: none;
  border: 1px solid var(--red);
  outline: none;
}
select option:hover {
  background: var(--green);
  outline: none;
  border: none;
}
.fecha {
  width: 60%;
  margin: auto;
}
</style>
