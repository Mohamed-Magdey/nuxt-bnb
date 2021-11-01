<template>
  <v-container>
    [LIST OF HOMES HERE]
    <h2>Add a Home</h2>
    <v-form @submit.prevent="onSubmit">
      <ImageUploader />
      <v-text-field
        v-for="(image, index) in home.images"
        :key="index"
        v-model="home.images[index]"
        label="Images"
        type="text"
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
      <v-btn type="submit" color="primary">Add</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
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
        features: ['t', 't', 't', 't', 't'],
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
        images: [
          'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
          'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=81',
          'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=82',
          'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=83',
          'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=84',
        ],
      },
    }
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
  methods: {
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
      await fetch('/api/homes', {
        method: 'POST',
        body: JSON.stringify(this.home),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    },
  },
}
</script>
