<template>
  <div class="writewarehousereceipt">
   <div class="writewarehousereceipt_unit">
      <div class="writewarehousereceipt_unitl">
        <span class="demonstration">供应单位:</span>
        <el-select v-model="SupplyCompany" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="writewarehousereceipt_unitr">
        <p>
          订单编号:
          <span>166767767777</span>
        </p>
      </div>
    </div>
    <div style="clear: both;"></div>
    <div class="writewarehousereceipt_operation">
      <div class="writewarehousereceipt_operationl">
        <div class="block">
          <span class="demonstration">填写日期:</span>
          <el-date-picker v-model="writeDate" type="date" placeholder="选择日期"></el-date-picker>
        </div>
      </div>
      <div class="writewarehousereceipt_operationr">
        <el-row>
          <el-button type="primary" size="medium" @click="handleSave">保存</el-button>
          <el-button type="primary" size="medium" @click="handleCheck">审核</el-button>
          <el-button type="primary" size="medium" @click="handleOut">导出</el-button>
        </el-row>
      </div>
    </div>
    <div style="clear: both;"></div>
    <!-- <div class="writewarehousereceipt_list" v-if="show===false">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="date" label="商品类别"></el-table-column>
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="address" label="申请采购数量"></el-table-column>
        <el-table-column prop="address" label="单位"></el-table-column>
        <el-table-column prop="address" label="所在仓库"></el-table-column>
        <el-table-column prop="address" label="经办人"></el-table-column>
        <el-table-column prop="address" label="用途"></el-table-column>
        <el-table-column prop="address" label="备注"></el-table-column>
      </el-table>
    </div> -->
    <div class="writewarehousereceipt_list">
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
      ]
    };
  },
  components: {},
  methods: {
    handleSave () {
      console.log(this.orders)
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
.writewarehousereceipt_operation {
  margin-top: 20px;
}
.writewarehousereceipt_operationl {
  float: left;
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
</style>