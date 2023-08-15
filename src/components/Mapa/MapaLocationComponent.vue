<template>
  <div
    style="display: flex; flex-direction: column; justify-content: space-around"
  >
    <p>Indique la direccion en el mapa:</p>

    <GMapMap
      :center="center"
      ref="myMapRef"
      :zoom="7"
      map-type-id="terrain"
      style="width: 400px; height: 300px"
    >
      <GMapMarker
        :position="this.markerPosition"
        :clickable="false"
        :draggable="true"
        @dragend="updateMarkerPosition"
      />
    </GMapMap>
  </div>
</template>

<script>
// import { GoogleMap, Marker } from "vue3-google-map";
export default {
  name: "MapaLocation",
  props: {
    setTextInput: Function,
  },
  data() {
    return {
      lat: "",
      lng: "",
      selectedLocation: null,
      center: { lat: "", lng: "" },
      markerPosition: { lat: 0, lng: 0 },
      updateMarkerPosition: (event) => {
        // console.log(event.latLng.lat(), event.latLng.lng());
        this.markerPosition.lat = event.latLng.lat();
        this.markerPosition.lng = event.latLng.lng();
        console.log(this.markerPosition.lat?.toFixed(7));
        console.log(this.markerPosition.lng?.toFixed(7));
      },
    };
  },
  //   components: { GoogleMap, Marker },
  created() {
    this.$getLocation()
      .then((coordinates) => {
        console.log(coordinates, "coordiantes");
        (this.center.lat = coordinates.lat),
          (this.center.lng = coordinates.lng);
        this.markerPosition.lat = coordinates.lat;
        this.markerPosition.lng = coordinates.lng;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {},
};
</script>
