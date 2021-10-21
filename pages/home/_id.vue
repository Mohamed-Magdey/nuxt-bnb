<template>
  <v-container v-if="$fetchState.pending" fluid>
    Fetching mountains...
  </v-container>
  <error v-else-if="$fetchState.error" :error="$fetchState.error" />
  <v-container v-else>
    <PropertyGallery :images="home.images" />
    <PropertyDetails :home="home" />
    <PropertyDescription :home="home" />

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
    <v-img
      :src="user.image"
      :alt="user.name"
      max-width="100"
      max-height="100"
    ></v-img>
    {{ user.name }}<br />
    {{ formatDate(user.joined) }}<br />
    {{ user.reviewCount }}<br />
    {{ user.description }}
  </v-container>
</template>

<script>
import Api from '@/services/Api'

export default {
  name: 'Property',
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
      user: {},
    }
  },
  async fetch() {
    try {
      const responses = await Promise.all([
        Api.getHome(this.$nuxt.context.params.id),
        Api.getReviewsByHomeId(this.$nuxt.context.params.id),
        Api.getUserByHomeId(this.$nuxt.context.params.id),
      ])

      this.home = responses[0].data
      this.center = this.home._geoloc
      this.markerLatLng = this.home._geoloc
      this.reviews = responses[1].data.hits
      this.user = responses[2].data.hits[0]
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
