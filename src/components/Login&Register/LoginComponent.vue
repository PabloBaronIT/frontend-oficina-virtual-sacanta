<template>
  <div class="login-container">
    <form v-if="!this.loading">
      <img
        class="w-50"
        src="https://github.com/PabloBaronIT/frontend-oficina-virtual/blob/main/src/assets/muni-en-linea-logo.png?raw=true"
        alt=""
      />

      <FormKit
        type="form"
        id="registration-example"
        :actions="false"
        incomplete-message="Aun no has completado todos los campos."
      >
        <FormKit
          v-model="cuil"
          type="number"
          name="cuil"
          label="CUIL"
          placeholder="cuil"
          validation="required|length:11,11|number"
          :validation-messages="{
            required: 'Ingresa el CUIL sin simbolos ni espacios',
            number: 'Ingresar solo nùmeros',
            length: 'El CUIL debe tener 11 caracteres',
          }"
        />
        <FormKit
          v-model="password"
          type="password"
          name="password"
          label="Contraseña"
          placeholder="clave"
          @keyup.enter="log"
        />
        <div class="botones">
          <button type="button" class="btn btn-outline-secondary" @click="log">
            Ingresar
          </button>
          <button type="button" class="btn btn-outline-secondary">
            <router-link to="/crear-cuenta"> Crear cuenta </router-link>
          </button>
          <button class="btn btn-outline-secondary boton">
            <a href="https://cidi.test.cba.gov.ar/Cuenta/Login?app=551">CIDI</a>
          </button>
        </div>
      </FormKit>

      <p class="error">{{ this.msj }}</p>
    </form>
    <div v-if="this.loading" class="spinner-border loading" role="status">
      <span class="sr-only"></span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dbService from "@/services/dbService";
import setToken from "@/middlewares/setToken";
import setTokenRelations from "@/middlewares/setTokenRelations";

//Duracion e sesiones de usuario (charlar con patricio)
//Recordar sesion mediante cookies => Ver libreria js-cookie
//

export default {
  name: "LoginComponent",
  data() {
    return {
      cuil: null,
      password: "",
      validacion: false,
      msj: "",
      loading: false,
      user: null,
      representante: null,
      cidiCookie: null,
    };
  },

  beforeRouteLeave(to, from, next) {
    localStorage.clear();
    next();
  },
  beforeRouteEnter(to, from, next) {
    localStorage.clear();
    next();
  },
  created() {
    //setToken();
    //tomo del la ruta la query string para tomar datos del usuario
    let cidi = this.$route.query.cidi || null;
    console.log(cidi, "soy query de cidi");

    let Cookiess = document.cookie.split(";"); //tomo todas la cookkies
    let asd = Cookiess?.map((element) => {
      //las recorro para buscar la de cidi
      if (element.includes("cidi")) return element;
    });
    let cidiCook = asd[0]?.split("=") || null; //separo la que es de cidi para obtener el valor

    if (cidi) {
      this.loading = true;
      this.cidiCookie = cidi;

      document.cookie = `cidi=${cidi};max-age=120`;
      //se llama la api de cidi para saber si tienen representados o no
      this.logCidi(cidi);
    }
    if (cidiCook) {
      this.cidiCookie = cidiCook[1];

      this.loading = true;
      this.logCidi(cidiCook[1]);
    }
  },
  methods: {
    //SE GUARDA EN EL STORE EL USUARIO
    dispatchLogin() {
      this.$store.dispatch("mockLoginAction", this.user);
    },
    dispatchCidi() {
      this.$store.dispatch("mockCidiAction", this.cidiCookie);
    },
    //se guarda los datos del representante
    dispatchRepresentante() {
      this.$store.dispatch("mockRepresentanteAction", this.representante);
    },
    //LOGIN COMUN
    log() {
      this.loading = true;
      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .post("/auth/signin", { cuil: this.cuil, password: this.password })

        .then((response) => {
          console.log(response.data);
          // let tokenApi = response.data.Token.token;
          let tokenApi = response.data.Tokens.AuthToken;
          let refreshToken = response.data.Tokens.RefreshToken; //REFRESH TOKEN
          localStorage.setItem("token", tokenApi);
          localStorage.setItem("refreshToken", refreshToken);
          this.getMyProfile();
        })
        .catch((error) => {
          console.log(error);
          this.validacion = false;
          this.msj = "Usuario incorrecto";
          this.loading = false;
        });

      // this.$router.push("munienlinea");
    },
    /* ESTE METODO LE ENVIA A LA API DE CIDI LAS HASCOOKIE PARA OBTENER TODOS LOS DATOS Y REPSRESENTADO*/
    logCidi(cidi) {
      this.dispatchCidi();
      //console.log(this.cidiCookie, "cidicookie");

      //SE ENVIA LA QUERY PARA OBTENER TODA LA INFO DEL USUARIO
      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .post("/auth/cidi/login/" + cidi)

        .then((response) => {
          console.log(response.data, "respuesta api cidi");
          let token = response.data["Tokens"] || null; //token por calve fizcal o sin representados
          let redireccionamiento = response.data["redirectURL"] || null; //redireccionamiento con representados
          let tokenRepresetations =
            response.data["TokenRepresentations"] || null; //token con representados

          if (token) {
            localStorage.setItem("token", token.authToken);
            localStorage.setItem("refreshToken", token.refreshToken);

            this.getMyProfile();
            this.$router.push("munienlinea");
          }

          //si tiene representados
          if (redireccionamiento) {
            window.location.href = response.data.redirectURL;
          }
          if (tokenRepresetations) {
            localStorage.setItem("token", tokenRepresetations.authToken);
            localStorage.setItem(
              "refreshToken",
              tokenRepresetations.refreshToken
            );

            //se buscan los datos del usuario
            let payload = dbService.getToken(tokenRepresetations.authToken);
            let idRepresentante = payload.representative;
            this.getMyProfile();
            //se busca los datos del representante
            this.getRepresentante(idRepresentante);
            this.$router.push("munienlinea");
          }
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

    //FUNCION PARA OBTENER EL PERFIL DEL USUARIO
    getMyProfile() {
      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get("/oficina/user/profile")
        .then((response) => {
          console.log(response.data, "datos de usuariodb");
          this.user = response.data.UserProfile.user;
          this.user.cidiCookie = this.cidiCookie;
          this.dispatchLogin();
          window.localStorage.setItem(
            "role",
            response.data.UserProfile.user.role
          );
          window.localStorage.setItem(
            "name",
            response.data.UserProfile.user.firstname
          );
          window.localStorage.setItem(
            "lastname",
            response.data.UserProfile.user.lastname
          );
          window.localStorage.setItem(
            "cuil",
            response.data.UserProfile.user.cuil
          );
          window.localStorage.setItem(
            "adress",
            response.data.UserProfile.user.adress
          );
          window.localStorage.setItem(
            "email",
            response.data.UserProfile.user.email
          );
          window.localStorage.setItem("id", response.data.UserProfile.user.id);
          window.localStorage.setItem(
            "fecha-creacion",
            response.data.UserProfile.user.created_at
          );
          window.localStorage.setItem(
            "nivel",
            response.data.UserProfile.user.level.level
          );

          this.loading = false;
          this.$router.push("munienlinea");
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.getMyProfile();
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.getMyProfile();
            }
          }
        });
    },
    getRepresentante(id) {
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
      apiClient
        .get("/oficina/users/" + id)
        .then((response) => {
          console.log(response.data, "datos representante");

          this.representante = response.data.User;
          localStorage.setItem(
            "representanteFirstname",
            response.data.User.firstname
          );
          localStorage.setItem(
            "representanteLastname",
            response.data.User.lastname
          );

          this.dispatchRepresentante();
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.getRepresentante(id);
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.getRepresentante(id);
            }
          }
        });
    },
  },
};
</script>

<style scoped>
.botones {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 10rem;
  width: 100%;
  margin-top: 5rem;
}
.boton {
  width: 100%;
}
h1 {
  color: var(--red);
  font-weight: bold;
}
a {
  text-decoration: none;
  color: var(--text-color);
}

.error {
  color: red;
}

.log-btn {
  background: var(--red);
}

.deco {
  text-align: center;
  width: 200px;
  z-index: 1;
}

.login-container {
  width: 100vw;
  height: 100vh;
  --background-image: url("https://entemunicipioscba.org/wp-content/uploads/2018/09/munisacanta.jpg");
  z-index: 50;
  display: flex;
  margin: 10px;
  flex-flow: column wrap;
  justify-content: space-around;
  align-items: center;
}

form {
  width: 30%;
  box-shadow: 0px 0px 10px #333;
  display: flex;
  align-items: center;
  justify-content: baseline;
  flex-flow: column wrap;
  position: relative;
  padding: 2rem;
  z-index: 1;
  background: #ffffff9a;
  border-radius: 1rem;
}

form input {
  margin: 20px;
}

form img {
  margin-bottom: 15%;
}

@media (max-width: 750px) {
  .deco {
    display: none;
  }

  form {
    width: 70%;
  }
}
</style>
<!--


 created() {
    //LOGUIN A TRAVES DE CIDI!
     let variableCidi = this.$route.query ? this.$route.query.cidi : null; //SE TOMA LA QUERY STRING DE CIDI
    let cookieCidi = document.cookie?.split(";"); //SI EXISTE UNA COOKIE SE LEE
    let element = null;
    let asd = null;
    //buscar cookie y tomar su valor
    if (cookieCidi) {
      for (let i = 0; i < cookieCidi.length; i++) {
        if (cookieCidi[i].includes("cidiHash")) {
          element = cookieCidi[i];
        }
      }
      asd = element?.split("=");
    }
    //SI VIENE POR URL LA HAS COOKIE CON ESE DATO SE LLAMA LA API DE CIDI PARA OBTENER SUS DATOS
    if (variableCidi) {
      console.log(variableCidi, "hasCokkieCidi");
      //SE TOMA LA QUERY
      //let cidi = this.$route.query?.cidi;
      document.cookie = `cidiHash= ${variableCidi};max-age=120`; //se define una cookie

      this.logCidi(variableCidi);
      variableCidi = null;
    }
    //SI YA INGRESO ANTERIORMENTE SE BUSCA LA COOKIE CON EL VALOR CIDIHAS PARA VOLVER A LLAMAR LA API DE CIDI PARA OBTENRE SU REPRESENTADO
    else if (!variableCidi && asd) {
      console.log(asd, "cookie");
      this.logCidi(asd[1]);
    } else {
      console.log("no hay query string ni cookie");
    }

    localStorage.clear();
  },


-->
