<template>
  <main class="flex-container">
    <h2>Servicios</h2>
    <div class="card-container">
      <div class="card carta-servcio">
        <img src="@/assets/logo.png" alt="" />
        Opcion
      </div>
      <div class="card carta-servcio">
        <img src="@/assets/logo.png" alt="" />
        Opcion
      </div>
      <div class="card carta-servcio">
        <img src="@/assets/logo.png" alt="" />
        Opcion
      </div>
      <div class="card carta-servcio">
        <img src="@/assets/logo.png" alt="" />
        Opcion
      </div>
      <div class="card carta-servcio">
        <img src="@/assets/logo.png" alt="" />
        Opcion
      </div>
      <div class="card carta-servcio">
        <img src="@/assets/logo.png" alt="" />
        Opcion
      </div>
      <div class="card carta-servcio">
        <img src="@/assets/logo.png" alt="" />
        Opcion
      </div>
      <div class="card carta-servcio">
        <img src="@/assets/logo.png" alt="" />
        Opcion
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "MainCointainerComponent",
};
</script>

<style scoped>
h2 {
  text-align: left;
}

.flex-container {
  height: auto;
  background: rgb(235, 235, 235);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  display: flex;
  padding: 20px;
  flex-flow: column wrap;
}

.card-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  flex-flow: row wrap;
}

.card img {
  border-radius: 50%;
  object-fit: cover;
  width: 60px;
  border: 1px solid #000;
}

.card {
  border-radius: 40% 10px;
  padding: 10px;

  border: none;
  box-shadow: 5px 5px 12px #444;
  width: 100px;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card:hover {
  box-shadow: 5px 5px 20px #444;
}
</style>
