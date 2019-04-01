<template>
  <message-box
    @closeMessageBox='$emit("hideChangePerson")'
    :type='type'
    :btns='btns'>
    <div class="user_name">
      <label for="name">姓名:</label>
      <el-input id='name' size='small'></el-input>
      <label for="">所属部门:</label>
      <el-select
        v-model="value"
        placeholder="请选择"
        size='small'>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <label for=""><span style='color: red'>*</span>登录账户:</label>
      <el-input
        size='small'></el-input>
      <label for="">联系电话:</label>
      <el-input
        size='small'></el-input>
      <p class="radio_wrapper">
        <span>是否为部门负责人:</span>
        <el-radio v-model="radio" label="1">是</el-radio>
        <el-radio v-model="radio" label="2">否</el-radio>
      </p>
    </div>
  </message-box>
</template>

<script>
import MessageBox from '@/components/MessageBox'
export default {
  props: ['type'],
  data () {
    return {
      departmentData: [
        {
          部门编号: 1,
          部门名称: '行政部'
        },{
          部门编号: 2,
          部门名称: '财务部'
        },{
          部门编号: 3,
          部门名称: '设计部'
        }
      ],
      radio: '',
      btns: {
        reset: '重置', 
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
</style>

