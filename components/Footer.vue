<template>
  <v-footer app absolute padless>
    <v-row justify="center" no-gutters>
      <v-col class="py-5 text-center" cols="12">
        &copy; All rights reserved. {{ footerDate }} —
        <a
          href="https://github.com/mohamed-Magdey"
          target="_blank"
          rel="”noopener”"
        >
          <strong>Mohamed Magdey</strong>
        </a>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  computed: {
    footerDate() {
      return new Date().getFullYear()
    },
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
