<template>
  <div class="returnquery">
    <el-header>
      <div class="selectStore">
        订单号:
        <el-input @change="handleFilter" v-model="filter.receipt_no" placeholder="请输入订单号"></el-input>
      </div>
      <!-- <div class="search">
        申请人:
        <el-input placeholder="请输入申请人"></el-input>
        <el-button type="primary">搜索</el-button>
      </div>-->
      <div class="select_date">
        日期选择:
        <el-date-picker
          v-model="filter.apply_datetime"
          type="daterange"
          @change="handleFilter"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
      <div class="out_put">
        <el-button type="primary" size="medium" @click="buttonaudit">导出</el-button>
      </div>
    </el-header>
    <el-main>
      <el-table :data="paginationData" @selection-change="handleSelectionChange" border style="width: 100%">
        <el-table-column type="selection" width="45"></el-table-column>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="receipt_no" label="出库订单号"></el-table-column>
        <el-table-column prop="client" label="收货商"></el-table-column>
        <el-table-column prop="category" label="商品类别"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称"></el-table-column>
        <el-table-column prop="specification" label="商品规格"></el-table-column>
        <el-table-column prop="unit" label="单位"></el-table-column>
        <el-table-column prop="location" label="所在库位"></el-table-column>
        <el-table-column prop="barcode" label="条形码"></el-table-column>
        <el-table-column prop="out_number" label="出库数量"></el-table-column>
        <el-table-column prop="return_number" label="归还入库数"></el-table-column>
        <el-table-column prop="estimated_price" label="商品单价"></el-table-column>
        <!-- <el-table-column prop="name" label="生产日期"></el-table-column>
        <el-table-column prop="name" label="保质期"></el-table-column>
        <el-table-column prop="name" label="到期时间"></el-table-column>-->
        <el-table-column prop="expired_time_warning" label="到期时间预警"></el-table-column>
        <el-table-column prop="reason_return" label="归还理由"></el-table-column>
      </el-table>
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-count="purchaseOrders.length/pageSize"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="purchaseOrders.length"
        ></el-pagination>
      </div>
    </el-main>
  </div>
</template>
<script>
import outputTable from '@/assets/js/outputTable'
export default {
  data() {
    return {
      input10: "",
      currentPage: 1,
      paginationData: [],
      pageSize: 5,
      tableData: [],
      purchaseOrders: [],
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
      goodsmalist:[],
      filter: {
        receipt_no: "",
        applicant: "",
        apply_datetime: ""
      },
      value: "",
      value1: ""
    };
  },
  components: {},
  mounted() {
    this.getOrders();
  },
  methods: {
     handleSelectionChange (val) {
      this.goodsmalist=val;
    },
    handleFilter() {
      const bol = this.filter.receipt_no || this.filter.apply_datetime;
      if (!bol) {
        this.getOrders();
      } else {
        const data = {
          all: 0,
          receipt_no: this.filter.receipt_no,
          apply_datetime_start: this.filter.apply_datetime.length
            ? this.moment(this.filter.apply_datetime[0]).format("YYYY-MM-DD")
            : "",
          apply_datetime_end: this.filter.apply_datetime.length
            ? this.moment(this.filter.apply_datetime[1]).format("YYYY-MM-DD")
            : ""
        };
        this.$http
          .post(`${config.httpBaseUrl}/medicine/query_return_storage/`, data)
          .then(res => {
            if (res.status === 1) {
              this.purchaseOrders = res.content;
              // 刚打开页面时加载前pageSize项、且自动生成分页数量
              this.getPaginationData(1);
            }
          });
      }
    },
    // 分页
    getPaginationData(pageIndex) {
      const start = (pageIndex - 1) * this.pageSize;
      const end = pageIndex * this.pageSize;
      this.paginationData = this.purchaseOrders.slice(start, end);
    },
    getOrders() {
      const data = {
        all: 1,
        receipt_no: this.filter.receipt_no,
        applicant: this.filter.applicant,
        apply_datetime_start: this.filter.apply_datetime.length
          ? this.moment(this.filter.apply_datetime[0]).format("YYYY-MM-DD")
          : "",
        apply_datetime_end: this.filter.apply_datetime.length
          ? this.moment(this.filter.apply_datetime[1]).format("YYYY-MM-DD")
          : ""
      };
      this.$http
        .post(`${config.httpBaseUrl}/medicine/query_return_storage/`, data)
        .then(res => {
          if (res.status == 1) {
            this.purchaseOrders = res.content;
            this.getPaginationData(1);
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
    // 跳转至对应分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPaginationData(val);
    },
    buttonsave: function() {},
    buttonaudit(){
     var title="归还入库查询.cvs";
      var name=[
        {value:"采购订单号"},
        {value:"供应商"},
        {value:"商品类别"},
        {value:"商品名称"},
        {value:"商品规格"},
        {value:"单位"},
        {value:"所在仓库"},
        {value:"条形码"},
        {value:"出库数量"},
        {value:"归还入库数"},
        {value:"商品单价"},
        {value:"到期时间预警"},
         {value:"归还理由"},
      ]
      outputTable(this.goodsmalist,name,title)
    },
  }
};
</script>
<style lang='scss' scoped>
.returnquery {
  margin: 20px 0 0;
  .el-header {
    > div {
      display: inline-block;
    }
    .selectStore {
      width: 300px;
      .el-input {
        width: 150px;
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
  .el-main {
    padding: 0 20px;
  }
}
</style>