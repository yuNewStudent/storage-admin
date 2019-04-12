<template>
  <div class="goodsout">
    <div class="goodsout_operation">
      <div class="goodsout_operationr">
        <el-row>
          订单号：
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button type="primary" size="medium" @click="buttonaudit">提交出库</el-button>
          <el-button type="primary" size="medium" @click="buttonaudit">导出</el-button>
        </el-row>
      </div>
    </div>
    <div style="clear: both;"></div>
    <div class="goodsout_list">
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
    </div>
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
<style>
.goodsout {
  padding: 20px 30px;
}
.goodsout_unitl {
  float: left;
}
.goodsout_unitr {
  line-height: 30px;
  float: right;
  text-align: center;
}
.goodsout_unitr p {
  color: #777777;
}
.goodsout_unitr span {
  border-bottom: 1px solid #777777;
  color: #000;
}
.goodsout_operation {
  margin-top: 10px;
}
.goodsout_operationl {
  float: left;
  margin-left: 60px;
}
.goodsout_operationr {
  float: right;
}
.goodsout_list {
  margin-top: 20px;
}
</style>