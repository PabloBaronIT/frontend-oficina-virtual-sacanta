<template>
  <main class="info-container">
    <div class="info-text">
      <h2>Nombre Apellido</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus nemo
        repellat dignissimos, in ipsa ex iusto ut eligendi veritatis similique,
        vero soluta placeat? Aut, quis odit. Enim tempore eveniet tempora.
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus nemo
        repellat dignissimos, in ipsa ex iusto ut eligendi veritatis similique,
        vero soluta placeat? Aut, quis odit. Enim tempore eveniet tempora.
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus nemo
        repellat dignissimos, in ipsa ex iusto ut eligendi veritatis similique,
        vero soluta placeat? Aut, quis odit. Enim tempore eveniet tempora.
      </p>
    </div>
    <img src="https://random.imagecdn.app/500/150" />
  </main>
</template>

<script>
export default {
  name: "infoGobiernoComponent",
};
</script>

<style scoped>
.info-container {
  width: 70%;
  text-align: left;
  border: 1px solid red;
  display: flex;
}

img {
  height: 500px;
  object-fit: cover;
  width: 300px;
}

.info-text {
  padding: 5%;
}
</style>
