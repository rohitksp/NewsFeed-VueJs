export default {
  get_posts: (state, payload) => {
    state.posts = payload
  },
  loading_status: (state, payload) => {
    state.loadingStatus = payload
  },
  add_post: (state, payload) => {
    state.posts.push(payload)
  },
  delete_post: (state, payload) => {
    state.posts.find(post => post.id !== payload.id)
  },
  edit_post: (state, payload) => {
    state.posts.find(post => post.id == payload.id)
  },
  get_comments: (state, payload) => {
    state.comments = payload
  },
  add_comment: (state, payload) => {
    state.comments.unshift(payload)
  }
}