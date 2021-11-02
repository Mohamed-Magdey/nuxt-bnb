export default (apiCall) => {
  return {
    async removeHome(identity, homeId) {
      const payload = (await this.getById(identity)).data
      const homes = payload.homeId.filter(id => id !== homeId)
      payload.homeId = homes
      this.create(identity, payload)
    },
    async assignHome(identity, homeId) {
      const payload = (await this.getById(identity)).data
      payload.homeId.push(homeId)
      this.create(identity, payload)
    },
    create: (identity, payload) => {
      return apiCall.put(`/users/${identity.id}`, payload)
    },
    getById: async (identity) => {
      try {
        return await apiCall.get(`/users/${identity.id}`)
      } catch (err) {
        return err
      }
    }
  }
}