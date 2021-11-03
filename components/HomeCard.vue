<template>
  <v-card elevation="0" rounded="0">
    <nuxt-img
      :src="home.images[0]"
      :alt="home.title"
      width="300"
      height="200"
      provider="cloudinary"
    /><br />
    {{ home.title }}<br />
    {{ home.location.address }} {{ home.location.city }} {{ home.location.state
    }}<br />
    {{ home.guests }} guests<br />
    {{ home.pricePerNight }} / night
  </v-card>
</template>

<script>
export default {
  props: {
    home: {
      type: Object,
      required: true,
    },
  },
}
</script>
