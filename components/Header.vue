<template>
  <v-app-bar app absolute>
    <v-app-bar-title class="mx-2">
      <nuxt-link to="/">
        <v-img src="/images/logo.svg" width="180" alt="logo" class="mb-3" />
      </nuxt-link>
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn to="/" text>Home</v-btn>
    <v-btn text @click="toggleTheme">{{ toggleDark }}</v-btn>
    <div class="d-flex align-center mx-2">
      <template v-if="isLoggedIn">
        <v-img src="/images/icons/house.svg"></v-img>
        <nuxt-link to="/admin" class="name" :style="`color: #${userColor}`">
          {{ user.fullName }}
        </nuxt-link>
        <v-avatar>
          <img :src="user.profileUrl" :alt="user.fullName" />
        </v-avatar>
      </template>
      <div v-show="!isLoggedIn" id="googleButton"></div>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    toggleDark() {
      return this.$vuetify.theme.isDark ? 'Light' : 'Dark'
    },
    user() {
      return this.$store.state.auth.user
    },
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn
    },
    userColor() {
      return this.$vuetify.theme.isDark ? 'FFFFFF' : '000000DE'
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
  text-decoration: none;
}
.name:hover {
  text-decoration: underline;
}
.v-avatar img {
  border-style: solid;
  border-color: blue;
}
</style>
