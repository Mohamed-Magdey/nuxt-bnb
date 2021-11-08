<template>
  <v-card max-width="360" min-width="360" elevation="6">
    <nuxt-img
      :src="home.images[0]"
      :alt="home.title"
      width="360"
      height="175"
      provider="cloudinary"
    />
    <div class="rating">
      <v-icon color="orange" size="20">mdi-star</v-icon>
      {{ home.reviewValue }} <span>({{ home.reviewCount }})</span>
    </div>
    <v-card-title class="py-2 px-5">{{ home.title }}</v-card-title>
    <div class="price px-5 py-2">
      ${{ home.pricePerNight }}<span> / night</span>
    </div>
    <div class="card-footer pa-5">
      <img src="/images/icons/house-blue.svg" alt="home-icon" width="16" />
      <v-spacer />
      <v-icon color="indigo" size="20">mdi-account-multiple</v-icon>
      {{ home.guests }} guests
    </div>
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
<style scoped>
.rating {
  padding: 20px 20px 0;
  font-size: 0.875rem;
}
.price,
.rating {
  font-weight: 500;
}
span {
  color: #88a2d2;
}
.card-footer {
  display: flex;
  font-size: 0.875rem;
}
</style>
