<template>
  <div class="SystemQuery">
  	<nav-page :navs='navs'></nav-page>
  </div>
</template>

<script>
import NavPage from '@/components/nav-page'
export default {
  data () {
    return {
    	navs: [
	      '采购单查询',
	      '归还入库查询',
	      '出库单查询',
	      '库存查询',
	      '移库查询'
	    ]
    }
  },
  components: {
  	NavPage
  }
}
</script>