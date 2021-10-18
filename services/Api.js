import axios from 'axios'

const apiCall = axios.create({
  baseURL: process.env.baseUrl,
  // withCredentials: true, => makes cors error
  headers: {
    'X-Algolia-API-Key': process.env.apiKey,
    'X-Algolia-Application-Id': process.env.appId,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000
})

export default {
  getHome(homeId) {
    return apiCall.get(`/homes/${homeId}`)
  },

  getReviewsByHomeId(homeId) {
    return apiCall.post(`/reviews/query`, {
      filters: `homeId:${homeId}`,
      hitsPerPage: 6,
      attributesToHighlight: []
    })
  }
}