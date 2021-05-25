<template>
  <div class="container-fluid">
    <main>
      <client-only>
        <iframe src="https://davidmegginson.github.io/network-demo/" width="100%" height="600px"></iframe>
      </client-only>
    </main>
  </div>
</template>

<script>
export default {
  components: {
  }
}
</script>

<style scoped>
iframe {
  border: 0px;
}
</style>
