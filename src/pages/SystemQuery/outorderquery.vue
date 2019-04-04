<template>
  <div class="outorderquery">
    <div class="outorderquery_operation">
      <div class="outorderquery_operationl">
        <div class="outorderquery_query">
          <el-input placeholder="请输入内容" v-model="input10" clearable></el-input>
          <el-button type="primary">搜索</el-button>
        </div>
        <div class="outorderquery_thedate">
          <span class="demonstration">日期选择:</span>
          <el-date-picker v-model="value1" type="date" placeholder></el-date-picker>
        </div>
      </div>
      <div class="outorderquery_operationr">
        <el-row>
          <el-button type="primary" size="medium" @click="buttonaudit">导出</el-button>
        </el-row>
      </div>
    </div>
    <div style="clear: both;"></div>
    <div class="outorderquery_list" v-if="show===false">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="category" label="商品类别"></el-table-column>
        <el-table-column prop="commodity" label="商品名称"></el-table-column>
        <el-table-column prop="specifications" label="商品规格"></el-table-column>
        <el-table-column prop="number" label="出库数量"></el-table-column>
        <el-table-column prop="unit" label="单位"></el-table-column>
        <el-table-column prop="warehouse" label="所在仓库"></el-table-column>
        <el-table-column prop="outboundthedata" label="出库日期"></el-table-column>

        <!-- <el-table-column prop="Barcode" label="条形码"></el-table-column> -->
         <el-table-column prop="address" label="发货地址"></el-table-column>
         <el-table-column prop="contact" label="联系人"></el-table-column>
         <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column prop="agent" label="申请人"></el-table-column>
        <el-table-column prop="procurement" label="采购用途"></el-table-column>
        <!-- <el-table-column prop="outboundthedata" label="出库日期"></el-table-column>
        <el-table-column prop="putthedata" label="再次入库日期"></el-table-column> -->
        <el-table-column prop="note" label="备注"></el-table-column>
      </el-table>
    </div>
    <div class="outorderquery_list" v-else>
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
          specifications: "1/23/25",
          number: "2",
          number1: "1",
          unit: "箱",
          phone:"15828658729",
          warehouse: "A区",
          contact:"李女士",
          Barcode: "12123343344",
          agent: "李先生",
          outboundthedata: "2019/03/28",
          putthedata: "2019/03/30",
          procurement: "治疗",
          note: "希望尽快发货"
        },
        {
          category: "医药",
          commodity: "阿莫西林",
          number: "2",
          unit: "箱",
          warehouse: "A区",
          Barcode: "12123343344",
          agent: "李先生",
          thedata: "2019/03/28",
          procurement: "治疗",
          note: "希望尽快发货"
        },
        {
          category: "医药",
          commodity: "阿莫西林",
          number: "2",
          unit: "箱",
          address:"四川省成都是武侯区",
          warehouse: "A区",
          Barcode: "12123343344",
          agent: "李先生",
          thedata: "2019/03/28",
          procurement: "治疗",
          note: "希望尽快发货"
        },
        {
          category: "医药",
          commodity: "阿莫西林",
          number: "2",
          unit: "箱",
          warehouse: "A区",
          Barcode: "12123343344",
          agent: "李先生",
          thedata: "2019/03/28",
          procurement: "治疗",
          note: "希望尽快发货"
        }
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
.outorderquery {
  padding: 0 20px;
}
.outorderquery_unitl {
  float: left;
}
.outorderquery_unitr {
  line-height: 30px;
  float: right;
  text-align: center;
}
.outorderquery_unitr p {
  color: #777777;
}
.outorderquery_unitr span {
  border-bottom: 1px solid #777777;
  color: #000;
}
.outorderquery_operation {
  margin-top: 20px;
}
.outorderquery_operationl {
  float: left;
  display: flex;
}
.outorderquery_operationr {
  float: right;
}
.outorderquery_list {
  margin-top: 20px;
}
.outorderquery_query {
  display: flex;
}
.outorderquery_query input {
  width: 150px;
}
.outorderquery_query button {
  margin-left: 10px;
}
.outorderquery_thedate {
  margin-left: 20px;
}
</style>