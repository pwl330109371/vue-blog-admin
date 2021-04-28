<!--
 * @Author: your name
 * @Date: 2021-01-27 10:43:21
 * @LastEditTime: 2021-04-28 11:06:26
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-blog-admin\src\views\dashboard\index.vue
-->
<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
