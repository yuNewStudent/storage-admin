<template>
  <div class='menus_wrapper'>
    <ul class="menus">
      <li
        v-for='(item, index) in menus'
        :key='index'
        class="menus_item"
        :class="{active: menuActive === index}"
        @click='handleMenu(index)'>
        <i :class="item.icon"></i>
        <span>{{item.title}}</span>
      </li>
    </ul>
    <ul class="menu_group">
      <li
        class="menu_group_item"
        v-for='(item, index) in currentMenuGroup'
        :key='index'
        >{{item}}</li>
    </ul>
  </div>
</template>

<script>
import menus from '@/assets/js/menus'
export default {
  data () {
    return {
      menus: [],
      currentMenuGroup: [],
      menuActive: 0
    }
  },
  methods: {
    // 选择不同的模块 跳转至不同界面
    handleMenu (index) {
      // 获取模块名字
      const title = menus[index].title
      // 设置模块子项
      this.currentMenuGroup = menus[index].group
      this.menuActive = index
      switch (title) {
        case '系统管理':
          this.$router.push({ path: '/systemsetup' })
          break
        case '产品入库':
          this.$router.push({ path: '/productstorage' })
          break
        case '产品出库':
          this.$router.push({ path: '/productexit' })
          break
        case '产品盘点':
          this.$router.push({ path: '/productcheck' })
          break
        default:
          this.$router.push({ path: '/systemquery' })
      }
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
  width: 200px;
  .menus {
    cursor: pointer;
    .menus_item {
      margin-bottom: 2px;
      padding: 10px 10px;
      background: rgb(188,188,188);
      &.active {
        background: rgb(161,161,161);
      }
    }
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
    }
  }
}
</style>

