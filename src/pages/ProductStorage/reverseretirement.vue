<template>
  <div class="reverseretirement">
    <div class="reverseretirement_unit">
      <div class="reverseretirement_unitl">
        <span class="demonstration">供应单位:</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      
      <div class="reverseretirement_operationl">
        <div class="blockk">
          <span class="demonstration">填写日期:</span>
          <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
        </div>
      </div>
      <div class="reverseretirement_unitr">
        <p>
          订单编号:
          <span>166767767777</span>
        </p>
      </div>
    </div>
    <div style="clear: both;"></div>
    <div class="reverseretirement_operation">
      <div class="reverseretirement_operationr">
        <el-row>
          <el-button type="primary" size="medium" @click="handleAudit">审核</el-button>
          <el-button type="info" size="medium" @click="handleOutput">导出</el-button>
        </el-row>
      </div>
    </div>
    <div style="clear: both;"></div>
    <div class="reverseretirement_list">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="date" label="商品类别"></el-table-column>
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="address" label="申请采购数量"></el-table-column>
        <el-table-column prop="address" label="单位"></el-table-column>
        <el-table-column prop="address" label="所在仓库"></el-table-column>
        <el-table-column prop="address" label="经办人"></el-table-column>
        <el-table-column prop="address" label="用途"></el-table-column>
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
    <!-- <div class="reverseretirement_list" v-else>
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
import outputTable from '@/assets/js/outputTable'
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
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
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
    handleSave () {},
    handleAudit () {},
    handleOutput () {
      outputTable(this.tableData)
    }
  }
};
</script>
<style>
.reverseretirement {
  padding: 20px 30px;
}
.reverseretirement_unit {
}
.reverseretirement_unitl {
  float: left;
}
.reverseretirement_unitr {
  line-height: 30px;
  float: right;
  text-align: center;
}
.reverseretirement_unitr p {
  color: #777777;
}
.reverseretirement_unitr span {
  border-bottom: 1px solid #777777;
  color: #000;
}
.reverseretirement_operation {
  margin-top: 10px;
}
.reverseretirement_operationl {
  float: left;
  margin-left: 60px;
}
.reverseretirement_operationr {
  float: right;
}
.reverseretirement_list {
  margin-top: 20px;
}
</style>
