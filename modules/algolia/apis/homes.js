export default (apiCall) => {
  return {
    delete: async (homeId) => {
      try {
        return await apiCall.delete(`/homes/${homeId}`)
      } catch (err) {
        return err
      }
    },
    create: async (homeId, payload) => {
      try {
        return await apiCall.put(`/homes/${homeId}`, payload)
      } catch (err) {
        return err
      }
    },
    getByUserId: async (userId) => {
      try {
        return await apiCall.post(`/homes/query`, {
          filters: `userId: ${userId}`,
          attributesToRetrieve: [
            'objectID',
            'title'
          ],
          attributesToHighlight: []
        })
      } catch (err) {
        return err
      }
    }
  }
}