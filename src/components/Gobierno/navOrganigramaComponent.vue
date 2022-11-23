<template>
  <!-- Sidebar -->
  <div class="nav-container">
    <div class="accordion accordion-flush" id="accordionFlushExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingOne">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseOne"
            aria-expanded="false"
            aria-controls="flush-collapseOne"
          >
            Accordion Item #1
          </button>
        </h2>
        <div
          id="flush-collapseOne"
          class="accordion-collapse collapse"
          aria-labelledby="flush-headingOne"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body">
            <ul>
              <li>Opcion 1 Opcion 1 Opcion 1</li>
              <li>Opcion 1 Opcion 1 Opcion 1</li>
              <li>Opcion 1 Opcion 1 Opcion 1</li>
              <li>Opcion 1 Opcion 1 Opcion 1</li>
              <li>Opcion 1 Opcion 1 Opcion 1</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingTwo">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseTwo"
            aria-expanded="false"
            aria-controls="flush-collapseTwo"
          >
            Accordion Item #2
          </button>
        </h2>
        <div
          id="flush-collapseTwo"
          class="accordion-collapse collapse"
          aria-labelledby="flush-headingTwo"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body">
            <ul>
              <li>Opcion 1 Opcion 1 Opcion 1</li>
              <li>Opcion 1 Opcion 1 Opcion 1</li>
              <li>Opcion 1 Opcion 1 Opcion 1</li>
              <li>Opcion 1 Opcion 1 Opcion 1</li>
              <li>Opcion 1 Opcion 1 Opcion 1</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingThree">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseThree"
            aria-expanded="false"
            aria-controls="flush-collapseThree"
          >
            Accordion Item #3
          </button>
        </h2>
        <div
          id="flush-collapseThree"
          class="accordion-collapse collapse"
          aria-labelledby="flush-headingThree"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body">
            <ul>
              <li>Opcion 1 Opcion 1 Opcion 1</li>
              <li>Opcion 1 Opcion 1 Opcion 1</li>
              <li>Opcion 1 Opcion 1 Opcion 1</li>
              <li>Opcion 1 Opcion 1 Opcion 1</li>
              <li>Opcion 1 Opcion 1 Opcion 1</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "navOrganigramaComponent",
  props: {},
};
</script>

<style scoped>
.nav-container {
  border-radius: 10px;
  width: 15%;
  height: 200px;
  margin: 5% 3%;
}

.accordion {
  width: 100%;
  height: 200px;
}

/* CSS */
</style>
