<template>
  <v-card elevation="0" rounded="0">
    <v-img
      lazy-src="https://picsum.photos/id/11/100/60"
      max-width="300"
      max-height="200"
      :src="home.images[0]"
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
