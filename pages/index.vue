<template>
  <v-container v-if="$fetchState.pending" fluid>
    Fetching mountains...
  </v-container>
  <error v-else-if="$fetchState.error" :error="$fetchState.error" />
  <v-container v-else fluid>
    <v-row>
      <v-col v-for="home in homes" :key="home.objectID" cols="3">
        <nuxt-link :to="`/home/${home.objectID}`" prefetch>
          <home-card :home="home" />
        </nuxt-link>
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
}
</script>
