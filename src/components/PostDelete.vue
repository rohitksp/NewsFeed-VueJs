<template>
	<div>
    <h3>Delete the post</h3>
    <hr />
    <p :style="{margin: '20px 0 10px 0'}">Are you sure you want to delete the post?</p>
    <button class="submit-btn" :style="{background: '#dc3545'}"
      @click.prevent="deletePost()" type="submit">
      Yes
    </button>
    <router-link to="/">
      <button class="submit-btn" type="submit">No</button>
    </router-link>
  </div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'PostDelete',

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
    deletePost () {
      axios.delete(`http://localhost:3002/posts/${this.id}`)
        .then(() => {
          this.postData = ''
          this.$router.push('/')
        })
    }
	}
}
</script>
