<template>
  <div class="login-container">
    <form action="" v-if="!this.loading">
      <h1>Login Municipal</h1>
      <FormKit
        type="text"
        name="Cuil"
        id="Cuil"
        label="Cuil"
        help="Your full name"
        placeholder="“Jon Doe”"
        v-model="this.cuil"
      />
      <FormKit
        type="password"
        name="password"
        id="password"
        label="Password"
        help="Your password"
        placeholder="********"
        v-model="this.password"
      />
      <p style="color: red">{{ this.msj }}</p>
      <div class="botones">
        <input
          @click="login()"
          class="btn btn-primary"
          type="button"
          value="Ingresar"
        />
        <!-- <button class="btn btn-outline-secondary boton">
          <a href="https://cidi.test.cba.gov.ar/Cuenta/Login?app=551">CIDI</a>
        </button> -->
      </div>
    </form>
    <div v-if="this.loading" class="spinner-border loading" role="status">
      <span class="sr-only"></span>
    </div>
  </div>
</template>

<script>
//import dbService from "@/services/dbService";
import axios from "axios";
// let header = process.env.VUE_APP_PASSWORD_HEADER;
import dbService from "@/services/dbService";

export default {
  data() {
    return {
      cuil: null,
      password: "",
      msj: "",
      user: {},
      loading: false,
      cidiCookie: null,
    };
  },
  created() {
    // let cidi = this.$route.query.cidi || null;
    // console.log(cidi, "soy query de cidi");
    // if (cidi) {
    //   this.loading = true;
    //   this.cidiCookie = cidi;
    //   //document.cookie = `cidi=${cidi};max-age=120`;
    //   //se llama la api de cidi para saber si tienen representados o no
    //   this.logCidi(cidi);
    // }
  },
  methods: {
    dispatchLogin() {
      this.$store.dispatch("mockLoginAction", this.user);
    },
    dispatchCidi() {
      this.$store.dispatch("mockCidiAction", this.cidiCookie);
    },

    login() {
      localStorage.removeItem("token");

      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .post("/auth/signinMunicipales", {
          cuil: this.cuil,
          password: this.password,
        })

        .then(async (response) => {
          if (response.status == 200) {
            // console.log(response.data.Token.token);
            let token = response.data.Token.token;
            localStorage.setItem("token", token);
            let payload = dbService.getToken(token);
            let idMuni = payload.id;
            this.getMyProfile(idMuni);
            this.$router.push("muni");

            //TOMO LOS DATOS DEL TOKEN
            //let payload = await dbService.getToken(token);
            //console.log(payload);
          }
        })
        .catch((error) => {
          console.log(error);
          this.msj = "Usuario incorrecto";
        });
    },

    logCidi(cidi) {
      this.dispatchCidi();
      //console.log(this.cidiCookie, "cidicookie");
      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
      });
      //SE ENVIA LA QUERY PARA OBTENER TODA LA INFO DEL USUARIO
      apiClient
        .post("/auth/cidi-muni/signup/" + cidi)
        .then((response) => {
          console.log(response.data, "respuesta api cidi");
          let token = response.data["Token"] || null; //token por calve fizcal o sin representados
          let redireccionamiento = response.data["RedirectURL"] || null;

          localStorage.setItem("token", token.token);

          if (redireccionamiento) {
            this.$router.push("/municipales/assign-area");
          } else {
            this.getMyProfile();
            this.$router.push("muni");
            this.loading = false;
          }

          //si tiene representados
        })
        .catch((error) => {
          console.log(error);
          this.msj = "Usuario incorrecto";
          this.loading = false;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    getMyProfile(id) {
      //console.log(process.env.VUE_APP_PASSWORD_HEADER, "SOY EL HEADER");
      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
          // "access-user-header": process.env.VUE_APP_PASSWORD_HEADER,
          "access-user-header":
            "^Yh19S&^8$yl01&Fagyg8eLxrI8uxypiCpdUdRscjF!xKSSqq",
        },
      });
      apiClient.get("/municipales/" + id).then((response) => {
        console.log(response.data);
        this.user = response.data.UserMuni;
        this.dispatchLogin();

        window.localStorage.setItem("name", response.data.UserMuni.firstname);
        window.localStorage.setItem(
          "lastname",
          response.data.UserMuni.lastname
        );
        window.localStorage.setItem("cuil", response.data.UserMuni.cuil);

        window.localStorage.setItem("email", response.data.UserMuni.email);
        window.localStorage.setItem("id", response.data.UserMuni.id);
        // window.localStorage.setItem(
        //   "fecha-creacion",
        //   response.data.MuniProfile.muni.created_at
        // );
        window.localStorage.setItem("role", response.data.UserMuni.role);
      });
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  margin: 50px;
  justify-content: space-around;
  align-items: center;
}

form {
  box-shadow: 0px 0px 10px #333;
  display: flex;
  flex-flow: column wrap;
  padding: 120px 40px;
  position: relative;
  z-index: 1;
  background: #fff;
}
/* .botones {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 10rem;
  width: 100%;
  margin-top: 5rem;
} */
.boton {
  width: 100%;
}
a {
  text-decoration: none;
  color: var(--text-color);
}
</style>
