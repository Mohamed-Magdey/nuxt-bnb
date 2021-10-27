<template>
  <v-container>
    Admin
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
