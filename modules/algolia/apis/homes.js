export default (apiCall) => {
  return {
    create: async (homeId, payload) => {
      try {
        return await apiCall.put(`/homes/${homeId}`, payload)
      } catch (err) {
        return err
      }
    }
  }
}