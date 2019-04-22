<template>
  <div class="outorderquery">
    <el-header>
      <div class="selectStore">
        订单号:
        <el-input v-model="filter.receipt_no" placeholder="请输入订单号">
        </el-input>
      </div>
      <div class="select_date">
        日期选择:
        <el-date-picker
          v-model="filter.apply_datetime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="search">
        申请人:
        <el-input
          v-model="filter.applicant"
          placeholder="请输入申请人"></el-input>
      </div>
      <el-button type="primary" @click='handleFilter'>搜索</el-button>
      <div class="out_put">
        <el-button type="primary"  @click="buttonaudit">导出</el-button>
      </div>
    </el-header>
    <div class="outorderquery_list">
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
  </div>
</template>
<script>
export default {
  data() {
    return {
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
        // }
      ],
      filter: {
        receipt_no: '',
        applicant: '',
        apply_datetime: []
      }
    };
  },
  components: {},
  mounted(){
   this.getOutorders();
  },
  methods: {
    // 条件筛选
    handleFilter () {
      const data = {
        all: 0,
        receipt_no: this.filter.receipt_no,
        applicant: this.filter.applicant,
        apply_datetime_start: this.filter.apply_datetime.length ? this.moment(this.filter.apply_datetime[0]).format("YYYY-MM-DD") : '',
        apply_datetime_end: this.filter.apply_datetime.length ? this.moment(this.filter.apply_datetime[1]).format("YYYY-MM-DD") : ''
      }
      this.$http.post(`${config.httpBaseUrl}/medicine/query_out_storage/`, data).then(res=>{
        console.log(res)
        if (res.status === 1) {
          this.tableData = res.content
        }
      })
    },
    // 获取所有出库单
    getOutorders(){
      const data = {
        all: 1,
        receipt_no:"",
        applicant:"",
        apply_datetime_start:"",
        apply_datetime_end:""
      };
      this.$http.post(`${config.httpBaseUrl}/medicine/query_out_storage/`,data).then(res => {
        if(res.status === 1){
          this.tableData=res.content;
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
      .el-input {
        width: 130px;
      }
    }
    .select_date {
      margin-left: 20px;
    }
    .search {
      margin-left: 20px;
      width: 300px;
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