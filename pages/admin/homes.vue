<template>
  <v-container>
    <p v-for="hom in homeList" :key="hom.objectID">
      {{ hom.title }}:
      <v-btn
        color="secondary"
        :style="`backgroundColor: ${deleteColor} !important`"
        small
        depressed
        @click="deleteHome(hom.objectID)"
      >
        Delete
      </v-btn>
    </p>
    <h2>Add a Home</h2>
    <v-form @submit.prevent="onSubmit">
      <ImageUploader
        v-for="index in 5"
        :key="index"
        @file-uploaded="imageUpdated($event, index)"
      />
      <v-text-field v-model="home.title" label="Title" type="text" />
      <v-textarea v-model="home.description" label="Description" outlined />
      <v-textarea v-model="home.note" label="Note " outlined />
      <v-text-field
        v-for="(feature, index) in home.features"
        :key="index + 10"
        v-model="home.features[index]"
        type="text"
        label="Feature"
      />
      <v-text-field
        v-model="home.pricePerNight"
        type="number"
        label="Price Per Night"
      />
      <v-text-field v-model="home.guests" type="number" label="Guests" />
      <v-text-field v-model="home.bedrooms" type="number" label="bedrooms" />
      <v-text-field v-model="home.beds" type="number" label="Beds" />
      <v-text-field v-model="home.bathrooms" type="number" label="Bathrooms" />
      <v-autocomplete
        :items="entries"
        :loading="isLoading"
        :search-input.sync="search"
        item-text="Description"
        item-value="API"
        label="Location"
        placeholder="Select a location"
        hide-no-data
        hide-selected
        return-object
        @change="changed"
      ></v-autocomplete>
      <v-text-field
        v-model="home.location.address"
        type="text"
        label="Address"
      />
      <v-text-field v-model="home.location.city" type="text" label="City" />
      <v-text-field v-model="home.location.state" type="text" label="State" />
      <v-text-field
        v-model="home.location.postalCode"
        type="text"
        label="Postal Code"
      />
      <v-text-field
        v-model="home.location.country"
        type="text"
        label="Country"
      />
      <date-picker
        v-for="(range, index) in home.availabilityRanges"
        :key="index + 100"
        v-model="home.availabilityRanges[index]"
        is-range
        :is-dark="$vuetify.theme.isDark"
        timezone="UTC"
        :model-config="{ timeAdjust: '00:00:00' }"
      >
        <template #default="{ inputValue, inputEvents }">
          <v-text-field
            outlined
            dense
            :value="inputValue.start"
            v-on="inputEvents.start"
          />
          to
          <v-text-field
            outlined
            dense
            :value="inputValue.end"
            v-on="inputEvents.end"
          />
        </template>
      </date-picker>
      <v-btn type="submit" color="primary">Add</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      homeList: [],
      isLoading: false,
      entries: [],
      search: null,
      home: {
        title: '',
        description: '',
        note: '',
        pricePerNight: '',
        guests: '',
        bedrooms: '',
        beds: '',
        bathrooms: '',
        features: ['', '', '', '', ''],
        location: {
          address: '',
          city: '',
          state: '',
          postalCode: '',
          country: '',
        },
        _geoloc: {
          lat: '',
          lng: '',
        },
        images: [],
        availabilityRanges: [
          {
            start: '',
            end: '',
          },
          {
            start: '',
            end: '',
          },
        ],
      },
    }
  },
  computed: {
    deleteColor() {
      return this.$vuetify.theme.isDark ? '#504e4b' : ''
    },
  },
  watch: {
    search(value) {
      if (this.isLoading) return

      this.isLoading = true
      fetch(
        `${process.env.hereUrl}?apiKey=${process.env.hereApiKey}&q=${value}`
      )
        .then((result) => result.json())
        .then((result) => {
          this.entries = result.items?.map((entry) => {
            const Description = entry.title
            return Object.assign({}, entry, { Description })
          })
        })
        .finally(() => (this.isLoading = false))
    },
  },
  mounted() {
    this.setHomesList()
  },
  methods: {
    async deleteHome(homeId) {
      await fetch(`/api/homes/${homeId}`, {
        method: 'DELETE',
      })
      const index = this.homeList.findIndex((obj) => obj.objectID === homeId)
      this.homeList.splice(index, 1)
    },
    async setHomesList() {
      let response = await fetch('/api/homes/user/')
      response = await response.json()
      this.homeList = response
    },
    imageUpdated(imageUrl, index) {
      this.home.images[index - 1] = imageUrl
    },
    changed(result) {
      if (Object.keys(result).length > 0) {
        this.home.location.address =
          result.address?.houseNumber + ' ' + result.address?.street
        this.home.location.city = result.address?.city || ''
        this.home.location.state =
          result.address?.state || result.address?.district || ''
        this.home.location.postalCode = result.address?.postalCode || ''
        this.home.location.country = result.address?.countryName || ''
        this.home._geoloc.lat = result.position.lat
        this.home._geoloc.lng = result.position.lng
      } else {
        this.home.location.address = ''
        this.home.location.city = ''
        this.home.location.state = ''
        this.home.location.postalCode = ''
        this.home.location.country = ''
      }
    },
    async onSubmit() {
      let response = await fetch('/api/homes', {
        method: 'POST',
        body: JSON.stringify(this.home),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      response = await response.json()

      this.homeList.push({
        title: this.home.title,
        objectID: response.homeId,
      })
    },
  },
}
</script>
