<template>
  <message-box
    @closeMessageBox='changeCustom'
    :type='type'
    :btns='btns'>
    <div class="content">
      <label><span>*</span>收货单位:</label>
      <el-input size='small' v-model='client.purchaser'></el-input>
      <label for=""><span>*</span>收货单位地址:</label>
      <el-input
        v-model='client.address'
        size='small'>
      </el-input>
      <label for=""><span>*</span>联系人:</label>
      <el-input
        size='small'
        v-model='client.contact'></el-input>
      <label for=""><span>*</span>联系电话:</label>
      <el-input
        size='small'
        v-model='client.phone'></el-input>
      <label for="">邮箱:</label>
      <el-input
        v-model="client.email"
        size='small'></el-input>
    </div>
  </message-box>
</template>

<script>
import MessageBox from '@/components/MessageBox'
export default {
  props: ['type', 'selectClient'],
  data () {
    return {
      btns: {
        comfirm: '确定',
        cancel: '取消'
      },
      client: {
        address: '',
        purchaser: '',
        contact: '',
        phone: '',
        email: ''
      }
    }
  },
  components: {
    MessageBox
  },
  methods: {
    changeCustom (bol) {
      if (bol) {
        // 输入框不能为空
        for (let key in this.client) {
          if (k !== 'email') {
            this.$message({
              message: '信息不能为空',
              type: 'warning'
            })
            return
          }
        }
        if (this.selectClient) {
          // 修改服务器数据
          this.$http.post(`${config.httpBaseUrl}/man/upd_client/`, this.client).then(res => {
            if (res.status == 1) {
              this.$emit("hideChangeCustom", this.client)
              this.$message({
                showClose: true,
                message:res.content,
                type: 'success'
              })
            }
          })
        } else {
          // 服务器上新增客户
          this.$http.post(`${config.httpBaseUrl}/man/add_client/`, this.client).then(res => {
            if (res.status == 1) {
               this.$emit("hideChangeCustom")
              this.$message({
                showClose: true,
                message: res.content,
                type: 'success'
              })
            }
          })
        }
      } else {
        this.$emit("hideChangeCustom")
      }
    }
  },
  created () {
    // 如果是修改客户
    if (this.selectClient) {
      console.log(1)
      this.client = this.selectClient.client
    }
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

