import Cookie from 'js-cookie'

export default ({ app }, inject) => {
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

  function parseUser(user) {
    const profile = user.getBasicProfile()
    console.log('Name: ' + profile.getName())
    console.log('Image Url: ' + profile.getImageUrl())

    if (!user.isSignedIn()) {
      Cookie.remove(process.env.auth.cookieName)
      return
    }
    const idToken = user.getAuthResponse().id_token
    Cookie.set(process.env.auth.cookieName, idToken, { expires: 1 / 24, sameSite: 'Lax' })
  }

  function signOut() {
    const auth2 = window.gapi.auth2.getAuthInstance()
    auth2.signOut()
  }
}