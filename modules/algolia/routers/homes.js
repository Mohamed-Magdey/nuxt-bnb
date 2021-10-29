import { v4 as uuidv4 } from 'uuid'
import { rejectHitBadRequest, hasBadBody, sendJSON } from '../helpers'

export default (apis) => {
  return (req, res) => {
    if (req.method === 'POST') {
      if (hasBadBody(req)) {
        return rejectHitBadRequest(res)
      }
      createHome(req.identity, req.body, res)
      return
    }
    rejectHitBadRequest(res)
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
    sendJSON({}, res)
  }
}