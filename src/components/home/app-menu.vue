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
      </li>
    </ul>
    
  </div>
</template>

<script>
export default {
  props: ['menus', 'menuActive'],
  data () {
    return {
      // 当前的选中的一级菜单，默认为0
      // menuActive: 0,
      // 当前的二级菜单
      currentMenuGroup: [],
      // 当前的选中的二级菜单，默认为0
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
      
      this.menuActive = index
      const title = this.menus[index].title
      this.$router.push({ path: `/${name}` })
    },
    
    // 鼠标放置一级模块上，显示子项
    showMenuGroup (index) {
      // 设置模块子项
      this.currentMenuGroup = this.menus[index].group
      // 
      this.$emit('setMenuGroup', index)
    },
    hideMenuGroup () {
      this.currentMenuGroupActive = 0
      this.currentMenuGroup = []
    }
  },
  created () {
    console.log(this.menus)
  }
}
</script>

<style lang="scss" scoped>
.menus_wrapper {
  position: relative;
  width: 160px;
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
      z-index: 1;
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

