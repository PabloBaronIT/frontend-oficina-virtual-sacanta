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
    <div class="tramites">
      <div class="card" v-for="tramite in tramitesFiltered" :key="tramite.id">
        <img :src="tramite.img" :alt="tramite.id" />
        <p>{{ tramite.tramite }}</p>
      </div>
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
  height: auto;
  background: rgb(235, 235, 235);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  padding: 10px 0;
}

.tramites {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
  padding: 0;
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

.card img {
  margin-bottom: 20px;
  border-radius: 50%;
  object-fit: cover;
  width: 100px;
}

.card {
  border-top-left-radius: 200px;
  border-top-right-radius: 200px;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  font-weight: bold;
  padding: 15px;
  border: none;
  box-shadow: 5px 5px 12px #444;
  width: 120px;
  height: 210px;
  margin: 30px 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
