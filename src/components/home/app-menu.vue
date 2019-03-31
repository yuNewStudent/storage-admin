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
        <img :src="images[index].src" alt="">
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
      images: [
        { src: require('@/assets/icon/系统管理ic.png') },
        { src: require('@/assets/icon/产品入库ic.png') },
        { src: require('@/assets/icon/产品出库ic.png') },
        { src: require('@/assets/icon/商品盘存ic.png') },
        { src: require('@/assets/icon/系统查询ic.png') }
      ]
    }
  },
  methods: {
    getUrl (name) {
      return `../../assets/icon/${name}ic.png`
      console.log(url)
    },
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
      const title = menus[this.menuActive].name
      this.$router.push({ path: `/${title}/${name}` })
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
  width: 160px;
  z-index: 2;
  .menus {
    cursor: pointer;
    .menus_item {
      position: relative;
      border-bottom: 1px solid white; 
      padding: 0 30px;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      background: #0b223a;
      color: white;
      img {
        width: 14px;
        vertical-align: top;
        margin-top: 13px;
        margin-right: 2px;
      }
      &.active {
        background: #4499f2;
      }
      > span {
        letter-spacing: 2px;
      }
      .menu_group {
        position: absolute;
        width: 150px;
        top: 0;
        right: -150px;
        background: rgb(135,186,239);
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
  
}
</style>

