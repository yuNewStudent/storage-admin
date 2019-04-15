<template>
  <div class="purchaseordersquery">
    <el-header>
      <div class="selectStore">
        订单号:
        <el-select v-model="value" placeholder="请输入仓库名称">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="search">
        申请人:
        <el-input placeholder="请输入申请人"></el-input>
        <el-button type="primary">搜索</el-button>
      </div>
      <div class="select_date">
        日期选择:
        <el-date-picker
          v-model="value1"
          type="date">
        </el-date-picker>
        -
        <el-date-picker
          v-model="value1"
          type="date">
        </el-date-picker>
      </div>
      <div class="out_put">
        <el-button type="primary" size="medium" @click="buttonaudit">导出</el-button>
      </div>
    </el-header>
    <div class="purchaseordersquery_list">
      <!-- <el-table :data="tableData" border
        size='small'
        style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="category" label="商品类别"></el-table-column>
        <el-table-column prop="commodity" label="物品名称"></el-table-column>
        <el-table-column prop="number" label="申请采购数量"></el-table-column>
        <el-table-column prop="unit" label="单位"></el-table-column>
        <el-table-column prop="warehouse" label="所在仓库"></el-table-column>
        <el-table-column prop="Barcode" label="条形码"></el-table-column>
        <el-table-column prop="agent" label="经办人"></el-table-column>
        <el-table-column prop="thedata" label="采购时间"></el-table-column>
        <el-table-column prop="procurement" label="采购用途"></el-table-column>
        <el-table-column prop="note" label="备注"></el-table-column>
      </el-table> -->
      
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
        <el-table-column prop="name" label="采购订单号"></el-table-column><el-table-column prop="date" label="供应商"></el-table-column>
        <el-table-column prop="date" label="商品类别"></el-table-column>
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="name" label="商品规格"></el-table-column>
        <el-table-column prop="address" label="单位"></el-table-column>
        <el-table-column prop="address" label="所在仓库"></el-table-column>
        <el-table-column prop="name" label="条形码"></el-table-column>
        <el-table-column prop="address" label="入库数量"></el-table-column>
        </el-table-column>
        <el-table-column prop="name" label="生产日期"></el-table-column>
        <el-table-column prop="name" label="保质期"></el-table-column>
        <el-table-column prop="name" label="到期时间"></el-table-column>
        <el-table-column prop="name" label="到期时间预警"></el-table-column>
        <el-table-column label="商品单价">
        </el-table-column>
        <el-table-column label="商品总价">
        </el-table-column>
        <el-table-column prop="address" label="申请人"></el-table-column>
        <el-table-column prop="address" label="申请用途"></el-table-column>
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
      input10: "",
      currentPage:4,
      tableData: [
        {
          category: "医药",
          commodity: "阿莫西林",
          number: "2",
          unit: "箱",
          warehouse: "A区",
          Barcode: "12123343344",
          agent: "李先生",
          thedata:"2019/03/28",
          procurement:"治疗",
          note:'希望尽快发货'
        },
         {
          category: "医药",
          commodity: "阿莫西林",
          number: "2",
          unit: "箱",
          warehouse: "A区",
          Barcode: "12123343344",
          agent: "李先生",
          thedata:"2019/03/28",
          procurement:"治疗",
          note:'希望尽快发货'
        },
         {
          category: "医药",
          commodity: "阿莫西林",
          number: "2",
          unit: "箱",
          warehouse: "A区",
          Barcode: "12123343344",
          agent: "李先生",
          thedata:"2019/03/28",
          procurement:"治疗",
          note:'希望尽快发货'
        },
         {
          category: "医药",
          commodity: "阿莫西林",
          number: "2",
          unit: "箱",
          warehouse: "A区",
          Barcode: "12123343344",
          agent: "李先生",
          thedata:"2019/03/28",
          procurement:"治疗",
          note:'希望尽快发货'
        },
      ],
      formInline: {
        user: "",
        region: ""
      },
      options: [
        {
          value: "选项1",
          label: "A区"
        },
        {
          value: "选项2",
          label: "B区"
        },
        {
          value: "选项3",
          label: "C区"
        },
        {
          value: "选项4",
          label: "D区"
        },
        {
          value: "选项5",
          label: "F区"
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
    onSubmit() {
      console.log("submit!");
    },
    handleCurrentChange(val) {
    console.log(`当前页: ${val}`);
  },
    handleSizeChange(val) {
    console.log(`每页 ${val} 条`);
  },
    buttonsave: function() {},
    buttonaudit: function() {}
  },
};
</script>
<style lang='scss' scoped>
.purchaseordersquery {
  padding: 0 30px;
}
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
    margin-left: 100px;
  }
  .search {
    width: 380px;
    .el-input {
      width: 200px;
    }
  }
  .out_put {
    margin-left: 30px;
  }
}

</style>