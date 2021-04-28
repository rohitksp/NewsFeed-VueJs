<template>
  <div>
    <h3>Edit the Post</h3>
    <hr />
    <form @submit.prevent="updatePost()">
      <label for="user-name" class="label">UserName</label><br />
      <input
        type="text"
        v-model="postData.userName"
        id="user-name"
        class="input-box"
        autocomplete="off"
        required
      />
      <br />
      <label for="title" class="label">Title</label><br />
      <input
        type="text"
        v-model="postData.title"
        id="title"
        class="input-box"
        autocomplete="off"
        required
      />
      <br />
      <label for="description" class="label">Description</label><br />
      <input
        type="text"
        v-model="postData.body"
        id="description"
        class="input-box"
        autocomplete="off"
        required
      />
      <br />
      <button class="update-btn" type="submit">Update</button>
      <HomeButton />
    </form>
    <h3 v-if="loadingData">Loading...</h3>
  </div>
</template>

<script>
  import axios from "axios";
  import HomeButton from '../HomeButton'

  export default {
    name: "PostEdit",
    props: ['id'],
    components: {
      HomeButton
    },

    data: function () {
      return {
        postData: {
          id: "",
          userName: "",
          title: "",
          body: ""
        },
        loadingData: false
      };
    },
    methods: {
      getPostData() {
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
      updatePost() {
        this.loadingData = true;
        axios
          .put(`http://localhost:3002/posts/${this.id}`, this.postData)
          .then((response) => {
            if (response.status === 200) {
              this.loadingData = true;
              this.postData = "";
              this.$router.push("/");
            }
          })
          .catch((error) => {
            this.loadingData = false;
            window.alert(error);
          });
      }
    },
    mounted() {
      this.getPostData();
    }
  };
</script>
