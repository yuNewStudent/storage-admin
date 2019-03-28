<template>
  <div class="nav_page">
  	<ul class="navs_wrapper">
  		<li
  		  class="nav"
  		  v-for='(item, index) in navs'
  		  :key='index'>
  		  	<p class="icon"></p>
  		  	<p class="project_item">{{item}}</p>
  		  </li>
  	</ul>
  </div>
</template>

<script>
import NavPage from '@/components/nav-page'
export default {
  props: ['navs'],
  data () {
    return {}
  },
  components: {
  	NavPage
  }
}
</script>

<style lang='scss'>
.nav_page {
	.navs_wrapper {
		width: 500px;
		margin: 30px auto;
		.nav {
			display: inline-block;
			margin: 20px 30px;
			.icon {
				display: inline-block;
				border: 1px solid gray;
				width: 100px;
				height: 70px;
			}
			.project_item {
		    text-align: center;
				margin-top: 20px;
			}
		}
	}
}
</style>