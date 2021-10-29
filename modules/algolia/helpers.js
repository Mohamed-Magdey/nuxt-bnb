import axios from 'axios'

export function getAxiosInstance(app, algoliaConfig) {
  return axios.create({
    baseURL: app.options.env.baseUrl,
    headers: {
      'X-Algolia-API-Key': algoliaConfig.key,
      'X-Algolia-Application-Id': algoliaConfig.appId,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    timeout: 10000
  })
}

export function sendJSON(data, res) {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(data))
}

export function rejectHitBadRequest(res) {
  res.statusCode = 400
  res.end()
}

export function hasBadBody(req) {
  return !req.body || Object.keys(req.body).length === 0
}