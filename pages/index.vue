<template>
  <v-container v-if="$fetchState.pending" fluid>
    Fetching mountains...
  </v-container>
  <error v-else-if="$fetchState.error" :error="$fetchState.error" />
  <v-container v-else>
    <v-row tag="section" class="my-5">
      <v-col>
        <div class="gallery rounded-xl d-flex align-end justify-center">
          <h2 class="mx-6">
            - Settle in somewhere new. Discover stays to live, work, or just
            relax.
          </h2>
        </div>
      </v-col>
    </v-row>
    <v-row
      tag="section"
      :style="`backgroundColor: ${CardsColor}`"
      class="py-20"
    >
      <v-col>
        <h2 class="text-color--text">Recently Added</h2>
        <v-row class="justify-space-between">
          <v-col v-for="home in homes" :key="home.objectID" cols="12" sm="3">
            <nuxt-link :to="`/home/${home.objectID}`" prefetch>
              <home-card :home="home" />
            </nuxt-link>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Api from '@/services/Api'
import handleError from '@/utils/handleError'

export default {
  data() {
    return {
      homes: [],
    }
  },
  async fetch() {
    try {
      const response = await Api.getHomes()
      this.homes = response.data.hits
    } catch (e) {
      handleError(e, this)
    }
  },
  head() {
    return {
      title: 'Homepage',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'This is a homepage',
        },
      ],
    }
  },
  computed: {
    CardsColor() {
      return this.$vuetify.theme.isDark ? '#272727;' : '#f6f8fb'
    },
  },
}
</script>

<style scoped>
.gallery {
  background-image: url('/images/beach.jpg');
  background-size: cover;
  height: 37rem;
}

h2 {
  font-weight: 700 !important;
  font-size: 1.875rem;
}

.gallery h2 {
  color: #fff;
}

a {
  text-decoration: none;
}
</style>
