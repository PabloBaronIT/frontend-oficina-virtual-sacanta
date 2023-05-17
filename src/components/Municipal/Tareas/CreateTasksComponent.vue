<template>
  <div class="container">
    <div class="container-tasks">
      <label for="nameUserMuni">
        <p>Asigne la tarea al personal del área que sea necesario</p>
      </label>

      <select
        @change="asignedUser($event)"
        name="nameUserMuni"
        id=""
        v-if="usersMuni"
      >
        <option v-for="muni in usersMuni" :key="muni.id" :value="muni.id">
          {{ muni.firstname }} {{ muni.category.title }}
        </option>
        <!--<option value="1">Presentado</option>
        <option value="2">En proceso</option>
        <option value="4">Finalizados</option>-->
      </select>
      <div class="asunto">
        <label for="asunto">Asunto</label>
        <input type="text" name="asunto" id="" v-model="this.title" />
      </div>

      <textarea
        type="text"
        v-model="this.descriptionTarea"
        aria-multiline="true"
      />

      <p v-if="message">{{ this.message }}</p>
    </div>
    <input
      type="button"
      value="Enviar"
      @click="submitTasks"
      class="botonSubmit"
    />
    <!-- TABLA DE TAREAS ASIGNADAS-->
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "CreateTaksComponent",
  props: {
    id: String,
  },
  data() {
    return {
      usersMuni: null,
      descriptionTarea: "",
      userMuniAsigned: null,
      title: "",
      message: null,
    };
  },

  created() {
    this.getUsersMuni();
  },
  methods: {
    getUsersMuni() {
      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get("/municipales/munis")
        .then((response) => {
          let MyId = localStorage.getItem("id");
          let todos = response.data.Munis;
          let todosF = [];
          for (let i = 0; i < todos.length; i++) {
            if (MyId != todos[i].id) {
              todosF.push(todos[i]);
            }
          }

          this.usersMuni = todosF;
          console.log(this.usersMuni);
          console.log(response.data, "municipales");
        })
        .catch((e) => console.log(e));
    },

    asignedUser(event) {
      this.userMuniAsigned = event.target.value;
      //console.log(this.userMuniAsigned);
    },
    submitTasks() {
      if (this.userMuniAsigned && this.descriptionTarea) {
        const apiClient = axios.create({
          //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
          baseURL: process.env.VUE_APP_BASEURL,
          withCredentials: false,
          headers: {
            "auth-header": localStorage.getItem("token"),
          },
        });
        apiClient
          .post("/tasks/send-task", {
            title: this.title,
            description: this.descriptionTarea,
            userMuniReceiver: this.userMuniAsigned,
            //idTramite:this.id  //falta agregar el tramite al que se relaciona
          })
          .then((response) => {
            if (response.status === 201) {
              this.message = "Tarea asignada";
            }
            console.log(response.data.message);
            this.userMuniAsigned = null;
            this.title = "";
            this.descriptionTarea = "";
          })
          .catch((e) => {
            console.log(e);
            this.message = e.response.data.message;
          });
        this.userMuniAsigned = null;
        this.title = "";
        this.descriptionTarea = "";
      } else {
        this.message =
          "Debe asignar un agente municipal y describir la tarea a realizar";
      }

      console.log(this.userMuniAsigned, this.descriptionTarea, this.title);
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
</style>
