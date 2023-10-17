<template>
  <div>
    <!-- Mostrar los tramites
     correspondientes al sector seleccionado -->
    <div class="row">
      <h5 class="fecha">
        <i class="bi bi-calendar4-week" style="margin-right: 8px"></i
        ><strong>{{ new Date().toLocaleDateString() }}</strong>
      </h5>
    </div>
    <div style="display: flex; flex-direction: row; font-size: 50px">
      <img
        :src="this.tramitesApi[0]?.category?.description"
        alt="imagen"
        class="imagenSector"
      />
      <h1 class="tituloPrincipal">
        {{ this.$route.params.sectorTitle }}
        <h4 style="color: #4b4a49; font-weight: 100; margin-top: 1rem">
          Por favor, elige aqui el tipo de solicitud que queres realizar.
        </h4>
      </h1>
    </div>

    <div v-if="msj" class="sinTramites">
      <h2>No hay trámites para esta categoría por el momento</h2>
    </div>
    <div class="tramites">
      <div
        v-for="tramite in tramitesApi"
        :key="tramite.id"
        class="cardTramites"
      >
        <!-- <div class="divTitleImag"> -->
        <!-- <img src="@/assets/tramite-logo.svg" :alt="tramite.id" /> -->
        <!-- <div class="divTitle"> -->
        <router-link
          v-if="tramite.level.level <= this.nivel"
          :to="`/formulario/${tramite.title}`"
        >
          <h5>
            {{ tramite.title }}
          </h5>
        </router-link>
        <div v-else @click="ModalNivel(tramite.id)">
          <h5>
            {{ tramite.title }}
          </h5>
        </div>

        <!-- <div class="footercard"> -->
        <!--SI TIENE EL NIVEL REQUERIDO PUEDE HACER EL TRAMITE-->
        <!-- <router-link
            v-if="tramite.level.level <= this.nivel"
            :to="`/formulario/${tramite.title}/${tramite.id}`"
          >
            <a>Iniciar Trámite</a>
          </router-link> -->
        <!--SI NO!TIENE EL NIVEL REQUERIDO NO ! PUEDE HACER EL TRAMITE-->

        <!-- <div v-else @click="ModalNivel(tramite.id)">
            <a>Iniciar Trámite</a>
          </div> -->
        <!-- </div> -->
        <!--MODAL DE NIVEL 2 DE CIDI-->

        <div
          v-if="modalNivel === true && this.id == tramite.id"
          class="modalEstado"
        >
          <div class="modal-content">
            <div class="modalTop">
              <p @click="closeModalNivel">X</p>
            </div>
            <h5>Trámite no disponible.</h5>
            <p>
              para poder realizar este trámite usted debe tener
              <strong>nivel 2</strong> en Cidi.
              <br />

              <a
                href="https://cidi.cba.gov.ar/portal-publico/acceso"
                target="blak"
                class="linkCidi"
              >
                Ver más...</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="volver">
      <router-link to="/munienlinea">
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

      <h4>Volver al Incio</h4>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import setToken from "@/middlewares/setToken";
import setTokenRelations from "@/middlewares/setTokenRelations";
import { BASE_URL } from "@/env";

export default {
  data() {
    return {
      id: null,
      title: "",
      hover: false,
      tramitesApi: [],
      msj: false,
      modal: false,
      modalNivel: false,
      nivel: localStorage.getItem("nivel"),
    };
  },
  created() {
    // get tramites para la vista sectores con el id de categoria sacado del path con vue router
    //console.log(this.$route.params);
    this.GetProcedure();
  },

  methods: {
    GetProcedure() {
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get(
          "/oficina/categories/category/procedure/" +
            this.$route.params.sectorId
        )

        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            for (let i = 0; i < response.data.Procedures.length; i++) {
              this.tramitesApi.push(response.data.Procedures[i]);
            }
          }
        })
        .catch((error) => {
          // console.log(error);
          if (error.response.status === 401) {
            this.$router.push("/micuenta-update");
          }
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.GetProcedure();
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.GetProcedure();
            }
          }
        });
    },

    verRequisitos(id) {
      this.modal = true;
      this.id = id;
    },
    ModalNivel(id) {
      this.modalNivel = true;
      this.id = id;
    },
    closeModalNivel() {
      this.modalNivel = false;
    },
    close() {
      this.modal = false;
    },
    back() {
      this.$router.go(-1);
    },
  },
  computed: {},
};
</script>

<style scoped>
/* CSS NUEVO */
.fecha {
  letter-spacing: 0px;
  position: absolute;
  text-align: right;
  padding-top: 2vh;
  padding-right: 3.5vw;
}
.tituloPrincipal {
  color: #4b4a49;
  font-weight: 900;
  padding-left: 3rem;
  font-size: 50px;
  margin-top: 7vh;
}
.imagenSector {
  width: 4vw;
  height: 6vh;
  margin-top: 7vh;
  margin-left: 4vw;
}
.sinTramites {
  margin-top: 4rem;
  text-align: center;
  width: 100%;
}
.cardTramites {
  position: relative;
  background: var(--grey-bk);
  font-weight: bold;
  border: none;
  box-shadow: 4px 4px 7px 0px rgba(0, 0, 0, 0.25);
  width: 15vw;
  height: 14.5vh;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-radius: 0px 20px 0px 0px;
  background-color: white;
  text-align: left;
  padding: 1rem;
  cursor: pointer;
  border: 4px solid transparent;
}
.cardTramites:hover {
  border-image: linear-gradient(180deg, #019939 4.26%, #ffcc03 126.04%) 1;
}
.tramites {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3vw;
  margin-top: 6vh;
  margin-bottom: 200px;
  margin-left: 3vw;
  /* grid-auto-rows: minmax(100px, auto); */
}
.modalEstado {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  z-index: 15;
  position: absolute;
  top: 2rem;
  right: -0.8rem;
  margin-left: auto;
  margin-right: auto;
  width: 300px;
  height: 30vh;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}
.modal-content {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}
.modal-content a {
  text-decoration: none;
  color: var(--green);
}
.modal-content a:hover {
  color: #2c6331;
}
.linkCidi {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
}
.tramites a {
  /*color: var(--blue);*/
  /*font-size: 0.9em;*/
  text-decoration: none;
  color: white;
  font-size: 20px;
}
.tramites a:hover {
  transition: all 0.3s ease-in-out;
  color: black;
  /*color: var(--red);
  font-size: 0.9em;
  text-decoration: none;*/
}

.tramites input:hover {
  background: var(--blue);
  color: var(--red);
}
.volver {
  position: absolute;
  bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.volver h4 {
  margin-left: 14px;
  color: #808081;
  font-weight: 100;
}
.modalTop {
  position: absolute;
  top: 5px;
  right: 10px;
  cursor: pointer;
}
/* ------------------------------------ */

/* img {
  max-width: 50px;
} */

@media (max-width: 1000px) {
  h1 {
    font-size: 30px;
  }
  h4 {
    font-size: 20px;
  }
}
@media (max-width: 800px) {
  .tramites {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1vw;
    margin: auto;
    margin-left: 3vw;
    /* grid-auto-rows: minmax(100px, auto); */
  }
  .cardTramites {
    width: 30vw;
  }
  svg {
    width: 40px;
    height: 40px;
  }
}
@media (max-width: 600px) {
  .tramites {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1vw;
    margin: auto;
    margin-left: 3vw;
    min-height: 50vh;
    /* grid-auto-rows: minmax(100px, auto); */
  }
  .cardTramites {
    width: 30vw;
  }
  svg {
    width: 30px;
    height: 30px;
  }
}
</style>
