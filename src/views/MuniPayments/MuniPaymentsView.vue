<template>
  <div class="containerTramites">
    <div class="filtro-top">
      <h1>Registro de pagos</h1>
      <!-- <p>
        Ingrese cuil del usuario que desea buscar informacion de pagos
        efectuado.
      </p>
      <form class="d-flex">
        <input
          @keyup="this.validar()"
          type="search"
          placeholder="Ingrese CUIL del vecino"
          v-model="this.search"
          maxlength="11"
        />
        <button
          class="btn btn-outline-success"
          type="button"
          @click.prevent="this.searchValue"
          :disabled="this.disabledBoton"
        >
          Buscar
        </button>
      </form> -->
      <p>
        Ingrese el numero de operacion para buscar detalles del un pago en
        particular.
      </p>
      <form class="d-flex" style="width: 50vw; justify-content: space-around">
        <input
          type="text"
          placeholder="Ingrese Número de operación"
          v-model="this.search"
          maxlength="16"
          style="width: 30vw"
        />
        <button
          class="btn btn-outline-success"
          type="button"
          @click.prevent="this.searchTramite"
          :disabled="this.disabledBoton"
        >
          Buscar
        </button>
      </form>
    </div>

    <table class="table table-striped">
      <tr>
        <th>Concepto</th>
        <th>Monto</th>

        <th>Estado</th>
        <th>Resultado</th>
        <th>Fecha Operación</th>
        <th>Tarjeta</th>
        <th>Tipo Operación</th>
      </tr>
      <tr v-if="this.payment">
        <td>
          {{ this.payment.Concept }}
        </td>
        <td>
          {{ this.payment.Price }}
        </td>
        <td>
          {{ this.payment.Status }}
        </td>
        <td>
          {{ this.payment.SuccessMessage }}
        </td>
        <td>
          {{ new Date(this.payment.OperationDate).toLocaleDateString() }}
        </td>
        <td>{{ this.payment.Rendicion.Cuotas }}</td>
        <td>
          {{ this.payment.Rendicion.Tarjeta }}
        </td>
      </tr>
    </table>
    <div
      v-if="this.loading && !this.error"
      class="spinner-border loading"
      role="status"
    >
      <span class="sr-only"></span>
    </div>
    <div v-if="this.error">
      <h1>No se encontraron pagos registrados</h1>
    </div>

    <div class="nav">
      <img
        class="svg"
        @click="backTramites"
        src="./../../assets/images/previous.svg"
        alt=""
        v-if="this.pagina > 1"
      />
      <!-- <div class="pagNum">
        {{ this.pagina }}
      </div> -->

      <img
        @click="nextPag"
        class="svg"
        src="./../../assets/images/next.svg"
        alt=""
        v-if="this.payments?.length > 10"
      />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import setTokenMuni from "@/middlewares/setTokenMuni";
import { BASE_URL } from "@/env";

export default {
  data() {
    return {
      payment: null,
      pagina: 1,
      search: "",
      disabledBoton: false,
      error: false,
      loading: false,
    };
  },
  created() {
    //se obtienen todos los tramites
    // this.getPayments();
    // this.loading = true;
  },
  methods: {
    nextPag() {
      this.pagina++;
      this.getPayments();
    },
    backTramites() {
      this.pagina--;
      this.getPayments();
    },
    validar() {
      let asd = /^[0-9]+$/;
      if (asd.test(this.search)) {
        this.disabledBoton = false;
      } else {
        this.disabledBoton = true;
      }
    },
    // getPayments() {
    //   const apiClient = axios.create({
    //     baseURL: BASE_URL,
    //     withCredentials: false,
    //     headers: {
    //       "auth-header": localStorage.getItem("token"),
    //     },
    //   });
    //   apiClient
    //     .get(`/registered-payments?page= ${this.pagina}`)
    //     .then((response) => {
    //       this.payments = response.data.RegisteredPayments;
    //       this.loading = false;
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       this.error = true;
    //       if (error.response.status === 500) {
    //         if (error.response.data.message === "Token de usuario expirado") {
    //           setTokenMuni();
    //           this.getPayments();
    //         }
    //       }
    //     });
    // },
    // searchValue() {
    //   console.log(this.search);
    //   this.loading = true;
    //   this.payment = "";
    //   const apiClient = axios.create({
    //     baseURL: BASE_URL,
    //     withCredentials: false,
    //     headers: {
    //       "auth-header": localStorage.getItem("token"),
    //     },
    //   });
    //   apiClient
    //     .post(`/registered-payment?page=${this.pagina}`, {
    //       user_cuil: this.search,
    //     })
    //     .then((response) => {
    //       console.log(response.data);
    //       this.payments = response.data.RegisteredPayment;
    //       this.loading = false;
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       if (error.response.status === 500) {
    //         if (error.response.data.message === "Token de usuario expirado") {
    //           setTokenMuni();
    //           this.searchValue();
    //         }
    //       }
    //     });
    // },
    searchTramite() {
      console.log(this.search);
      // this.loading = true;
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get("http://localhost:4040/check-payment/" + this.search)
        .then((response) => {
          this.payment = response.data;
          this.search = "";
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setTokenMuni();
              this.searchTramite();
            }
          }
        });
    },
  },
};
</script>

<style scoped>
p {
  margin-top: 2rem;
}
.containerTramites {
  width: 90%;

  padding-bottom: 2rem;
  padding-top: 2rem;
  text-align: center;
  position: relative;
  margin: auto;
  justify-content: center;
  /* margin-left: 4rem; */
}
.filtro-top {
  width: 100%;
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: var(grey);
  height: auto;
  text-align: left;
}
th,
tr {
  border-bottom: solid 1px grey;
  font-size: 15px;
  text-align: center;
}
table {
  margin-top: 3rem;
  background: white;
}
.nav {
  align-self: flex-start;
}

.svg {
  max-width: 20px;
}
.pagNum {
  margin: 0 2px;
  font-size: 20px;
}
/* form {
  font-size: 25px;
} */
</style>
