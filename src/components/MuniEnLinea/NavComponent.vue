<template>
  <!-- Sidebar -->
  <div class="nav-container">
    <img
      class="logo"
      src="https://morteros.gob.ar/sites/default/files/logo_municipio_0.png"
      alt=""
    />

    <div class="usuario">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="86"
        height="86"
        fill="currentColor"
        class="bi bi-person-circle"
        viewBox="0 0 16 16"
      >
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
        <path
          fill-rule="evenodd"
          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
        />
      </svg>
      <div class="usuario-details">
        <a href="">Mi cuenta</a>
        <strong>
          Usuario,<br />
          Apellido Apellido<br />
        </strong>
        <p>DNI: 44203460</p>
      </div>
    </div>

    <nav id="sidebarMenu" class="btn-container">
      <input class="bn3" type="button" value="Servicios" />
      <input class="bn3" type="button" value="Comunicaciones" />
      <input class="bn3" type="button" value="Noificaciones" />
      <input class="bn3" type="button" value="Representados" />
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
.bn3 {
  display: inline-block;
  padding: 5px;
  margin: 0 0.1em 0.1em 0;
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
.usuario {
  display: flex;
  flex-flow: row wrap;
  justify-content: left;
  align-items: left;

  width: 300px;
}

.logo {
  width: 90%;
  margin: 10% 0;
}

.usuario-img {
  width: 80px;
}

.usuario-details {
  display: flex;
  align-items: flex-start;
  justify-content: left;
  flex-flow: column wrap;
  padding-left: 20px;

  text-align: left;
}

.nav-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: center;
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
