<template>
  <!-- Componente principal del vecino usado en vista HomeVecinoView -->
  <div style="position: relative">
    <!-- <div class="top">
      <p>
        <strong>Bienvenido!</strong>

        a la oficina virtual de la Municipalidad de Sacanta.
        <br />Presenta aqui todas tus gestiones como si estuvieras en la Muni,
        pero sin <br />
        demoras ni esperas y desde la comodidad de tu casa.
      </p>
      <img
        src="https://st2.depositphotos.com/4111759/47706/v/450/depositphotos_477068802-stock-illustration-bearded-young-man-guy-work.jpg"
        alt="imagen"
      />
    </div> -->
    <div class="row">
      <h5 class="fecha">
        <i class="bi bi-calendar" style="margin-right: 8px"></i
        ><strong>Viernes 19 de Agosto</strong>
      </h5>
    </div>
    <div class="row">
      <h1>¿Qué gestión querés realizar?</h1>
    </div>
    <div class="row">
      <SearchComponent />
    </div>

    <!--VISTA  DE TRAMITES -->
    <div class="containerTabs">
      <div class="row row-cols-2">
        <div class="col-6 text-center">
          <h4>Trámites Administrativos</h4>
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
        <div class="col-6 text-center">
          <h4>Servicios, reclamos y consultas</h4>
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
    <div class="otrosTramites">
      <h5>
        Si no encontras tu gestion o tenes dudas, iniciala aqui
        <span>
          <img
            src="@/assets/mano.svg"
            alt=""
            style="height: 5vh; width: 5vw; left: 0px"
          />
        </span>
        <p class="cuadradospan">...Otras Gestiones</p>
      </h5>
      <h5>
        Si necesitas ayuda o queres que te llamemos, clik aqui
        <span>
          <img
            src="@/assets/mano.svg"
            alt=""
            style="height: 5vh; width: 5vw; left: 0px"
          />
        </span>
        <p class="cuadradospan">
          <i
            class="bi bi-telephone"
            style="color: green; margin-right: 15px; font-size: 20px"
          ></i
          >Llamenmen
        </p>
      </h5>
    </div>
    <div class="accesos">
      <h5 style="color: #008838">
        Si tu gestion es para Rentas o Afip, también te facilitamos el acceso.
      </h5>
      <div class="items">
        <h1>RENTAS</h1>
        <h1>AFIP</h1>
        <h1>ANSES</h1>
        <h1>DNRPA</h1>
      </div>
    </div>

    <!-- <div class="c">
      <ul class="nav nav-tabs centerTabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active butonNav"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home-tab-pane"
            type="button"
            role="tab"
            aria-controls="home-tab-pane"
            aria-selected="true"
          >
            <h5>Trámites Administrativos</h5>
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link butonNav"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile-tab-pane"
            type="button"
            role="tab"
            aria-controls="profile-tab-pane"
            aria-selected="false"
          >
            <h5>Servicios, reclamos y consultas</h5>
          </button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="home-tab-pane"
          role="tabpanel"
          aria-labelledby="home-tab"
          tabindex="0"
        >
          <div class="card-container">
            <div v-for="sector in categorias" :key="sector.Id">
              <router-link
                :to="`/sector/${sector.title}/${sector.id}`"
                class="card scale-up-center"
                style="text-decoration: none; color: #222"
              >
                <img :src="sector.description" :alt="sector.title" />
              </router-link>
            </div>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="profile-tab-pane"
          role="tabpanel"
          aria-labelledby="profile-tab"
          tabindex="0"
        >
          <div class="card-container">
            <div v-for="sector in servicios" :key="sector.Id">
              <router-link
                :to="`/sector/${sector.title}/${sector.id}`"
                class="card scale-up-center"
                style="text-decoration: none; color: #222"
              >
                <img :src="sector.description" :alt="sector.title" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <!-- <main class="flex-container">
      <div class="header">
        <h1>Trámites mas frecuentes</h1> 
        <Busqueda /> 
       </div>
       <TramitesFrecuentes /> 

      <div class="header"></div>
    </main>-->
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
    };
  },

  created() {
    // Haciendo Get de categorias con axios desde el componente para evitar fallos de token
    // Trae imagenes, id y titulo de categoria
    this.getCategories();
  },
  computed: {},
  methods: {
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
h1 {
  margin-top: 4vh;
  margin-left: 5vw;
  margin-bottom: 4vh;
}
.fecha {
  letter-spacing: 0px;
  position: absolute;
  /* right: 5vw; */
  text-align: right;
  padding-top: 2vh;
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

/* ----------------------------------------------
 * Generated by Animista on 2023-2-10 16:35:20
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation scale-up-center
 * ----------------------------------------
 */
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

/* img {
  width: 8px;
} */

/* .header {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  width: 90%;
  height: 50px;
} */
/* .imagenConstruccion {
  width: 150px;
  height: 150px;
  margin-top: 2rem;
} */
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
  gap: 10px;
  margin: auto;
  margin-left: 3vw;
  grid-auto-rows: minmax(100px, auto);
}
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
  width: 100%;
  height: auto;
}

.card img {
  /* border-radius: 50%; */
  object-fit: cover;
  width: 100%;
  min-height: 20px;
}

.card {
  background: var(--grey-bk);
  font-weight: bold;
  border: none;
  /* box-shadow: 5px 5px 15px rgb(137, 137, 137); */
  width: 85%;
  height: 14.5vh;
  /* margin: 15px 15px; */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-radius: 0px 20px 0px 0px;
  background-color: white;
  text-align: left;
  padding: 1rem;
}

.card:hover {
  box-shadow: 5px 5px 20px #444;
}
.containerTabs {
  width: 100%;
  /* background: red; */
}
.butonNav {
  width: 330px;
  color: var(--green);
}
.centerTabs {
  width: 90%;
  margin: auto;
}

/*h1 {
  color: var(--red);

  font-weight: bold;
}*/
.containerTabs h4 {
  margin-bottom: 2rem;
}
.containerTabs h4:hover {
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
  text-align: left;
  margin-top: 10vh;
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 3vw;
}
.otrosTramites h5 {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.accesos {
  text-align: center;
  margin-bottom: 20vh;
}
.items {
  display: flex;
  flex-direction: row;
  justify-content: center;
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
  }
}
</style>
