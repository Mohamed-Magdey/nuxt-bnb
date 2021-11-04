import { v4 as uuidv4 } from 'uuid'
import { rejectHitBadRequest, hasBadBody, sendJSON } from '../../helpers'

export default (apis) => {
  return (req, res) => {
    if (req.method === 'DELETE') {
      const homeId = req.url.replace(/\//g, '')
      return deleteHome(req.identity, homeId, res)
    }
    if (req.method === 'GET' && req.url === '/user/') {
      return getHomesByUser(req.identity.id, res)
    }
    if (req.method === 'POST') {
      if (hasBadBody(req)) {
        return rejectHitBadRequest(res)
      }
      createHome(req.identity, req.body, res)
      return
    }
    rejectHitBadRequest(res)
  }

  async function deleteHome(identity, homeId, res) {
    await Promise.all([
      apis.homes.delete(homeId),
      apis.user.removeHome(identity, homeId)
    ])
    sendJSON({}, res)
  }

  async function getHomesByUser(userId, res) {
    const payload = (await apis.homes.getByUserId(userId)).data.hits
    sendJSON(payload, res)
  }

  async function createHome(identity, body, res) {
    const homeId = await uuidv4()
    const payload = {
      ...body,
      reviewCount: 0,
      reviewValue: 0,
      userId: identity.id,
    }
    const resp = await apis.homes.create(homeId, payload)

    if (!resp.statusText === 'OK') {
      res.statusCode = 500
      res.end()
      return
    }
    await apis.user.assignHome(identity, homeId)
    sendJSON({ homeId }, res)
  }
}