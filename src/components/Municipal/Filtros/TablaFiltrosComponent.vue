<template>
  <div>
    <div>
      <!-- <FiltrosComponent :functionFiltros="this.functionFiltros" /> -->
      <div class="modalFiltros">
        <div class="botonesFiltros">
          <button
            class="btn btn-light"
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
              <select
                class="form-select"
                aria-label="Default select example"
                v-model="this.status"
              >
                <option value="PRESENTADO">Presentado</option>
                <option value="EN PROCESO">En proceso</option>
                <option value="PAUSADO POR REQUERIMIENTO">
                  Pausados por requerimientos
                </option>
                <option value="FINALIZADO">finalizados</option>
              </select>
              <label for="">Filtrar por Plazos</label>
              <select
                class="form-select"
                aria-label="Default select example"
                v-model="this.deadline"
              >
                <option selected>Selecciona una opción</option>
                <option value="EN PLAZO">En plazo</option>
                <option value="FUERA DE PLAZO">Fuera de plazo</option>
                <option value="PLAZO PAUSADO POR REQUERIMIENTO">
                  Pausado por requerimiento
                </option>
              </select>
              <label for="">Filtrar por Agente </label>
              <select
                class="form-select"
                aria-label="Default select example"
                v-model="this.userMuni"
              >
                <option selected>Selecciona una opción</option>
                <option :value="true">Mis trámites</option>
                <option :value="false">Todos los trámites</option>
              </select>
            </div>
            <div class="select">
              <div>
                <h5>Desde : {{ fromDate }}</h5>
                <VueDatePicker
                  v-model="this.fromDate"
                  model-type="dd-MM-yyyy"
                  placeholder="Seleccione fecha"
                  position="center"
                  @update:model-value="handleDate"
                  auto-apply
                ></VueDatePicker>
              </div>
              <div>
                <h5>Hasta: {{ toDate }}</h5>
                <VueDatePicker
                  v-model="this.toDate"
                  model-type="dd-MM-yyyy"
                  placeholder="Seleccione fecha"
                  position="center"
                  @update:model-value="handleDateB"
                  auto-apply
                ></VueDatePicker>
              </div>
            </div>
            <div class="boton-fecha">
              <button class="btn btn-light" type="submit" @click="getFiltros">
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
                class="btn btn-light"
                type="submit"
                @click="this.getFiltroByCuilUser(searchCuil)"
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
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
//import FiltrosComponent from "./FiltrosComponent.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
export default {
  props: {
    functionFiltros: Function,
    history: Array,
  },

  components: {
    //FiltrosComponent,
    VueDatePicker,
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
    };
  },
  methods: {
    handleDate() {
      console.log(this.fromDate, "A");
    },
    handleDateB() {
      console.log(this.toDate, "B");
    },
    getFiltros() {
      let asd = new Date();
      let values = { conditions: {} };
      if (this.status) {
        values.conditions.status = this.status;
      }
      if (this.deadline) {
        values.conditions.deadline = this.deadline;
      }
      if (this.userMuni) {
        values.conditions.userMuni = this.userMuni;
      }
      if (this.fromDate) {
        values.conditions.fromDate = new Date(this.fromDate).toISOString();
      }
      if (this.toDate) {
        values.conditions.toDate = new Date(this.toDate).toISOString();
      } else {
        values.conditions.toDate = new Date(asd).toISOString();
      }
      console.log(values);
      this.functionFiltros(values);
    },
  },
};
</script>
<style scoped>
th,
tr {
  border-bottom: solid 1px grey;
  font-size: 15px;
}
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
  margin-bottom: 1rem;
}
.asd {
  background: rgb(235, 235, 235);
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
