<template>
  <div class="repertoryenvironment">
    <el-header>
      <span class="demonstration">仓库管理环境:</span>
      <el-button type="primary" size="medium" @click="buttonaudit">导出</el-button>
    </el-header>
    <div class="repertoryenvironment_list">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="仓库名称"></el-table-column>
        <el-table-column prop="address" label="仓库温度"></el-table-column>
        <el-table-column prop="address" label="仓库湿度"></el-table-column>
        <el-table-column prop="address" label="仓库员"></el-table-column>
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
    handleEdit:function(){

    },
    handleDelete:function(){

    },
    handleCurrentChange(val) {
    console.log(`当前页: ${val}`);
  },
    handleSizeChange(val) {
    console.log(`每页 ${val} 条`);
  },
    buttonModifythe: function() {
      if (this.show == false) {
        this.show = true;
      } else {
        this.show = false;
      }
      console.log(this.show);
    },
    buttonsave: function() {},
    buttonaudit: function() {}
  }
};
</script>
<style lang='scss' scped>
.repertoryenvironment {
  margin: 10px 30px;
  .el-header {
    line-height: 60px;
    padding: 0;
    .el-button {
      float: right;
      margin-top: 13px;
    }
  }
}
.repertoryenvironment_list {
  margin-top: 20px;
}
</style>