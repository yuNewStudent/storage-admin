<template>
  <message-box
    @closeMessageBox='delPerson'
    :type='type'
    :btns='btns'>
    <p class="content">你确定要删除{{selectUser.userInfo.name}}的相关信息吗?<br/>删除后系统不能恢复</p>
  </message-box>
</template>

<script>
import MessageBox from '@/components/MessageBox'
export default {
  props: ['type', 'selectUser'],
  data () {
    return {
      btns: {
        cancel: '取消', 
        comfirm: '确定'
      }
    }
  },
  methods: {
    delPerson (bol) {
      this.$emit("hideDelPerson", bol)
      // 服务器删除
      // this.$http.post(`${config.httpBaseUrl}/man/del_employee/`, {
      //   name: this.selectUser.userInfo.name,
      //   email: this.selectUser.userInfo.email
      // }).then(res => {
      //   if (res.content === "员工删除成功") {
      //     this.$message({
      //       message: '员工删除成功',
      //       type: 'success'
      //     })
      //   }
      // })
    }
  },
  components: {
    MessageBox
  }
}
</script>

<style lang="scss" scoped>
.content {
  line-height: 30px;
  font-size: 16px;
  color: #333;
  margin: 50px 100px;
}
</style>

