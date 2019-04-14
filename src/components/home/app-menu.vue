<template>
  <el-menu
    background-color='#0b223a'
    text-color="#fff"
    active-text-color="#ffd04b"
    unique-opened='true'>
    <el-submenu
      v-for='(menu, index) in menus'
      :index="menu.name"
      :key='index'
      >
      <template slot="title">
        <img :src="images[index].src" alt="">
        <span>{{menu.title}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          v-for='(item, i) in menu.group'
          :key='i'
          @click='hnadle(menu.name, item.name)'
          :index="item.name">{{item.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  props: ['menus'],
  data () {
    return {
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
    hnadle(faName, sonName){
      console.log(faName, sonName)
      this.$router.push({path: `/${faName}/${sonName}`})
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  width: 18px;
  margin-right: 10px;
}
</style>

