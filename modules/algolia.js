import axios from 'axios'

export default function () {
  const algoliaConfig = this.options.privateRuntimeConfig.algolia
  const apiCall = axios.create({
    baseURL: this.options.env.baseUrl,
    headers: {
      'X-Algolia-API-Key': algoliaConfig.key,
      'X-Algolia-Application-Id': algoliaConfig.appId,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    timeout: 10000
  })

  this.nuxt.hook('render:setupMiddleware', (app) => {
    app.use('/api/user', getUserRoute)
  })

  async function getUserRoute(req, res, next) {
    const identity = req.identity
    const userData = await getUserById(identity)

    if (userData.status === 200) {
      sendJSON(userData.data, res)
      return
    }

    createUser(req.identity)
    sendJSON(makeUserPayload(identity), res)
  }

  function createUser(identity) {
    return apiCall.put(`/users/${identity.id}`, makeUserPayload(identity))
  }

  function getUserById(identity) {
    return apiCall.get(`/users/${identity.id}`)
  }

  function sendJSON(data, res) {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
  }

  function makeUserPayload(identity) {
    return {
      name: identity.name,
      email: identity.email,
      image: identity.image,
      homeId: [],
      reviewCount: 0,
      description: '',
      joined: new Date().toISOString()
    }
  }
}