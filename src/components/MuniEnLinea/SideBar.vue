<template>
  <button
    class="btn btn-primary d-lg-none"
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasResponsive"
    aria-controls="offcanvasResponsive"
  >
    Toggle offcanvas
  </button>

  <div
    class="offcanvas-lg offcanvas-end sidebar"
    tabindex="-1"
    id="offcanvasResponsive"
    aria-labelledby="offcanvasResponsiveLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasResponsiveLabel">
        Responsive offcanvas
      </h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        data-bs-target="#offcanvasResponsive"
        aria-label="Close"
      ></button>
    </div>
  </div>
</template>
<script>
export default {
  name: "SideBar",
};
</script>

<style scoped>
@media (max-width: 1000px) {
  button {
    height: 30px;
    margin: 10px;
  }
}
</style>
