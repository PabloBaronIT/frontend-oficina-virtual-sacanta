<template>
  <div class="container-my-tasks">
    <h3>Mis tareas</h3>
    <h3 v-if="!tasks.length">No hay tareas asignadas en este momento</h3>
    <div class="tabla-container" v-if="tasks.length">
      <table class="table">
        <tr class="fila-tabla">
          <th>
            <input @click="select" type="checkbox" name="" id="" />
          </th>
          <th class="fila">Asunto</th>
          <th class="fila">Descripción</th>
          <th class="fila">Fecha de asignación</th>
          <th class="fila">Estado</th>
        </tr>

        <tr class="fila-tabla" v-for="(p, key) in this.tasks" :key="key">
          <td>
            <input type="checkbox" @click="check(p.id)" :value="p.id" />
          </td>
          <td class="fila">{{ p.title || "" }}</td>
          <td class="fila">{{ p.description || "" }}</td>
          <td class="fila">{{ p.fechaCreacion || "" }}</td>
          <th class="fila">{{ p.estado }}</th>
        </tr>
      </table>
    </div>
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
    this.getMyTasks();
  },
  methods: {
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
  },
};
</script>
<style scoped>
.container-my-tasks {
  border: 1px solid black;
  border-radius: 30px 30px 0px 0px;
  margin-top: 2rem;
  text-align: left;
  width: 90%;
}
.container-my-tasks h3 {
  margin-left: 2rem;
  margin-top: 1rem;
}
.tabla-container {
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin-top: 2rem;
}
.table {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.fila {
  overflow-x: unset;
  height: auto;
  width: 300px;
  text-align: left;
}

.fila-tabla {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2px 2px;
  outline: 1px solid rgba(0, 0, 0, 0.524);
}
.fila-tabla:hover {
  cursor: pointer;
  user-select: none;
  outline: 1px solid gray;
  background-color: white;
}
</style>
