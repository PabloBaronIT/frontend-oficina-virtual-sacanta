<template>
  <div class="sector-component">
    <!-- Mostrar los tramites
     correspondientes al sector seleccionado -->

    <div class="tramites" v-for="tramite in tramitesFiltered" :key="tramite.id">
      <h5 for="">{{ tramite.tramite }}</h5>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tramites: [
        {
          id: 1,
          tramite: "Carnet sanitario (primera vez)",
          sector: "Turnero Digital",
        },
        {
          id: 2,
          tramite: "Carnet sanitario - renovación (particulares)",
          sector: "Turnero Digital",
        },
        {
          id: 3,
          tramite:
            "Solicitud de turno para especialista o estudio médico en Dirección de Especialidades Médicas",
          sector: "Turnero Digital",
        },
        {
          id: 4,
          tramite:
            "Solicitud de turno para estudio médico en Medicina Preventiva",
        },
        {
          id: 4,
          tramite:
            "Solicitud de turno para estudio médico en Medicina Preventiva",
        },
      ],
    };
  },
  computed: {
    tramitesFiltered() {
      return this.tramites.filter((tramite) => {
        return tramite.sector === this.$route.params.sectorId;
      });
    },
  },
};
</script>

<style scoped>
.sector-component {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 #aaa;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid var(--blue);

  width: 70%;
}

.tramites {
  border-bottom: 1px solid var(--blue);
}
.tramites:last-child {
  border-bottom: none;
}
</style>
