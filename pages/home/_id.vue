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
import handleError from '@/utils/handleError'

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
      handleError(e, this)
    }
  },
  head() {
    return {
      title: this.home.title,
      meta: [
        { hid: 'og-type', property: 'og:type', content: 'website' },
        { hid: 'og-title', property: 'og:title', content: this.home.title },
        {
          hid: 'og-desc',
          property: 'og:description',
          content: this.home.description,
        },
        {
          hid: 'og-image',
          property: 'og:image',
          content: this.$img(
            this.home.images[0],
            { width: 1200 },
            { provider: 'cloudinary' }
          ),
        },
        {
          hid: 'og-url',
          property: 'og:url',
          content: `${process.env.rootUrl}/home/${this.home.objectID}`,
        },
      ],
    }
  },
}
</script>
