<template>
  <span>
    <v-icon size="30" color="primary">mdi-format-quote-open</v-icon>
    {{ displayText }}
    <button
      v-if="isTooLong && !isExpanded"
      type="button"
      class="link"
      :style="`color: ${linkColor}`"
      @click="isExpanded = true"
    >
      read more
    </button>
    <button
      v-if="isTooLong && isExpanded"
      type="button"
      class="link"
      :style="`color: ${linkColor}`"
      @click="isExpanded = false"
    >
      read less
    </button>
  </span>
</template>

<script>
export default {
  name: 'ReadMore',
  props: {
    text: {
      type: String,
      required: true,
    },
    target: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isExpanded: false,
      chunks: [],
    }
  },
  computed: {
    isTooLong() {
      return this.chunks.length === 2
    },
    displayText() {
      if (!this.isTooLong || this.isExpanded) {
        return this.chunks.join(' ')
      }
      return this.chunks[0] + '...'
    },
    linkColor() {
      return this.$vuetify.theme.isDark ? '#0091EA' : '#4b4bff'
    },
  },
  created() {
    this.chunks = this.getChunks()
  },
  methods: {
    getChunks() {
      const position = this.text.indexOf(' ', this.target)
      if (this.text.length <= this.target || position === -1) {
        return [this.text]
      }
      return [this.text.substring(0, position), this.text.substring(position)]
    },
  },
}
</script>

<style scoped>
.link {
  text-decoration: underline;
}
.link:focus {
  border: none;
  outline: none;
}
</style>
