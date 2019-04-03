<template>
  <message-box
    @closeMessageBox='$emit("hideChangeSupplier")'
    :type='type'
    :btns='btns'>
    <div class="content">
      <label><span>*</span>供货单位:</label>
      <el-input size='small' v-model='supplierInfo.company'></el-input>
      <label for=""><span>*</span>供货地选择:</label>
      <el-select
        v-model='supplierInfo.address'
        placeholder="请选择"
        size='small'>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <label for=""><span>*</span>联系人:</label>
      <el-input
        size='small'
        v-model='supplierInfo.username'></el-input>
      <label for=""><span>*</span>联系电话:</label>
      <el-input
        size='small'
          v-model='supplierInfo.phone'></el-input>
      <label for="">传真:</label>
      <el-input
        v-model="supplierInfo.fox"
        size='small'></el-input>
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
        comfirm: '确定',
        cancel: '取消'
      },
      supplierInfo: {
        address: '',
        company: '',
        fox: '',
        username: '',
        phone: ''
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
  margin: 30px 30px 10px;
  label {
    font-size: 12px;
    margin: 0 0 5px;
    display: block;
    color: #aaa;
    font-size: 14px;
  }
  span {
    color: red;
    margin-right: 5px; 
  }
  .el-input {
    margin-bottom: 16px; 
  }
  .el-select {
    display: block;
    margin-bottom: 16px;
  }
}
</style>

