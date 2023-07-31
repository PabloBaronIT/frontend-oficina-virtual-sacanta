<template>
  <div class="container">
    <p>fuera de plazo</p>
    <CardComponentVue
      v-for="item in activos"
      :key="item.id"
      :obj="item"
      :ver="ver"
    />
  </div>
</template>
<script>
import axios from "axios";
import CardComponentVue from "../CardComponent.vue";
import { PASSWORD_HEADER, BASE_URL } from "@/env";

export default {
  name: "procedureDeadlineComponent",
  components: {
    CardComponentVue,
  },

  data() {
    return {
      procedures: null,
      activos: [],
    };
  },
  created() {
    this.getProceduresDeadline();
  },
  methods: {
    getProceduresDeadline() {
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get("/oficina/procedures/history/deadline/2")
        .then((response) => {
          console.log(
            response.data.ProceduresFiltered,
            "soy los tramites fuer ade plazo"
          );
          let h = response.data.ProceduresFiltered;

          this.procedures = response.data.ProceduresFiltered;
          for (let i = 0; i < h.length; i++) {
            //Procedure
            let p = {
              id: null,
              cuil: "",
              categoria: "",
              estado: "",
              procedure: "",
              requerimientos: null,
            };
            //Carga del procedure
            p.id = h[i].id;
            p.cuil = h[i].user;
            p.categoria = h[i].category.title;
            p.estado = h[i].status.status;
            p.procedure = h[i].procedure.title;
            p.requerimientos = Array.isArray(h[i].requirementHistory)
              ? h[i].requirementHistory
              : null;

            switch (p.estado) {
              case "PRESENTADO":
                p.color = "var(--green)";
                break;
              case "PAUSADO POR REQUERIMIENTO":
                p.color = "var(--red)";
                break;
              case "EN PROCESO":
                p.color = "var(--yellow)";
                break;
              case "FINALIZADO":
                p.color = "var(--lblue)";
                break;

              default:
                break;
            }

            this.activos.push(p);
          }
        });
    },
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 30vw;
  background-color: bisque;
}
</style>
