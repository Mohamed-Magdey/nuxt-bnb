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

  function getUserRoute(req, res, next) {
    console.log(req.identity)
    createUser(req.identity)
    next()
  }

  function createUser(identity) {
    return apiCall.put(`/users/${identity.id}`, makeUserPayload(identity))
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