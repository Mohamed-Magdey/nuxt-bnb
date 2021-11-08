<template>
  <v-container tag="section">
    <v-carousel v-if="$vuetify.breakpoint.smAndDown">
      <v-carousel-item
        v-for="publicId in images"
        :key="publicId"
        :src="getImageUrl(publicId)"
      >
      </v-carousel-item>
    </v-carousel>
    <v-row v-else no-gutters style="height: 37.375rem">
      <v-col cols="6" style="height: 100%" class="px-2 pt-2 pb-5">
        <div
          class="item-1 rounded-l-xl"
          :style="`background-image: url(${getImageUrl(images[0])})`"
        ></div>
      </v-col>
      <v-col cols="6">
        <v-row no-gutters style="height: 36.625rem">
          <v-col
            v-for="(publicId, index) in images.slice(1)"
            :key="publicId"
            cols="6"
            style="height: 50%"
            class="pa-2"
          >
            <div
              :style="`background-image: url(${getImageUrl(publicId)})`"
              class="items"
              :class="[
                index === 1 && 'rounded-tr-xl',
                index === 3 && 'rounded-br-xl',
              ]"
            ></div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PropertyGallery',
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getImageUrl(publicId) {
      return this.$img(
        publicId,
        {
          width: 600,
        },
        {
          provider: 'cloudinary',
        }
      )
    },
  },
}
</script>

<style scoped>
.item-1,
.items {
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
