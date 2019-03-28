<template>
  <div class="ProductCheck">
  	<nav-page :navs='navs'></nav-page>
  </div>
</template>

<script>
import NavPage from '@/components/nav-page'
export default {
  data () {
    return {
    	navs: [
	      '产品盘点',
	      '货物盘点',
	      '货物移库',
	      '仓库环境'
	    ]
    }
  },
  components: {
  	NavPage
  }
}
</script>