<template>
  <div class="container">
    <h1>Tareas</h1>

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
      <input type="submit" value="Enviar" @click="submitTasks" />
      <p v-if="message">{{ this.message }}</p>
    </div>

    <!-- TABLA DE TAREAS ASIGNADAS-->
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      tasks: [],
      usersMuni: [],
      descriptionTarea: "",
      userMuniAsigned: null,
      title: "",
      message: null,
    };
  },
  created() {
    this.getUsersMuni();
    this.getMyTasks();
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
        .then((Response) => {
          this.usersMuni = Response.data.Munis;
          console.log(Response.data, "municipales");
        })
        .catch((e) => console.log(e));
    },
    getMyTasks() {
      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get("/tasks/received-tasks")
        .then((response) => {
          let l = response.data.MyReceivedTasks;
          l.forEach((element) => {
            let iso = element.created_at;
            let date = new Date(iso);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            let fecha = `${day}/${month}/${year}`;
            let tarea = {
              title: element.title,
              description: element.description,
              fechaCreacion: fecha,
              estado: element.completed === null ? "Incompleto" : "Completo",
            };

            this.tasks.push(tarea);
          });

          console.log(Response.data, "mis tareas");
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
          });
      } else {
        this.message =
          "Debe asignar un agente municipal y describir la tareaa realizar";
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
  border-radius: 30px 30px 0px 0px;
  border: 1px solid black;
}
.container-tasks {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-top-width: 1px;
  border-top-color: black;
  border-top-style: solid;
}

select {
  border-radius: 10px;
  padding: 3px;
}
textarea {
  height: 10rem;
  margin-top: 2rem;
  border-radius: 10px;
}
.asunto {
  margin-top: 2rem;
}
.asunto input {
  width: 100%;
  border-radius: 10px;
}
input[type="submit"] {
  width: 8rem;
  margin: auto;
  border-radius: 10px;
  margin-top: 2rem;
}
</style>
