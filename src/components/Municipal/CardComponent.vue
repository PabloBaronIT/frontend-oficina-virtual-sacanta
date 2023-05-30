<template>
  <div class="card text-bg-light mb-3" style="min-width: 20rem" @click="ver">
    <div class="card-header top" @click="verTramiteDeadline(obj.id)">
      <span>
        tramite N° <strong>{{ obj.id }}</strong>
      </span>
      <br />
      <span>{{ obj.procedure }}</span>
      <br />
    </div>
    <div class="card-body medio">
      <div>
        <h6 class="card-title">
          Asunto: <strong> {{ obj.categoria }}</strong>
        </h6>
        <p class="card-text">CUIL: {{ obj.cuil.cuil }}</p>
      </div>

      <!--<a href="#" class="btn btn-primary">Ver más...</a>-->
      <div>
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Mas...
          </button>
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
    <div :style="`background:${obj.color}`" class="footer">
      <p>{{ obj.estado }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    obj: Object,
    ver: Function,
    ModalTarea: Function,
    verTramiteDeadline: Function,
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
}
.medio {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.footer {
  width: 100%;
}
</style>
