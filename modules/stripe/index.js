import stripLib from 'stripe'
import { rejectHitBadRequest, sendJSON } from '../helpers'
import getApis from '../algolia/apis'

export default function () {
  const algoliaConfig = this.options.privateRuntimeConfig.algolia
  const apis = getApis(this, algoliaConfig)
  const secretKey = this.options.privateRuntimeConfig.stripe.secretKey
  const stripe = stripLib(secretKey)
  const cloudName = this.options.cloudinary.cloudName
  const rootUrl = this.options.rootUrl

  this.nuxt.hook('render:setupMiddleware', (app) => {
    app.use('/api/stripe/create-session', createSession)
  })

  this.nuxt.hook('render:setupMiddleware', (app) => {
    app.use('/hooks/stripe', async (req, res) => {
      const meta = req.body.data.object.metadata
      await apis.user.bookHome(meta.identityId, meta.homeId, meta.start, meta.end)
      res.end(`${meta.identityId} booked ${meta.homeId}!!!!!`)
    })
  })

  async function createSession(req, res) {
    const body = req.body
    if (!body || !body.homeId || !body.start || !body.end || !body.start >= body.end) {
      return rejectHitBadRequest(res)
    }

    const home = (await apis.homes.get(body.homeId)).data
    const nights = (body.end - body.start) / 86400
    const session = await stripe.checkout.sessions.create({
      metadata: {
        identityId: req.identity.id,
        homeId: body.homeId,
        start: body.start,
        end: body.end
      },
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${rootUrl}/home/${body.homeId}/?result=success`,
      cancel_url: `${rootUrl}/home/${body.homeId}`,
      line_items: [{
        quantity: 1,
        price_data: {
          currency: 'USD',
          unit_amount: home.pricePerNight * nights * 100,
          product_data: {
            name: 'Reservation for ' + home.title,
            images: [`https://res.cloudinary.com/${cloudName}/image/upload/${home.images[0]}`]
          }
        }
      }]
    })

    sendJSON({ id: session.id }, res)
  }
}