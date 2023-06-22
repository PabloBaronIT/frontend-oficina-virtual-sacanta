<template>
  <div class="text-bg- mb-3 container" style="min-width: 20rem">
    <!-- <div class="card-header bg-transparent border-success top"> -->
    <!-- <div @click="verTramite(obj.id)">
          <span>
            tramite N° <strong>{{ obj.id }}</strong>
          </span>
          <p class="card-title">
            <strong> {{ obj.firstname }} {{ obj.lastname }} </strong>
          </p>
          <br />
        </div> -->

    <!-- <div>
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            ></button>
            <ul class="dropdown-menu">
              <li>
                <p class="dropdown-item" @click="ModalTarea(obj.id)">Tarea</p>
              </li>

              <li>
                <p class="dropdown-item" @click="ModalComunicacion(obj.id)">
                  Comunicacion
                </p>
              </li>

              <li>
                <a class="dropdown-item" @click="ModalRequerimiento(obj.id)"
                  >Requerimiento</a
                >
              </li>
            </ul>
          </div>
        </div> -->
    <!-- </div> -->
    <!-- <div>
        <span>{{ obj.title }}</span>
      </div> -->
    <!-- <div
        class="card-footer bg- border-success"
        :style="`background:${obj.color}`"
      >
        {{ obj.estado }}
        <span v-if="Array.isArray(obj.requerimientos)"> (respondido) </span>
      </div> -->

    <div :class="`card border-${this.color} mb-3`" style="min-width: 20rem">
      <div class="card-body text-success detalles">
        <div class="card-title top">
          <span style="font-size: 13px">
            {{ obj.firstname }} {{ obj.lastname }}
          </span>
          <span style="font-size: 13px"> Tramite: {{ obj.id }} </span>
          <span :style="`background: ${obj.color}`">
            {{ obj.estado || "" }}
          </span>
        </div>

        <span>{{ obj.fecha }}</span>
        <div class="top">
          <h5 @click="verTramite(obj.id)">
            {{ obj.title }}
          </h5>
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            ></button>
            <ul class="dropdown-menu">
              <li>
                <p class="dropdown-item" @click="ModalTarea(obj.id)">Tarea</p>
              </li>

              <li>
                <p class="dropdown-item" @click="ModalComunicacion(obj.id)">
                  Comunicacion
                </p>
              </li>

              <li>
                <a class="dropdown-item" @click="ModalRequerimiento(obj.id)"
                  >Requerimiento</a
                >
              </li>
            </ul>
          </div>
        </div>

        <span>{{ obj.agenteFirstname }} {{ obj.agenteLastname }}</span>
        <div class="plazo">
          <p>
            {{ obj.plazo }}
          </p>
          <p>
            {{ obj.task === null ? "sin tareas" : `${obj.task.length} tareas` }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    obj: Object,
    ver: Function,
    ModalTarea: Function,
    verTramite: Function,
    ModalComunicacion: Function,
    ModalRequerimiento: Function,
    color: String,
  },
};
</script>

<style scoped>
.top {
  text-align: left;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  font-size: 10px;
}
.detalles {
  text-align: left;
  font-size: 13px;
}
.plazo {
  background-color: rgba(128, 128, 128, 0.377);
  color: red;
  font-size: 13px;
  align-content: center;
  justify-content: space-around;
  display: flex;
  flex-direction: row;
  padding-top: 5px;
}
h5 {
  cursor: pointer;
}
</style>
