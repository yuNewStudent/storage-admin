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
          :key="item.id"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
      <label><span style='color: red'>*</span>邮箱:</label>
      <el-input
        size='small'
        :disabled='this.selectUser && true'
        v-model="userInfo.email"></el-input>
      <label>联系电话:</label>
      <el-input
        size='small'
        v-model="userInfo.phone"></el-input>
      <p class="radio_wrapper">
        <span>是否为部门负责人:</span>
        <el-radio v-model="userInfo.is_leader" label=1>是</el-radio>
        <el-radio v-model="userInfo.is_leader" label=0>否</el-radio>
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
          id: 1,
          name: '行政部'
        },{
          id: 2,
          name: '财务部'
        },{
          id: 3,
          name: '设计部'
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
        is_leader: 0
      }
    }
  },
  components: {
    MessageBox
  },
  methods: {
    changePerson (bol) {
      if (bol) {
        // 信息不能为空
        for (var k in this.userInfo) {
          if (!(this.userInfo[k] + '')) {
            if (k !== 'phone') {
            this.$message({
              message: '信息不能为空',
              type: 'warning'
            })
            return
             }
          }
        }
        // 修改人员
        if (this.selectUser) {
          // 修改人员
          // 服务器修改
          const loginUser = JSON.parse(this.$cookie.get('user'))
          const data = {
            // login_name: loginUser.name,
            // login_email:loginUser.email,
            ...this.userInfo
          }
          this.$http.post(`${config.httpBaseUrl}/man/upd_employee/`, data).then(res => {
            if (res.status === 1) {
              this.$message({
                message: '人员信息修改成功',
                type: 'success'
              })
            }
          })
          this.$emit('hideChangePerson', this.userInfo, 'editor')
        } else {
          // 新增人员
          // 服务器新增
          const loginUser = JSON.parse(this.$cookie.get('user'))
          const data = {
            // login_name: loginUser.name,
            // login_email:loginUser.email,
            ...this.userInfo
          }
          this.$http.post(`${config.httpBaseUrl}/man/add_employee/`, data).then(res => {
            if (res.content === "员工添加成功") {
              this.$message({
                message: '人员新增成功',
                type: 'success'
              })
            }
          })
          this.$emit('hideChangePerson', this.userInfo)
        }
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
    // 如果是修改人员
    if (this.selectUser) {
      this.userInfo = this.selectUser.userInfo
      this.userInfo.is_leader = this.userInfo.is_leader + ''
    }
    // 获取部门列表
    this.$http.post(`${config.httpBaseUrl}/man/get_department/`).then(res => {
      if (res.status === 1) {
        this.departmentData = res.content
      }
    })
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

