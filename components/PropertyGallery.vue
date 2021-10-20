<template>
  <v-row class="masonry-container">
    <v-col
      cols="12"
      md="5"
      class="item-1"
      :style="`background-image: url(${images[0]})`"
    >
    </v-col>
    <v-col cols="12" md="6" style="padding: 0">
      <v-row no-gutters style="height: 458px">
        <v-col
          v-for="(image, inedx) in images.slice(1)"
          :key="inedx"
          :style="`background-image: url(${image})`"
          class="items"
          cols="12"
          md="5"
        >
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
.masonry-container {
  width: 70%;
  height: 470px;
  margin: 24px auto;
}
@media screen and (max-width: 1264px) {
  .masonry-container {
    width: 100%;
  }
}
.item-1,
.items {
  height: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 0;
  margin: 0 12px 12px 0;
}
.item-1 {
  height: 100%;
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
}
.items:nth-child(2) {
  border-top-right-radius: 18px;
}
.items:nth-child(4) {
  border-bottom-right-radius: 18px;
}
</style>
