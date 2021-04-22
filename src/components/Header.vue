<template>
  <div>
		<PostCreate
      :postData="postData"
      :fetchPosts="fetchPosts"
    />
    <h1>
      NewsFeed
    </h1>
	</div>
</template>

<script>
import PostCreate from './PostCreate'

export default {
	name: 'Header',
	components: {
		PostCreate
	},
	props: ['postData', 'fetchPosts']
}
</script>