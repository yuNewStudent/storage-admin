<template>
  <div class="writewarehousereceipt">
    <div style="clear: both;"></div>
    <div class="writewarehousereceipt_operation">
      <div class="writewarehousereceipt_operationr">
        <el-row>
          <el-button type="primary" size="medium" @click="handleSave">保存</el-button>
          <el-button type="primary" size="medium" @click="handleOut">导出</el-button>
        </el-row>
      </div>
    </div>
    <div style="clear: both;"></div>
    <div class="writewarehousereceipt_list">
      <el-table
        :data="tableData"
        border
        size='small'
        style="width: 100%">
        <el-table-column
          type="index"
          width="55">
        </el-table-column>
        <el-table-column label="收货单位">
          <template slot-scope="scope">
            <el-select v-model="orders[scope.$index].goodsCategory" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
            <el-button size="mini">+</el-button>
          </template>
        </el-table-column>
        <el-table-column label="商品类别">
          <template slot-scope="scope">
            <el-select v-model="orders[scope.$index].goodsCategory" placeholder="请选择">
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
            <el-select v-model="orders[scope.$index].goodsCategory" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="单位">
          <template slot-scope="scope">
            <el-select v-model="orders[scope.$index].goodsPart" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="所在仓库">
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
        </el-table-column>
        <el-table-column label="出库数量">
          <template slot-scope="scope">
            <el-input v-model="orders[scope.$index].goodsNum"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="商品单价">
          <template slot-scope="scope">
            <el-input v-model="orders[scope.$index].goodsNum"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="商品总额">
          <template slot-scope="scope">
            <el-input v-model="orders[scope.$index].goodsNum"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="收货地址">
          <template slot-scope="scope">
            <el-input v-model="orders[scope.$index].remark"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="收货人">
          <template slot-scope="scope">
            <el-input v-model="orders[scope.$index].remark"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="联系方式">
          <template slot-scope="scope">
            <el-input v-model="orders[scope.$index].remark"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="申请人">
          <template slot-scope="scope">
            <el-input v-model="orders[scope.$index].operatorUser"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="出库用途">
          <template slot-scope="scope">
            <el-input v-model="orders[scope.$index].purpose"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="备注">
          <template slot-scope="scope">
            <el-input v-model="orders[scope.$index].remark"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row class='add_row'>
        <el-button size='medium' type='primary' @click='addRow'>新增行</el-button>
      </el-row>
    </div>

    <div
      class="allGoods">
      <h4 class="header">参考数据(实际数据以提交订单时为准)</h4>
      <el-table
        :data='allgoods'
        border>
        <el-table-column label="商品类别">
        </el-table-column>
        <el-table-column label="商品名称">
        </el-table-column>
        <el-table-column label="商品单价">
        </el-table-column>
        <el-table-column label="单位">
        </el-table-column>
        <el-table-column label="所在仓库">
        </el-table-column>
        <el-table-column label="库存数量">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      writeDate: '',
      SupplyCompany: '',
      orders: [
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
      ],
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
      allGoods: [{}]
    };
  },
  components: {},
  methods: {
    handleSave () {
      console.log(this.orders)
      this.comfirm()
    },
    handleOut () {

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
    // 弹出确认框
    comfirm () {
      this.$confirm('请确认你填入的信息是否正确后, 再进行提交?', '提示', {
        confirmButtonText: '提交',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
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
<style lang='scss' scoped>
.writewarehousereceipt {
  padding: 20px 20px;
}
.writewarehousereceipt_unitl {
  float: left;
}
.writewarehousereceipt_unitr {
  line-height: 30px;
  float: right;
  text-align: center;
}
.writewarehousereceipt_unitr p {
  color: #777777;
}
.writewarehousereceipt_unitr span {
  border-bottom: 1px solid #777777;
  color: #000;
}
.writewarehousereceipt_operationl {
  float: left;
  margin-left: 60px;
}
.writewarehousereceipt_operationr {
  float: right;
}
.writewarehousereceipt_list {
  margin-top: 20px;
  .add_row {
    text-align: right;
    margin-top: 20px;
  }
}
.allGoods {
  margin-top: 20px;
}
  .header {
    margin: 0 0 10px;
  }
</style>