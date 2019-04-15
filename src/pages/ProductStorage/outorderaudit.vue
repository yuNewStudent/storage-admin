<template>
  <div class="outorderaudit">
    <el-header>
      <div class="selectStore">
        申请人:
        <el-select size='medium' v-model="value" placeholder="请输入经办人">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="selectStore">
        订单状态:
        <el-select size='medium' v-model="value" placeholder="全部">
          <el-option
            v-for="item in ordersStatus"
            :key="item.label"
            :label="item.label"
            :value="item.label"
          ></el-option>
        </el-select>
      </div>
      <div class="select_date">
        日期选择:
        <!-- <el-date-picker size='medium'
          v-model="value1"
          type="date">
        </el-date-picker> -->
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change='pickDate'>
        </el-date-picker>
      </div>
      <div class="buttons">
        <el-button type='primary' size='medium'>提交</el-button>
        <el-button type='primary' size='medium' @click='handleOutput'>导出</el-button>
      </div>
    </el-header>
    <el-main>
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
          <el-button>回退</el-button>
        </el-table-column>
        <!-- <el-table-column label="单位" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="所在仓库" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="订单号" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="经办人" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="用途" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="备注" prop='goodsCategory'>
        </el-table-column>
         -->
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
        <el-table-column label="商品类型" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label='商品名称' prop='goodsCategory'>
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
export default {
  data () {
    return {
      currentPage:4,
      date: '',
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
      value1:"",
      orders: [
        {
          goodsCategory: '哈德',
          goodsName: '哈德',
          goodsNum: '哈德',
          goodsUnit: '哈德',
          goodsStorage: '哈德',
          operatorUser: '哈德',
          purpose: '哈德',
          remark: '哈德'
        }
      ],
      ordersStatus: [
        {
          label: '已审核',
        },
        {
          label: '待审核',
        },
        {
          label: '未通过',
        }
      ]
    }
  },
  methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      pickDate (date) {
        console.log(this.date)
      }
  }
}
</script>

<style lang="scss" scoped>
.outorderaudit {
  padding: 0 30px;
  .el-header {
    margin: 20px 0 0;
    padding: 0;
    >div {
      display: inline-block;
    }
    .selectStore {
      width: 250px;
      .el-select {
        width: 150px;
      }
    }
    .buttons {
      float: right;
    }
  }
  .el-main {
    padding: 0;
    h5 {
      margin: 30px 0 10px;
    }
    .el-pagination {
      margin-top: 10px; 
      text-align: right;
    }
  }
}
</style>


