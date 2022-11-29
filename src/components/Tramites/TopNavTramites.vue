<template>
  <nav class="topNav">
    <div class="busqueda">
      <input type="text" />
      <input type="button" value="Buscar" class="btn btn-primary" />
    </div>
    <div class="dropdown">
      <button class="dropbtn btn btn-primary">Seleccionar</button>
      <div class="dropdown-content">
        <a href="#">Area</a>
        <a href="#">Servicio</a>
        <a href="#">Servicio</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "TopNavTramites",
};
</script>

<style scoped>
.topNav {
  height: 100px;
  border: 1px solid red;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #fff;
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
</style>
