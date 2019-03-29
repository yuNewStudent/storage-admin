<template>
  <div class="home">
    <app-header></app-header>
      <div class="el-container">
        <app-menu></app-menu>
        <div class="el-main">
          <router-view></router-view>
        </div>
      </div>
  </div>
</template>

<script>
import AppHeader from '@/components/home/app-header'
import AppMenu from '@/components/home/app-menu'
export default {
  data () {
    return {}
  },
  async mounted () {
  },
  components: {
    AppHeader,
    AppMenu
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  background: rgb(242,242,242);
  position: fixed;
  top: 60px;
  bottom: 0;
  .el-aside {
    height: 100%;
  }
  .el-main {
    padding: 0;
    position: fixed;
    left: 150px;
    right: 0;
    z-index: 1;
  }
}
</style>
