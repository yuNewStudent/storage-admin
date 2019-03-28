<template>
  <div class="SystemSetup">
  	<!-- <nav-page :navs='navs'></nav-page> -->
    <router-view></router-view>
  </div>
</template>

<script>
import NavPage from '@/components/nav-page'
export default {
  data () {
    return {
    	navs: [
	      '人员管理',
	      '商品管理',
	      '仓库管理',
	      '供应商管理',
	      '客户管理'
	    ]
    }
  },
  components: {
  	NavPage
  }
}
</script>

