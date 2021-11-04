export default function ({ $config }, inject) {
  let stripe

  addScript()

  inject('stripe', {
    checkout
  })

  function addScript() {
    const script = document.createElement('script')
    script.src = "https://js.stripe.com/v3/"
    script.onload = initStripe
    document.head.appendChild(script)
  }

  function initStripe() {
    stripe = window.Stripe(process.env.stripe.key)
  }

  async function createSession(homeId, start, end) {
    try {
      return await fetch(`/api/stripe/create-session`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          homeId,
          start,
          end
        })
      })
    } catch (err) {
      console.error(err)
    }
  }

  async function checkout(homeId, start, end) {
    try {
      let session = await createSession(homeId, start, end)
      session = await session.json()
      const id = session.id

      await stripe.redirectToCheckout({ sessionId: id })
    } catch (err) {
      console.error(err)
    }
  }
}