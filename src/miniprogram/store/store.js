import { createStore } from '@mpxjs/core'

const store = createStore({
  state: {
    article: {},
  },
  mutations: {
    keepArticle (state, data) {
      state.article = data
    },
  },
})

export default store
