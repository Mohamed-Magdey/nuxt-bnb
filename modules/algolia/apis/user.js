export default (apiCall) => {
  return {
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