<template>
  <div>
    <h3>Edit the Post</h3>
    <hr />
    <form>
      <label class="label" >UserName</label><br>
      <input
        type="text"
        v-model="postData.userName"
        id="userName"
        class="input-box"
        autocomplete="off"
      />
      <br>
      <label class="label" >Title</label><br>
      <input
        type="text"
        v-model="postData.title"
        id="title"
        class="input-box"
        autocomplete="off"
      />
      <br>
      <label class="label" >Description</label><br>
      <input
        type="text"
        v-model="postData.body"
        id="body"
        class="input-box"
        autocomplete="off"
      />
      <br>
      <button class="update-btn" @click.prevent="updatePost()" type="submit">Update</button>
      <router-link to="/">
        <button class="submit-btn" :style="{background: '#dc3545'}" type="submit">Home</button>
      </router-link>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'PostEdit',

	data: function () {
		return {
      id: this.$route.params.id,
      postData: {
        id: "",
        userName: "",
        title: "",
        body: ""
      }
		}
	},
	methods: {
		getPostData () {
      axios.get(`http://localhost:3002/posts/${this.id}`)
        .then((response) => {
          this.postData = response.data
        })
        .catch((err) => {
          console.warn(err)
        })
    },
		updatePost () {
      axios.put(`http://localhost:3002/posts/${this.id}`, this.postData)
        .then(() => {
          this.postData = ''
          this.$router.push('/')
        })
    },
	},
  mounted () {
    this.getPostData()
  }
}
</script>
