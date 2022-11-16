<template>
  <!-- Sidebar -->
  <div class="w-25 nav-container">
    <img
      class="logo"
      src="https://morteros.gob.ar/sites/default/files/logo_municipio_0.png"
      alt=""
    />

    <div class="usuario">
      <img class="usuario-img" src="@/assets/logo.png" alt="" />
      <div class="usuario-details">
        <a href="">Mi cuenta</a>
        <p>
          Usuario, <br />
          Apellido <br />
          12345678
        </p>
      </div>
    </div>

    <nav id="sidebarMenu" class="btn-container">
      <input class="nav-btn" type="button" value="Servicios" />
      <input class="nav-btn" type="button" value="Comunicaciones" />
      <input class="nav-btn" type="button" value="Noificaciones" />
      <input class="nav-btn" type="button" value="Representados" />
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavComponent",
  props: {},
};
</script>

<style scoped>
/* CSS */

.usuario {
  display: flex;
  flex-flow: row wrap;
  font-size: 0.7em;
  height: auto;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.usuario-img {
  width: 40px;
  height: 40px;
}

.usuario-details {
  display: flex;
  flex-flow: column wrap;
  margin-left: 10px;
}

.nav-container {
  height: auto;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-evenly;
  align-items: center;
}

.logo {
  width: 150px;
  margin: 40px 0;
}

/* CSS */
.nav-btn {
  background-color: #e1ecf4;
  border-radius: 3px;
  border: 1px solid #7aa7c7;
  box-shadow: rgba(255, 255, 255, 0.7) 0 1px 0 0 inset;
  color: #39739d;
  cursor: pointer;
  font-size: 0.8em;
  outline: none;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 15px;
  text-align: center;
  text-decoration: none;
  user-select: none;
}

.nav-btn:hover,
.nav-btn:focus {
  background-color: #b3d3ea;
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
