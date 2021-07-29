export const state = () => ({})

export const mutations = {
  updateUser(state, payload) {
    state.auth.user = payload
  },
}
