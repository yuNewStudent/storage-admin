<template>
  <div class="writeorder">
    <el-header>
      <el-row class="btns">
        <el-button type="primary" size="medium" @click="handleSave">保存</el-button>
        <el-button type="primary" size="medium" @click="handleOut">导出</el-button>
      </el-row>
    </el-header>
    <el-main class="writeorder_list">
      <div class="write_order_wrapper">
        <el-table
          :data="orders"
          border
          size='small'
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column label='供应商' width='230'>
            <template slot-scope="scope">
              <el-select v-model="orders[scope.$index].supplier" width='200' filterable placeholder="请选择">
                <el-option
                  v-for="item in suppliers"
                  :key="item.value"
                  :label="item.supplier"
                  :value="item.supplier">
                </el-option>
              </el-select>
              <el-button @click='handleAddSupplier'>+</el-button>
            </template>
          </el-table-column>
          <el-table-column label="商品类别" width='170'>
            <template slot-scope="scope">
              <el-select v-model="orders[scope.$index].category" filterable placeholder="请选择">
                <el-option
                  v-for="item in categories"
                  :key="item.value"
                  :label="item.category"
                  :value="item.category">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" width='170'>
            <template slot-scope="scope">
              <el-select @focus='getGoods(scope.row.category)' v-model="orders[scope.$index].goods_name" filterable placeholder="请选择">
                <el-option
                  v-for="item in goodses"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="申请采购数量">
            <template slot-scope="scope">
              <el-input v-model="orders[scope.$index].apply_number"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="单位">
            
            <template slot-scope="scope">
              <el-input v-model="orders[scope.$index].unit"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="商品预估单价">
            <template slot-scope="scope">
              <el-input v-model="orders[scope.$index].estimated_price"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="商品预估总价">
            <template slot-scope="scope">
              <el-input v-model="orders[scope.$index].estimated_money"></el-input>
            </template>
          </el-table-column>
          <!-- <el-table-column label="申请人">
            <template slot-scope="scope">
              <el-input v-model="orders[scope.$index].applicant"></el-input>
            </template>
          </el-table-column> -->
          <el-table-column label="用途">
            <template slot-scope="scope">
              <el-input v-model="orders[scope.$index].purpose"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="备注">
            <template slot-scope="scope">
              <el-input v-model="orders[scope.$index].apply_comment"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="回退理由" v-if='isEditor' prop='reason_return'>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope"> 
              <el-button type='primary' @click='handleDel(scope.$index)'>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row class='add_row' v-if="!isEditor">
          <el-button type='primary' @click='addRow'>新增行</el-button>
        </el-row>
      </div>
    </el-main>
    <add-supplier
      :type='type'
      v-if='isShowAddSupplier'
      @hideChangeSupplier='addSupplier'></add-supplier>
  </div>
</template>

<script>
import outputTable from '@/assets/js/outputTable'
import AddSupplier from '@/components/SystemSetup/suppliermanagement/changesupplier'
export default {
  data() {
    return {
      type: '供应商管理>新增',
      // 供应商
      suppliers: [
        // "四川省经济贸易公司",
        // "四川棋照科技有限公司"
      ],
      // 商品类别
      categories: [
        // {
        //   id: "001",
        //   category: "商品类别"
        // },
        // {
        //   id: "002",
        //   category: "商品类别"
        // },
        // {
        //   id: "003",
        //   category: "商品类别"
        // }
      ],
      // 商品名称
      goodses: [
        // {
        //   value: "选项1",
        //   label: "四川省经济贸易公司"
        // },
        // {
        //   value: "选项2",
        //   label: "四川棋照科技有限公司"
        // },
        // {
        //   value: "选项3",
        //   label: "攀枝花攀钢公司"
        // }
      ],
      writeDate: '',
      orders: [
        {
          supplier: '',
          category: '',
          goods_name: '',
          apply_number: '',
          unit: '',
          estimated_price: '',
          estimated_money: '',
          // applicant: '',
          purpose: '',
          apply_comment: '',
        }
      ],
      isEditor: false,
      isShowAddSupplier: false
    };
  },
  components: {
    AddSupplier
  },
  methods:{
    handleSave () {
      this.comfirm()
    },
    handleOut () {
      outputTable(tableData)
    },
    // 跳转至新增供应商页面
    handleAddSupplier () {
      this.isShowAddSupplier = true
    },
    // 删除填写信息
    handleDel (index) {
      this.orders.splice(index, 1)
    },
    addSupplier (supplier) {
      // 本地新增
      // 服务器新增
      // 重新获取供应商
      this.isShowAddSupplier = false
      this.getSuppliers()
    },
    addRow () {
      this.orders.push(
        {
          supplier: '',
          category: '',
          apply_numberapply_number: '',
          unit: '',
          estimated_price: '',
          estimated_money: '',
          // applicant: '',
          purpose: '',
          apply_comment: ''
        }
      )
    },
    comfirm () {
      let multipleSelection=[];
      this.$confirm('请确认你填入的信息是否正确后, 再进行提交?', '提示', {
        confirmButtonText: '提交',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 信息不能有空
        let apply_datetime = this.moment(new Date()).format('YYYY-MM-DD');
        var user = JSON.parse(this.$cookie.get('user')||'{}');
        this.orders.map(item => {
          item.apply_datetime = apply_datetime;
          item.applicant=user.name;
        })
        if(this.$route.params.receipt_no){
           multipleSelection = this.orders.map(v => {
              v.receipt_no = this.$route.params.receipt_no;
              return v;
            })
        }else{
           multipleSelection=this.orders;
        }
        this.$http.post(`${config.httpBaseUrl}/medicine/add_inStorageReceipt/`,
          multipleSelection
        ).then(res=>{
          if (res.status === 0) {
            this.$message({
              type: 'error',
              message: res.content
            })
          } else {
            this.orders = [{
              supplier: '',
              category: '',
              apply_numberapply_number: '',
              unit: '',
              estimated_price: '',
              estimated_money: '',
              // applicant: '',
              purpose: '',
              apply_comment: ''
            }]
            this.$message({
              type: 'success',
              message:res.content
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        })         
      })
    },
    getSuppliers () {
      this.$http.post(`${config.httpBaseUrl}/man/get_all_supplier/`).then(res => {
        if (res.status === 1) {
          this.suppliers = res.content
        }
      })
    },
    getGoods (category) {
      // 获取所有的商品名称
      this.$http.post(`${config.httpBaseUrl}/medicine/get_all_goods/`, {
        category: category
      }).then(res => {
        if (res.status === 1) {
          this.goodses = res.content
        }
      })
    }
  },
  created () {
    // 如果是修改订单
    if (this.$route.params.receipt_no) {
      const receipt_no = this.$route.params.receipt_no
      this.isEditor = true
      this.$http.post(`${config.httpBaseUrl}/medicine/get_abnormalInReceipt/`,{
        receipt_no
      }).then(res=>{
        this.orders = res.content
      })
    }
    // 获取所有的商品类别
    this.$http.post(`${config.httpBaseUrl}/medicine/get_all_category/`).then(res => {
      if (res.status === 1) {
        this.categories = res.content
      }
    })
    // 获取所有供应商
    this.getSuppliers()
  }
};
</script>
<style lang="scss" scoped>
.writeorder {
  margin: 20px 30px;
  .el-header {
    padding: 0;
    .el-row {
      margin: 10px 0;
      line-height: 36px;
      .order_num {
        color: #777777;
        span {
          border-bottom: 1px solid #777777;
        }
      }
    }
  }
  .el-main {
    padding: 0;
    input {
      border: none;
    }
  }
}
.btns {
  text-align: right;

}
.writeorder_list {
  .write_order_wrapper {
    .el-table {
      .el-select {
        width: 150px;
      }
    }
  }
  .add_row {
    text-align: right;
    margin-top: 10px;
  }
}
</style>
