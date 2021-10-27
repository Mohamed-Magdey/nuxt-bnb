import { sendJSON } from '../helpers'

export default (apiCall) => {
  return async function getUserRoute(req, res, next) {
    const identity = req.identity
    const userData = await getUserById(identity)

    if (userData?.status === 200) {
      sendJSON(userData.data, res)
      return
    }

    createUser(req.identity)
    sendJSON(makeUserPayload(identity), res)
  }

  function createUser(identity) {
    return apiCall.put(`/users/${identity.id}`, makeUserPayload(identity))
  }

  async function getUserById(identity) {
    try {
      return await apiCall.get(`/users/${identity.id}`)
    } catch (err) {
      return err
    }
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