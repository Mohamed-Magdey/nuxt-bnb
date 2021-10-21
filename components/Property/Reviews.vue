<template>
  <v-container>
    <v-row class="py-20">
      <v-col v-for="review in reviews" :key="review.objectID" cols="12" md="6">
        <v-card>
          <v-card-title>
            <v-avatar size="100" class="mr-2">
              <v-img :src="review.reviewer.image" :alt="review.reviewer.name" />
            </v-avatar>
            <div class="d-flex flex-column">
              <p class="text-color--text" style="font-size: 1.25rem">
                {{ review.reviewer.name }}
              </p>
              <p style="color: #88a2d2; font-size: 0.875rem">
                {{ formatDate(review.date) }}
              </p>
            </div>
          </v-card-title>
          <v-card-text>
            <short-text :text="review.comment" :target="150" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import formatDate from '~/utils/formatDate'

export default {
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
  methods: {
    formatDate,
  },
}
</script>

<style>
.v-application p {
  margin: 0;
  font-weight: 500;
}
</style>
