<template>
  <div class="login-container">
    <form>
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

      <div class="loading-container text-grey">
        <div v-if="this.loading" class="spinner-border loading" role="status">
          <span class="sr-only"></span>
        </div>
      </div>

      <p class="error">{{ this.msj }}</p>
    </form>
  </div>
</template>

<script>
import dbService from "@/services/dbService";
import axios from "axios";

//ToDo
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
      cidi: null,
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
    //tomo del la ruta la query string para tomar datos del usuario
    let cidi = this.$route.query.cidi || null;
    console.log(cidi, "soy query de cidi");

    if (cidi) {
      this.logCidi(cidi);
    }
  },
  methods: {
    //SE GUARDA EN EL STORE EL USUARIO
    dispatchLogin() {
      this.$store.dispatch("mockLoginAction", this.user);
    },
    ruta() {
      this.loading = false;
    },

    log() {
      this.loading = true;

      dbService
        .postLoginUser({ password: this.password, cuil: this.cuil })
        .then(async (response) => {
          //la api envia solo un token
          console.log(response.data.Token.token, "token de la api");
          let tokenApi = response.data.Token.token;
          await localStorage.setItem("token", tokenApi);
          this.getMyProfile();

          //se setea en el localstorage

          //TOMO LOS DATOS DEL TOKEN
          // let payload = dbService.getToken(response.data.Token.token);
          // console.log(payload);
          // this.getMyProfile();
          //this.$router.push("representaciones");
          //
        })
        .catch((error) => {
          console.log(error);
          this.validacion = false;
          this.msj = "Usuario incorrecto";
          this.loading = false;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /* ESTE METODO LE ENVIA A LA API DE CIDI LAS HASCOOKIE PARA OBTENER TODOS LOS DATOS Y REPSRESENTADO*/
    logCidi(cidi) {
      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
      });
      //SE ENVIA LA QUERY PARA OBTENER TODA LA INFO DEL USUARIO
      apiClient.post("/auth/cidi/login/" + cidi).then(async (response) => {
        console.log(response.data, "respuesta api cidi");
        let token = response.data.Token.token;
        console.log(token);
        //   ? response.data.Token.token
        //   : null;
        // let redireccionamiento = response.data.redirectURL
        //   ? response.data.redirectURL
        //   : null;
        // if (token) {
        //   await localStorage.setItem("token", token);
        //   await this.getMyProfile();
        //   this.$router.push("representaciones");
        // }

        // //si tiene representados
        // if (redireccionamiento) {
        //   window.location.href = response.data.redirectURL;
        // }
        //  else  {
        //   await this.getMyProfile();
        //   this.$router.push("representaciones");
        // }
      });
    },
    //FUNCION PARA OBTENER EL PERFIL DEL USUARIO
    getMyProfile() {
      dbService.getMyProfileUser().then((response) => {
        //console.log(response.data, "datos de usuariodb");
        this.user = response.data.UserProfile.user;
        this.dispatchLogin();

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
        window.localStorage.setItem(
          "role",
          response.data.UserProfile.user.role
        );
        this.ruta();

        //this.$router.push("representaciones");
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
