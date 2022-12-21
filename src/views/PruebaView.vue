<template>
  <div class="prueba-container" id="elemento">
    <h2>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum qui
      deserunt, voluptas sunt inventore tempora reiciendis praesentium veritatis
      voluptatum debitis maiores rem tempore similique ullam, amet aliquam
      aperiam, quisquam et.
    </h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
      aspernatur cupiditate tempore quae facere unde ex ipsa at quaerat dolorem
      quo obcaecati nisi dolorum, quibusdam aliquam quis tempora nemo aperiam?
    </p>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat,
      quisquam alias neque nesciunt quaerat commodi expedita cupiditate
      voluptates! Atque nisi dolor animi et voluptate. Dolore quidem quas enim
      laudantium fugit!
    </p>
    <input type="button" @click="PDF" value="Exportar a pdf" />
  </div>
</template>

<script>
import html2pdf from "html2pdf.js";
export default {
  name: "PruebaView",
  components: {},

  methods: {
    PDF() {
      var element = document.getElementById("elemento");

      html2pdf(element);
    },
  },
};
</script>

<style scoped>
.prueba-container {
  width: 80vw;
  margin-left: 20vw;
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

* {
  margin-top: 60px;
  text-align: center;
}

h2 {
  color: red;
}
</style>
