export default (apiCall) => {
  return {
    create: (homeId, payload) => {
      return apiCall.put(`/home/${homeId}`, payload)
    }
  }
}