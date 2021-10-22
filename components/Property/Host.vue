<template>
  <v-container :style="`backgroundColor: ${containerColor}`" tag="section">
    <v-row>
      <v-col class="py-20 mx-5">
        <div class="d-flex mb-10">
          <v-img
            :src="user.image"
            :alt="user.name"
            max-width="100"
            max-height="100"
            class="rounded-lg mr-5"
          ></v-img>
          <div>
            <p class="text-color--text" style="font-size: 1.25rem">
              {{ user.name }}
            </p>
            <p style="color: #88a2d2; font-size: 0.875rem" class="mb-5">
              Joined in {{ formatDate(user.joined) }}
            </p>
            <div class="text-color--text" style="font-size: 1.25rem">
              <v-icon size="30" color="primary">mdi-star-outline</v-icon>
              {{ pluralize(user.reviewCount, 'review') }}
            </div>
          </div>
        </div>
        <div>
          <BaseParagraph :text="user.description" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import formatDate from '@/utils/formatDate'
import pluralize from '@/utils/pluralize'

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    containerColor() {
      return this.$vuetify.theme.isDark ? '#272727;' : '#f6f8fb'
    },
  },
  methods: {
    formatDate,
    pluralize,
  },
}
</script>

<style scoped>
.v-application p {
  margin: 0;
  font-weight: 500;
}
</style>
