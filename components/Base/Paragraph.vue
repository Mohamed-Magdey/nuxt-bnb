<template>
  <p :style="`color: ${paragarphColor}`">{{ text }}</p>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  computed: {
    paragarphColor() {
      return this.$vuetify.theme.isDark ? 'rgba(255,255,255,0.9)' : '#494e61'
    },
  },
}
</script>

<style scoped>
h2 + p {
  font-size: 1.125rem;
  margin: 0;
}
</style>
