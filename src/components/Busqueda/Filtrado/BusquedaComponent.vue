<template>
  <!-- Barra de nusqueda con svg de lupa  -->
  <!-- Componente usado en MainCointainerComponent -->
  <div class="busqueda-container">
    <input type="text" placeholder="Buscar trámite" />
    <img src="@/assets/busqueda.svg" alt="" />
  </div>
</template>

<style scoped>
img {
  max-width: 20px;
}

img:hover {
  cursor: pointer;
}

.busqueda-container {
  display: flex;
  margin: 0 50px;
  background: var(--red);
  padding: 10px;
  border-radius: 10px;
}

.busqueda-container input {
  border-radius: 8px;
  border: none;
  margin-right: 6px;
  outline: none;
  padding: 10px;
}
</style>
