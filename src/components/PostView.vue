<template>
	<div>
		<button class="button" :style="{background: '#198754'}" @click="toggleViewPanel(postContent)">View</button>
		<div class="modal" v-if="showViewPost">
      <div class="modal-content">
        <span @click="viewClosePanel()" class="close">&times;</span>
        <h3>View Post</h3>
        <hr />
        <div class="list">
          <h3>{{this.postDetails.userName}}</h3>
          <h4>{{this.postDetails.title}}</h4>
          <p>{{this.postDetails.body}}</p>
        </div>
        <div 
          :style="{padding: '5px 0 5px 7px', display: 'flex', background: 'white', margin: '5px'}" 
          v-for="comment in comments" :key="comment.id">
          <img 
            :src="`https://joeschmoe.io/api/v1/${comment.author}`"
            :style="{margin: '8px 5px 0 0', background: 'lightblue', borderRadius: '0.4rem'}" 
            width="40px" height="40px" :alt="`${comment.author}`"
          />
          <div>
            <h3>{{comment.author}}</h3>
            <p>{{comment.message}}</p>
          </div>
        </div>
        <label class="label" >Author</label><br>
        <input
          type="text"
          id="name"
          v-model="commentData.author"
          autoComplete="off"
          class="input-box"
        /><br>
        <label class="label" >Comment</label><br>
        <input
          type="text"
          id="comment"
          v-model="commentData.message"
          autoComplete="off"
          class="input-box"
        /><br>
        <button class="submit-btn" @click.prevent="submitComment()" type="submit">Comment</button>
      </div>
    </div>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'PostView',
	props: [
		'post',
		'postData',
		'fetchPosts'
	],

	data: function () {
		return {
      comments: [],
      commentData: {
        postId: '',
        author: '',
        message: ''
      },
      showViewPost: false,
			postDetails: this.postData,
			postContent: this.post
		}
	},

	methods: {
		fetchComments () {
      axios.get(`http://localhost:3002/comments?postId=${this.postData.id}`)
        .then(response => {
          this.comments = response.data.reverse()
        })
        .catch (() => {
          console.warn('Something went wrong for getting comments')
        })
    },
		toggleViewPanel (postContent) {
      this.commentData.postId = postContent.id
      this.postDetails.id = postContent.id
      this.postDetails.userName = postContent.userName
      this.postDetails.title = postContent.title
      this.postDetails.body = postContent.body
      this.fetchComments()
      this.showViewPost = true
    },
		viewClosePanel () {
      this.showViewPost = false
      this.postDetails.id = ''
      this.postDetails.userName = ''
      this.postDetails.title = ''
      this.postDetails.body = ''
    },
		submitComment () {
      axios.post('http://localhost:3002/comments/', this.commentData)
        .then(() => {
          this.fetchComments()
          this.commentData.postId = this.postDetails.id
          this.commentData.author = ''
          this.commentData.message = ''
        })
    }
	}
}
</script>