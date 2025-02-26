<template>
  <div>
    bar
    <img src="../images/checked_icon_green.png" />
  </div>
</template>
<script>
  export default {
    methods: {
      test() {
        console.log('test')
        const a = 1
        return a
      }
    }
  }
</script>
<style scoped>
  .test {
    color: red;
  }
</style>
