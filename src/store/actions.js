import postsAPI from '../components/api/postsAPI'

export default {
  getPosts ({commit}) {
    commit('loading_status', true)
    postsAPI.get("/posts")
      .then(response => {
        commit('get_posts', response.data.reverse())
        commit('loading_status', false)
      })
      .catch(error => {
        window.alert(error)
        commit('loading_status', false)
      })
  },
  addPost ({commit}, payload) {
    postsAPI.post("/posts", payload)
      .then(response => {
        commit('add_post', response.data)
      })
      .catch(error => {
        window.alert(error)
      })
  },
  deletePost ({commit}, payload) {
    postsAPI.delete(`/posts/${payload}`)
      .then(() => {
        commit('delete_post', payload)
      })
      .catch(error => {
        window.alert(error)
      })
  },
  editPost ({commit}, payload) {
    postsAPI.put(`/posts/${payload.id}`, payload)
      .then((response) => {
        commit('edit_post', response.data)
      })
      .catch(error => {
        window.alert(error)
      })
  },
  getComments ({commit}) {
    commit('loading_status', true)
    postsAPI.get("/comments")
      .then(response => {
        commit('get_comments', response.data)
        commit('loading_status', false)
      })
      .catch(error => {
        window.alert(error)
        commit('loading_status', false)
      })
  },
  addComment ({commit}, payload) {
    postsAPI.post("/comments", payload)
      .then(response => {
        commit('add_comment', response.data)
      })
      .catch(error => {
        window.alert(error)
      })
  },
  getUserInfo ({commit}) {
    postsAPI.get("/users")
      .then(response => {
        commit('get_userInfo', response.data)
      })
      .catch(error => {
        window.alert(error)
      })
  },
  registerUser ({commit}, payload) {
    postsAPI.post("/users", payload)
      .then(response => {
        commit('register_user', response.data)
      })
      .catch(error => {
        window.alert(error)
      })
  },
  loginStatus ({commit}, payload) {
    commit('login_status', payload)
  },
  getUserId ({commit}, payload) {
    commit('get_userId', payload)
  }
}