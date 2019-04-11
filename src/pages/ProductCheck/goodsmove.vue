<template>
  <div class="goodsmove">
    <div class="goodsmove_unit">
      <div class="goodsmove_unitl">
        <span class="demonstration">仓库移除</span>
      </div>
      <div class="goodsmove_operationl">
        <div class="blockk">
          <span class="demonstration">填写日期:</span>
          <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
        </div>
      </div>
      <div class="goodsmove_unitr">
        <p>
          订单编号:
          <span>166767767777</span>
        </p>
      </div>
    </div>
    <div style="clear: both;"></div>
    <div class="goodsmove_operation">
      <div class="goodsmove_operationr">
        <el-row>
          <el-button type="primary" size="medium" @click="buttonaudit">保存</el-button>
          <el-button type="primary" size="medium" @click="buttonaudit">审核</el-button>
        </el-row>
      </div>
    </div>
    <div style="clear: both;"></div>
    <div class="goodsmove_list">
      <el-table :data="tableData" border style="width: 100%" size='small'>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="date" label="商品类别"></el-table-column>
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="address" label="移除数量"></el-table-column>
        <el-table-column prop="address" label="单位"></el-table-column>
        <el-table-column prop="address" label="移除仓库"></el-table-column>
        <el-table-column prop="address" label="移入仓库"></el-table-column>
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
    <!-- <div class="goodsmove_list" v-else>
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
    <div class="goodsmove_operation">
      <p>
        操作人:
        <span>黎先生</span>
      </p>
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
<style>
.goodsmove {
  padding: 20px 20px;
}
.goodsmove_unit {
  overflow: hidden;
  line-height: 40px;
}
.goodsmove_unitl {
  float: left;
}
.goodsmove_unitr {
  line-height: 30px;
  float: right;
  text-align: center;
}
.goodsmove_unitr p {
  color: #777777;
}
.goodsmove_unitr span {
  border-bottom: 1px solid #777777;
  color: #000;
}
.goodsmove_operation {
  margin-top: 10px;
}
.goodsmove_operationl {
  float: left;
  margin-left: 60px;
}
.goodsmove_operationr {
  float: right;
}
.goodsmove_list {
  margin-top: 20px;
}
</style>