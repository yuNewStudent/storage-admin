<template>
  <div class="history_order">
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
          日期选择:
          <el-date-picker
            v-model="value15"
            type="monthrange"
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份">
          </el-date-picker>
        </div>
        <div class="select_goods_name">
          订单状态:
          <el-select size='medium' v-model="supplyCompany" placeholder="请选择">
            <el-option
              v-for="item in status"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
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
        <el-table-column label="供应商" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="申请人" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="申请时间" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="状态" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="操作" prop='goodsCategory'>
          <el-button>详情</el-button>
          <el-button>修改</el-button>
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
        <el-table-column label='商品名称' prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="商品类型" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="单位" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="申请数量" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="预估单价" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="预估总价" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="用途" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="申请人备注" prop='goodsCategory'>
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
      supplyCompany: '',
      currentPage:4,
      writeDate: '',
      status: [
        {
          label: '已审核',
        },
        {
          label: '待审核',
        },
        {
          label: '未通过',
        },
        {
          label: "已入库"
        }
      ],
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
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
  }
}
</script>

<style lang="scss" scoped>
.history_order {
  margin: 20px 0px 0 0;
  .el-header {
    overflow: hidden;
    .select_company {
      float: left;
    }
    .select_date {
      float: left;
      margin-left: 50px;
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
      height: 40px;
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

