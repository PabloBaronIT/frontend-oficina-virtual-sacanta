<template>
  <div class="container">
    <div class="container-tasks">
      <div class="asunto">
        <label for="asunto">Asunto</label>
        <input type="text" name="asunto" id="" v-model="this.title" />
      </div>

      <textarea
        type="text"
        v-model="this.descriptionRequer"
        aria-multiline="true"
      />

      <p v-if="message" class="enviado">{{ this.message }}</p>
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
import axios from "axios";

export default {
  name: "CreateRequirementsComponent",
  props: {
    id: String,
    getProcedures: Function,
  },

  data() {
    return {
      descriptionRequer: "",
      title: "",
      message: null,
    };
  },

  created() {},
  methods: {
    submitRequer() {
      if (this.descriptionRequer) {
        const apiClient = axios.create({
          //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
          baseURL: process.env.VUE_APP_BASEURL,
          withCredentials: false,
          headers: {
            "auth-header": localStorage.getItem("token"),
          },
        });
        apiClient
          .post("/requirements/send-requirement/" + this.id, {
            title: this.title,
            info_req: this.descriptionRequer,
          })
          .then((response) => {
            if (response.status === 201) {
              this.message = "Requerimiento enviado";
            }
            console.log(response.data.message);
            this.title = "";
            this.descriptionRequer = "";
            this.getProcedures();
          })
          .catch((e) => {
            console.log(e);
            this.message = e.response.data.message;
          });
        this.title = "";
        this.descriptionRequer = "";
      } else {
        this.message = "Debe asignar un requerimiento antes de enviar ";
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
  font-size: 25px;
  margin-left: 2rem;
}
</style>
