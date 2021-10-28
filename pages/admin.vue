<template>
  <v-container>
    <h1>Admin</h1>
    <nuxt-link to="/admin/homes/">Homes</nuxt-link>
    <NuxtChild />
  </v-container>
</template>

<script>
import Cookie from 'js-cookie'

export default {
  fetch() {
    const context = this.$nuxt.context
    if (!Cookie.get(context.env.auth.cookieName)) {
      context.redirect('/no-access/')
    }
  },
}
</script>
