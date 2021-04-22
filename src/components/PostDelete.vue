<template>
	<div>
		<button class="button" :style="{background: '#dc3545'}" @click="toggleDeletePanel(postContent)">Delete</button>
		<div class="modal" v-if="showDeletePost">
      <div class="modal-content">
        <span @click="showDeletePost = false" class="close">&times;</span>
        <h3>Delete the post</h3>
        <hr />
        <p :style="{margin: '20px 0 10px 0'}">Are you sure you want to delete the post?</p>
        <button class="submit-btn" :style="{background: '#dc3545'}"
         @click.prevent="deletePost(postDetails)" type="submit">
         Yes
        </button>
        <button class="submit-btn"
         @click="showDeletePost = false" type="submit">
         No
        </button> 
      </div>
    </div>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'PostDelete',
	props: [
    'postData',
    'fetchPosts',
    'post'
  ],

	data: function () {
		return {
			showDeletePost: false,
			postDetails: this.postData,
      postContent: this.post
		}
	},

	methods: {
		toggleDeletePanel (postContent) {
      this.showDeletePost = true
      this.postDetails.id = postContent.id
    },
    deletePost (postDetails){
      axios.delete(`http://localhost:3002/posts/${postDetails.id}`)
        .then(() => {
          this.fetchPosts()
          this.postDetails.id = ''
          this.postDetails.userName = ''
          this.postDetails.title = ''
          this.postDetails.body = ''
          this.showDeletePost = false
        })
    }
	}
}
</script>