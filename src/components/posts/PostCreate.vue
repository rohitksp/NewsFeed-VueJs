<template>
  <div>
    <h3>Add New Post</h3>
    <hr />
    <form @submit.prevent="createPost()">
      <label for="user-name" class="label">UserName:</label><br />
      <input
        type="text"
        id="user-name"
        v-model="postData.userName"
        autocomplete="off"
        class="input-box"
        required
      />
      <br />
      <label for="title" class="label">Title:</label><br />
      <input
        type="text"
        id="title"
        v-model="postData.title"
        autocomplete="off"
        class="input-box"
        required
      />
      <br />
      <label for="description" class="label">Description:</label><br />
      <input
        type="text"
        id="description"
        v-model="postData.body"
        autocomplete="off"
        class="input-box"
        required
      />
      <br />
      <button class="submit-btn" type="submit">Add Post</button> 
      <HomeButton />
      <h3 v-if="loadingData">Loading...</h3>
    </form>
  </div>
</template>

<script>
  import axios from "axios";
  import HomeButton from '../HomeButton.vue'

  export default {
    name: "PostCreate",
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
      createPost() {
        this.loadingData = true;
        axios
          .post("http://localhost:3002/posts/", this.postData)
          .then((res) => {
            if (res.status === 201) {
              this.loadingData = false;
              this.postData = ""
              this.$router.push("/");
            }
          })
          .catch((error) => {
            window.alert(error);
            this.loadingData = false;
          });
      }
    }
  };
</script>
