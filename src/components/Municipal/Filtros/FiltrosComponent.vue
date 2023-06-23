<template>
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
            <option value="true">Mis trámites</option>
            <option value="false">Todos los trámites</option>
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
</template>
<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
//import axios from "axios";
export default {
  props: {
    functionFiltros: Function,
  },
  components: { VueDatePicker },
  data() {
    return {
      search: "",
      searchCuil: "",
      fromDate: null,
      toDate: null,
      status: "",
      deadline: "",
      userMuni: "",
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
      let conditions = {};
      if (this.status) {
        conditions.status = this.status;
      }
      if (this.deadline) {
        conditions.deadline = this.deadline;
      }
      if (this.userMuni) {
        conditions.userMuni = this.userMuni;
      }
      if (this.fromDate) {
        conditions.fromDate = new Date(this.fromDate).toISOString();
      }
      if (this.toDate) {
        conditions.toDate = new Date(this.toDate).toISOString();
      } else {
        conditions.toDate = new Date(asd).toISOString();
      }

      this.functionFiltros(conditions);

      //  conditions = {
      //   status: this.status,
      //   deadline: this.deadline,
      //   fromDate: this.fromDate
      //     ? new Date(this.fromDate).toISOString()
      //     : new Date(asd).toISOString(),
      //   toDate: this.toDate
      //     ? new Date(this.toDate).toISOString()
      //     : new Date(asd).toISOString(),
      //   userMuni: this.userMuni,
      // };
      // const apiClient = axios.create({
      //   //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
      //   baseURL: process.env.VUE_APP_BASEURL,
      //   withCredentials: false,
      //   headers: {
      //     "auth-header": localStorage.getItem("token"),
      //   },
      // });
      // apiClient
      //   .post("/oficina/procedures/history/filter", conditions)
      //   .then((response) => {
      //     let asd = response.data.ProceduresFiltered;
      //     console.log(asd);
      //     for (let i = 0; i < asd.length; i++) {
      //       //Procedure
      //       let p = {
      //         id: null,
      //         firstname: "",
      //         lastname: "",
      //         fecha: "",
      //         title: "",
      //         estado: "",
      //         plazo: "",
      //         task: null,
      //         agenteFirstname: "",
      //         agenteLastname: "",
      //         cuil: "",
      //       };
      //       //EN PLAZO
      //       p.id = asd[i].id;
      //       p.firstname = asd[i].user.firstname;
      //       p.lastname = asd[i].user.lastname;
      //       p.fecha = new Date(asd[i].created_at).toLocaleDateString();
      //       p.title = asd[i].procedure.title;
      //       p.estado = asd[i].status.status;
      //       p.plazo = asd[i].deadlineDays;
      //       p.task = asd[i].task.length ? asd[i].task.length : null;
      //       p.agenteFirstname = asd[i].userMuni.firstname;
      //       p.agenteLastname = asd[i].userMuni.lastname;
      //       p.cuil = asd[i].user.cuil;
      //       switch (p.estado) {
      //         case "PRESENTADO":
      //           p.color = "var(--green)";
      //           break;
      //         case "PAUSADO POR REQUERIMIENTO":
      //           p.color = "var(--red)";
      //           break;
      //         case "EN PROCESO":
      //           p.color = "var(--yellow)";
      //           break;
      //         case "FINALIZADO":
      //           p.color = "var(--lblue)";
      //           break;

      //         default:
      //           break;
      //       }
      //       this.history = [];
      //       this.history.push(p);
      //     }
      //   });
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
