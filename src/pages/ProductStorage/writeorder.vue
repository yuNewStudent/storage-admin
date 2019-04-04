<template>
  <div class="writeorder">
    <div class="writeorder_unit">
      <div class="writeorder_unitl">
        <span class="demonstration">供应单位:</span>
        <el-select v-model="SupplyCompany" size='medium' placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="writeorder_unitr">
        <p>
          订单编号:
          <span>166767767777</span>
        </p>
      </div>
    </div>
    <div style="clear: both;"></div>
    <div class="writeorder_operation">
      <div class="writeorder_operationl">
        <div class="block">
          <span class="demonstration">填写日期:</span>
          <el-date-picker size='medium' v-model="writeDate" type="date" placeholder="选择日期"></el-date-picker>
        </div>
      </div>
      <div class="writeorder_operationr">
        <el-row>
          <el-button type="primary" size="medium" @click="handleSave">保存</el-button>
          <el-button type="primary" size="medium" @click="handleCheck">审核</el-button>
          <el-button type="primary" size="medium" @click="handleOut">导出</el-button>
        </el-row>
      </div>
    </div>
    <div style="clear: both;"></div>
    <div class="show_write_list"></div>
    <div class="writeorder_list">
      <el-table
        :data="tableData"
        border
        size='small'
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
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
            <el-input v-model="orders[scope.$index].goodsName"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="申请采购数量">
          <template slot-scope="scope">
            <el-input v-model="orders[scope.$index].goodsNum"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="单位">
          <template slot-scope="scope">
            <el-select v-model="orders[scope.$index].goodsUnit" placeholder="请选择">
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
        <el-table-column label="经办人">
          <template slot-scope="scope">
            <el-input v-model="orders[scope.$index].operatorUser"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="用途">
          <template slot-scope="scope">
            <el-input v-model="orders[scope.$index].purpose"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="备注">
          <template slot-scope="scope">
            <el-input v-model="orders[scope.$index].remark"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-row class='add_row'>
        <el-button type='primary' @click='addRow'>新增行</el-button>
      </el-row>
    </div>
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
          goodsCategory: '',
          goodsName: '',
          goodsNum: '',
          goodsUnit: '',
          goodsStorage: '',
          operatorUser: '',
          purpose: '',
          remark: ''
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
}
.writeorder_unitl {
  float: left;
}
.writeorder_unitr {
  line-height: 30px;
  float: right;
  text-align: center;
}
.writeorder_unitr p {
  color: #777777;
}
.writeorder_unitr span {
  border-bottom: 1px solid #777777;
  color: #000;
}
.writeorder_operation {
  margin-top: 20px;
}
.writeorder_operationl {
  float: left;
}
.writeorder_operationr {
  float: right;
}
.writeorder_list {
  margin-top: 20px;
  .add_row {
    text-align: right;
    margin-top: 20px;
  }
}
</style>
