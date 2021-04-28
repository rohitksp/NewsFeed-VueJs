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
      :style="styleObject"
      v-for="comment in comments"
      :key="comment.id"
    >
      <img
        :src="avatar + comment.author"
        :style="avatarImage"
        width="40px"
        height="40px"
        :alt="comment.author"
      />
      <div>
        <h3>{{comment.author}}</h3>
        <p>{{comment.message}}</p>
      </div>
    </div>
    <form @submit.prevent="submitComment()">
      <label for="name" class="label">Author</label><br />
      <input
        type="text"
        id="name"
        v-model="commentData.author"
        autocomplete="off"
        class="input-box"
        required
      /><br />
      <label for="comment" class="label">Comment</label><br />
      <input
        type="text"
        id="comment"
        v-model="commentData.message"
        autocomplete="off"
        class="input-box"
        required
      /><br />
      <button class="submit-btn" type="submit">Comment</button>
      <HomeButton />
    </form>
    <h3 v-if="loadingData">Loading...</h3>
  </div>
</template>

<script>
  import axios from "axios";
  import HomeButton from '../HomeButton'

  export default {
    name: "PostView",
    props: ['id'],
    components: {
      HomeButton
    },

    data: function () {
      return {
        loadingData: false,
        avatar: "https://joeschmoe.io/api/v1/",
        avatarImage: {
          margin: '8px 5px 0 0',
          background: 'lightblue',
          borderRadius: '0.4rem'
        },
        styleObject: {
          padding: '5px 0 5px 7px',
          display: 'flex',
          background: 'white',
          margin: '5px'
        },
        comments: [],
        commentData: {
          postId: this.id,
          author: "",
          message: ""
        },
        postData: {
          id: "",
          userName: "",
          title: "",
          body: ""
        }
      };
    },

    methods: {
      fetchPosts() {
        this.loadingData = true;
        axios
          .get(`http://localhost:3002/posts/${this.id}`)
          .then((response) => {
            if (response.status === 200) {
              this.loadingData = false;
              this.postData = response.data;
            }
          })
          .catch((error) => {
            window.alert(error);
            this.loadingData = false;
          });
      },
      fetchComments() {
        this.loadingData = true;
        axios
          .get(`http://localhost:3002/comments?postId=${this.id}`)
          .then((response) => {
            if (response.status === 200) {
              this.loadingData = false;
              this.comments = response.data.reverse();
            }
          })
          .catch((error) => {
            window.alert(error);
            this.loadingData = false;
          });
      },
      submitComment() {
        this.loadingData = true;
        axios
          .post("http://localhost:3002/comments/", this.commentData)
          .then((response) => {
            if (response.status === 201) {
              this.loadingData = false;
              this.fetchComments();
              this.commentData.author = "";
              this.commentData.message = "";
            }
          })
          .catch((error) => {
            window.alert(error);
            this.loadingData = false;
          });
      }
    },
    mounted() {
      this.fetchComments();
      this.fetchPosts();
    }
  };
</script>
