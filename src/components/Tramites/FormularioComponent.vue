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
        { id: 1, pregunta: "Opcion1", type: "string" },
        { id: 2, pregunta: "opcion2", type: "string" },
        { id: 3, pregunta: "opcion3", type: "number" },
        { id: 4, pregunta: "opcion 4", type: "checkbox" },
        { id: 4, pregunta: "opcion 5", type: "date" },
        { id: 4, pregunta: "opcion 6", type: "color" },
      ],
    };
  },
  methods: {
    swapComponent(componente) {
      this.currentComponent = componente;
    },
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
