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
        <div class="descripcion">
          <img src="@/assets/tramite-logo.svg" :alt="tramite.id" />
          <p>{{ tramite.tramite }}</p>
        </div>
        <a href="">Ver requisitos</a>
        <input type="button" value="Iniciar tramite" />
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
  width: 80vw;
  height: 100vh;
  background: rgb(235, 235, 235);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  padding: 10px 0;
}

.descripcion {
  display: flex;
}

.tramites {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
  padding: 0;
}
.tramites input {
  width: 100%;
  border: none;
  border-radius: 10px;
  background: var(--red);
  font-size: 0.9em;
  color: var(--text-color);
  transition: all 0.5s ease;
}

.tramites a {
  color: var(--blue);
  font-size: 0.9em;
  text-decoration: none;
}
.tramites a:hover {
  color: var(--red);
  font-size: 0.9em;
  text-decoration: none;
}

.tramites input:hover {
  background: var(--blue);
  color: var(--red);
}

img {
  max-width: 30px;
  align-self: center;
}

h1 {
  color: var(--red);
}

.card {
  font-weight: bold;
  padding: 15px;
  border: none;
  box-shadow: 5px 5px 12px #444;
  width: 220px;
  height: 220px;
  margin: 30px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
