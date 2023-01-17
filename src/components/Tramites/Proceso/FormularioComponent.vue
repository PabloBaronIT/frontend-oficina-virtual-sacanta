<template>
  <h1>
    {{ this.$route.params.formularioTitle }}
  </h1>
  <div class="question">
    <h4>{{ questions[questionsLength].title }}</h4>
    <p>Completar las preguntas para cada tramite</p>
    <div class="options-container">
      <form v-for="(option, key) in optionsLength" :key="key" class="option">
        <label class="option-text" :for="option">
          <input
            v-if="questions[questionsLength][option][1] === 'radio'"
            :name="key"
            :key="key"
            :value="key"
            required
            :type="questions[questionsLength][option][1]"
            v-model="selected"
          />

          {{ questions[questionsLength][option][0] }}
        </label>
        <br />
        <label for="option">
          <p>{{ questions[questionsLength][option][2] }}</p>
        </label>
        <input
          v-if="questions[questionsLength][option][1] != 'radio'"
          placeholder="Escriba su respuesta..."
          class="input-option"
          :key="key"
          :value="key"
          v-model="textInput"
          required
          :type="questions[questionsLength][1]"
        />
      </form>
    </div>
    <input
      class="btn btn-success"
      type="button"
      value="Siguiente"
      @click="next"
    />
  </div>
</template>

<script>
import dbService from "@/services/dbService";

export default {
  name: "FormularioComponent",
  data() {
    return {
      textInput: "",
      selected: null,
      questionsLength: 0,
      optionsLength: 3,
      questions: [
        {
          title: "Tipo De Negocio",
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
        {
          title: "Tipo De Negocio",
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
        {
          title: "Tipo De Negocio",
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
  methods: {
    next() {
      this.questionsLength++;
      console.log(this.selectedOption);
    },
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
