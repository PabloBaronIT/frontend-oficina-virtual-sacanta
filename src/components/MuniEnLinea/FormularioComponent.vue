<template>
  <form action="">
    <div class="pregunta" v-for="pregunta in preguntas" :key="pregunta.id">
      <label for="">{{ pregunta.pregunta }} </label>
      <input
        :type="pregunta.type"
        :placeholder="pregunta.pregunta"
        :v-model="pregunta.id"
      />
    </div>
  </form>
</template>

<script>
export default {
  name: "FormularioComponent",
  data() {
    return {
      preguntas: [
        { id: 1, pregunta: "Nombre", type: "string" },
        { id: 2, pregunta: "Apellido", type: "string" },
        { id: 3, pregunta: "Edad", type: "number" },
        { id: 4, pregunta: "Acepto los terminos", type: "checkbox" },
      ],
    };
  },
};

//   computed:{
//     preguntasFiltradas(){
//         return this.preguntas.filter((pregunta)=>{
//             return pregunta.
//         })
//     }
//   }
</script>

<style scoped>
form {
  width: 80%;
  border: 1px solid red;
  height: auto;
  padding: 40px;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
}

.pregunta {
  margin: 10px;
}
</style>
