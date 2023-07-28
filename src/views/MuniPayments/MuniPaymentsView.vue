<template>
  <!-- <div class="containerGeneral"> -->
  <div class="containerTramites">
    <div class="filtro-top">
      <h1>Registro de pagos</h1>
      <form class="d-flex">
        <input
          @keyup="this.validar()"
          type="text"
          placeholder="Ingrese CUIL del vecino"
          v-model="this.search"
          maxlength="11"
        />
        <button
          class="btn btn-outline-success"
          type="submit"
          @click="this.searchValue"
          :disabled="this.disabledBoton"
        >
          Buscar
        </button>
      </form>
    </div>

    <table class="table table-striped" v-if="this.payments">
      <tr>
        <th>Id Pago</th>
        <th>Monto</th>

        <th>Trámite</th>
        <th>Id tramite</th>
        <th>Fecha</th>
        <th>Nombre</th>
        <th>cuil</th>
      </tr>
      <tr v-for="item in this.payments" :key="item.id">
        <td>
          {{ item.id }}
        </td>
        <td>
          {{ item.amount }}
        </td>
        <td>
          {{ item.procedureHistory.procedure.title }}
        </td>
        <td>
          {{ item.procedureHistory.id }}
        </td>
        <td>
          {{ new Date(item.created_at).toLocaleDateString() }}
        </td>
        <td>{{ item.user.firstname }} {{ item.user.lastname }}</td>
        <td>
          {{ item.user.cuil }}
        </td>

        <!-- <td>{{ item.userMuni.firstname }}{{ item.userMuni.lastname }}</td> -->
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
      <h1>No se encontraron trámites con los filtros especificados</h1>
    </div>

    <div class="nav">
      <img
        class="svg"
        @click="backTramites"
        src="@/assets/previous.svg"
        alt=""
        v-if="this.pagina > 1"
      />
      <div class="pagNum">
        {{ this.pagina }}
      </div>

      <img
        @click="nextPag"
        class="svg"
        src="@/assets/next.svg"
        alt=""
        v-if="this.payments?.length > 10"
      />
    </div>
  </div>
  <!-- </div> -->
</template>
<script>
import axios from "axios";
import setTokenMuni from "@/middlewares/setTokenMuni";

export default {
  data() {
    return {
      payments: null,
      pagina: 1,
      search: "",
      disabledBoton: false,
      error: false,
      loading: false,
    };
  },
  created() {
    //se obtienen todos los tramites
    this.getPayments();
    this.loading = true;
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
    getPayments() {
      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get(`/registered-payments?page= ${this.pagina}`)
        .then((response) => {
          this.payments = response.data.RegisteredPayments;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.error = true;
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setTokenMuni();
              this.getPayments();
            }
          }
        });
    },
    searchValue() {
      console.log(this.search);

      this.loading = true;
      this.payments = "";
      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get(`/registered-payment?page=${this.pagina}`, {
          user_cuil: toString(this.search),
        })
        .then((response) => {
          console.log(response.data);
          this.payments = response.data.RegisteredPayment;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setTokenMuni();
              this.searchValue();
            }
          }
        });
    },
  },
};
</script>

<style scoped>
/* .containerGeneral {
  display: flex;
  flex-direction: row;
  width: 94vw;
  position: relative;
} */
.containerTramites {
  width: 90%;
  padding-bottom: 2rem;
  padding-top: 2rem;
  text-align: left;
  position: relative;
  margin: auto;
  justify-content: center;
  /* margin-left: 4rem; */
}
.filtro-top {
  width: 100%;
  color: var(--text-color);
  display: flex;
  justify-content: space-around;
  background: var(grey);
  height: 3rem;
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
</style>
