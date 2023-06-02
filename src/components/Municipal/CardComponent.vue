<template>
  <div class="text-bg- mb-3 container" style="max-width: 20rem">
    <div class="card border-success mb-3" style="max-width: 18rem">
      <div class="card-header bg-transparent border-success top">
        <div @click="verTramite(obj.id)">
          <span>
            tramite N° <strong>{{ obj.id }}</strong>
          </span>
          <br />
          <span>{{ obj.procedure }}</span>
        </div>
        <div>
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            ></button>
            <ul class="dropdown-menu">
              <!--BOTON PARA REALIZAR TAREA RELACIONADO AL TRAMITE-->
              <li>
                <p class="dropdown-item" @click="ModalTarea(obj.id)">Tarea</p>
              </li>
              <!--BOTON PARA REALIZAR COMUNICACION RELACIONADO AL TRAMITE-->

              <li>
                <p class="dropdown-item" @click="ModalComunicacion(obj.id)">
                  Comunicacion
                </p>
              </li>
              <!--BOTON PARA REALIZAR REQUERIMIENTO RELACIONADO AL TRAMITE-->

              <li>
                <a class="dropdown-item" @click="ModalRequerimiento(obj.id)"
                  >Requerimiento</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <h5 class="card-title">
          Asunto: <strong> {{ obj.categoria }}</strong>
        </h5>
        <p class="card-text">CUIL: {{ obj.cuil.cuil }}</p>
      </div>
      <div
        class="card-footer bg- border-success"
        :style="`background:${obj.color}`"
      >
        {{ obj.estado }}
        <span v-if="Array.isArray(obj.requerimientos)"> (respondido) </span>
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
