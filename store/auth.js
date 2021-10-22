export const state = () => ({
  isLoggedIn: false,
  user: {}
})

export const mutations = {
  USER(state, user) {
    state.isLoggedIn = !!user
    state.user = user || {}
  }
}