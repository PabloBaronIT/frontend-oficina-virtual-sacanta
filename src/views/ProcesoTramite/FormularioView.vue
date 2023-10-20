<template>
  <div v-if="setPermission" class="sector-container">
    <div class="row">
      <h5 class="fecha">
        <i class="bi bi-calendar4-week" style="margin-right: 8px"></i
        ><strong>{{ new Date().toLocaleDateString() }}</strong>
      </h5>
    </div>
    <div class="row" style="margin-left: 4vw; margin-top: 7vw">
      <h5 style="margin-left: 2vw">{{ this.sectorTitle }}</h5>
      <h1 class="tituloPrincipal">
        {{ this.titulo }}
        <h4 style="color: #4b4a49; font-weight: 100; margin-top: 1rem">
          Ingrese aquí su solicitud en caso de requerir del servicio de <br />
          limpieza en algún lugar en particular <br />
          //{{ this.descripcion }}//
        </h4>
      </h1>
    </div>
    <!-- RECUADRO DE INICIO -->
    <div class="row" v-if="this.inicio == true">
      <div class="recuadro row">
        <h5 style="color: #019939; font-weight: 900; font-size: 24px">
          Para iniciar con esta gestión vas a necesitar contar con:
        </h5>
        <h5>. Ubicación exacta del lugar donde se requiere el servicio.</h5>
        <h5>
          . Una descripción de la situación y fotografías, si dispone de ellas.
        </h5>
      </div>
    </div>
    <!-- ------- -->
    <div class="row" v-else style="margin-top: 8vh">
      <FormularioComponent
        :questionProp="this.preguntas"
        :nivel="this.nivel"
        :dispatchProcedure="this.dispatchProcedure"
        :setProcedure="this.setProcedure"
        :outProcedure="this.outProcedure"
      />
    </div>

    <!-- BOTONESSSSSSS -->
    <div class="volver" v-if="this.inicio">
      <div style="display: flex; flex-direction: row">
        <router-link
          :to="`/sector/${this.sectorTitle}/${this.$route.query.sectorId}`"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 71 70"
            fill="none"
          >
            <path
              d="M38.13 69.3C36.42 69.3 34.71 69.3 33 69.3C32.18 69.19 31.35 69.1 30.53 68.98C22.29 67.71 15.32 64.01 9.78999 57.77C2.71999 49.78 -0.0700368 40.4 1.35996 29.85C2.46996 21.61 6.22997 14.66 12.43 9.11997C20.49 1.91997 29.97 -0.890046 40.64 0.599954C48.81 1.72995 55.65 5.50995 61.2 11.6C65.66 16.5 68.46 22.21 69.6 28.74C69.81 29.93 69.94 31.14 70.11 32.34C70.11 34 70.11 35.67 70.11 37.33C70.07 37.53 70.02 37.72 70 37.92C69.81 39.94 69.51 41.94 68.92 43.88C64.91 57 56.24 65.23 42.92 68.56C41.35 68.94 39.73 69.06 38.13 69.3ZM35.65 5.62998C19.62 5.59998 6.43997 18.7 6.45997 34.75C6.47997 50.85 19.37 63.81 35.49 63.86C51.69 63.9 64.69 50.76 64.68 34.75C64.67 18.53 51.65 5.72998 35.65 5.62998Z"
              fill="url(#paint0_linear_128_960)"
            />
            <path
              d="M40.99 32.05C45.51 31.9 50.26 31.93 55 31.92C56.07 31.92 56.09 31.94 56.09 33.02C56.09 34.23 56.0801 35.45 56.1001 36.66C56.1101 37.2 55.91 37.46 55.36 37.44C55.09 37.43 54.82 37.44 54.55 37.44C45.71 37.46 36.8701 37.47 28.0401 37.49C27.4301 37.49 26.8301 37.54 26.2201 37.57C26.0701 37.58 25.87 37.53 25.81 37.72C25.76 37.9 25.9301 38 26.0401 38.1C27.0901 39.15 28.1401 40.2 29.1901 41.24C31.6001 43.63 34.0101 46.02 36.4501 48.39C36.9301 48.85 36.9901 49.14 36.4701 49.63C35.5501 50.49 34.7001 51.42 33.8201 52.32C33.2301 52.92 33.18 52.92 32.59 52.33C29.05 48.81 25.5201 45.28 21.9701 41.77C19.8501 39.66 17.7201 37.56 15.5701 35.48C15.0801 35.01 15.0901 34.72 15.5701 34.23C21.1901 28.59 26.79 22.94 32.4 17.29C33.05 16.63 33.05 16.64 33.71 17.29C34.6 18.18 35.48 19.09 36.4 19.95C36.85 20.37 36.7901 20.63 36.3801 21.04C32.9601 24.45 29.5501 27.89 26.1401 31.31C26.0101 31.44 25.8801 31.56 25.7601 31.7C25.5801 31.91 25.6601 32.02 25.9101 32.04C26.1101 32.05 26.31 32.05 26.52 32.05C31.28 32.05 36.03 32.05 40.99 32.05Z"
              fill="url(#paint1_linear_128_960)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_128_960"
                x1="1.00776"
                y1="34.75"
                x2="70.1135"
                y2="34.75"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#9CBD1D" />
                <stop offset="1" stop-color="#038638" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_128_960"
                x1="15.219"
                y1="34.7911"
                x2="56.1099"
                y2="34.7911"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#9CBD1D" />
                <stop offset="1" stop-color="#038638" />
              </linearGradient>
            </defs>
          </svg>
        </router-link>

        <h4>Volver atrás</h4>
      </div>

      <div
        style="display: flex; flex-direction: row"
        @click="() => (this.inicio = false)"
      >
        <h4>Iniciar trámite</h4>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="66"
          height="66"
          viewBox="0 0 66 66"
          fill="none"
        >
          <path
            d="M34.1034 43.3125L44.3359 33L34.1034 22.6875M42.9141 33H22.1641"
            stroke="url(#paint0_linear_998_1721)"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8.5 33C8.5 19.3359 19.5859 8.25 33.25 8.25C46.9141 8.25 58 19.3359 58 33C58 46.6641 46.9141 57.75 33.25 57.75C19.5859 57.75 8.5 46.6641 8.5 33Z"
            stroke="url(#paint1_linear_998_1721)"
            stroke-width="5"
            stroke-miterlimit="10"
          />
          <defs>
            <linearGradient
              id="paint0_linear_998_1721"
              x1="16"
              y1="33"
              x2="53"
              y2="33"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FFCC03" />
              <stop offset="1" stop-color="#019939" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_998_1721"
              x1="-3"
              y1="33"
              x2="65"
              y2="33"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FFCC03" />
              <stop offset="1" stop-color="#019939" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import FormularioComponent from "@/components/Tramites/Proceso/FormularioComponent.vue";
import axios from "axios";
import setToken from "@/middlewares/setToken";
import setTokenRelations from "@/middlewares/setTokenRelations";
import { BASE_URL } from "@/env";

var procedure = {
  title: "",
  // userId: "",
  // categoryId: null,
  // statusId: 1,
  procedureId: null,
  // selected: null,
  // questions: [],
  // date: new Date(),
  questions: [],
  fecha: new Date().toLocaleDateString(),
  precio: "",
  sectorTitle: "",
  // formularioTitle: "",
};
export default {
  data() {
    return {
      // Extrayendo  datos de categoria y tramite desde el path con VUE ROUTER
      category: this.$route.params,
      // length: null,
      preguntas: "",
      nivel: "",
      inicio: true,
      descripcion: "",
      titulo: "",
      // procedure: {
      //   title: "",
      //   procedureId: "",
      //   questions: [],
      // },
    };
  },
  components: {
    FormularioComponent,
  },
  created() {
    // Get a los templates de procedures para enviarlos por pro a formulario componente
    this.sectorTitle = this.$route.query.sectorTitle;
    // this.formularioTitle = this.$route.params.formularioTitle;
    this.getTemplate();
    procedure.questions = [];
  },
  methods: {
    setProcedure(asd) {
      procedure.questions.push(asd);
    },
    outProcedure() {
      procedure.questions.pop();
    },
    back() {
      this.$router.go(-1);
    },
    dispatchProcedure() {
      this.$store.dispatch("saveP", procedure);
    },
    getTemplate() {
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });

      apiClient
        .get("/oficina/procedures/template/" + this.$route.params.formularioId)
        .then((response) => {
          console.log(response.data);
          this.preguntas = response.data.Template.questionProcedure;
          this.nivel = response.data.Template.level.level;
          this.descripcion = response.data.Template.description;
          procedure.procedureId = response.data.Template.id;
          // parseInt(r.id);
          // console.log(this.procedureId, "soy el procedureId");

          procedure.title = response.data.Template.title;
          procedure.precio = response.data.Template.price;
          this.titulo = response.data.Template.title;
          // this.length = r.question.length;
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.getTemplate();
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.getTemplate();
            }
          }
          if (error.response.status === 401) {
            this.$router.push("micuenta-update");
          }
        });
    },
  },
  computed: {
    setPermission() {
      if (this.$store.state.loggedIn === true) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
.fecha {
  letter-spacing: 0px;
  position: absolute;
  text-align: right;
  padding-top: 3vh;
  padding-right: 3.5vw;
}
.sector-container {
  width: 100%;
  min-height: 100vh;
  /* display: flex; */
  background-color: #f5f5f5;
  position: relative;
}
.recuadro {
  background: #fff;
  width: 51%;
  height: 21vh;
  /* margin-left: 25%; */
  margin: auto;
  text-align: center;
  padding: 4%;
  margin-top: 12vh;
  box-shadow: 4px 4px 7px 0px rgba(0, 0, 0, 0.25);
  border-radius: 0px 20px 0px 0px;
}
.tituloPrincipal {
  color: #4b4a49;
  font-weight: 900;
  padding-left: 3rem;
  font-size: 50px;
}
h5 {
  color: #4b4a49;
}
.volver {
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 3.5%;
  bottom: 0;
}
.volver h4 {
  /* margin-left: 14px; */
  color: #808081;
  font-weight: 100;
  margin-top: 1.5vh;
  margin-left: 1vw;
  margin-right: 1vw;
}
/* .header {
  text-align: left;
} */

/* .main-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgb(235, 235, 235);
  justify-content: center;
} */

/* .options-container {
  width: 500px;
  padding: 0px 5px;
  border-top: 1px solid var(--red);
  text-align: left;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
} */
</style>
