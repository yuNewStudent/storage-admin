<template>
	<div class="MessageBox">
		<div class="add_user_wrapper">
      <el-row class="header">系统管理/人员设置/新增</el-row>
      <slot></slot>
      <el-row class='footer'>
        <el-button size='small' type='primary'>重置</el-button>
        <el-button size='small' type='primary'>确定</el-button>
      </el-row>
    </div>
    <div class="close" @click='$emit("closeMessageBox")'>
    	<span>X</span>
    </div>
	</div>
</template>

<script>
export default {
	data () {
		return {}
	},
  components: {
  }
}
</script>

<style lang="scss" scoped>
.MessageBox {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0,0,0,.5);
	.add_user_wrapper {
    width: 40%;
    hieght: 500px;
    margin: 60px auto 0;
    background: white;
    .header {
      background: rgb(240,240,240);
      font-size: 14px;
      line-height: 40px;
      padding: 0 10px;
    }
    .user_name {
      margin: 0 30px;
      label {
        font-size: 12px;
        margin: 15px 0 10px;
        display: inline-block;
      }
      .el-select {
        display: block;
      }
    }
    .footer {
      text-align: right;
      padding: 20px 20px;
    }
  }
  .close {
    text-align: center;
    span {
      display: inline-block;
      border-radius: 50%;
      width: 20px;
      line-height: 20px;
      background: white;
      margin-top: 10px;
    }
  }
}
</style>