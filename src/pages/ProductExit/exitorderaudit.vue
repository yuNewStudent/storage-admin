<template>
  <div class="exitorderaudit">
    <el-header>
      <div class="selectStore">
        申请人:
        <el-select size="medium" v-model="value" placeholder="请输入经办人">
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
        <el-select size="medium" v-model="value" placeholder="全部">
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
        <el-date-picker size="medium" v-model="value1" type="date"></el-date-picker>
        -
        <el-date-picker size="medium" v-model="value1" type="date"></el-date-picker>
      </div>
    </el-header>
    <el-main>
      <div class="buttons">
        <el-button type="primary" size="medium">提交</el-button>
        <el-button type="primary" size="medium" @click="handleOutput">导出</el-button>
      </div>
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
        <el-table-column label="出库订单编号" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="收货单位" prop='goodsCategory'>
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
      </el-table>
      <el-table
        :data="tableData"
        border
        size='small'
        style="width: 100%">
        <el-table-column
          type="index"
          width="55">
        </el-table-column>
        <el-table-column label="商品类别">
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
        <el-table-column label="回退理由" prop='goodsCategory'>
          <el-input></el-input>
        </el-table-column>
      </el-table>
      <!-- <el-table :data="orders" border size="small" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="55"></el-table-column>
        <el-table-column label="商品类别" prop="goodsCategory"></el-table-column>
        <el-table-column label="商品名称" prop="goodsCategory"></el-table-column>
        <el-table-column label="申请采购数量" prop="goodsCategory"></el-table-column>
        <el-table-column label="单位" prop="goodsCategory"></el-table-column>
        <el-table-column label="所在仓库" prop="goodsCategory"></el-table-column>
        <el-table-column label="申请时间" prop="goodsCategory"></el-table-column>
        <el-table-column label="订单号" prop="goodsCategory"></el-table-column>
        <el-table-column label="经办人" prop="goodsCategory"></el-table-column>
        <el-table-column label="用途" prop="goodsCategory"></el-table-column>
        <el-table-column label="备注" prop="goodsCategory"></el-table-column>
        <el-table-column label="状态" prop="goodsCategory"></el-table-column>
      </el-table> -->
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </div>
    </el-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage:4,
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
      ],
      orders: [
        {
          goodsCategory: "哈德",
          goodsName: "哈德",
          goodsNum: "哈德",
          goodsUnit: "哈德",
          goodsStorage: "哈德",
          operatorUser: "哈德",
          purpose: "哈德",
          remark: "哈德"
        },
        
        {
          goodsCategory: "哈德",
          goodsName: "哈德",
          goodsNum: "哈德",
          goodsUnit: "哈德",
          goodsStorage: "哈德",
          operatorUser: "哈德",
          purpose: "哈德",
          remark: "哈德"
        }
      ]
    };
  },
   methods: {
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    }
};
</script>

<style lang="scss" scoped>
.exitorderaudit {
  padding: 0 20px;
  .el-header {
    margin: 20px 0 0;
    padding: 0;
    > div {
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
  }
  .el-main {
    padding: 0;
    .buttons {
      text-align: right;
    }
  }
}
</style>


