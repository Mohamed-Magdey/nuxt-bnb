<template>
  <v-container v-if="$fetchState.pending" fluid>
    Fetching mountains...
  </v-container>
  <v-container v-else-if="$fetchState.error" fluid>
    <error :error="$fetchState.error" />
  </v-container>
  <v-container v-else fluid>
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
import Api from '@/services/Api'

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
  async fetch() {
    try {
      await Api.getHome(this.$nuxt.context.params.id)
        .then((res) => {
          this.home = res.data
          this.center = this.home._geoloc
          this.markerLatLng = this.home._geoloc
        })
        .catch((e) => {
          throw e
        })
    } catch (e) {
      const err = {
        statusCode: e.response?.status || 500,
        message: e.response?.statusText || 'Internal Server Error',
        status: e.response?.status || 500,
      }
      throw err
    }
  },
  head() {
    return {
      title: this.home.title,
    }
  },
}
</script>

<style></style>
