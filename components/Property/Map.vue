<template>
  <v-container tag="section">
    <v-row>
      <v-col class="py-20">
        <h2
          class="text-color--text headline"
          style="font-size: 1.875rem !important"
        >
          Location
        </h2>
        <paragraph
          :text="`${home.location.address} ${home.location.city} ${home.location.state} ${home.location.country}`"
        />
        <client-only>
          <div ref="myMap" style="height: 34rem; width: 100%">
            <l-map :zoom="zoom" :center="center" :options="options">
              <l-tile-layer :url="url"></l-tile-layer>
              <l-marker :lat-lng="markerLatLng"></l-marker>
            </l-map>
          </div>
        </client-only>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    home: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 18,
      center: this.home._geoloc,
      markerLatLng: this.home._geoloc,
      options: {
        zoomControl: false,
      },
    }
  },
}
</script>

<style scoped></style>
