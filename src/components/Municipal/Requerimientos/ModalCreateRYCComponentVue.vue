<template>
  <div class="container">
    <div class="container-tasks">
      <div class="asunto">
        <label for="asunto">Asunto</label>
        <input type="text" name="asunto" id="" v-model="this.title" />
      </div>

      <textarea type="text" v-model="this.description" aria-multiline="true" />

      <p v-if="message" class="enviado">{{ this.message }}</p>
      <p v-if="this.datosEnviados" class="enviado">
        {{ this.datosEnviados }}
      </p>
    </div>
    <input
      type="button"
      value="Enviar"
      @click="submitRequer"
      class="botonSubmit"
      v-if="!message"
    />
  </div>
</template>
<script>
export default {
  name: "ModalCreateRYCComponent",
  props: {
    submitFunction: Function,
    datosEnviados: String,
  },

  data() {
    return {
      description: "",
      title: "",
      message: null,
    };
  },

  created() {},
  methods: {
    submitRequer() {
      if (this.description) {
        console.log(this.description, this.title);
        this.submitFunction(this.title, this.description);
        this.title = "";
        this.description = "";
      } else {
        this.message = "Debe escribir en el cuadro de texto antes de enviar ";
      }
    },
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 95%;
  border-radius: 10px 10px 0px 0px;
  border: 1px solid black;
  justify-content: center;
}
.container h3 {
  margin-left: 2rem;
  margin-top: 1rem;
  text-align: left;
}
.container-tasks {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-top-width: 1px;
  text-align: left;
}

select {
  border-radius: 10px;
  padding: 4px;
}
textarea {
  height: 10rem;
  margin-top: 2rem;
  border-radius: 10px 10px 0px 0px;
  padding-left: 1rem;
}
.asunto {
  margin-top: 2rem;
}
.asunto input {
  width: 100%;
  border-radius: 10px 10px 0px 0px;
  padding-left: 1rem;
}
input[type="submit"] {
  width: 8rem;
  margin: auto;
  border-radius: 10px;
  margin-top: 2rem;
}
.botonSubmit {
  margin: auto;
  width: 100px;
  height: 45px;
  background-color: var(--green);
  border-radius: 20px 20px 0px 0px;
  color: white;
  border-style: none;
  margin-bottom: 2rem;
}
.enviado {
  color: green;
  font-size: 15px;
}
</style>
