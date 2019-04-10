<template>
  <div class="home">
    <app-header></app-header>
    <div class="el-container">
      <!-- 一级菜单 -->
      <app-menu :menus='menus' :menuActive='menuIndex' @setMenuGroup='setMenuGroup' @showMenuGroup='showMenuGroup'></app-menu>
      <div class="el-main">
        <!-- 二级菜单 -->
        <ul
          v-show='isShowMenuGroup'
          class="menu_group"
          ref='menu_group'
          @mouseleave="hide"
          >
          <li
            class="menu_group_item"
            v-for='(item, i) in currentMenuGroup'
            :key='i'
            :class="{active: currentMenuGroupActive === i}"
            @click='handleMenGroup(i, item.name)'
            @mouseenter="changeMenuGroupActive(i)"
            >{{item.label}}</li>
        </ul>
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
      currentMenuGroupActive: 0,
      currentMenuGroup: [],
      // 当前展示的一级模块
      menuIndex: 0,
      // 鼠标当前所在的一级模块
      showMenuIndex: 0,
    }
  },
  created () {
    this.menus = menus
  },
  components: {
    AppHeader,
    AppMenu
  },
  methods: {
    // 一级菜单选中效果
    setMenuGroup (index) {
      this.menuIndex = index
    },
    // 点击二级菜单实现跳转至默认页面
    handleMenGroup(i, name) {
      this.currentMenuGroupActive = i
      this.menuIndex = this.showMenuIndex
      this.$router.push({ path: `/${menus[this.showMenuIndex].name}/${name}` })
    },
    // 鼠标移出，则二级菜单隐藏
    hide () {
      this.isShowMenuGroup = false
    },
    // 鼠标移入一级菜单，展示对应二级菜单
    showMenuGroup (index) {
      this.showMenuIndex = index
      this.isShowMenuGroup = true
      this.currentMenuGroup = menus[index].group
      this.$refs.menu_group.style.top = 41*index + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  background: #f3f3f3;
  position: fixed;
  top: 60px;
  .el-aside {
    height: 100%;
  }
  .el-main {
    padding: 0;
    position: fixed;
    left: 160px;
    top: 60px;
    bottom: 0;
    background: #f3f3f3;
    right: 0;
    z-index: 1;
    .menu_group {
      position: absolute;
      width: 150px;
      top: 0;
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
}
</style>
