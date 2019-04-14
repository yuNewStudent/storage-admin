<template>
  <div class="goodsout">
    <el-header>
      订单号：
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <div class="btns">
        <el-button type="primary" size="medium" @click="buttonaudit">提交出库</el-button>
        <el-button type="primary" size="medium" @click="buttonaudit">导出</el-button>
      </div>
    </el-header>
    <el-main>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="date" label="收货单位">
        </el-table-column>
        <el-table-column prop="name" label="订单编号"></el-table-column>
        <el-table-column prop="date" label="商品类别"></el-table-column>
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="name" label="商品规格"></el-table-column>
        <el-table-column prop="address" label="单位"></el-table-column>
        <el-table-column prop="address" label="所在仓库"></el-table-column>
        <el-table-column prop="address" label="申请出库数量"></el-table-column>
        <el-table-column prop="address" label="商品单价"></el-table-column>
        <el-table-column prop="address" label="商品总价"></el-table-column>
        <el-table-column prop="address" label="申请人"></el-table-column>
        <el-table-column prop="address" label="收货地址"></el-table-column>
        <el-table-column prop="address" label="收货人"></el-table-column>
        <el-table-column prop="address" label="联系方式"></el-table-column>
        <el-table-column prop="address" label="出库用途"></el-table-column>
        <el-table-column prop="address" label="备注"></el-table-column>
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
    </el-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage:4,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
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
      value: "",
      value1: ""
    };
  },
  components: {},
  methods: {
    buttonModifythe: function() {
      if (this.show == false) {
        this.show = true;
      } else {
        this.show = false;
      }
      console.log(this.show);
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    buttonsave: function() {},
    buttonaudit: function() {}
  }
};
</script>
<style lang='scss' scoped>
.goodsout {
  padding: 20px 30px 0;
  .el-header {
    padding: 0;
    .btns {
      float: right;
    }
  }
  .el-main {
    padding: 0;
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