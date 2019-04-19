<template>
  <div class="exithistory">
    <el-header>
      <div class="select_company">
        收货单位:
        <el-select size='medium' v-model="supplyCompany" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
      </div>
      
      <div class="select_goods_name">
        申请状态:
        <el-select size='medium' v-model="supplyCompany" placeholder="请选择">
          <el-option
            v-for="item in ordersStatus"
            :key="item.value"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
      </div>
      <div class="select_date">
        查询日期:
        <el-date-picker
          v-model="value15"
          type="monthrange"
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份">
        </el-date-picker>
      </div>
    </el-header>
    <el-main>
      <el-header>
        <el-button type='primary' size='small' @click='handleOutput'>导出</el-button>
      </el-header>
      <el-table
        :data="orders"
        border
        size='small'
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          width="55">
        </el-table-column>
        <el-table-column label="订单号" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="收货单位" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="收货地址" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="申请人" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="申请时间" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="状态" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="操作" prop='goodsCategory'>
          <template slot-scope="scope">
            <el-button>详情</el-button>
            <el-button @click='handleOrderEditor(scope.row)'>修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>

      <h5>订单详情：</h5>
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
        <el-table-column prop='goodsUnit' label="单位">
        </el-table-column>
        <el-table-column prop='goodsNum' label="出库数量">
        </el-table-column>
        <el-table-column label="商品单价" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="商品总价" prop='goodsCategory'>
        </el-table-column>
        <el-table-column prop='goodsStorage' label="所在仓库">
        </el-table-column>
        <el-table-column prop='writeDate' label="填写日期">
        </el-table-column>
        <el-table-column prop='purpose' label="用途">
        </el-table-column>
        <el-table-column prop='remark' label="备注">
        </el-table-column>
        <el-table-column label="回退理由" prop='goodsCategory'>
          <el-input></el-input>
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
         currentPage:4,
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
      ordersStatus: [
        {
          label: '审核通过',
        },
        {
          label: '待审核',
        },
        {
          label: '审核未通过',
        },
        {
          label: '已出库',
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
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleOrderEditor (row) {
      // this.$router.push({ path: '/productexit/writewarehousereceipt', params: {

      // } })
    }
  }
}
</script>

<style lang="scss" scoped>
.exithistory {
  margin: 20px 0 0;
  .el-header {
    overflow: hidden;
    .select_company {
      float: left;
    }
    .select_date {
      float: left;
      margin-left: 60px;
    }
    .select_goods_name {
      float: right;
    }
  }
  .el-main {
    padding-top: 0;
    .el-header {
      padding: 0;
      text-align: right;
    }
    
    .el-pagination {
      margin-top: 10px;
      text-align: right;
    }
    h5 {
      margin: 20px 0 10px;
    }
  }
}
</style>

