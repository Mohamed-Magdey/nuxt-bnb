<template>
  <v-container tag="section">
    <v-row no-gutters style="height: 37.375rem">
      <v-col cols="6" style="height: 100%" class="px-2 pt-2 pb-5">
        <div
          class="item-1 rounded-l-xl"
          :style="`background-image: url(${images[0]})`"
        ></div>
      </v-col>
      <v-col cols="6">
        <v-row no-gutters style="height: 36.625rem">
          <v-col
            v-for="(image, index) in images.slice(1)"
            :key="index"
            cols="6"
            style="height: 50%"
            class="pa-2"
          >
            <div
              :style="`background-image: url(${image})`"
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
