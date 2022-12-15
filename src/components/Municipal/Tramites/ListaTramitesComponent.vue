<template>
  <main class="container">
    <ul class="responsive-table">
      <li class="table-header">
        <div class="col col-1">Tramite</div>
        <div class="col col-2">Nro. tramite</div>
        <div class="col col-3">Categoria</div>
        <div class="col col-4">Estado</div>
      </li>
      <li
        v-for="tramite in tramites"
        :key="tramite.nroTramite"
        class="table-row"
      >
        <div class="col col-1" data-label="Job Id">
          {{ tramite.descripcion }}
        </div>
        <div class="col col-2" data-label="Customer Name">
          {{ tramite.nroTramite }}
        </div>
        <div class="col col-3" data-label="Amount">{{ tramite.area }}</div>
        <div class="col col-4" data-label="Payment Status">Pending</div>
      </li>
    </ul>
  </main>
</template>
<script>
export default {
  name: "listaTramitesComponent",
  data() {
    return {
      tramites: [
        { descripcion: "Alta automotor", nroTramite: 123, area: "Automotores" },
        {
          descripcion: "Certificado vacunacion",
          nroTramite: 1232,
          area: "Sanidad",
        },
        {
          descripcion: "Habilitacion de espacio publico",
          nroTramite: 123,
          area: "Cultura",
        },
        { descripcion: "Alta automotor", nroTramite: 123, area: "Automotores" },
        {
          descripcion: "Habilitacion de espacio publico",
          nroTramite: 123,
          area: "Cultura",
        },
        { descripcion: "Alta automotor", nroTramite: 123, area: "Automotores" },
        {
          descripcion: "Habilitacion de espacio publico",
          nroTramite: 123,
          area: "Cultura",
        },
        { descripcion: "Alta automotor", nroTramite: 123, area: "Automotores" },
      ],
    };
  },
  methods: {},
};
</script>

<style scoped>
.container {
  padding-left: 10px;
  padding-right: 10px;
}

h2 {
  font-size: 26px;
  margin: 20px 0;
  text-align: center;
}

.responsive-table li {
  border-radius: 3px;
  padding: 20px 25px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
}
.table-header {
  background-color: #95a5a6;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.table-row {
  background-color: #ffffff;
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
}
.col-1 {
  flex-basis: 10%;
}
.col-2 {
  flex-basis: 40%;
}
.col-3 {
  flex-basis: 25%;
}
.col-4 {
  flex-basis: 25%;
}

@media all and (max-width: 767px) {
  .table-header {
    display: none;
  }

  li {
    display: block;
  }
  .col {
    flex-basis: 100%;
  }
  .col {
    display: flex;
    padding: 10px 0;
  }

  :before {
    color: #6c7a89;
    padding-right: 10px;
    content: attr(data-label);
    flex-basis: 50%;
    text-align: right;
  }
}
</style>
