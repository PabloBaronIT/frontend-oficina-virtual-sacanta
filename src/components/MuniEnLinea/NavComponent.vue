<template>
  <!-- Sidebar -->
  <div class="w-25 mx-0 border nav-container">
    <nav id="sidebarMenu" class="d-lg-block sidebar bg-white">
      <input class="nav-btn" type="button" value="Servicios" />
      <input class="nav-btn" type="button" value="Comunicaciones" />
      <input class="nav-btn" type="button" value="Noificaciones" />
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
.nav-container {
  height: 100vh;
  display: flex;
}

.nav-btn {
  background-color: #e1ecf4;
  border-radius: 20px;
  border: 1px solid #7aa7c7;
  box-shadow: rgba(255, 255, 255, 0.7) 0 1px 0 0 inset;
  box-sizing: border-box;
  color: #39739d;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, "Segoe UI", "Liberation Sans",
    sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.15385;
  margin-top: 10px;
  padding: 8px 0.8em;
  position: relative;
  text-align: center;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  white-space: nowrap;
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
