<template>
  <message-box
    @closeMessageBox='changePerson'
    :type='type'
    :btns='btns'>
    <div class="user_name">
      <label>姓名:</label>
      <el-input
        size='small'
        v-model="userInfo.username"></el-input>
      <label>所属部门:</label>
      <el-select
        v-model="userInfo.department"
        placeholder="请选择"
        size='small'>
        <el-option
          v-for="item in departmentData"
          :key="item.部门编号"
          :label="item.部门名称"
          :value="item.部门编号">
        </el-option>
      </el-select>
      <label><span style='color: red'>*</span>登录账户:</label>
      <el-input
        size='small'
        v-model="userInfo.loginName"></el-input>
      <label>联系电话:</label>
      <el-input
        size='small'
        v-model="userInfo.phone"></el-input>
      <p class="radio_wrapper">
        <span>是否为部门负责人:</span>
        <el-radio v-model="userInfo.isLeader" label="true">是</el-radio>
        <el-radio v-model="userInfo.isLeader" label="false">否</el-radio>
      </p>
    </div>
  </message-box>
</template>

<script>
import MessageBox from '@/components/MessageBox'
export default {
  props: ['type', 'selectUser'],
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
      btns: {
        reset: '重置', 
        comfirm: '确定',
        cancel: '取消'
      },
      userInfo: {
        username: '',
        department: '',
        phone: '',
        loginName: '',
        isLeader: '',
      }
    }
  },
  components: {
    MessageBox
  },
  methods: {
    changePerson (bol) {
      if (bol) {
        this.$emit("hideChangePerson", this.userInfo)
      } else {
        this.$emit("hideChangePerson")
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

