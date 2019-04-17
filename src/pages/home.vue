<template>
  <div class="home">
    <app-header></app-header>
    <div class="el-container">
      <!-- 菜单栏 -->
      <app-menu :menus='menus'></app-menu>
      <div class="el-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import menus from '@/assets/js/menus'
import AppHeader from '@/components/home/app-header'
import AppMenu from '@/components/home/app-menu'
import { constants } from 'fs';
export default {
  data () {
    name: 'home'
    return {
      isShowMenuGroup: false,
      menus: [],
      
    }
  },
  created () {
    this.menus = menus
    // 发送http请求
    console.log(config)
    this.$http.get(`${config.httpBaseUrl}/man/add_department/`)
      .then(res => {
        console.log(res)
      })
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
  background: #f3f3f3;
  position: fixed;
  top: 60px;
  bottom: 0;
  .el-menu {
    width: 200px;
  }
  .el-aside {
    height: 100%;
  }
  .el-main {
    padding: 0;
    position: fixed;
    left: 200px;
    top: 60px;
    bottom: 0;
    background: #f3f3f3;
    right: 0;
    z-index: 1;
    
  }
  .menu_group {
      position: absolute;
      width: 150px;
      top: 0;
      left: 160px;
      background: rgb(135,186,239);
       cursor: pointer;
      z-index: 2;
      .menu_group_item {
        padding: 0 10px;
        height: 40px;
        line-height: 40px;
        &.active {
          background: rgb(170,210,251);
        }
      }
    }
}
</style>
