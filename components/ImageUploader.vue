<template>
  <v-file-input
    label="Upload Image"
    show-size
    counter
    @change="uploadFile"
  ></v-file-input>
</template>
<script>
export default {
  methods: {
    async uploadFile(file) {
      const filename = file.name.split('.').slice(0, -1).join('.') + Date.now()
      const options = {
        timestamp: Date.now(),
        public_id: filename,
      }

      let response = await fetch('/api/cloudinary/signature', {
        method: 'POST',
        body: JSON.stringify(options),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      response = await response.json()
      const signature = response.signature
      const readData = (fileObj) =>
        new Promise((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.readAsDataURL(fileObj)
        })

      const data = await readData(file)
      const asset = await this.$cloudinary.upload(data, {
        ...options,
        apiKey: process.env.cloudinary.apiKey,
        signature,
      })

      this.$emit('file-uploaded', asset.public_id)
    },
  },
}
</script>
