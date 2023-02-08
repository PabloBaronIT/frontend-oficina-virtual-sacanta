<template>
  <!-- Barra de nusqueda con svg de lupa  -->
  <!-- Componente usado en MainCointainerComponent -->
  <div class="busqueda-container">
    <input type="text" placeholder="Buscar servicio" />
    <img src="@/assets/busqueda.svg" alt="" />
  </div>
</template>

<style scoped>
img {
  max-width: 25px;
}

img:hover {
  cursor: pointer;
}

.busqueda-container {
  display: flex;
  margin: 0 50px;
  background: var(--red);
  padding: 10px;
  border-radius: 30px;
}

.busqueda-container input {
  border-radius: 30px;
  border: none;
  margin-right: 10px;
  outline: none;
}
</style>
