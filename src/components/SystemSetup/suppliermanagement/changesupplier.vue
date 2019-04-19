<template>
  <message-box @closeMessageBox="Addsuppliers" :type="type" :btns="btns">
    <div class="content">
      <label>
        <span>*</span>供货单位:
      </label>
      <el-input size="small" v-model="supplierInfo.purchaser"></el-input>
      <label for>
        <span>*</span>供货地选择:
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
      <!-- <label for="">传真:</label>
      <el-input
        v-model="supplierInfo.fox"
      size='small'></el-input>-->
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
        purchaser: "",
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
    // console.log(this.ediore)
    // this.supplierInfo=this.ediore;
    if (this.ediore) {
      this.supplierInfo = this.ediore;
    } else {
      return;
    }
  },
  methods: {
    Addsuppliers(bol) {
      if (bol) {
        if (this.ediore.purchaser) {
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
          this.$http
            .post(`${config.httpBaseUrl}/man/upd_client/`, {
              supplierInfo: this.supplierInfo
            })
            .then(res => {
              this.$http
                .post(`${config.httpBaseUrl}/man/get_supplier/`, {
                  supplier: "",
                  address: ""
                })
                .then(res => {
                  console.log(res);
                  this.$emit("hideChangeSupplier", this.supplierInfo);
                });
            });
          this.$emit("hideChangeSupplier", this.supplierInfo);
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
          this.$http
            .post(`${config.httpBaseUrl}/man/add_supplier/`, {
              supplierInfo: this.supplierInfo
            })
            .then(res => {
              this.$http
                .post(`${config.httpBaseUrl}/man/get_supplier/`, {
                  supplier: "",
                  address: ""
                })
                .then(res => {
                  console.log(res);
                  this.$emit("hideChangeSupplier", this.supplierInfo);
                });
            });
          this.$emit("hideChangeSupplier", this.supplierInfo);
          // this.supplierInfo={};
        }
        console.log();
      } else {
        this.supplierInfo = {};
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

