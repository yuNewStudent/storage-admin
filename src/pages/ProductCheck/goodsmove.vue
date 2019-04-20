<template>
  <div class="goodsmove">
    <div class="goodsmove_unit">
      <span class="demonstration">货物移库</span>
      <el-button type="primary" size="medium" @click="buttonaudit">保存</el-button>
    </div>
    <div class="goodsmove_list">
      <el-table :data="tableData" border style="width: 100%" size='small'>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="date" label="商品类别"></el-table-column>
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="address" label="移出数量"></el-table-column>
        <el-table-column prop="address" label="移出货位"></el-table-column>
        <el-table-column prop="address" label="移入货位"></el-table-column>
        <el-table-column prop="address" label="移库原因">
          <el-input></el-input>
        </el-table-column>
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
      show: false,
      currentPage:4,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: " 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: " 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: " 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: " 1516 弄"
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
    handleCurrentChange(val) {
    console.log(`当前页: ${val}`);
  },
    handleSizeChange(val) {
    console.log(`每页 ${val} 条`);
  },
    buttonsave: function() {},
    buttonaudit: function() {}
  }
};
</script>
<style lang='scss' scoped>
.goodsmove {
  padding: 20px 20px;
  .goodsmove_unit {
    overflow: hidden;
    line-height: 40px;
    .el-button {
      float: right;
    }
  }
  .goodsmove_list {
    margin-top: 20px;
  }
}
</style>