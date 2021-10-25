import Cookie from 'js-cookie'

export default ({ store }, inject) => {
  window.initAuth = init
  addScript()

  inject('auth', {
    signOut,
  })

  function addScript() {
    const script = document.createElement('script')
    script.src = "https://apis.google.com/js/platform.js?onload=initAuth"
    script.async = true
    document.head.appendChild(script)
  }

  function init() {
    window.gapi.load('auth2', async function () {
      const auth2 = await window.gapi.auth2.init({
        client_id: process.env.auth.clientId
      })

      auth2.currentUser.listen(parseUser)
    });
    window.gapi.signin2.render('googleButton', {
      onsuccess: parseUser,
    })
  }

  async function parseUser(user) {
    if (!user.isSignedIn()) {
      Cookie.remove(process.env.auth.cookieName)
      store.commit('auth/USER', null)
      return
    }

    const idToken = user.getAuthResponse().id_token
    Cookie.set(process.env.auth.cookieName, idToken, { expires: 1 / 24, sameSite: 'Lax' })

    try {
      const response = await fetch('/api/user')
      const userData = await response.json()

      store.commit('auth/USER', {
        fullName: userData.name,
        profileUrl: userData.image
      })
    } catch (err) {
      console.error(err)
    }
  }

  function signOut() {
    const auth2 = window.gapi.auth2.getAuthInstance()
    auth2.signOut()
  }
}