<template>
  <message-box
    @closeMessageBox='changePerson'
    @reset='resetInput'
    :type='type'
    :btns='btns'>
    <div class="user_name">
      <label>姓名:</label>
      <el-input
        size='small'
        v-model="userInfo.name"></el-input>
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
      <label><span style='color: red'>*</span>邮箱:</label>
      <el-input
        size='small'
        v-model="userInfo.email"></el-input>
      <label>联系电话:</label>
      <el-input
        size='small'
        v-model="userInfo.phone"></el-input>
      <p class="radio_wrapper">
        <span>是否为部门负责人:</span>
        <el-radio v-model="userInfo.is_leader" label="1">是</el-radio>
        <el-radio v-model="userInfo.is_leader" label="0">否</el-radio>
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
        name: '',
        department: '',
        phone: '',
        email: '',
        is_leader: ''
      }
    }
  },
  components: {
    MessageBox
  },
  methods: {
    changePerson (bol) {
      console.log(bol, this.userInfo)
      if (bol) {
        // 信息不能为空
        for (var k in this.userInfo) {
          if (!this.userInfo[k]) {
            this.$message({
              message: '信息不能为空',
              type: 'warning'
            })
            return
          }
        }
        this.$emit('hideChangePerson', this.userInfo)
      } else {
        this.$emit("hideChangePerson")
      }
    },
    // 重置输入框
    resetInput () {
      this.userInfo = {
        name: '',
        department: '',
        phone: '',
        email: '',
        is_leader: ''
      }
    }
  },
  created () {
    console.log(this.selectUser)
    this.userInfo = this.selectUser.userInfo
    // 获取部门列表
    // this.$http.post(`${config.httpBaseUrl}/man/get_department/`).then(res => {
    //   console.log(res)
    //   this.departmentData = res.data
    // })
  }
}
</script>

<style lang="scss" scoped>
.user_name {
  margin: 20px 30px 0;
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
    height: 30px;
    > span {
      text-indent: 10px;
      color: #aaa;
      font-size: 14px;
    }
  }
}
</style>

