<template>
  <div class="purchaseordersquery">
    <div class="purchaseordersquery_operation">
      <div class="purchaseordersquery_operationl">
        <div class="purchaseordersquery_query">
          <el-input placeholder="请输入内容" v-model="input10" clearable></el-input>
          <el-button type="primary">搜索</el-button>
        </div>
        <div class="purchaseordersquery_thedate">
          <span class="demonstration">日期选择:</span>
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="">
          </el-date-picker>
        </div>
      </div>
      <div class="purchaseordersquery_operationr">
        <el-row>
          <el-button type="primary" size="medium" @click="buttonaudit">导出</el-button>
        </el-row>
      </div>
    </div>
    <div style="clear: both;"></div>
    <div class="purchaseordersquery_list" v-if="show===false">
      <el-table :data="tableData" border style="width: 100%">
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
      </el-table>
    </div>
    <div class="purchaseordersquery_list" v-else>
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
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      input10: "",
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
    buttonsave: function() {},
    buttonaudit: function() {}
  }
};
</script>
<style>
.purchaseordersquery {
  padding: 20px 20px;
}
.purchaseordersquery_unit {
}
.purchaseordersquery_unitl {
  float: left;
}
.purchaseordersquery_unitr {
  line-height: 30px;
  float: right;
  text-align: center;
}
.purchaseordersquery_unitr p {
  color: #777777;
}
.purchaseordersquery_unitr span {
  border-bottom: 1px solid #777777;
  color: #000;
}
.purchaseordersquery_operation {
  margin-top: 20px;
}
.purchaseordersquery_operationl {
  float: left;
  display: flex;
}
.purchaseordersquery_operationr {
  float: right;
}
.purchaseordersquery_list {
  margin-top: 20px;
}
.purchaseordersquery_query {
  display: flex;
}
.purchaseordersquery_query input {
  width: 150px;
}
.purchaseordersquery_query button {
  margin-left: 10px;
}
.purchaseordersquery_thedate{
  margin-left: 20px;
}
</style>