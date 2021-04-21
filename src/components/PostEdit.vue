<template>
    <div>
			<button class="button" :style="{background: 'rgb(9 168 199)'}" @click="getPostData(fetchedPost)">Edit</button>

			<div class="modal" v-if="editPostModal">
				<div class="modal-content">
					<span @click="editClosePanel(postDetail)" class="close">&times;</span>
					<h3>Edit the Post</h3>
					<hr />
					<form>
						<label class="label" >UserName</label><br>
						<input
							type="text"
							v-model="postDetail.userName"
							id="userName"
							class="input-box"
							autocomplete="off"
							>
						<br>
						<label class="label" >Title</label><br>
						<input
							type="text"
							v-model="postDetail.title"
							id="title"
							class="input-box"
							autocomplete="off"
						>
						<br>
						<label class="label" >Description</label><br>
						<input
							type="text"
							v-model="postDetail.body"
							id="body"
							class="input-box"
							autocomplete="off"
						>
						<br>
						<button class="update-btn" @click.prevent="updatePost(postDetail)" type="submit">Update</button>
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
		'showEditPost',
		'postData',
		'fetchPosts',
		'post'
	],
	data: function () {
		return {
			editPostModal: this.showEditPost,
			postDetail: this.postData,
			fetchedPost: this.post
		}
	},
	methods: {
		toggleEditPanel () {
			this.editPostModal = true
		},
		editClosePanel (postDetail) {
			axios.put(`http://localhost:3002/posts/${postDetail.id}`, {
				userName: this.postDetail.userName,
				title: this.postDetail.title,
				body: this.postDetail.body
			})
				.then(() => {
					this.fetchPosts()
					this.postDetail.id = ''
					this.postDetail.userName = ''
					this.postDetail.title = ''
					this.postDetail.body = ''
					this.editPostModal = false
				})
		},
		getPostData (fetchedPost) {
      this.toggleEditPanel()
      this.postDetail.userName = fetchedPost.userName
      this.postDetail.title = fetchedPost.title
      this.postDetail.body = fetchedPost.body
      this.postDetail.id = fetchedPost.id
    },
		updatePost (postDetail) {
      axios.put(`http://localhost:3002/posts/${postDetail.id}`, {
        userName: this.postDetail.userName,
        title: this.postDetail.title,
        body: this.postDetail.body
      })
        .then(() => {
          this.fetchPosts()
          this.postDetail.id = ''
          this.postDetail.userName = ''
          this.postDetail.title = ''
          this.postDetail.body = ''
          this.editPostModal = false
        })
    },
	}
}
</script>