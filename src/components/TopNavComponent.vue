<template>
  <nav class="top-nav-container">
    <img
      src="https://morteros.gob.ar/sites/default/files/logo_municipio_0.png"
      alt=""
      style="width: 20%"
    />
    <div class="top-nav-a-container">
      <a href="">Servicios</a>
      <a href="">Servicios</a>
      <a href="">Servicios</a>
      <a href="">Servicios</a>
      <router-link to="/munienlinea">Muni en linea</router-link>
    </div>
  </nav>
</template>
<script>
export default {
  name: "topNavComponent",
};
</script>

<style scoped>
.top-nav-container {
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #000;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 30px;
}

.top-nav-a-container a {
  margin: 20px;

  text-decoration: none;
  color: #000;
  transition: color 0.3s ease-in-out, box-shadow 0.5s ease-in-out;
}

.top-nav-a-container a:hover {
  box-shadow: inset 100px 0 0 0 #54b3d6;
  color: white;
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
