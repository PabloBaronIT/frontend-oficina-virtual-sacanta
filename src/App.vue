<template>
  <NavTopVue
    v-if="
      this.role != 'MUNI_ROLE' &&
      // this.role != undefined &&
      // this.role != null &&
      this.setPermission
    "
  />
  <NavMunicipalesComponentVue
    v-if="this.role != undefined && this.role === 'MUNI_ROLE'"
  />
  <div class="main-container">
    <NavComponent
      v-if="
        this.role != 'MUNI_ROLE' &&
        // this.role != undefined &&
        // this.role != null &&
        this.setPermission
      "
    />

    <router-view />
  </div>
  <FooterComponentVue
    v-if="
      this.role != 'MUNI_ROLE' &&
      // this.role != undefined &&
      // this.role != null &&
      this.setPermission
    "
  />
</template>

<script>
import NavComponent from "@/components/MuniEnLinea/NavComponent.vue";
import NavTopVue from "./components/MuniEnLinea/NavTop.vue";
import NavMunicipalesComponentVue from "./components/Municipal/Nav/NavMunicipalesComponent.vue";
import FooterComponentVue from "@/components/Footer/FooterComponent.vue";
export default {
  data() {
    return {
      role: "",
      cuil: "",
    };
  },
  created() {
    // window.addEventListener("token-localstorage-changed", (event) => {
    //   this.role = event.detail.storage;
    // });
    this.role = localStorage.getItem("role") || null;
  },
  watch: {
    $route() {
      this.role = localStorage.getItem("role");
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
  components: {
    NavComponent,
    NavTopVue,
    NavMunicipalesComponentVue,
    FooterComponentVue,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

@media (prefers-color-scheme: light) {
  #app {
    --green: rgb(104, 185, 132);
    --blue: #415f77;
    --lblue: rgb(139, 167, 190);
    --yellow: rgb(240, 169, 47);
    --red: rgb(225, 77, 42);
    --text-color: #2c3e50;
    --grey-bk: #ebebeb;
    --grey: rgba(70, 70, 70, 0.459);
    --white: #fff;
    --fondo: linear-gradient(
      to bottom,
      #dcdddf,
      #e4e5e6,
      #ececed,
      #f4f4f5,
      #fcfcfc
    );
  }
}

@media (prefers-color-scheme: dark) {
  #app {
    --green: #68b984;
    --blue: #415f77;
    --lblue: #8ba7be;
    --yellow: #f0a92f;
    --red: #e14d2a;
    --text-color: #2c3e50;
    --grey-bk: #ebebeb;
    --grey: rgba(70, 70, 70, 0.459);
    --white: #fff;
    --colorpricipal: #128d44;
  }
}

#app {
  user-select: none;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  font-family: "Open Sans", sans-serif;
  /* -moz-osx-font-smoothing: grayscale; */
  /* text-align: center; */
  /* color: var(--text-color); */
  margin: 0;
  width: 100vw;
  height: 100%;
  /* width: 100%; */
}
body {
  overflow-y: auto;
}

/* ACTUALIZADO */
h1 {
  color: #008838;
  /* font-size: px; */
  font-weight: 100;
  font-style: normal;
  line-height: normal;
}
h3 {
  color: #808081;
  font-weight: 200;
}

h4 {
  color: #128d44;
  font-weight: 200;
  /* font-size: 25px; */
}
h5 {
  color: #808081;
  font-size: 26px;
  font-weight: 700;
  line-height: normal;
}
/* h6 {
  color: #808081;
  font-size: 24px;
  font-weight: 200;
  line-height: normal;
} */
/* ---------------------------- */

h2 {
  color: #128d44;
  font-weight: 500;
}

.fontB {
  font-weight: bold;
}
.fontL {
  font-weight: 300;
}
.tituloPrincipal {
  font-size: 50px;
  margin-bottom: 4rem;
}
</style>

<style scoped>
.main-container {
  display: flex;
  background: var(--fondo);
}
.fixed {
  position: fixed;
  width: 100vw;
}

@media (max-width: 1000px) {
  #app {
    width: 100vw;
  }
}
</style>
