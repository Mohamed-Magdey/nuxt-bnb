<template>
  <v-container :style="`backgroundColor: ${containerColor}`" tag="section">
    <v-row>
      <v-col
        cols="6"
        class="py-20 pr-10"
        style="border-right: 1px dashed rgba(151, 151, 151)"
      >
        <h2
          class="text-color--text headline"
          style="font-size: 1.875rem !important"
        >
          Description
        </h2>
        <paragraph :text="home.description" />
      </v-col>
      <v-col cols="6" class="py-20 pl-10" style="padding-right: 105px">
        <v-chip
          v-for="(feature, index) in home.features"
          :key="index"
          class="mr-3 mb-3"
          label
          :color="chipColor"
          large
        >
          {{ feature }}
        </v-chip>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PropertyDescription',
  props: {
    home: {
      type: Object,
      required: true,
    },
  },
  computed: {
    containerColor() {
      return this.$vuetify.theme.isDark ? '#272727;' : '#f6f8fb'
    },
    chipColor() {
      return this.$vuetify.theme.isDark ? '' : '#E3ECFF'
    },
  },
}
</script>
