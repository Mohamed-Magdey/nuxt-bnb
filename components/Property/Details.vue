<template>
  <v-container tag="section">
    <v-row class="mt-10">
      <v-col
        cols="6"
        class="pr-10"
        style="border-right: 1px dashed rgba(151, 151, 151)"
      >
        <h1 class="text-color mb-5">{{ home.title }}</h1>
        <div class="details d-flex justify-space-between align-center">
          <div class="address">
            <v-icon color="blue">mdi-map-marker-outline</v-icon>
            <p>
              {{ home.location.address }} {{ home.location.city }}
              {{ home.location.state }} {{ home.location.country }}
            </p>
          </div>
          <div class="rating">
            <v-icon color="orange">mdi-star</v-icon>
            {{ home.reviewValue }} <span>({{ home.reviewCount }})</span>
          </div>
        </div>
        <div class="details-footer text-color mt-12 py-10">
          {{ pluralize(home.guests, 'guest') }} &middot;
          {{ pluralize(home.bedrooms, 'room') }} &middot;
          {{ pluralize(home.beds, 'bed') }} &middot;
          {{ pluralize(home.bathrooms, 'bath') }}
        </div>
      </v-col>
      <v-col cols="5" class="pl-10">
        <div class="price">${{ home.pricePerNight }}<span> / night</span></div>
        <div class="search d-flex justify-space-between">
          <date-picker :menu="menu1" :check="checkIn" label="Check in" />
          <v-spacer></v-spacer>
          <date-picker :menu="menu2" :check="checkOut" label="Check out" />
        </div>
        <v-btn color="primary" block x-large>Request to book!</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import pluralize from '@/utils/pluralize'

export default {
  name: 'PropertyDetails',
  props: {
    home: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      menu1: false,
      checkIn: '',
      menu2: false,
      checkOut: '',
    }
  },
  methods: {
    pluralize,
  },
}
</script>

<style scoped>
.address p {
  color: #367cff;
  text-decoration: underline;
  display: inline-block;
  margin-bottom: 0;
}
.rating > span {
  color: #88a2d2;
}
.details-footer {
  border-top: 1px dashed rgba(151, 151, 151);
  font-weight: 500;
}
.price {
  color: #367cff;
  font-size: 50px;
  line-height: 1;
  margin-bottom: 40px;
  font-weight: 500;
}
.price > span {
  color: #88a2d2;
  font-weight: 400;
  font-size: 30px;
}
.mdi-calendar {
  color: blue;
}
</style>
