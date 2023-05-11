<template>
  <div class="container-my-tasks">
    <h3>Mis tareas</h3>
    <h3 v-if="!tasks.length">No hay tareas asignadas en este momento</h3>
    <div class="tabla-container" v-if="tasks.length">
      <table class="table">
        <tr class="fila-tabla">
          <th class="fila">Asunto</th>
          <th class="fila">Descripción</th>
          <th class="fila">Fecha de asignación</th>
          <th class="fila">Fecha de Finalización</th>

          <th class="fila">Estado</th>
        </tr>

        <tr class="fila-tabla" v-for="(p, key) in this.tasks" :key="key">
          <td class="fila">{{ p.title || "" }}</td>
          <td class="fila">{{ p.description || "" }}</td>
          <td class="fila">{{ p.fechaCreacion || "" }}</td>
          <td class="fila">
            {{ p.fechaFinalizacion === null ? "" : p.fechaFinalizacion }}
          </td>

          <th
            class="fila"
            @click="!p.completed ? cambiarEstadoTarea(p.id) : null"
          >
            <p :style="`background: ${p.color}`">{{ p.estado }}</p>
          </th>
        </tr>

        <!--MODAL PARA CAMBIAR DE ESTADO A LA TAREA-->
        <div class="modalEstado">
          <div v-if="this.modal === true" class="modal-content">
            <div class="modal-top">
              <h3>Cambiar estado</h3>
              <img
                @click="ModalEstado($event)"
                class="svg"
                src="@/assets/close.svg"
                alt=""
              />
            </div>
            <p>asignar la tarea como completada</p>
            <input
              class="botonSubmit"
              type="button"
              value="Modificar"
              @click="updateStatus"
              v-if="this.selecTarea"
            />
            <p v-else>Tarea actualizada</p>
          </div>
        </div>
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
      message: false,
      selecTarea: null,
      modal: false,
      verSelecTarea: null,
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

            let fechaf = element.finalized_at ? element.finalized_at : null;
            let fechaFinalizacion = null;
            if (fechaf) {
              let dateF = new Date(fechaf);
              let dayF = dateF.getDate();
              let monthF = dateF.getMonth() + 1;
              let yearF = dateF.getFullYear();

              fechaFinalizacion = `${dayF}/${monthF}/${yearF}`;
            }

            let tarea = {
              id: element.id,
              title: element.title,
              description: element.description,
              fechaCreacion: fecha,
              fechaFinalizacion: fechaFinalizacion,
              estado:
                element.completed === null || element.completed === false
                  ? "Incompleto"
                  : "Completo",
            };
            switch (tarea.estado) {
              case "Incompleto":
                tarea.color = "var(--red)";
                tarea.completed = false;
                break;
              case "Completo":
                tarea.color = "var(--green)";
                tarea.completed = true;

                break;
              default:
                break;
            }

            this.tasks.push(tarea);
          });

          console.log(Response.data, "mis tareas");
        })
        .catch((e) => console.log(e));
    },
    cambiarEstadoTarea(id) {
      this.selecTarea = id;
      this.ModalEstado();
      console.log(id);
    },
    ModalEstado() {
      this.modal = !this.modal;
    },
    updateStatus() {
      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .put("/tasks/update-task/" + this.selecTarea, { completed: true })
        .then((response) => {
          if (response.status === 200) {
            this.message = true;
            this.tasks = [];
            this.getMyTasks();
            this.ModalEstado();
          }
        });
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
  position: relative;
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
  text-align: center;
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
.modal-content {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}
.modalEstado {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  z-index: 15;
  position: absolute;
  top: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 400px; /* Need a specific value to work */
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}
.modal-top {
  display: flex;
  width: 100%;
  text-align: left;
  justify-content: space-around;
  align-items: flex-start;
}
.botonSubmit {
  width: 100px;
  height: 45px;
  background-color: var(--green);
  border-radius: 20px 20px 0px 0px;
  color: white;
  border-style: none;
}
.svg {
  max-width: 20px;
}
</style>
