<template>
  <div class="modalFiltros">
    <!--TARJETAS QUE SE ABREN POR CADA BOTRON DE FILTROS-->
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
      <div class="select" style="justify-content: space-around">
        <label for="">Filtrar por tipo de trámite:</label>
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="this.tipoTramite"
        >
          <option value="Tramite Formal">Tramite Formal</option>
          <option value="Servicio">Servicio</option>
        </select>
        <label for="">Filtrar por Usuario:</label>
        <input
          placeholder="Ingrese Cuil del vecino"
          v-model="this.CuilUser"
          type="text"
          @keyup="validarCuil()"
        />
        <p style="font-size: 12px">
          {{ this.error }}
        </p>
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
      <!-- SE APLICAN LOS FILTROS -->
      <div class="boton-fecha">
        <button
          class="btn btn-light"
          type="submit"
          @click="getFiltros"
          :disabled="this.disabled"
        >
          Aplicar
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
    functionFiltros: Function,
    setModalFiltros: Function,
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
      userMuni: true,
      tipoTramite: "",
      CuilUser: "",
      error: "",
      disabled: false,
    };
  },
  methods: {
    validarCuil() {
      console.log("soy el input");
      if (!/^([0-9])*$/.test(this.CuilUser))
        (this.error = "Debe ingresar solo valores numéricos"),
          (this.disabled = true);
      else (this.error = ""), (this.disabled = false);
    },
    handleDate() {
      console.log(this.fromDate, "A");
    },
    handleDateB() {
      console.log(this.toDate, "B");
    },
    getFiltros() {
      //let asd = new Date();
      let values = { conditions: {} };
      if (this.CuilUser) {
        if (!/^([0-9])*$/.test(this.CuilUser)) {
          this.error = "debe ingresar un cuil valido";
        } else {
          values.conditions.userCuil = this.CuilUser;
        }
      }
      if (this.status) {
        values.conditions.status = this.status;
      }
      if (this.deadline) {
        values.conditions.deadline = this.deadline;
      }
      if (this.userMuni) {
        values.conditions.userMuni = this.userMuni;
      }
      if (this.tipoTramite) {
        values.conditions.procedureType = this.tipoTramite;
      }

      if (this.fromDate) {
        let a = this.fromDate.split("-");
        let dia = a[0];
        let mes = a[1] - 1;
        let anio = a[2];
        let fecha = new Date(anio, mes, dia);
        values.conditions.fromDate = fecha.toISOString();
      }
      if (this.toDate) {
        let a = this.toDate.split("-");
        let dia = a[0];
        let mes = a[1] - 1;
        let anio = a[2];
        let fecha = new Date(anio, mes, dia);
        values.conditions.toDate = fecha.toISOString();
      } else if (!this.toDate) {
        let asd = new Date().toISOString();
        values.conditions.toDate = asd;
      }

      console.log(values);
      //SE PASAN TODOS LOS VALORES A LA FUNCION PARA APLICAR LOS FILTROS Y MOSTRAR
      this.functionFiltros(values);
      this.setModalFiltros();
      this.status = "";
      this.deadline = "";
      this.userMuni = true;
      this.fromDate = "";
      this.toDate = "";
    },
  },
};
</script>
<style scoped>
.modalFiltros {
  width: 80%;
  position: absolute;
  z-index: 15;
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
  left: 4rem;
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
