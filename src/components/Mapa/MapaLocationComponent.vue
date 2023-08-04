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
        :position="center"
        :clickable="true"
        :draggable="true"
        @click="handleMapClick"
      />
    </GMapMap>
    <!-- 
    <GoogleMap
      api-key="AIzaSyCsrNj3q6jmjiavruiFIQIIR-xhWrDb6sQ"
      style="width: 40%; height: 250px"
      :center="{ lat: this.lat, lng: this.lng }"
      :zoom="15"
    >
      <Marker :options="{ lat: this.lat, lng: this.lng }" />
    </GoogleMap> -->
  </div>
</template>

<script>
// import { GoogleMap, Marker } from "vue3-google-map";
export default {
  name: "MapaLocation",
  data() {
    return {
      lat: "",
      lng: "",
      selectedLocation: null,
      center: { lat: "", lng: "" },
      markers: [
        // {
        //   position: {
        //     lat: 51.093048,
        //     lng: 6.84212,
        //   },
        // }, // Along list of clusters
      ],
    };
  },
  //   components: { GoogleMap, Marker },
  created() {
    this.$getLocation()
      .then((coordinates) => {
        console.log(coordinates);
        (this.center.lat = coordinates.lat),
          (this.center.lng = coordinates.lng);
        // let asd = {
        //   lat: coordinates.lat,
        //   lgn: coordinates.lgn,
        // };
        // this.lat = coordinates.lat;
        // this.lng = coordinates.lng;
        // this.markers.push(asd);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    handleMapClick: async (event) => {
      const latLng = event.latLng;
      console.log(latLng);

      //  let selectedLocation = {
      //   lat: latLng.lat(),
      //   lng: latLng.lng(),
      // };
      // this.center=selectedLocation
    },
  },
};
</script>
