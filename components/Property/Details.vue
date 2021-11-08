<template>
  <v-container tag="section">
    <v-row class="mt-10">
      <v-col
        md="6"
        cols="12"
        class="pr-10"
        :style="
          $vuetify.breakpoint.smAndDown ||
          'border-right: 1px dashed rgba(151, 151, 151)'
        "
      >
        <h1 class="text-color--text mb-5">{{ home.title }}</h1>
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
        <div class="details-footer text-color--text mt-12 py-10">
          {{ pluralize(home.guests, 'guest') }} &middot;
          {{ pluralize(home.bedrooms, 'room') }} &middot;
          {{ pluralize(home.beds, 'bed') }} &middot;
          {{ pluralize(home.bathrooms, 'bath') }}
        </div>
      </v-col>
      <v-col md="5" cols="12" class="pl-10">
        <div class="price">${{ home.pricePerNight }}<span> / night</span></div>
        <client-only>
          <date-picker
            v-model="range"
            is-range
            :is-dark="$vuetify.theme.isDark"
            timezone="UTC"
            :model-config="{ timeAdjust: '00:00:00' }"
          >
            <template #default="{ inputValue, inputEvents }">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    outlined
                    dense
                    :value="inputValue.start"
                    label="Check In"
                    v-on="inputEvents.start"
                  >
                    <template #append>
                      <v-icon
                        :value="inputValue.start"
                        color="primary"
                        v-on="inputEvents.start"
                        >mdi-calendar-month</v-icon
                      >
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    outlined
                    dense
                    :value="inputValue.end"
                    label="Check Out"
                    v-on="inputEvents.end"
                  >
                    <template #append>
                      <v-icon
                        :value="inputValue.end"
                        color="primary"
                        v-on="inputEvents.end"
                        >mdi-calendar-month</v-icon
                      >
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
            </template>
          </date-picker>
        </client-only>
        <v-btn color="primary" block x-large @click="checkout"
          >Request to book!</v-btn
        >
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
      range: {
        start: null,
        end: null,
      },
    }
  },
  mounted() {
    if (this.$route.query.result === 'success') {
      alert('Success')
    }
  },
  methods: {
    pluralize,
    checkout() {
      if (!this.range.start) {
        alert('Please select start & end date.')
        return
      }
      if (!this.$store.state.auth.isLoggedIn) {
        alert('You must sign in to book your night(s).')
        return
      }

      const start = this.range.start.getTime() / 1000
      const end = this.range.end.getTime() / 1000

      this.$stripe.checkout(this.home.objectID, start, end)
    },
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
</style>
