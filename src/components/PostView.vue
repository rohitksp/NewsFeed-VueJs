<template>
	<div>
    <h3>View Post</h3>
    <hr />
    <div class="list">
      <h3>{{this.postData.userName}}</h3>
      <h4>{{this.postData.title}}</h4>
      <p>{{this.postData.body}}</p>
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
    <router-link to="/">
      <button class="submit-btn" :style="{background: '#dc3545'}" type="submit">Home</button>
    </router-link>
  </div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'PostView',

	data: function () {
		return {
      id: this.$route.params.id,
      comments: [],
      commentData: {
        postId: this.$route.params.id,
        author: '',
        message: ''
      },
      postData: {
        id: "",
        userName: "",
        title: "",
        body: ""
      }
		}
	},

	methods: {
    fetchPosts () {
      axios.get(`http://localhost:3002/posts/${this.id}`)
        .then(response => {
          this.postData = response.data
        })
        .catch (() => {
          console.warn('Something went wrong for getting post')
        })
    },
		fetchComments () {
      axios.get(`http://localhost:3002/comments?postId=${this.id}`)
        .then(response => {
          this.comments = response.data.reverse()
        })
        .catch (() => {
          console.warn('Something went wrong for getting comments')
        })
    },
		submitComment () {
      axios.post('http://localhost:3002/comments/', this.commentData)
        .then(() => {
          this.fetchComments()
          this.commentData.author = ''
          this.commentData.message = ''
        })
    }
	},
  mounted () {
    this.fetchComments()
    this.fetchPosts()
  }
}
</script>
