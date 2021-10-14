<template>
  <v-container fluid>
    <v-row>
      <v-col class="d-flex">
        <v-img
          v-for="image in home.images"
          :key="image"
          lazy-src="https://picsum.photos/id/11/100/60"
          max-width="250"
          max-height="200"
          :src="image"
          :alt="home.title"
        >
          <template #placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
    <div>
      {{ home.title }}<br />
      ${{ home.pricePerNight }} / night<br />
      <img src="/images/marker.svg" width="20" height="20" />{{
        home.location.address
      }}
      {{ home.location.city }} {{ home.location.state }}
      {{ home.location.country }}<br />
      <img src="/images/star.svg" width="20" height="20" />{{ home.reviewValue
      }}<br />
      {{ home.guests }} guests, {{ home.bedrooms }} rooms, {{ home.beds }} beds,
      {{ home.bathrooms }} bath<br />
      {{ home.description }}
    </div>
    <div ref="myMap" style="height: 800px; width: 800px">
      <client-only>
        <l-map :zoom="zoom" :center="center" :options="options">
          <l-tile-layer :url="url"></l-tile-layer>
          <l-marker :lat-lng="markerLatLng"></l-marker>
        </l-map>
      </client-only>
    </div>
  </v-container>
</template>

<script>
import homes from '@/data/homes'

export default {
  data() {
    return {
      home: {},
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 18,
      center: {},
      markerLatLng: {},
      options: {
        zoomControl: false,
      },
    }
  },
  head() {
    return {
      title: this.home.title,
    }
  },
  mounted() {
    this.center = this.home._geoloc
    this.markerLatLng = this.home._geoloc
  },
  created() {
    const home = homes.find((home) => home.objectID === this.$route.params.id)
    this.home = home
  },
}
</script>

<style></style>
