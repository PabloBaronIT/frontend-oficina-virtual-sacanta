<template>
  <div class="main-container">
    <NavComponent
      v-if="
        this.role != '' && this.role != undefined && this.role != 'MUNI_ROLE'
      "
    />

    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              Modal title
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Understood</button>
          </div>
        </div>
      </div>
    </div>

    <router-view />
  </div>
</template>

<script>
import NavComponent from "@/components/MuniEnLinea/NavComponent.vue";

export default {
  data() {
    return {
      role: "",
    };
  },
  created() {
    window.addEventListener("token-localstorage-changed", (event) => {
      this.role = event.detail.storage;
    });
  },
  watch: {
    $route() {
      this.role = localStorage.getItem("role");
    },
  },
  components: {
    NavComponent,
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
    --h2: rgb(0, 128, 0);
  }
}

#app {
  user-select: none;
  overflow-x: hidden;
  font-family: "Roboto Slab", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-color);
  margin: 0;
  width: 100%;
}
body {
  overflow-y: auto;
}
h2 {
  color: var(--h2);
}
.claseh2 {
  font-weight: bold;
}
.claseh2lingh {
  font-weight: 100;
}
</style>

<style scoped>
.main-container {
  display: flex;
}

@media (max-width: 1000px) {
  #app {
    width: 100vw;
  }
}
</style>
