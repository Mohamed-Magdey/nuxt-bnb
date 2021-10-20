<template>
  <v-menu
    v-model="menuDate"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        v-model="checkData"
        :label="label"
        append-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        outlined
        dense
        v-on="on"
      >
        <template #append>
          <v-icon color="primary">mdi-calendar-month</v-icon>
        </template>
      </v-text-field>
    </template>
    <v-date-picker
      v-model="checkData"
      @input="menuDate = false"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'DatePicker',
  props: {
    menu: {
      type: Boolean,
      required: true,
    },
    check: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      menuDate: this.menu,
      checkData: this.check,
    }
  },
}
</script>
