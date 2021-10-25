import cookie from 'cookie'
import { OAuth2Client } from 'google-auth-library'

export default function () {
  const authConfig = this.options.env.auth

  this.nuxt.hook('render:setupMiddleware', (app) => {
    app.use('/api', handler)
  })

  async function handler(req, res, next) {
    const idToken = cookie.parse(req.headers.cookie)[authConfig.cookieName]
    if (!idToken) {
      return rejectHit(res)
    }
    console.log(req.originalUrl)
    console.log(idToken)
    const ticket = await getUser(idToken)
    if (!ticket) {
      return rejectHit(res)
    }
    console.log(ticket)
    req.identity = {
      id: ticket.id,
      email: ticket.email,
      name: ticket.name,
      image: ticket.picture
    }
    next()
  }

  async function getUser(idToken) {
    const client = new OAuth2Client(authConfig.clientId)
    try {
      const ticket = await client.verifyIdToken({
        idToken,
        audience: authConfig.clientId
      })
      return ticket.getPayload()
    } catch (err) {
      console.error(err)
    }
  }

  function rejectHit(res) {
    res.statusCode = 401
    res.end()
  }
}