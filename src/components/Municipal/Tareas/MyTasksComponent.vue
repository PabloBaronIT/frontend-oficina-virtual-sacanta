<template>
  <div class="container-my-tasks">
    <h3>Mis tareas</h3>
    <h3 v-if="!tasks.length">No hay tareas asignadas en este momento</h3>
    <div class="tabla-container" v-if="tasks.length">
      <table class="table">
        <tr class="fila-tabla">
          <th class="fila">N° de Trámite</th>
          <th class="fila">Asunto</th>
          <th class="fila">Descripción</th>
          <th class="fila">Fecha de asignación</th>
          <th class="fila">Fecha de finalización</th>

          <th class="fila">Estado</th>
        </tr>

        <tr
          class="fila-tabla"
          v-for="(p, key) in this.tasks"
          :key="key"
          @click="ModalResponse(p.id, p.idTramite)"
        >
          <td class="fila">{{ p.idTramite || "" }}</td>
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

        <!--MODAL PARA RESPONDER A LA TAREA-->
        <div class="modalRespuesta">
          <div v-if="this.modalresponse === true" class="modal-content">
            <div class="modal-top">
              <h3>Responder tarea</h3>
              <p>Nº Tramite: {{ this.Ntramite }}</p>
              <img
                @click="CloseModalTarea($event)"
                class="svg"
                src="@/assets/close.svg"
                alt=""
              />
            </div>
            <!--RESPUESTA ESCRITA-->

            <div class="response">
              <label for="asunto">Respuesta</label>
              <textarea
                aria-multiline="true"
                name="asunto"
                id=""
                v-model="this.respuestaA"
              />

              <!--SUBIR ARCHIVOS-->

              <div class="file-container">
                <div v-if="!asd" class="file-intro">
                  <img
                    v-if="!this.messageResponse"
                    src="@/assets/tramite-logo.svg"
                    alt=""
                    id="img-preview"
                    class="imgFile"
                  />

                  <hr />
                  <input
                    accept=".jpg, .jpeg, .png, .webp"
                    type="file"
                    id="img-uploader"
                    @change="selectFile($event)"
                  />

                  <!--INPUT PARA SUBIR EL ARCHIVO-->
                  <div class="fileup">
                    <input
                      v-if="this.file"
                      class="m-2 btn btn-secondary"
                      type="button"
                      value="Subir archivo"
                      @click="postFile()"
                    />
                  </div>
                </div>
                <!--CUANDO SE TEMRINO DE CARGAR EL ARCHIVO-->

                <div v-else class="cargado">
                  <img
                    src="@/assets/red-check-mark-icon.svg"
                    alt=""
                    id="img-preview"
                    class="imgFile"
                  />
                  <p>Archivo cargado</p>
                </div>
              </div>

              <input
                class="botonSubmit"
                type="button"
                value="Enviar"
                @click="sentTasks"
                v-if="this.respuestaA || this.respuestaB"
              />
              <p v-if="message" class="enviado">{{ this.message }}</p>
            </div>
          </div>
        </div>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import setTokenMuni from "@/middlewares/setTokenMuni";

export default {
  data() {
    return {
      tasks: [],
      usersMuni: [],
      userMuniAsigned: null,
      message: false,
      selecTarea: null,
      modal: false,
      modalresponse: false,
      verSelecTarea: null,
      respuesta: "",
      Ntramite: null,
      respuestaA: null,
      respuestaB: null,
      asd: false,
      fileSelect: "",
      textInput: "",
      file: "",
    };
  },
  created() {
    this.getMyTasks();
  },
  methods: {
    selectFile($event) {
      const imgPreview = document.getElementById("img-preview");

      this.file = $event.target.files[0];
      const objectURL = URL.createObjectURL(this.file);
      imgPreview.src = objectURL;
      console.log(this.file, "soy el archivo");
    },
    postFile: async function () {
      const CLOUDINARY_URL =
        "https://api.cloudinary.com/v1_1/ddko88otf/image/upload";
      const CLOUDINARY_UPLOAD_PRESET = "lylceews";
      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          this.respuestaB = data.secure_url;
          console.log(data.secure_url, "secure_url");
          console.log(data);
          //this.preNext();
          this.fileSelect = null;
          this.asd = true;
        });

      //console.log(res.secure_url, "soy la url de la imagen");
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
              idTramite: element.procedureHistory.id,
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
        .catch((error) => {
          console.log(error);
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setTokenMuni();
              this.getMyTasks();
            }
          }
        });
    },

    ModalResponse(id, idTramite) {
      this.selecTarea = id;

      this.Ntramite = idTramite;
      this.modalresponse = true;
    },
    CloseModalTarea() {
      this.modalresponse = false;
      this.respuestaA = "";
      this.respuestaB = "";
    },
    sentTasks() {
      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      if (this.respuestaA && this.respuestaB) {
        apiClient
          .put("tasks/update-task/" + this.selecTarea, {
            answer: this.respuestaA,
            file: this.respuestaB,
          })
          .then((response) => {
            if (response.status === 200) {
              this.message = "Tarea Completada";
              this.respuestaA = "";
              this.respuestaB = "";
              this.tasks = [];
              this.getMyTasks();
            }
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 500) {
              if (error.response.data.message === "Token de usuario expirado") {
                setTokenMuni();
                this.sentTasks();
              }
            }
            this.message = error.response.data.message;
          });
      }
      if (this.respuestaA && !this.respuestaB) {
        apiClient
          .put("tasks/update-task/" + this.selecTarea, {
            answer: this.respuestaA,
          })
          .then((response) => {
            if (response.status === 200) {
              this.message = "Tarea Completada";
              this.respuestaA = "";
              this.respuestaB = "";
              this.tasks = [];
              this.getMyTasks();
            }
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 500) {
              if (error.response.data.message === "Token de usuario expirado") {
                setTokenMuni();
                this.sentTasks();
              }
            }
            this.message = error.response.data.message;
          });
      }
      if (!this.respuestaA && this.respuestaB) {
        apiClient
          .put("tasks/update-task/" + this.selecTarea, {
            file: this.respuestaB,
          })
          .then((response) => {
            if (response.status === 200) {
              this.message = "Tarea Completada";
              this.respuestaA = "";
              this.respuestaB = "";
              this.tasks = [];
              this.getMyTasks();
            }
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 500) {
              if (error.response.data.message === "Token de usuario expirado") {
                setTokenMuni();
                this.sentTasks();
              }
            }
            this.message = error.response.data.message;
          });
      } else {
        this.messageResponse = true;
      }
    },
  },
};
</script>
<style scoped>
.container-my-tasks {
  border: 1px solid black;
  border-radius: 10px 10px 0px 0px;
  text-align: left;
  width: 100%;
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
.modalRespuesta {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  z-index: 15;
  position: absolute;
  top: 0;
  right: 30rem;
  margin-left: auto;
  margin-right: auto;
  height: auto;
  width: 500px; /* Need a specific value to work */
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
.response {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.response textarea {
  width: 100%;
}
.botonSubmit {
  width: 100px;
  height: 45px;
  background-color: var(--green);
  border-radius: 20px 20px 0px 0px;
  color: white;
  border-style: none;
  margin-top: 1rem;
}
.svg {
  max-width: 20px;
}
.file-intro {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
}
.imgFile {
  height: 4rem;
  width: 4rem;
  margin: auto;
}
.cargado {
  text-align: center;
}
.file-container {
  border: 1px solid var(--grey);
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  width: 100%;
  margin: auto;
  margin-top: 2rem;
}
.fileup {
  margin: auto;
}
.enviado {
  color: green;
  font-size: 25px;
  margin-left: 2rem;
}
</style>
