<template>
  <v-app>
    <v-container fluid class="d-flex flex-column align-center">
      <h1 v-if="error.statusCode === 404">
        {{ pageNotFound }}
      </h1>
      <h1 v-else>{{ error.statusCode }} {{ otherError }}</h1>
      <NuxtLink to="/"> Home page </NuxtLink>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'Error',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: this.error.message,
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
