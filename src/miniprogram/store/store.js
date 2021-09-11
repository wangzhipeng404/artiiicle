import { createStore } from '@mpxjs/core'

const store = createStore({
  state: {
    article: {},
  },
  mutations: {
    keepArticle (state, data) {
      state.article = data
    },
    clearArticle (state) {
      state.article = {}
    },
  },
})

export default store
