<template>
  <div class="outorderquery">
    <el-header>
      <div class="selectStore">
        仓库选择:
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
        商品名称:
        <el-input placeholder="请输入商品名称"></el-input>
        <el-button type="primary">搜索</el-button>
      </div>
      <div class="select_date">
        日期选择:
        <el-date-picker v-model="value1" type="date"></el-date-picker>
      </div>
      <div class="out_put">
        <el-button type="primary" size="medium" @click="buttonaudit">导出</el-button>
      </div>
    </el-header>
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
        <el-table-column prop="putthedata" label="再次入库日期"></el-table-column>-->
        <el-table-column prop="note" label="备注"></el-table-column>
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
      currentPage: 4,
      tableData: [
        {
          category: "医药",
          commodity: "阿莫西林",
          specifications: "1/23/25",
          number: "2",
          number1: "1",
          unit: "箱",
          phone: "15828658729",
          warehouse: "A区",
          contact: "李女士",
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
          address: "四川省成都是武侯区",
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
.outorderquery {
  padding: 0 20px;
  .el-header {
    margin: 20px 0 0;
    padding: 0;
    > div {
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
}
.outorderquery_list {
  margin-top: 20px;
}
</style>