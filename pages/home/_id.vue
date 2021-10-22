<template>
  <v-container v-if="$fetchState.pending" fluid>
    Fetching mountains...
  </v-container>
  <error v-else-if="$fetchState.error" :error="$fetchState.error" />
  <v-container v-else>
    <PropertyGallery :images="home.images" />
    <PropertyDetails :home="home" />
    <PropertyDescription :home="home" />
    <PropertyMap :home="home" />
    <PropertyReviews :reviews="reviews" />
    <PropertyHost :user="user" />
  </v-container>
</template>

<script>
import Api from '@/services/Api'

export default {
  name: 'Property',
  data() {
    return {
      home: {},
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
}
</script>
