<template>
  <div>
    <h3>Add New Post</h3>
    <hr />
    <form>
      <label class="label">UserName:</label><br>
      <input
        type="text"
        v-model="postData.userName"
        autoComplete="off"
        class="input-box"
      />
      <br>
      <label class="label">Title:</label><br>
      <input
        type="text"
        v-model="postData.title"
        autoComplete="off"
        class="input-box"
      />
      <br>
      <label class="label">Description:</label><br>
      <input
        type="text"
        v-model="postData.body"
        autoComplete="off"
        class="description-box"
      />
      <br>
      <button class="submit-btn" @click.prevent="createPost()" type="submit">Add Post</button>
      <router-link to="/">
        <button class="submit-btn" :style="{background: '#dc3545'}" type="submit">Home</button>
      </router-link>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PostCreate',

  data () {
    return {
      postData: {
        id: "",
        userName: "",
        title: "",
        body: ""
      }
    }
  },
  methods: {
    createPost () {
      axios.post('http://localhost:3002/posts/', this.postData)
        .then(() => {
          this.postData.id = ''
          this.postData.userName = ''
          this.postData.title = ''
          this.postData.body = ''
          this.$router.push('/')
        })
    },
  }
}

</script>
