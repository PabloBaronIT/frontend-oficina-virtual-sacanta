<template>
  <div class="container">
    <div class="container-tasks">
      <p>Debe completar todos los campos</p>
      <div class="asunto">
        <label for="asunto">Asunto</label>
        <input type="text" name="asunto" id="" v-model="this.title" />
      </div>

      <textarea type="text" v-model="this.description" aria-multiline="true" />
      <!-- DIV PARA CARGAR UN DOCUMENTO EN UNA COMUNICACION -->
      <div v-if="this.documents && this.title" class="">
        <p>cargar documentación</p>
        <div class="file-container" v-if="!asd">
          <div class="file-intro">
            <img
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
        </div>
        <!-- CUANDO EL ARCHIVO SE ENVIO -->
        <div v-if="asd" class="cargado">
          <img
            src="@/assets/red-check-mark-icon.svg"
            alt=""
            id="img-preview"
            class="imgFile"
          />
          <p>Archivo cargado</p>
        </div>
      </div>

      <p v-if="message" class="enviado">{{ this.message }}</p>
      <p v-if="this.datosEnviados" class="enviado">
        {{ this.datosEnviados }}
      </p>
    </div>

    <!-- BOTON PARA ENVIAR LOS DATOS -->
    <input type="button" value="Cidi" class="botonSubmit" v-if="!message" />
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
export default {
  name: "ModalCreateRYCComponent",
  props: {
    submitFunction: Function,
    datosEnviados: String,
    documents: Boolean,
  },

  data() {
    return {
      description: "",
      title: "",
      documentsFile: [],
      fileSelect: "",
      file: "",
      textInput: "",
      asd: false,
      message: null,
    };
  },

  created() {},
  methods: {
    submitRequer() {
      if (this.description) {
        console.log(this.description, this.title);
        this.submitFunction(this.title, this.description, this.documentsFile);
        this.title = "";
        this.description = "";
      } else {
        this.message = "Debe escribir en el cuadro de texto antes de enviar ";
      }
    },
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
          this.textInput = data.secure_url;
          this.asd = true;
          //console.log(data.secure_url, "secure_url");
          //console.log(data);
          this.documentsFile.push({
            title: this.title,
            link: this.textInput,
          });
          console.log(this.textInput, "archivo cargado en textInput");
        });
      this.fileSelect = null;
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
  font-size: 15px;
}
.file-container {
  border: 1px solid var(--grey);
  /* padding: 20px; */
  border-radius: 5px;
  display: flex;
  flex-flow: column;
  /* justify-content: center; */
  width: 120%;
  margin: auto;
  margin-bottom: 2rem;
  margin-left: -2rem;
}
.file-intro {
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 100%;
}

.file-intro input[type="file"] {
  margin: auto;
}
.imgFile {
  height: 4rem;
  width: 4rem;
  margin: auto;
}
.fileup {
  margin: auto;
}
.cargado {
  text-align: center;
}
</style>
