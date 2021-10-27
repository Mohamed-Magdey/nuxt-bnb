export default (apiCall) => {
  return {
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