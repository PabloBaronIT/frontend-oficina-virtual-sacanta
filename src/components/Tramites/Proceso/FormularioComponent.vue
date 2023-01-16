<template>
  <h1>
    {{ this.$route.params.formularioTitle }}
  </h1>

  <div class="question" v-for="(question, key) in questions" :key="key">
    <h4>{{ question["question"] }}</h4>
    <p>Completa las preguntas para presentar el tramite</p>
    <div class="options-container">
      <form
        class="option"
        v-for="(option, key2) in Object.keys(question).length - 1"
        :key="key2"
      >
        <label class="option-text" :for="option">
          <input
            v-if="question[key2 + 1][1] === 'radio'"
            name="opcion"
            :key="key2"
            :value="key2"
            v-model="selectedOption"
            required
            :type="question[key2 + 1][1]"
          />
          {{ question[key2 + 1][0] }}
        </label>
        <br />
        <label for="option"
          ><p>{{ question[key2 + 1][2] }}</p></label
        >
        <br />
        <input
          v-if="question[key2 + 1][1] != 'radio'"
          placeholder="Escriba su respuesta..."
          class="input-option"
          :key="key2"
          :value="key2"
          v-model="selectedOption"
          required
          :type="question[key2 + 1][1]"
        />
      </form>
    </div>
  </div>
</template>

<script>
import dbService from "@/services/dbService";

export default {
  name: "FormularioComponent",
  data() {
    return {
      selectedOption: null,
      questionsLength: 0,
      questions: [
        {
          question: "Tipo De Negocio",
          1: [
            "Voy a realizar un trabajo independiente",
            "radio",
            "Venta de productos o servicios con o sin empleado.",
          ],
          2: [
            "Como miembro de una cooperativa",
            "radio",
            "La cooperativa debe estar registrada en AFIP y tenés que tener la CUIT.",
          ],
          3: [
            "Como trabajador promovido",
            "radio",
            "Opción especial para trabajadores en condiciones precarias.",
          ],
        },
      ],
    };
  },
  created() {
    dbService.getQuestions(this.$router).then((response) => {
      try {
        if (response.status == 200) {
          this.questionsLength = response.data.length;
        }
      } catch (error) {
        console.log(error);
      }
    });
  },
};
</script>

<style scoped>
h1 {
  color: var(--red);
}

.option-text {
  font-size: 1.1em;
}

.input-option {
  width: 50%;
}

.options-container {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: flex-start;
}

.option {
  margin: 10px;
  text-align: left;
}

.option input {
  margin: 0 10px;
}

p {
  font-weight: 100;
}

.question {
  margin-top: 20px;
}
</style>
