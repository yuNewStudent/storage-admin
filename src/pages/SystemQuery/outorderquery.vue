<template>
  <div class="outorderquery">
    <el-header>
      <div class="selectStore">
        订单号:
        <el-input
          @change='handleFilter'
          v-model="filter.receipt_no"
          placeholder="请输入订单号">
        </el-input>
      </div>
      <div class="select_date">
        日期选择:
        <el-date-picker
          v-model="filter.apply_datetime"
          type="daterange"
          range-separator="至"
          @change='handleFilter'
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="search">
        申请人:
        <el-input
          v-model="filter.applicant"
          @change='handleFilter'
          placeholder="请输入申请人"></el-input>
      </div>
      <!-- <el-button type="primary" @click='handleFilter'>搜索</el-button> -->
      <div class="out_put">
        <el-button type="primary"  @click="buttonaudit">导出</el-button>
      </div>
    </el-header>
    <div class="outorderquery_list">
      <el-table :data="paginationData"  @selection-change="handleSelectionChange" border style="width: 100%">
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
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-count='orders.length/pageSize'
          :page-size='pageSize'
          layout="total, prev, pager, next, jumper"
          :total="orders.length"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import outputTable from '@/assets/js/outputTable'
export default {
  data() {
    return {
      // currentPage: 4,
      orders: [
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
        apply_datetime: ''
      },
      // 分页
      currentPage: 1,
      paginationData: [],
      goodsmalist:[],
      pageSize: 5
    };
  },
  components: {},
  mounted(){
   this.getOutorders();
  },
  methods: {
    // 条件筛选
    handleFilter () {
      const bol = this.filter.receipt_no || this.filter.apply_datetime ||  this.filter.applicant
      if (!bol) {
        this.getOutorders()
      } else {
        const data = {
          all: 0,
          receipt_no: this.filter.receipt_no,
          applicant: this.filter.applicant,
          apply_datetime_start: this.filter.apply_datetime.length ? this.moment(this.filter.apply_datetime[0]).format("YYYY-MM-DD") : '',
          apply_datetime_end: this.filter.apply_datetime.length ? this.moment(this.filter.apply_datetime[1]).format("YYYY-MM-DD") : ''
        }
        this.$http.post(`${config.httpBaseUrl}/medicine/query_out_storage/`, data).then(res=>{
          if (res.status === 1) {
            this.orders = res.content
          // 刚打开页面时加载前pageSize项、且自动生成分页数量
          this.getPaginationData(1)
          }
        })
      }
    },
    handleSelectionChange (val) {
      this.goodsmalist=val;
    },
    // 获取所有出库单
    getOutorders () {
      const data = {
        all: 1,
        receipt_no:"",
        applicant:"",
        apply_datetime_start:"",
        apply_datetime_end:""
      };
      this.$http.post(`${config.httpBaseUrl}/medicine/query_out_storage/`,data).then(res => {
        if(res.status === 1){
          this.orders=res.content
          // 刚打开页面时加载前pageSize项、且自动生成分页数量
          this.getPaginationData(this.currentPage)
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
    // 分页
    getPaginationData (pageIndex) {
      const start = (pageIndex - 1) * this.pageSize
      const end = pageIndex * this.pageSize
      this.paginationData = this.orders.slice(start, end)
    },
    // 跳转至对应分页
    handleCurrentChange(val) {
      this.currentPage = val
      this.getPaginationData(val)
    },
    buttonsave: function() {},
    buttonaudit(){
      var title="出库单查询.cvs";
      var name=[
        {value:"收获单位"},
        {value:"订单编号"},
        {value:"商品类别"},
        {value:"商品名称"},
        {value:"商品规格"},
        {value:"单位"},
        {value:"所在仓库"},
        {value:"出库数量"},
        {value:"商品单价"},
        {value:"商品总价"},
        {value:"申请人"},
        {value:"收获地址"},
        {value:"收获人"},
         {value:"联系电话"},
         {value:"出库用途"},
         {value:"出库日期"},
         {value:"备注"},
      ]
      outputTable(this.goodsmalist,name,title)
    }
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