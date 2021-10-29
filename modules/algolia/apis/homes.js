export default (apiCall) => {
  return {
    create: (homeId, payload) => {
      return apiCall.put(`/homes/${homeId}`, payload)
    }
  }
}