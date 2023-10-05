<template>
  <!-- Componente principal del vecino usado en vista HomeVecinoView -->
  <div>
    <div class="row">
      <h5 class="fecha">
        <i class="bi bi-calendar4-week" style="margin-right: 8px"></i
        ><strong>Viernes 19 de Agosto</strong>
      </h5>
    </div>
    <div class="row">
      <h1 style="margin-top: 7vh; font-size: 50px">
        ¿Qué gestión querés realizar?
      </h1>
    </div>
    <div class="row">
      <SearchComponent />
    </div>

    <!--VISTA  DE TRAMITES -->
    <div class="containerTabs">
      <div class="row row-cols-2">
        <div
          class="col-6 text-center"
          @mouseover="this.setClass"
          @mouseout="this.NotSetClass"
        >
          <h4 :class="{ activeHover: hoverCategorias }">
            Trámites Administrativos
          </h4>
          <div class="gridcontainer">
            <div v-for="sector in categorias" :key="sector.Id">
              <router-link
                :to="`/sector/${sector.title}/${sector.id}`"
                class="card scale-up-center"
                style="text-decoration: none; color: #222"
              >
                <div>
                  <img :src="sector.description" alt="imagen" />
                  <!-- <i class="bi bi-emoji-sunglasses"></i> -->
                </div>
                <div style="margin-left: 15px">
                  <h5 style="text-decoration: none">
                    <strong> {{ sector.title }}</strong>
                  </h5>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div
          class="col-6 text-center"
          @mouseover="this.setServisClass"
          @mouseout="this.NotServisClass"
        >
          <h4 :class="{ activeHover: hoverServicios }">Servicios y reclamos</h4>
          <div class="gridcontainer">
            <div v-for="sector in servicios" :key="sector.Id">
              <router-link
                :to="`/sector/${sector.title}/${sector.id}`"
                class="card scale-up-center"
                style="text-decoration: none; color: #222"
              >
                <div>
                  <img :src="sector.description" alt="imagen" />
                  <!-- <i class="bi bi-emoji-sunglasses"></i> -->
                </div>
                <div style="margin-left: 15px">
                  <h5 style="text-decoration: none">
                    <strong> {{ sector.title }}</strong>
                  </h5>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- OTRAS GESTIONES -->
    <div class="otrosTramites">
      <div class="gestiones">
        <h4>Si no encontrás tu gestión o tenés dudas, ingresá aquí</h4>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="25"
          viewBox="0 0 16 25"
          fill="none"
          style="margin-left: 2rem; margin-top: 0.5rem"
        >
          <path
            d="M3 22L13 12.5L3 3"
            stroke="#019939"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <button class="botonGestiones">Otras gestiones</button>
      </div>
      <div class="gestiones">
        <h4>Si necesitás nuestra ayuda, ingresá aquí</h4>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="25"
          viewBox="0 0 16 25"
          fill="none"
          style="margin-left: 2rem; margin-top: 0.5rem"
        >
          <path
            d="M3 22L13 12.5L3 3"
            stroke="#019939"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <button class="botonGestiones">
          <i class="bi bi-telephone" style="margin-right: 0.5vw"></i>Llámenme
        </button>
      </div>
    </div>
    <!-- RENTAS Y AFIP, ETC -->
    <div class="accesos">
      <h4>
        Si tu gestion es para Rentas o Afip, también te facilitamos el acceso:
      </h4>
      <div class="items">
        <img src="./../../../images/Rentas.svg" alt="" />
        <svg
          width="113"
          height="31"
          viewBox="0 0 115 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M26.86 9.64L23.43 1.78C23.06 1 22.31 0.470001 21.55 0.470001H15.19C14.3 0.470001 13.57 0.970001 13.15 1.87L0.640001 29.32C0.400001 29.9 0.419999 30.47 0.699999 30.91C0.969999 31.34 1.44 31.59 2.01 31.59H16.7C17.57 31.59 18.29 31.16 18.61 30.45L20.35 26.52L30.23 26.51C30.27 26.51 30.31 26.51 30.35 26.51C31.14 26.51 31.93 26.08 32.41 25.39C32.97 24.6 33.06 23.57 32.67 22.47L26.86 9.64ZM31.25 23.78C31.25 24.04 31.19 24.25 31.06 24.42C30.89 24.67 30.59 24.84 30.3 24.84H21.09L26.45 12.77L29.02 18.47C30.31 21.32 31.1 23.07 31.11 23.09C31.2 23.33 31.25 23.56 31.25 23.78ZM17.09 29.76C17.03 29.9 16.77 29.91 16.69 29.91H2.17999L14.62 2.6C14.75 2.34 14.89 2.25 15.18 2.25H21.54C21.67 2.25 21.84 2.32 21.92 2.49L25.34 10.33L25.41 10.49C25.46 10.6 25.48 10.67 25.48 10.74C25.48 10.82 25.45 10.91 25.4 11.03L25.38 11.07C25.06 11.81 19.5 24.32 17.67 28.43L17.09 29.76Z"
            fill="#0075A9"
          />
          <path
            d="M79.49 0.480011H67.4C66.8 0.490011 66.24 0.750011 65.82 1.21001C65.41 1.65001 65.19 2.29001 65.19 3.01001V23.82C65.19 25.06 66.04 26.39 67.32 26.39H79.35C80.45 26.39 81.64 25.43 81.64 23.87L81.65 3.10001C81.65 2.09001 81.27 1.48001 80.94 1.15001C80.52 0.710011 80.01 0.480011 79.49 0.480011ZM79.51 2.21001C79.61 2.21001 79.69 2.25001 79.77 2.32001C79.91 2.46001 79.99 2.74001 79.99 3.08001L79.98 23.85C79.98 24.62 79.35 24.69 79.34 24.69H67.31C67.14 24.69 66.84 24.33 66.84 23.81V3.07001C66.83 2.75001 66.89 2.50001 67.02 2.36001C67.11 2.27001 67.24 2.23001 67.42 2.23001L79.51 2.21001Z"
            fill="#0075A9"
          />
          <path
            d="M114.02 1.69001C113.59 0.970011 112.84 0.520011 111.96 0.480011H86.49C84.64 0.480011 83.79 1.90001 83.79 3.22001V23.8C83.79 24.55 84.05 25.25 84.5 25.72C84.91 26.15 85.46 26.37 86.07 26.37H97.75C98.79 26.37 100.22 25.49 100.22 23.85V19.25L104.82 19.24C105.64 19.24 107.63 19.02 108.55 17L114.08 4.48001C114.52 3.51001 114.49 2.46001 114.02 1.69001ZM112.74 3.08001C112.74 3.30001 112.68 3.55001 112.58 3.79001L107.06 16.3C106.57 17.39 105.45 17.56 104.83 17.56L100.24 17.57L100.25 2.19001H111.92C112.18 2.23001 112.46 2.30001 112.62 2.56001C112.7 2.71001 112.74 2.89001 112.74 3.08001ZM98.58 23.86C98.58 24.47 97.92 24.68 97.76 24.68H86.09C85.91 24.68 85.78 24.63 85.68 24.53C85.53 24.38 85.44 24.1 85.44 23.8V3.21001C85.44 2.83001 85.58 2.19001 86.49 2.19001H88.42C91.61 2.19001 97.62 2.19001 97.79 2.20001H97.83C97.88 2.20001 97.92 2.20001 97.95 2.19001H98.58V23.86Z"
            fill="#0075A9"
          />
          <path
            d="M61.16 0.480011H37.69C36.11 0.480011 35.1 1.48001 35.1 3.02001V24.04C35.1 25.37 36.03 26.42 37.23 26.42H49.26C50.36 26.42 51.54 25.46 51.54 23.9L51.55 19.22H53.58C54.3 19.21 54.91 19.25 55.38 19.05C55.68 18.92 55.93 18.66 56.15 18.24L58.4 13.13C58.44 13.03 58.51 12.88 58.61 12.68C58.72 12.45 58.87 12.16 59.01 11.82C59.13 11.56 59.26 11.26 59.4 10.95L59.83 9.98001C59.98 9.64001 60.13 9.30001 60.3 8.95001C60.37 8.80001 60.44 8.63001 60.51 8.47001C60.6 8.26001 60.69 8.05001 60.79 7.86001L62.87 3.20001C63.13 2.60001 63.08 1.92001 62.75 1.38001C62.39 0.810011 61.8 0.480011 61.16 0.480011ZM61.25 2.44001C61.25 2.49001 61.24 2.53001 61.23 2.55001L58.92 7.66001C58.35 9.02001 58.3 9.02001 57 9.02001H51.54L51.55 2.20001H61.03C61.09 2.20001 61.18 2.21001 61.22 2.30001C61.24 2.33001 61.25 2.38001 61.25 2.44001ZM53.76 17.56H51.54V10.68H57.09C57.18 10.68 57.26 10.73 57.32 10.81C57.36 10.87 57.37 10.93 57.37 11C57.37 11.07 57.36 11.14 57.33 11.21L57.3 11.3C56.84 12.44 55.7 15.25 54.95 16.79C54.57 17.56 54.57 17.56 53.76 17.56ZM36.75 3.02001C36.75 2.38001 36.99 2.17001 37.69 2.17001C37.71 2.17001 39.42 2.18001 41.52 2.18001C44.88 2.19001 49.25 2.21001 49.31 2.21001C49.33 2.21001 49.35 2.21001 49.37 2.21001H49.89V23.91C49.89 24.67 49.26 24.73 49.25 24.73H37.22C36.95 24.73 36.75 24.44 36.75 24.05V3.02001Z"
            fill="#0075A9"
          />
        </svg>
        <img src="./../../../images/Anses.svg" alt="" />

        <img src="./../../../images/DNRPA.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import setToken from "@/middlewares/setToken";
import setTokenRelations from "@/middlewares/setTokenRelations";
import axios from "axios";
import { BASE_URL } from "@/env";
import SearchComponent from "../Search/SearchComponent.vue";
export default {
  name: "MainCointainerComponent",
  components: {
    SearchComponent,
  },
  data() {
    return {
      categorias: [],
      servicios: null,
      hoverCategorias: false,
      hoverServicios: false,
      browser: null,
    };
  },

  created() {
    let sUsrAg = navigator.userAgent;

    console.log(sUsrAg);

    if (sUsrAg.indexOf("Chrome") > -1) {
      this.browser = "Google Chrome";
      console.log(this.browser);
    } else {
      this.browser = "desconocido";
      console.log(this.browser);
    }
    // Haciendo Get de categorias con axios desde el componente para evitar fallos de token
    // Trae imagenes, id y titulo de categoria
    const script = document.createElement("script");
    script.id = "amoforms_script_1183376";
    script.async = true;
    script.charset = "utf-8";
    script.src =
      "https://forms.kommo.com/forms/assets/js/amoforms.js?1692267763";
    document.head.appendChild(script);
    script.onload = () => {
      this.initializeAmoForms();
      console.log;
    };
    this.getCategories();
  },
  computed: {},
  methods: {
    setClass() {
      // console.log("hola");
      this.hoverCategorias = true;
    },
    NotSetClass() {
      this.hoverCategorias = false;
    },
    setServisClass() {
      this.hoverServicios = true;
    },
    NotServisClass() {
      this.hoverServicios = false;
    },
    initializeAmoForms() {
      !(function (a, m, o, c, r) {
        (a[o + c] = a[o + c] || {
          setMeta: function (p) {
            this.params = (this.params || []).concat([p]);
          },
        }),
          (a[o + r] =
            a[o + r] ||
            function (f) {
              a[o + r].f = (a[o + r].f || []).concat([f]);
            }),
          a[o + r]({
            id: "1183376",
            hash: "7eb5e7ce44edb738085bbc2bb3a57d24",
            locale: "es",
          }),
          (a[o + m] =
            a[o + m] ||
            function (f, k) {
              a[o + m].f = (a[o + m].f || []).concat([[f, k]]);
            });
      })(window, 0, "amo_forms_", "params", "load", "loaded");
    },

    getCategories() {
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get("/oficina/categories/categories")
        .then((response) => {
          console.log(response.data);
          this.categorias = response.data.Categories.Procedures;

          this.servicios = response.data.Categories.Services;
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.getCategories();
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.getCategories();
            }
          }
          if (error.response.status === 401) {
            this.$router.push("micuenta-update");
          }
        });
    },
    setImagen(title) {
      let srcImg = "";
      switch (title) {
        case "Tasas y Contribuciones":
          srcImg = "@/assets/tramitesSVG/peso.svg";
          break;
        case "Catastro y Obras":
          srcImg = "@/assets/tramitesSVG/construccion.svg";
          break;

        default:
          srcImg = "";
      }
      // console.log(srcImg, "soy la imagen");
      return srcImg;
    },
  },
};
</script>

<style scoped>
.gestiones {
  background: white;
  height: 4.5vh;
  width: auto;
  margin: auto;
  border-radius: 0px 20px 0px 20px;
  padding-left: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.gestiones h4 {
  margin-top: 0.5rem;
}
.botonGestiones {
  height: 4.5vh;
  width: 11vw;
  border: 0.16em solid rgb(255, 255, 255);
  text-align: center;
  background-image: linear-gradient(
    to right,
    #038638,
    #389533,
    #5aa32d,
    #7bb026,
    #9cbd1d
  );
  border-radius: 0px 20px 0px 20px;
  transition: all 0.2s;
  border-style: none;
  color: white;
  font-size: 22px;
  margin-left: 1vw;
}
h1 {
  margin-top: 4vh;
  margin-left: 4vw;
  margin-bottom: 4vh;
}
h4 {
  font-weight: 700;
  color: #9b9a9a;
  font-weight: 400;
}
.fecha {
  letter-spacing: 0px;
  position: absolute;
  /* right: 5vw; */
  text-align: right;
  padding-top: 2vh;
  padding-right: 3.5vw;
  /* background: rebeccapurple; */
}
.top {
  position: relative;
  text-align: left;
  padding-left: 3rem;
  padding-top: 2rem;
  width: 75vw;
  height: 9rem;
  background: var(--grey);
  margin: auto;
  margin-top: 3rem;
  margin-bottom: 3rem;
  border-radius: 0px 30px 0px 0px;
  color: white;
}
.top img {
  position: absolute;
  right: 3rem;
  top: -2rem;
  width: 200px;
  height: 200px;
}
.scale-up-center {
  -webkit-animation: scale-up-center 0.5s cubic-bezier(0.39, 0.575, 0.565, 1)
    both;
  animation: scale-up-center 0.5s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

@-webkit-keyframes scale-up-center {
  0% {
    -webkit-transform: scale(0.6);
    transform: scale(0.6);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes scale-up-center {
  0% {
    -webkit-transform: scale(0.6);
    transform: scale(0.6);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
.flex-container {
  width: 100%;
  height: auto;
  /*background: var(--fondo);*/
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
}
.gridcontainer {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  margin: auto;
  grid-auto-rows: minmax(100px, auto);
}
.card img {
  object-fit: cover;
  width: 100%;
  min-height: 20px;
}

.card {
  background: var(--grey-bk);
  font-weight: bold;
  border: none;
  box-shadow: 4px 4px 7px 0px rgba(0, 0, 0, 0.25);
  width: 85%;
  height: 14.5vh;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-radius: 0px 20px 0px 0px;
  background-color: white;
  text-align: left;
  padding: 1rem;
  margin: auto;
}

/* .card:hover {
  box-shadow: 5px 5px 20px #444;
} */
.containerTabs {
  width: 95%;
  margin: auto;
}
.butonNav {
  width: 330px;
  color: var(--green);
}
.centerTabs {
  width: 90%;
  margin: auto;
}

.containerTabs h4 {
  margin-bottom: 2rem;
}

.activeHover {
  text-decoration: underline;
  text-decoration-color: rgba(255, 0, 0, 0.856);
}
.cuadradospan {
  background: white;
  height: 6vh;
  width: 14vw;
  text-align: center;
  padding-top: 1.5vh;
  font-weight: 700;
}
.otrosTramites {
  margin-top: 10vh;
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.accesos {
  text-align: center;
  margin-top: 5vh;
  padding-bottom: 5vh;
}
.items {
  width: 50vw;
  height: 7vh;
  margin: auto;
  margin-top: 3vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background: white;
  border-radius: 0px 20px 0px 20px;
  box-shadow: 4px 4px 7px 0px rgba(0, 0, 0, 0.25);
  padding: 10px 9vw 5px 9vw;
}
@media (max-width: 1200px) {
  .cuadradospan {
    font-weight: 400;
    font-size: 18px;
    padding-top: 1vh;
  }
}
@media (max-width: 1000px) {
  .flex-container {
    width: 100vw;
    height: auto;
  }
  .gridcontainer {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 10px;
    margin: auto;
    margin-left: 3vw;
    grid-auto-rows: minmax(100px, auto);
  }
  .fecha {
    text-align: center;
    padding-top: 0;
  }
  .cuadradospan {
    font-weight: 400;
    font-size: 15px;
    padding-top: 1vh;
  }
}
@media (max-width: 800px) {
  .otrosTramites {
    width: 60vw;
    margin: auto;
  }
  .otrosTramites h5 {
    font-size: 18px;
  }
  .cuadradospan {
    width: 30vw;
    padding-top: 0.7vh;
  }
  h1 {
    text-align: center;
    margin-left: 0;
  }
}
</style>
