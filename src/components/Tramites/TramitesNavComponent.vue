<template>
  <!-- Sidebar -->
  <div class="nav-container">
    <div class="detalles">
      <input
        type="button"
        class="bn3 bn1"
        @click="show = !show"
        value="Detalles"
      />
      <transition v-show="show" name="fade">
        <div class="opciones">
          <div class="opcion">
            <p>Area</p>
            <input type="checkbox" name="1" id="1" />
          </div>
          <div class="opcion">
            <p>Area</p>
            <input type="checkbox" name="2" id="2" />
          </div>
          <div class="opcion">
            <p>Area</p>
            <input type="checkbox" name="3" id="3" />
          </div>
        </div>
      </transition>
    </div>

    <input class="bn3" type="button" value="Servicios" />
    <input class="bn3" type="button" value="Comunicaciones" />
    <input class="bn3" type="button" value="Noificaciones" />
    <input class="bn3" type="button" value="Representados" />
  </div>
</template>

<script>
export default {
  name: "NavComponent",
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style scoped>
.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.detalles {
  width: 100%;
  height: auto;
  padding: 0;
  border: 1px solid black;
}

.bn1 {
  height: auto;
}

.bn3:first-child {
  background-color: var(--red);
}

.bn3 {
  padding: 5px;

  border: 0.16em solid rgb(255, 255, 255);
  border-radius: 2em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  color: #000;
  text-shadow: 0 0.04em 0.04em rgba(255, 255, 255, 0.253);
  text-align: center;
  transition: all 0.2s;
  width: 100%;
}

.bn3:hover {
  background-color: rgb(63, 119, 192);
}

.bn3:focus {
  background-color: rgb(63, 119, 192);
}

/* CSS */
a {
  text-decoration: none;
}

.opciones {
  display: flex;
  flex-flow: row wrap;
}

.usuario-img {
  width: 80px;
}

.nav-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;

  width: 40%;
  padding: 0;
}

/* CSS */
.nav-btn {
  background-color: #e1ecf4;
  border-radius: 3px;
  border: 1px solid #7aa7c7;
  box-shadow: rgba(255, 255, 255, 0.7) 0 1px 0 0 inset;
  color: #39739d;
  cursor: pointer;
  outline: none;
  width: 100%;
  border-radius: 15px;
  text-align: center;
  text-decoration: none;
  user-select: none;
}

.nav-btn:hover,
.nav-btn:focus {
  background-color: var(--yellow);
  color: #2c5777;
}

.nav-btn:focus {
  box-shadow: 0 0 0 4px rgba(0, 149, 255, 0.15);
}

.nav-btn:active {
  background-color: #a0c7e4;
  box-shadow: none;
  color: #2c5777;
}
</style>
