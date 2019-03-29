<template>
  <div class='menus_wrapper'>
    <ul class="menus">
      <li
        v-for='(item, index) in menus'
        :key='index'
        class="menus_item"
        :class="{active: menuActive === index}"
        @mouseenter='showMenuGroup(index)'
        @click='handleGroup(index, item.name)'
        @mouseleave="hideMenuGroup">
        <i :class="item.icon"></i>
        <span>{{item.title}}</span>
        <ul
          v-if='menuActive === index'
          class="menu_group"
          ref='menuGroup'
          >
          <li
            class="menu_group_item"
            v-for='(item, i) in currentMenuGroup'
            :key='i'
            :class="{active: currentMenuGroupActive === i}"
            @click='handleMenGroup(i, item.name)'
            >{{item.label}}</li>
        </ul>
      </li>
    </ul>
    
  </div>
</template>

<script>
import menus from '@/assets/js/menus'
export default {
  data () {
    return {
      menus: [],
      // 当前的选中的一级菜单，默认为0
      menuActive: 0,
      // 当前的二级菜单
      currentMenuGroup: [],
      // 当前的选中的二级菜单，默认为0
      currentMenuGroupActive: 0,
    }
  },
  methods: {
    // 选择不同的模块 跳转至不同界面
    handleGroup (index, name) {
      // 获取模块名字
      const title = menus[index].title
      this.$router.push({ path: `/${name}` })
    },
    
    // 鼠标放置一级模块上，显示子项
    showMenuGroup (index) {
      this.menuActive = index
      // 设置模块子项
      this.currentMenuGroup = menus[index].group
    },
    hideMenuGroup () {
      this.currentMenuGroupActive = 0
      this.currentMenuGroup = []
    },
    // 选择不同的二级模块 跳转至不同界面
    handleMenGroup (index, name) {
      this.currentMenuGroupActive = index
      this.$router.push({
        name
      })
    }
  },
  created () {
    this.menus = menus
  }
}
</script>

<style lang="scss" scoped>
.menus_wrapper {
  position: relative;
  width: 150px;
  z-index: 2;
  .menus {
    cursor: pointer;
    .menus_item {
      position: relative;
      margin-bottom: 2px;
      padding: 10px 10px;
      background: rgb(188,188,188);
      &.active {
        background: rgb(161,161,161);
      }
      .menu_group {
        position: absolute;
        width: 150px;
        top: 0;
        right: -150px;
        background: white;
        .menu_group_item {
          margin-bottom: 2px;
          padding: 10px 10px;
          border: 1px solid gray;
          &.active {
            background: rgb(161,161,161);
          }
        }
      }
    }
  }
  
}
</style>

