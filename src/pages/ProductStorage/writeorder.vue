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
          :data="tableData"
          border
          size='small'
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column label='供应商'>
            <template slot-scope="scope">
              <el-select v-model="orders[scope.$index].supplier" filterable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="商品类别">
            <template slot-scope="scope">
              <el-select v-model="orders[scope.$index].category" filterable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="商品名称">
            <template slot-scope="scope">
              <el-select v-model="orders[scope.$index].goods_name" filterable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
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
          <!-- <el-table-column label="所在仓库">
            <template slot-scope="scope">
              <el-select v-model="orders[scope.$index].goodsStorage" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </template>
          </el-table-column> -->
          <el-table-column label="申请人">
            <template slot-scope="scope">
              <el-input v-model="orders[scope.$index].applicant"></el-input>
            </template>
          </el-table-column>
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
          <el-table-column label="回退理由">
          </el-table-column>
        </el-table>
        <el-row class='add_row'>
          <el-button type='primary' @click='addRow'>新增行</el-button>
        </el-row>
      </div>
      
    </el-main>
  </div>
</template>

<script>
import outputTable from '@/assets/js/outputTable'
export default {
  data() {
    return {
      tableData: [{}],
      options: [
        {
          value: "选项1",
          label: "四川省经济贸易公司"
        },
        {
          value: "选项2",
          label: "四川棋照科技有限公司"
        },
        {
          value: "选项3",
          label: "攀枝花攀钢公司"
        },
        {
          value: "选项4",
          label: "阿里巴巴有限公司"
        },
        {
          value: "选项5",
          label: "北京经贸技校公司"
        }
      ],
      writeDate: '',
      SupplyCompany: '',
      orders: [
        {
          supplier: '',
          category: '',
          goods_name: '',
          apply_number: '',
          unit: '',
          estimated_price: '',
          estimated_money: '',
          applicant: '',
          purpose: '',
          apply_comment: '',
          apply_datetime:'',
        }
      ],
      allOrders: [
        {
          date: "哈哈哈",
          name: "王小虎",
          address: "1518 弄"
        },
        {
          date: "话啊哈哈哈",
          name: "王小虎",
          address: "1517 弄"
        }
      ]
    };
  },
  components: {},
  methods:{
    handleSave () {
      this.comfirm()
    },
    handleOut () {
      outputTable(tableData)
    },
    handleCheck () {

    },
    addRow () {
      this.tableData.push({})
      this.orders.push(
        {
          goodsCategory: '',
          goodsName: '',
          goodsNum: '',
          goodsPart: '',
          goodsStorage: '',
          operatorUser: '',
          purpose: '',
          remark: ''
        }
      )
    },
    comfirm () {
      this.$confirm('请确认你填入的信息是否正确后, 再进行提交?', '提示', {
        confirmButtonText: '提交',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
         this.$http.post('${config.httpBaseUrl}/medicine/add_in_storage_receipt/',{
           orders:this.orders
         }).then(res=>{
            this.options=res.data.allgoods;
          })
        this.$message({
          type: 'success',
          message: '提交成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        })         
      })
    }
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
  .add_row {
    text-align: right;
    margin-top: 10px;
  }
}
</style>
