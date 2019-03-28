<template>
  <div class="ProductExit">
  	<nav-page :navs='navs'></nav-page>
  </div>
</template>

<script>
import NavPage from '@/components/nav-page'
export default {
  data () {
    return {
    	navs: [
	      '填写出库单',
	      '商品出库'
	    ]
    }
  },
  components: {
  	NavPage
  }
}
</script>