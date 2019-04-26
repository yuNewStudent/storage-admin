<template>
  <message-box @closeMessageBox="Addsuppliers" :type="type" :btns="btns">
    <div class="content">
      <label>
        <span>*</span>供货单位:
      </label>
      <el-input  size="small" v-model="supplierInfo.supplier"></el-input>
      <label for>
        <span>*</span>供货地址:
      </label>
      <el-input size="small" v-model="supplierInfo.address"></el-input>
      <label for>
        <span>*</span>联系人:
      </label>
      <el-input size="small" v-model="supplierInfo.contact"></el-input>
      <label for>
        <span>*</span>联系电话:
      </label>
      <el-input size="small" v-model="supplierInfo.phone"></el-input>
    </div>
  </message-box>
</template>

<script>
import MessageBox from "@/components/MessageBox";
export default {
  props: ["type", "ediore"],
  data() {
    return {
      btns: {
        comfirm: "确定",
        cancel: "取消"
      },
      supplierInfo: {
        supplier: "",
        contact: "",
        address: "",
        phone: ""
      }
    };
  },
  components: {
    MessageBox
  },
  created() {
    console.log(this.ediore)
    // this.supplierInfo=this.ediore;
    if(this.ediore==undefined){
      return
    }else{
      if(this.ediore.supplier||''){
      this.supplierInfo=this.ediore;
      }else{
        return
      }
    }
  },
  methods: {
    Addsuppliers(bol) {
      if (bol) {
        if (this.ediore!=undefined) {
          // 信息不能为空
          for (var k in this.supplierInfo) {
            if (!this.supplierInfo[k]) {
              this.$message({
                message: "信息不能为空",
                type: "warning"
              });
              return;
            }
          }
          const loginUser = JSON.parse(this.$cookie.get('user'))
          // const data = {
          //   login_name: loginUser.name,
          //   login_email: loginUser.email,
          //   ...this.supplierInfo
          // }
          this.$http
            .post(`${config.httpBaseUrl}/man/upd_supplier/`, this.supplierInfo)
            .then(res => {
               if(res.status==1){
                      this.$message({
                        message: res.content,
                        type: 'success'
                      })
                    this.$emit('hideChangeSupplier')
                }else{
                   this.$message({
                      message: res.content,
                      type: 'warning'
                    })
                    this.$emit('hideChangeSupplier')
                  return
                }
            });
        } else {
          // 信息不能为空
          for (var k in this.supplierInfo) {
            if (!this.supplierInfo[k]) {
              this.$message({
                message: "信息不能为空",
                type: "warning"
              });
              return;
            }
          }
          // const loginUser = JSON.parse(this.$cookie.get('user'))
          // const data = {
          //   login_name: loginUser.name,
          //   login_email: loginUser.email,
          //   ...this.supplierInfo
          // }
          this.$http
            .post(`${config.httpBaseUrl}/man/add_supplier/`, this.supplierInfo)
            .then(res => {
                   if(res.status==1){
                      this.$message({
                        message: res.content,
                        type: 'success'
                      })
                    this.$emit('hideChangeSupplier')
                }else{
                   this.$message({
                      message: res.content,
                      type: 'warning'
                    })
                    this.$emit('hideChangeSupplier')
                  return
                }
            });
          // this.supplierInfo={};
        }
      } else {
        this.$emit("hideChangeSupplier");
      }
    }
  }
};
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

