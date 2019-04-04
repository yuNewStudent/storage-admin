<template>
  <div class="repertoryenvironment">
    <el-header>
      <span class="demonstration">仓库管理环境:</span>
      <el-button type="primary" size="medium" @click="buttonaudit">导出</el-button>
    </el-header>
    <div class="repertoryenvironment_list">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="仓库名称"></el-table-column>
        <el-table-column prop="name" label="仓库面积"></el-table-column>
        <el-table-column prop="address" label="仓库类型"></el-table-column>
        <el-table-column prop="address" label="仓库温度"></el-table-column>
        <el-table-column prop="address" label="仓库湿度"></el-table-column>
        <el-table-column prop="address" label="货架数量"></el-table-column>
        <el-table-column prop="address" label="负责人"></el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="repertoryenvironment_list" v-else>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="date" label="商品类别">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-table-column>
        <el-table-column prop="name" label="商品名称">
          <el-input></el-input>
        </el-table-column>
        <el-table-column prop="address" label="申请采购数量">
          <el-input></el-input>
        </el-table-column>
        <el-table-column prop="address" label="单位">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-table-column>
        <el-table-column prop="address" label="所在仓库">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-table-column>
        <el-table-column prop="address" label="经办人">
          <el-input></el-input>
        </el-table-column>
        <el-table-column prop="address" label="用途">
          <el-input></el-input>
        </el-table-column>
        <el-table-column prop="address" label="备注">
          <el-input></el-input>
        </el-table-column>
      </el-table>
    </div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
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