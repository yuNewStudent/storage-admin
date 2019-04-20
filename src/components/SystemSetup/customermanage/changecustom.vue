<template>
  <message-box
    @closeMessageBox='changeCustom'
    :type='type'
    :btns='btns'>
    <div class="content">
      <label><span>*</span>供货单位:</label>
      <el-input size='small' v-model='supplierInfo.purchaser'></el-input>
      <label for=""><span>*</span>供货地选择:</label>
      <el-input
        v-model='supplierInfo.address'
        size='small'>
      </el-input>
      <label for=""><span>*</span>联系人:</label>
      <el-input
        size='small'
        v-model='supplierInfo.contact'></el-input>
      <label for=""><span>*</span>联系电话:</label>
      <el-input
        size='small'
        v-model='supplierInfo.phone'></el-input>
      <label for="">邮箱:</label>
      <el-input
        v-model="supplierInfo.email"
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
      supplierInfo: {
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
        for (let key in this.supplierInfo) {
          if (!this.supplierInfo[key]) {
            return this.$message({
              showClose: true,
              message: '警告! 客户信息不能有空,请完善信息提交',
              type: 'warning'
            })
          }
        }
        if (!comfim) { return }
        if (this.selectClient) {
          this.$emit("hideChangeCustom", this.supplierInfo, 'editor')
          // 修改服务器数据
          // this.$http.post(`${config.httpBaseUrl}/man/upd_client/`, client).then(res => {
          //   console.log(res)
          // })
        } else {
          this.$emit("hideChangeCustom", this.supplierInfo, 'add')
          // 服务器上新增客户
          // this.$http.post(`${config.httpBaseUrl}/man/add_client/`, client).then(res => {
          //   console.log(res)
          // })
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
      this.supplierInfo = this.selectClient.client
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

