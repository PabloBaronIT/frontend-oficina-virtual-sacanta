<template>
  <div class="sector-component">
    <!-- Mostrar los tramites
     correspondientes al sector seleccionado -->
    <header>
      <h1>
        <img @click="back()" src="@/assets/back-arrow.svg" alt="Volver" />
        {{ this.$route.params.sectorId }}
      </h1>
    </header>
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
          sector: "Boletín Electronico",
        },
        {
          id: 5,
          tramite:
            "Solicitud de turno para estudio médico en Medicina Preventiva",
          sector: "App Ciudadana",
        },
      ],
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
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
  width: 100%;
  height: 100vh;
  background: rgb(235, 235, 235);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;

  padding: 10px;
}

.tramites {
  border-bottom: 1px solid var(--red);
}
.tramites:last-child {
  border-bottom: none;
}

img {
  max-width: 30px;
  margin-right: 20px;
}

h1 {
  color: var(--red);
}
</style>
