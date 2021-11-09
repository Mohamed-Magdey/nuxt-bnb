<template>
  <v-app>
    <Header />
    <v-main class="mb-10">
      <Nuxt />
    </v-main>
    <Footer />
  </v-app>
</template>

<style>
::-webkit-scrollbar {
  width: 7px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 25px;
}
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 25px;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
h2 {
  margin-bottom: 2rem;
  font-weight: 500 !important;
}
.py-20 {
  padding-top: 80px !important;
  padding-bottom: 80px !important;
}
</style>
