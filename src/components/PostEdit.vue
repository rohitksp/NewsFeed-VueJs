<template>
  <div>
    <button class="button" :style="{background: 'rgb(9 168 199)'}" @click="getPostData(postContent)">Edit</button>
    <div class="modal" v-if="showEditPost">
      <div class="modal-content">
        <span @click="editClosePanel(postDetails)" class="close">&times;</span>
        <h3>Edit the Post</h3>
        <hr />
        <form>
          <label class="label" >UserName</label><br>
          <input
            type="text"
            v-model="postDetails.userName"
            id="userName"
            class="input-box"
            autocomplete="off"
          />
          <br>
          <label class="label" >Title</label><br>
          <input
            type="text"
            v-model="postDetails.title"
            id="title"
            class="input-box"
            autocomplete="off"
          />
          <br>
          <label class="label" >Description</label><br>
          <input
            type="text"
            v-model="postDetails.body"
            id="body"
            class="input-box"
            autocomplete="off"
          />
          <br>
          <button class="update-btn" @click.prevent="updatePost(postDetails)" type="submit">Update</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'PostEdit',
	props: [
		'postData',
		'fetchPosts',
		'post'
	],
	data: function () {
		return {
			showEditPost: false,
			postDetails: this.postData,
			postContent: this.post
		}
	},
	methods: {
		toggleEditPanel () {
			this.showEditPost = true
		},
		editClosePanel (postDetails) {
			axios.put(`http://localhost:3002/posts/${postDetails.id}`, {
				userName: this.postDetails.userName,
				title: this.postDetails.title,
				body: this.postDetails.body
			})
				.then(() => {
					this.fetchPosts()
					this.postDetails.id = ''
					this.postDetails.userName = ''
					this.postDetails.title = ''
					this.postDetails.body = ''
					this.showEditPost = false
				})
		},
		getPostData (postContent) {
      this.toggleEditPanel()
      this.postDetails.userName = postContent.userName
      this.postDetails.title = postContent.title
      this.postDetails.body = postContent.body
      this.postDetails.id = postContent.id
    },
		updatePost (postDetails) {
      axios.put(`http://localhost:3002/posts/${postDetails.id}`, {
        userName: this.postDetails.userName,
        title: this.postDetails.title,
        body: this.postDetails.body
      })
        .then(() => {
          this.fetchPosts()
          this.postDetails.id = ''
          this.postDetails.userName = ''
          this.postDetails.title = ''
          this.postDetails.body = ''
          this.showEditPost = false
        })
    },
	}
}
</script>

<style scoped>
.update-btn {
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
  background: rgb(212, 139, 3);
  padding: 10px 15px;
  font-weight: 700;
  line-height: 1.3em;
  margin: 10px 0 0 0;
  border-radius: 0.3rem;
}

.update-btn:hover {
  background: rgb(226, 149, 5);
}
</style>