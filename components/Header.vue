<template>
  <v-app-bar app absolute>
    <v-app-bar-title class="mx-2">
      <v-img src="/images/logo.svg" class="mb-3" />
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn to="/" text>Home</v-btn>
    <v-btn text @click="toggleTheme">{{ toggleDark }}</v-btn>
    <div class="d-flex align-center mx-2">
      <v-img src="/images/icons/house.svg"></v-img>
      <div class="name">Host</div>
      <!-- <v-avatar>
        <img src="/images/user.jpg" alt="user" />
      </v-avatar> -->
      <div id="googleButton"></div>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    toggleDark() {
      return this.$vuetify.theme.isDark ? 'Light' : 'Dark'
    },
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
  },
}
</script>

<style scoped>
.name {
  margin: 0 32px 0 6px;
}
.v-avatar img {
  border-style: solid;
  border-color: blue;
}
</style>
