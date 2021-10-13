<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="home in homes" :key="home.objectID" cols="3">
        <home-card :home="home" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import homes from '@/data/homes'

export default {
  data() {
    return {
      homes: homes.slice(0, 3),
    }
  },
}
</script>
