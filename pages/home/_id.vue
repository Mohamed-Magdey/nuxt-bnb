<template>
  <v-container v-if="$fetchState.pending" fluid>
    Fetching mountains...
  </v-container>
  <error v-else-if="$fetchState.error" :error="$fetchState.error" />
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
    <div v-for="review in reviews" :key="review.objectID">
      <v-img
        :src="review.reviewer.image"
        :alt="review.reviewer.name"
        max-width="100"
        max-height="100"
      ></v-img>
      {{ review.reviewer.name }}<br />
      {{ formatDate(review.date) }}<br />
      <short-text :text="review.comment" :target="150" /><br />
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
      reviews: [],
    }
  },
  async fetch() {
    try {
      const homeResponse = await Api.getHome(this.$nuxt.context.params.id)
      this.home = homeResponse.data
      this.center = this.home._geoloc
      this.markerLatLng = this.home._geoloc

      const reviewResponse = await Api.getReviewsByHomeId(
        this.$nuxt.context.params.id
      )
      this.reviews = reviewResponse.data.hits
    } catch (e) {
      const err = {
        statusCode: e.response?.status || 500,
        message: e.response?.statusText || 'Internal Server Error',
        status: e.response?.status || 500,
      }
      this.$nuxt.context.error(err)
      throw err
    }
  },
  head() {
    return {
      title: this.home.title,
    }
  },
  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr)
      return date.toLocaleString(undefined, {
        month: 'long',
        year: 'numeric',
      })
    },
  },
}
</script>

<style></style>
