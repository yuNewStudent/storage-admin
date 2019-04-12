<template>
  <message-box
    @closeMessageBox='$emit("hideChangeStorage")'
    :type='type'
    :btns='btns'>
    <div class="content">
      <!-- <label>仓库编号:</label>
      <el-input size='large'></el-input> -->
      <label>仓库名称:</label>
      <el-input size='large'></el-input>
      <label>仓库货位:</label>
      <el-input size='large'></el-input>
    </div>
  </message-box>
</template>

<script>
import MessageBox from '@/components/MessageBox'
export default {
  props: ['type'],
  data () {
    return {
      btns: {
        cancel: '取消', 
        comfirm: '确定'
      }
    }
  },
  components: {
    MessageBox
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin: 30px;
  label {
    font-size: 12px;
    margin: 0 0 5px;
    display: inline-block;
    color: #aaa;
    font-size: 14px;
  }
  .el-input {
    margin-bottom: 16px; 
  }
}
</style>

