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
        <v-row justify="center">
          <v-menu bottom min-width="200px" rounded offset-y>
            <template #activator="{ on }">
              <v-btn icon x-large v-on="on">
                <v-avatar>
                  <img :src="user.profileUrl" :alt="user.fullName" />
                </v-avatar>
              </v-btn>
            </template>
            <v-card>
              <v-list-item-content class="justify-center">
                <div class="mx-auto text-center">
                  <v-avatar>
                    <img :src="user.profileUrl" :alt="user.fullName" />
                  </v-avatar>
                  <h3>
                    <nuxt-link
                      to="/admin"
                      class="name"
                      :style="`color: #${userColor}`"
                    >
                      {{ user.fullName }}
                    </nuxt-link>
                  </h3>
                  <v-divider class="my-3"></v-divider>
                  <v-btn depressed to="/admin" text> Admin </v-btn>
                  <v-divider class="my-3"></v-divider>
                  <v-btn text @click="signout"> Signout </v-btn>
                </div>
              </v-list-item-content>
            </v-card>
          </v-menu>
        </v-row>
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
    signout() {
      this.$nuxt.$auth.signOut()
      this.$router.push({
        name: 'index',
      })
    },
  },
}
</script>

<style scoped>
.name {
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
