export default (apiCall) => {
  return {
    get: async (homeId) => {
      try {
        return await apiCall.get(`/homes/${homeId}`)
      } catch (err) {
        return err
      }
    },
    delete: async (homeId) => {
      try {
        return await apiCall.delete(`/homes/${homeId}`)
      } catch (err) {
        return err
      }
    },
    create: async (homeId, payload) => {
      try {
        const availability = []
        payload.availabilityRanges.forEach(range => {
          const start = new Date(range.start).getTime() / 1000
          const end = new Date(range.end).getTime() / 1000
          for (let day = start; day <= end; day += 86400) {
            availability.push(day)
          }
        })

        delete payload.availabilityRanges
        payload.availability = availability
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