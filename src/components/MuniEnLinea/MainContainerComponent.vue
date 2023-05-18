<template>
  <!-- Componente principal del vecino usado en vista HomeVecinoView -->
  <div>
    <div class="top">
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
    </div>

    <div class="containerTabs">
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
        <li class="nav-item" role="presentation">
          <button
            class="nav-link butonNav"
            id="contact-tab"
            data-bs-toggle="tab"
            data-bs-target="#contact-tab-pane"
            type="button"
            role="tab"
            aria-controls="contact-tab-pane"
            aria-selected="false"
          >
            <h5>Guia de trámites</h5>
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
          <!-- Cards de categorias linkeados a la vista de sector (tramites de las categorias) -->
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
          <h3>SERVICIOS Y RECLAMOS</h3>
          <img
            src="@/assets/logoSacanta.svg"
            alt=""
            class="imagenConstruccion"
          />
        </div>
        <div
          class="tab-pane fade"
          id="contact-tab-pane"
          role="tabpanel"
          aria-labelledby="contact-tab"
          tabindex="0"
        >
          <h3>GUIA DE TRAMITES</h3>
          <img
            src="@/assets/logoSacanta.svg"
            alt=""
            class="imagenConstruccion"
          />
        </div>
        <div
          class="tab-pane fade"
          id="disabled-tab-pane"
          role="tabpanel"
          aria-labelledby="disabled-tab"
          tabindex="0"
        >
          ...
        </div>
      </div>
    </div>

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
//import SideBar from "@/components/MuniEnLinea/SideBar.vue";
// import TramitesFrecuentes from "@/components/MuniEnLinea/TramitesFrecuentesComponent.vue";
// import Busqueda from "../Busqueda/Filtrado/BusquedaComponent.vue";

import axios from "axios";

export default {
  name: "MainCointainerComponent",
  data() {
    return {
      categorias: null,
    };
  },
  created() {
    // Haciendo Get de categorias con axios desde el componente para evitar fallos de token
    // Trae imagenes, id y titulo de categoria

    const apiClient = axios.create({
      //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
      baseURL: process.env.VUE_APP_BASEURL,

      withCredentials: false,
      headers: {
        "auth-header": window.localStorage.getItem("token"),
      },
    });

    apiClient
      .get("/oficina/categories/categories")
      .then((response) => {
        console.log(response.data);
        this.categorias = response.data.Categories;
      })
      .catch((err) => {
        console.log(err);
        this.$router.push("login");
      });
  },
  components: {
    // TramitesFrecuentes,
    //SideBar,
    // Busqueda,
  },
};
</script>

<style scoped>
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

img {
  width: 10px;
}

/* .header {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  width: 90%;
  height: 50px;
} */
.imagenConstruccion {
  width: 150px;
  height: 150px;
  margin-top: 2rem;
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

.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
  width: 100%;
  height: auto;
}

.card img {
  border-radius: 50%;
  object-fit: cover;
  width: 100%;
}

.card {
  background: var(--grey-bk);
  font-weight: bold;
  border: none;
  box-shadow: 5px 5px 15px rgb(137, 137, 137);
  width: 320px;
  height: 100px;
  margin: 15px 15px;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-around;
  align-items: center;
  border-radius: 40px 40px 0px 0px;
  background-color: white;
}

.card:hover {
  box-shadow: 5px 5px 20px #444;
}
.containerTabs {
  width: 100%;
  /*background: var(--grey-bk);*/
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

@media (max-width: 1000px) {
  .flex-container {
    width: 100vw;
    height: auto;
  }
}
</style>
