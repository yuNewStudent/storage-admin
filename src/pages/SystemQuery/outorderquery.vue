<template>
  <div class="outorderquery">
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
      <div class="select_date">
        日期选择:
        <el-date-picker
          v-model="value6"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="search">
        申请人:
        <el-input placeholder="请输入申请人"></el-input>
        <el-button type="primary">搜索</el-button>
      </div>
      <div class="out_put">
        <el-button type="primary" size="medium" @click="buttonaudit">导出</el-button>
      </div>
    </el-header>
    <div class="outorderquery_list" v-if="show===false">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        
        <el-table-column prop="client" label="收货单位">
        </el-table-column>
        <el-table-column prop="receipt_no" label="订单编号"></el-table-column>
        <el-table-column prop="category" label="商品类别"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称"></el-table-column>
        <el-table-column prop="specification" label="商品规格"></el-table-column>
        <el-table-column prop="unit" label="单位"></el-table-column>
        <el-table-column prop="location" label="所在仓库"></el-table-column>
        <el-table-column prop="out_number" label="出库数量"></el-table-column>
        <el-table-column prop="price" label="商品单价"></el-table-column>
        <el-table-column prop="money" label="商品总价"></el-table-column>
        <el-table-column prop="applicant" label="申请人"></el-table-column>
        <el-table-column prop="client_address" label="收货地址"></el-table-column>
        <el-table-column prop="client_contact" label="收货人"></el-table-column>
        <el-table-column prop="client_phone" label="联系方式"></el-table-column>
        <el-table-column prop="purpose" label="出库用途"></el-table-column>
        <el-table-column prop="out_storage_time" label="出库日期"></el-table-column>
        <el-table-column prop="apply_comment" label="备注"></el-table-column>
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
        // {
        //   category: "医药",
        //   commodity: "阿莫西林",
        //   specifications: "1/23/25",
        //   number: "2",
        //   number1: "1",
        //   unit: "箱",
        //   phone: "15828658729",
        //   warehouse: "A区",
        //   contact: "李女士",
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
        //   address: "四川省成都是武侯区",
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
      value6:"",
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
  mounted(){
   this.listquery();
  },
  methods: {
    listquery(){
      const data = {
        all: 1,
        receipt_no:"",
        applicant:"",
        apply_datetime_start:"",
        apply_datetime_end:""
      };
      this.$http.post(`${config.httpBaseUrl}/medicine/query_out_storage/`,data).then(res => {
             if(res.status==1){
               this.tableData=res.content;
             }else{
               return
             }
        })
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
      width: 200px;
      .el-select {
        width: 130px;
      }
    }
    .select_date {
      margin-left: 20px;
    }
    .search {
      margin-left: 20px;
      width: 350px;
      .el-input {
        width: 200px;
      }
    }
    .out_put {
      float: right;
    }
  }
}
</style>