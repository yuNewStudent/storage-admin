<template>
  <div class="stockquery">
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
      <div class="search">
        商品状态:
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in ordersStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="out_put">
        <el-button type="primary" size="medium" @click="buttonaudit">导出</el-button>
      </div>
    </el-header>
    <div class="stockquery_list">
      <!-- <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="商品类别" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="商品名称" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="商品编码" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="仓库名称" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="商品总库存" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="商品状态" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="操作" prop='goodsCategory'>
          <el-button>详情</el-button>
        </el-table-column>
      </el-table>

      <h5>商品详情：</h5>-->
      <el-table size="mini" :data="tableData" border style="width: 100%">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="barcode" label="条形码"></el-table-column>
        <el-table-column prop="category" label="商品类别"></el-table-column>
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="medicine_no" label="商品编码"></el-table-column>
        <el-table-column prop="specification" label="规格型号"></el-table-column>
        <el-table-column prop="unit" label="单位"></el-table-column>
        <el-table-column prop="location" label="所在货位"></el-table-column>
        <el-table-column prop="stock_quantity" label="商品库存"></el-table-column>
        <!-- <el-table-column label="商品预警数"
          class-name='warning'>
          <el-table-column prop='goodsMinNum' label="最小值">
          </el-table-column>
          <el-table-column prop='goodsMaxNum' label="最大值">
        </el-table-column>-->
        <el-table-column prop="estimated_price" label="采购单价"></el-table-column>
        <el-table-column prop="in_storage_time" label="购入时间"></el-table-column>
        <el-table-column prop="date_manufacture" label="生产日期"></el-table-column>
        <el-table-column prop="shelf_life" label="保质期"></el-table-column>
        <el-table-column prop="expired_time" label="到期时间"></el-table-column>
        <el-table-column prop="expired_time_warning" label="预警时间"></el-table-column>
        <el-table-column prop="last_in_storage_time" label="上次入库时间"></el-table-column>
        <!-- <el-table-column prop="address" label="库管员"></el-table-column>
        <el-table-column prop="address" label="联系电话"></el-table-column>-->
        <el-table-column prop="status" label="状态"></el-table-column>
      </el-table>
    </div>
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
    <!-- <div class="stockquery_list" v-else>
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
    </div>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      input10: "",
      currentPage: 4,
      ordersStatus: [
        {
          label: "正常"
        },
        {
          label: "已过期"
        },
        {
          label: "预警状态"
        }
      ],
      tableData: [
        // {
        //   category: "医药",
        //   commodity: "阿莫西林",
        //   specifications: "1/23/25",
        //   number: "2",
        //   number1: "1",
        //   unit: "箱",
        //   warehouse: "A区",
        //   Barcode: "12123343344",
        //   agent: "李先生",
        //   outboundthedata: "2019/03/28",
        //   putthedata: "2019/03/30",
        //   procurement: "治疗",
        //   note: "希望尽快发货"
        // },
        // {
        //   category: "医药",
        //   commodity: "阿莫西林",
        //   number: "2",
        //   unit: "箱",
        //   warehouse: "A区",
        //   Barcode: "12123343344",
        //   agent: "李先生",
        //   thedata: "2019/03/28",
        //   procurement: "治疗",
        //   note: "希望尽快发货"
        // },
        // {
        //   category: "医药",
        //   commodity: "阿莫西林",
        //   number: "2",
        //   unit: "箱",
        //   warehouse: "A区",
        //   Barcode: "12123343344",
        //   agent: "李先生",
        //   thedata: "2019/03/28",
        //   procurement: "治疗",
        //   note: "希望尽快发货"
        // },
        // {
        //   category: "医药",
        //   commodity: "阿莫西林",
        //   number: "2",
        //   unit: "箱",
        //   warehouse: "A区",
        //   Barcode: "12123343344",
        //   agent: "李先生",
        //   thedata: "2019/03/28",
        //   procurement: "治疗",
        //   note: "希望尽快发货"
        // }
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
  mounted() {
    this.inventorylist();
  },
  methods: {
    inventorylist() {
      const data = {
        all: 1,
        goods_name: "",
        status:-1,
        repertory:""
      };
      this.$http
        .post(`${config.httpBaseUrl}/medicine/query_stock/`, data)
        .then(res => {
          if (res.status == 1) {
            this.tableData = res.content;
          } else {
            return;
          }
        });
    },
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
    buttonaudit: function() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style lang='scss' scoped>
.stockquery {
  padding: 0 20px;
}
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
.goodsmovequery {
  padding: 0 20px;
}
.stockquery_list {
  margin-top: 20px;
}
</style>