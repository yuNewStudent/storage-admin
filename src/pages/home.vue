<template>
  <div class="home">
    <app-header></app-header>
    <div class="el-container">
      <app-menu :menus='menus' :menuActive='menuIndex' @setMenuGroup='setMenuGroup'></app-menu>
      <div class="el-main">
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
export default {
  data () {
    name: 'home'
    return {
      isShowMenuGroup: false,
      currentMenuGroupActive: 0,
      currentMenuGroup: [],
      menuIndex: 0
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
    setMenuGroup (index) {
      this.menuIndex = index
      this.isShowMenuGroup = true
      this.currentMenuGroup = menus[index].group
      this.$refs.menu_group.style.top = 41*index + 'px'
    },
    handleMenGroup(i, name) {
      this.currentMenuGroupActive = i
      this.$router.push({ path: `/${menus[this.menuIndex].name}/${name}` })
    },
    changeMenuGroupActive (index) {
    },
    hide () {
      this.isShowMenuGroup = false
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
