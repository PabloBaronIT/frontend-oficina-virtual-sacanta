<template>
  <div class="text-bg- mb-3 container" style="max-width: 20rem">
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

    <div class="card border-success mb-3" style="min-width: 20rem">
      <div class="card-body text-success">
        <p class="card-title">
          {{ obj.firstname }} {{ obj.lastname }} -Nº:{{ obj.id }}
        </p>

        <p class="card-text">
          Some quick example text to build on the card title and make up the
        </p>
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
  },
};
</script>

<style scoped>
.top {
  text-align: left;
  height: 70px;
  justify-content: space-between;
  cursor: pointer;
  display: flex;
  flex-direction: row;
}
</style>
