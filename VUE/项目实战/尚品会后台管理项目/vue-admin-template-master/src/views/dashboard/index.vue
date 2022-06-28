<template>
  <div>
      <topCard style="margin:20px 10px 0 10px"/>
      <Sale></Sale>
  </div>
</template>

<script>
import topCard from './Card/index.vue'
import Sale from './Sale/index.vue'
export default {
  name: 'Home',
  components:{
    topCard,
    Sale
  }
}
</script>

<style scoped>
</style>
