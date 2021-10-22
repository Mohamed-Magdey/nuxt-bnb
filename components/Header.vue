<template>
  <v-app-bar app absolute>
    <v-app-bar-title class="mx-2">
      <v-img src="/images/logo.svg" class="mb-3" />
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn to="/" text>Home</v-btn>
    <v-btn text @click="toggleTheme">{{ toggleDark }}</v-btn>
    <div class="d-flex align-center mx-2">
      <template v-if="isLoggedIn">
        <v-img src="/images/icons/house.svg"></v-img>
        <div class="name">{{ user.fullName }}</div>
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
