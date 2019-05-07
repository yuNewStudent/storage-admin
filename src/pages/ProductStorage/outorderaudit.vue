<template>
  <div class="outorderaudit">
    <el-header>
      <div class="selectStore">
        申请人:
        <el-select
          filterable
          clearable
          size='medium'
          v-model="filter.applicant"
          @change="handleFilter"
          placeholder="请输入经办人">
          <el-option
            v-for="(item, index) in applicants"
            :key="index"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </div>
      <div class="selectStore">
        订单状态:
        <el-select
          filterable
          clearable
          size='medium'
          v-model="filter.status"
          @change="handleFilter"
          placeholder="全部">
          <el-option
            v-for="item in ordersStatus"
            :key="item.label"
            :label="item.label"
            :value="item.status"
          ></el-option>
        </el-select>
      </div> 
      <div class="select_date">
        日期选择:
        <!-- <el-date-picker size='medium'
          v-model="value1"
          type="date">
        </el-date-picker> -->
        <el-date-picker
          v-model="filter.apply_datetime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change='handleFilter'>
        </el-date-picker>
      </div>
      <div class="buttons">
        <el-button type='primary' size='medium' @click='handleOutput'>导出</el-button>
      </div>
    </el-header>
    <el-main>
      <el-table
        :data="paginationData"
        border
        size='small'
        highlight-current-row
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="序号"
          type="index"
          width="55">
        </el-table-column>
        <el-table-column label="订单号" prop='receipt_no'>
        </el-table-column>
        <el-table-column label="申请人" prop='applicant'>
        </el-table-column>
        <el-table-column label="申请时间" prop='apply_datetime'>
        </el-table-column>
        <el-table-column label="状态" prop='status'>
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
               <el-button size='mini' type='primary' @click="outordetails(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column label="单位" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="所在仓库" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="订单号" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="经办人" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="用途" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="备注" prop='goodsCategory'>
        </el-table-column>
         -->
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-count='orders.length/pageSize'
        :page-size='pageSize'
        layout="total, prev, pager, next, jumper"
        :total="orders.length"
      ></el-pagination>
      
      <h5>订单详情：</h5>
      <el-table
        :data="datalist"
        border
        size='small'
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="55">
        </el-table-column>
        <el-table-column label="商品类型" prop='category'>
        </el-table-column>
        <el-table-column label='商品名称' prop='goods_name'>
        </el-table-column>
        <el-table-column label="供应商" prop='supplier'>
        </el-table-column>
        <el-table-column label="单位" prop='unit'>
        </el-table-column>
        <el-table-column label="申请数量" prop='apply_number'>
        </el-table-column>
        <el-table-column label="预估单价" prop='estimated_price'>
        </el-table-column>
        <el-table-column label="预估总价" prop='estimated_money'>
        </el-table-column>
        <el-table-column label="用途" prop='purpose'>
        </el-table-column>
        <el-table-column label="申请人备注" prop='apply_comment'>
        </el-table-column>
        <el-table-column label="回退理由">
        	  <template slot-scope="scope">
              <el-input v-model="datalist[scope.$index].reason_return"></el-input>
            </template>
        </el-table-column>
      </el-table>
      <div class="warehousing">
        <el-button v-if="show=='待审核'" type='primary' size='medium' @click="goodsubmit">提交</el-button>
        <el-button v-if="show=='待审核'" type='primary' @click="outorfallback()">回退</el-button>
      </div>
    </el-main>
  </div>
</template>

<script>
export default {
  data () {
    return {
      date: '',
      show:"",
      datalist:[],
      reason_return:"",
      applicants: [
        // {
        //   value: "选项1",
        //   label: "四川省经济贸易公司"
        // }
      ],

      filter: {
        applicant: '',
        status: '',
        apply_datetime: ''
      },

      // 分页
      currentPage: 1,
      paginationData: [],
      pageSize: 5,

      receipt_no:"",
      value:"",
      name:"",
      multiSelection:[],
      orders: [
        // {
        //   receipt_no: '哈德',
        //   supplier: '哈德',
        //   applicant: '哈德',
        //   apply_datetime: '哈德',
        //   status: '哈德',
        // }
      ],
      starttime:"",
      endtime:"",
      ordersStatus: [
        {
          label: '已审核',
          status:0,
        },
        {
          label: '待审核',
          status:1,
        },
        {
          label: '未通过',
          status:2,
        }
      ]
    }
  },
  mounted(){
    this.allaudit()
    this.applicantlist()
  },
  methods:{
    handleSelectionChange(val){
        this.multiSelection = val;
    },
    //入库单审核人
    applicantlist(){
      this.$http.post(`${config.httpBaseUrl}/man/get_all_employee/`).then(res=>{
          console.log(res)
        if(res.status==1){
          this.applicants = res.content
        }else{
          return
        }
      }) 
    },
    //排序查询
    handleFilter () {
      const bol = this.filter.applicant || (this.filter.status + '').length || this.filter.apply_datetime
      if (!bol) {
        this.allaudit()
      } else {
        const data = {
          all: 0,
          applicant: this.filter.applicant,
          status: this.filter.status === '' ? -1 : this.filter.status,
          apply_datetime_start: this.filter.apply_datetime.length ? this.moment(this.filter.apply_datetime[0]).format("YYYY-MM-DD") : '',
          apply_datetime_end: this.filter.apply_datetime.length ? this.moment(this.filter.apply_datetime[1]).format("YYYY-MM-DD") : ''
        }
        this.$http.post(`${config.httpBaseUrl}/medicine/get_inStorageReceipt/`, data).then(res=>{
          if(res.status==1){
            console.log(res)
            this.orders = res.content
            // 刚打开页面时加载前pageSize项、且自动生成分页数量
            this.getPaginationData(1)
          }else{
            return
          }
        })
      }
    },
    //查询所有的订单
      allaudit(){
        this.$http.post(`${config.httpBaseUrl}/medicine/get_inStorageReceipt/`,{
            all: 1,
          }).then(res=>{
            if(res.status==1){
              this.orders=res.content
              // 刚打开页面时加载前pageSize项、且自动生成分页数量
              this.getPaginationData(this.currentPage)
            }else{
              return
            }
        })
      },
      //详情
      outordetails(index, row){
      this.show=row.status;
      console.log(this.show);
      this.receipt_no=row.receipt_no;
       this.$http.post(`${config.httpBaseUrl}/medicine/detail_inStorageReceipt/`,{
            receipt_no: this.receipt_no,
          }).then(res=>{
          if(res.status==1){
            console.log(res)
            this.datalist=res.content;
          }else{
            return
          }
        })
      },
      //提交审核
      goodsubmit(){
         var receipt_no=this.receipt_no;
        var datalist=this.datalist;
         var user=JSON.parse(this.$cookie.get('user')||'{}');
        var date=new Date();
         var time=this.moment(new Date()).format('YYYY-MM-DD');
          let multipleSelection = this.datalist.map(v => {
            v.audited_datetime = time;
            v.receipt_no=receipt_no;
            v.auditor=user.name
            return v;
          })
        this.$http.post(`${config.httpBaseUrl}/medicine/audited_inStorageReceipt/`,multipleSelection).then(res=>{
           if(res.status==1){
              // this.datalist=res.content;
               this.datalist=[];
               this.show=false;
               this.allaudit();
              this.$message({
              showClose: true,
              message: res.content,
              type: 'success'
            });
           }else{
             this.$message({
              showClose: true,
              message:res.content,
              type: 'warning'
            });
           }
        })
      },
      //回退
      outorfallback(){
        var receipt_no=this.receipt_no;
        var datalist=this.datalist;
         var user=JSON.parse(this.$cookie.get('user')||'{}');
        var date=new Date();
         var time=this.moment(new Date()).format('YYYY-MM-DD');
          let multipleSelection = this.datalist.map(v => {
            v.audited_datetime = time;
            v.receipt_no=receipt_no;
            v.auditor=user.name
            return v;
          })
        this.$http.post(`${config.httpBaseUrl}/medicine/return_inStorageReceipt/`,multipleSelection).then(res=>{
           if(res.status==1){
              this.datalist=[];
               this.show=false;
               this.allaudit();
              this.$message({
              showClose: true,
              message: res.content,
              type: 'success'
            });
           }else{
             this.$message({
              showClose: true,
              message:res.content,
              type: 'warning'
            });
           }
        })
      },
      handleOutput(){
        var list=this.multiSelection;
        this.$http.post(`${config.httpBaseUrl}/medicine/export_in_receipt_excel/`,list).then(res=>{
           if(res.status==1){
             console.log(res);
           }else{
             this.$message({
              showClose: true,
              message:res.content,
              type: 'warning'
            });
           }
        })
      },
    // 分页
    getPaginationData (pageIndex) {
      const start = (pageIndex - 1) * this.pageSize
      const end = pageIndex * this.pageSize
      this.paginationData = this.orders.slice(start, end)
    },
    // 跳转至对应分页
    handleCurrentChange(val) {
      this.getPaginationData(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.outorderaudit {
  padding: 0 30px;
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
    .buttons {
      float: right;
    }
  }
  .el-main {
    padding: 0;
    h5 {
      margin: 30px 0 10px;
    }
    .el-pagination {
      margin-top: 10px; 
      text-align: right;
    }
  }
  .warehousing{
    float: right;
    margin: 20px 0px;
  }
}
</style>


