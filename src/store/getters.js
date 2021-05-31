export default {
  posts_data: (state) => (state.posts),
  comments_data: (state) => (state.comments),
  loading_status: (state) => (state.loadingStatus),
  get_userData: (state) => (state.users),
  login_status: (state) => (state.loginStatus),
  get_userId: (state) => (state.userId)
}