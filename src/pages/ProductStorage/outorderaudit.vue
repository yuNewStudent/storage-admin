<template>
  <div class="outorderaudit">
    <el-header>
      <div class="selectStore">
        经办人:
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
        <el-date-picker size='medium'
          v-model="value1"
          type="date">
        </el-date-picker>
      </div>
      <div class="buttons">
        <el-button type='primary' size='medium'>回退</el-button>
        <el-button type='primary' size='medium'>审核</el-button>
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
        <el-table-column label="商品类别" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="商品名称" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="申请采购数量" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="单位" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="所在仓库" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="申请时间" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="订单号" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="经办人" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="用途" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="备注" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="状态" prop='goodsCategory'>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
    .select_date {
      margin-left: 20px;
    }
    .buttons {
      float: right;
    }
  }
  .el-main {
    padding: 0;
  }
}
</style>


