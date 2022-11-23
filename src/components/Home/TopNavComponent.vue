<template>
  <nav class="top-nav-container">
    <img
      src="https://morteros.gob.ar/sites/default/files/logo_municipio_0.png"
      alt=""
      style="width: 20%"
    />

    <div class="top-nav-a-container">
      <div class="dropdown">
        <button class="dropbtn">Ciudad</button>
        <div class="dropdown-content">
          <router-link :to="`/gobierno`"> Gobierno </router-link>
          <a href="#">Servicio</a>
          <a href="#">Servicio</a>
        </div>
      </div>
      <div class="dropdown">
        <button class="dropbtn">Gobierno</button>
        <div class="dropdown-content">
          <a href="#">Servicio</a>
          <a href="#">Servicio</a>
          <a href="#">Servicio</a>
        </div>
      </div>
      <div class="dropdown">
        <button class="dropbtn">Intereses</button>
        <div class="dropdown-content">
          <a href="#">Servicio</a>
          <a href="#">Servicio</a>
          <a href="#">Servicio</a>
        </div>
      </div>
      <router-link class="" to="/munienlinea">Muni en linea</router-link>
    </div>
  </nav>
</template>
<script>
export default {
  name: "topNavComponent",
  data() {
    return {
      tab: false,
    };
  },
  methods: {},
};
</script>

<style scoped>
.dropbtn {
  background: none;
  color: #fff;
  padding: 16px;
  font-size: 16px;
  border: none;
  font-weight: bold;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
  z-index: 3;
  background: none;
  border-right: 1px solid var(--yellow);
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: var(--yellow);
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #ddd;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  color: #444;
}

.top-nav-container {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  background-color: var(--blue);
}

.top-nav-a-container a {
  margin: 20px;
  text-decoration: none;
  color: #000;
  transition: color 0.3s ease-in-out, box-shadow 0.5s ease-in-out;
}

.top-nav-a-container a:hover {
  box-shadow: inset 100px 0 0 0 var(--blue);
  color: white;
}

.tab-content {
  display: flex;
  height: auto;
}

.tab-content ul {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
}

ul li {
  margin: 10px;
}

.btn-mel {
  padding: 10px;
  background-color: var(--red);
  border-radius: 10px;
  color: #fff !important;
}

/* .top-nav-container:before {
  background: linear-gradient(
    90deg,
    #cf2e26 16.6666666667%,
    #f1bc37 0,
    #f1bc37 33.3333333333%,
    #224155 0,
    #224155 50%,
    #7baacc 0,
    #7baacc 66.6666666667%,
    #9c3 0,
    #9c3 83.3333333333%,
    #dcddde 0
  );

  content: "";
  display: block;
  height: 6px;
  pointer-events: none;
  position: absolute;
  width: 100%;
} */
</style>
