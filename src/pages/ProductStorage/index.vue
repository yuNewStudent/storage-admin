<template>
  <div class="ProductStorage">
  	<nav-page :navs='navs'></nav-page>
  </div>
</template>

<script>
import NavPage from '@/components/nav-page'
export default {
  data () {
    return {
    	navs: [
	      '填写订货单',
	      '采购入库',
	      '外借入库'
	    ]
    }
  },
  components: {
  	NavPage
  }
}
</script>

