<template>
  <div class="filtro-container">
    <input type="button" value="Notificaciones" />
    <input type="button" value="Notificaciones" />
    <input type="button" value="Notificaciones" />
    <img class="filtro-img" src="@/assets/filtro.svg" alt="" />

    <select name="" id="">
      <option>Todos</option>
      <option>Leido</option>
      <option>No leido</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "FiltroNotificaciones",
};
</script>

<style scoped>
.filtro-img {
  max-width: 20px;
}

.filtro-container {
  width: 100%;
  color: var(--text-color);
  padding: 10px;
  display: flex;
  justify-content: space-around;
}

.filtro-container input {
  margin: 0 20px;
  background: inherit;
  color: var(--text-color);
  border: none;
  border-bottom: 1px solid var(--red);
}

.filtro-container input:hover {
  border-bottom: 2px solid var(--green);
  animation-name: border-animation;
  animation-duration: 2s;
}

select {
  margin: 0 10px;
  color: var(--text-color);
  text-align: center;
  background: var(--green);
  border-radius: 20px;
  border: none;
  outline: none;
}

select option {
  background: var(--green);
  color: var(--text-color);
  border: none;
  outline: none;
}
select option:hover {
  background: var(--green);
  outline: none;
  border: none;
}

@keyframe border-animation {
  0% {
    background-color: var(--red);
    left: 0px;
    top: 0px;
  }
  50% {
    background-color: var(--blue);
    left: 200px;
    top: 200px;
  }
  100% {
    background-color: var(--green);
    left: 0px;
    top: 0px;
  }
}
</style>
