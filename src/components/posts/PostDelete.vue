<template>
  <div>
    <h3>Delete the post</h3>
    <hr />
    <p :style="{margin: '20px 0 10px 0'}">
      Are you sure you want to delete the post?
    </p>
    <button
      class="delete-btn"
      @click.prevent="deletePost()"
      type="submit"
    >
      Yes
    </button>
    <router-link to="/" class="submit-btn" tag="button">No</router-link>
    <h3 v-if="loadingData">Loading...</h3>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "PostDelete",
    props: ['id'],

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
      deletePost() {
        this.loadingData = true;
        axios
          .delete(`http://localhost:3002/posts/${this.id}`)
          .then((response) => {
            if (response.status === 200) {
              this.loadingData = false;
              this.postData = "";
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
