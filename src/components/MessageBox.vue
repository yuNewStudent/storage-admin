<template>
	<div class="MessageBox">
		<div class="add_user_wrapper">
      <el-row class="header">系统管理>{{type}}</el-row>
      <slot></slot>
      <el-row class='footer'>
        <el-button size='medium ' type='primary' v-if='btns.reset'>重置</el-button>
        <el-button size='medium ' type='primary' v-if='!btns.reset' @click='handleCancel'>取消</el-button>
        <el-button size='medium ' type='primary' @click='handleSetting' ref='close'>确定</el-button>
      </el-row>
    </div>
    <div class="close" @click='handleCancel' v-if='btns.reset'>
    	<img src="@/assets/icon/系统管理-人员管理/取消圆弧.png" alt="">
      <span>X</span>
    </div>
	</div>
</template>

<script>
export default {
  props: ['type', 'btns', 'right'],
	data () {
		return {}
  },
  methods: {
    //取消
    handleCancel () {
      this.$emit("closeMessageBox", false)
    },
    
    //确定
    handleSetting () {
      this.$emit("closeMessageBox", true)
    }
  },
  mounted () {
    this.$nextTick(() => {
      console.log( this.$refs.close)
      if (this.right) {
        this.$refs.close.$el.style['margin-right'] = this.right - 20 + 'px'
      } 
    })
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
  z-index: 3;
  border-radius: 10px;
	.add_user_wrapper {
    width: 550px;
    margin: 70px auto 0;
    background: white;
    .header {
      background: #4499f2;
      font-size: 14px;
      color: white;
      line-height: 50px;
      padding: 0 20px;
    }
    .user_name {
      margin: 30px 30px 0;
      label {
        font-size: 12px;
        margin: 0 0 5px;
        display: inline-block;
        text-indent: 10px;
        color: #aaa;
        font-size: 14px;
      }
      .el-input {
        margin-bottom: 16px; 
      }
      .el-select {
        display: block;
        margin-bottom: 16px;
      }
      .radio_wrapper {
        > span {
          text-indent: 10px;
          color: #aaa;
          font-size: 14px;
        }
      }
    }
    .footer {
      text-align: right;
      padding: 0px 30px 20px;
    }
  }
  .close {
    text-align: center;
    position: relative;
    img {
      width: 550px;
    }
    span {
      cursor: pointer;
      position: absolute;
      left: 50%;
      margin-left: -13px;
      border-radius: 50%;
      width: 25px;
      line-height: 25px;
      background: white;
      font-size: 13px;
      border: 1px solid rgb(190,190,190);
      color: rgb(190,190,190);
    }
  }
}
</style>