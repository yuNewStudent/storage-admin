<template>
  <div class="exithistory">
    <el-header>
        <div class="select_company">
          供货单位:
          <el-select size='medium' v-model="supplyCompany" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </div>
        <div class="select_date">
          填写日期:
          <el-date-picker size='medium' v-model="writeDate" type="date" placeholder="选择日期"></el-date-picker>
        </div>
    </el-header>
    <el-main>
      <el-header>
        <div class="select_goods_name">
          商品名称:
          <el-select size='medium' v-model="supplyCompany" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </div>
        <el-button type='primary' size='small' @click='handleOutput'>导出</el-button>
      </el-header>
      <el-table
        :data="ordersTables"
        border
        size='small'
        style="width: 100%">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop='goodsCategory' label="商品类别">
        </el-table-column>
        <el-table-column prop='goodsName' label="商品名称">
        </el-table-column>
        <el-table-column prop='goodsNum' label="采购数量">
        </el-table-column>
        <el-table-column prop='goodsUnit' label="单位">
        </el-table-column>
        <el-table-column prop='goodsStorage' label="所在仓库">
        </el-table-column>
        <el-table-column prop='goodsPar' label="供货单位">
        </el-table-column>
        <el-table-column prop='orderCode' label="订单编号">
        </el-table-column>
        <el-table-column prop='writeDate' label="填写日期">
        </el-table-column>
        <el-table-column prop='operatorUser' label="经办人">
        </el-table-column>
        <el-table-column prop='purpose' label="用途">
        </el-table-column>
        <el-table-column prop='remark' label="备注">
        </el-table-column>
        <el-table-column prop='status' label="状态">
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script>
import outputTable from '@/assets/js/outputTable'
export default {
  data () {
    return {
      supplyCompany: '',
      writeDate: '',
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
      ordersTables: [
        {
          goodsCategory: '',
          goodsName: '',
          goodsNum: '',
          goodsUnit: '',
          goodsStorage: '',
          goodsPar: '',
          orderCode: '',
          writeDate: '',
          operatorUser: '',
          purpose: '',
          remark: '',
          status: ''
        }
      ]
    }
  },
  methods: {
    handleOutput () {
      outputTable (this.ordersTables)
    }
  }
}
</script>

<style lang="scss" scoped>
.exithistory {
  margin: 20px 100px 0 20px;
  .el-header {
    overflow: hidden;
    .select_company {
      float: left;
    }
    .select_date {
      float: right;
    }
  }
  .el-main {
    padding-top: 0;
    .el-header {
      padding: 0;
      text-align: right;
      .select_goods_name {
        float: left;
      }
    }
  }
}
</style>

