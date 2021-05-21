<template>
  <div>
    <div class="text-3xl font-bold mb-2">Oops! 404 Page not found.</div>
    <router-link to="/">
      <div class="text-xl font-semibold underline text-blue-800">
        Go back to home page
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>
