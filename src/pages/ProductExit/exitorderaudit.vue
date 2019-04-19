<template>
  <div class="exitorderaudit">
    <el-header>
      <div class="selectStore">
        申请人:
        <el-select size="medium" filterable @click.native="getDivisdon()" v-model="value" placeholder="请输入经办人">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="selectStore">
        订单状态:
        <el-select size="medium" filterable @click.native="getDivision()"
     placeholder="全部"  v-model="valuees" >
          <el-option
            v-for="item in ordersStatus"
            filterable
            :key="item.status"
            :label="item.label"
            :value="item.status"
          ></el-option>
        </el-select>
      </div>
      <div class="select_date">
        日期选择:
         <el-date-picker
          v-model="value9"
          type="daterange"
          start-placeholder="开始日期"
          value9
          @change='pickDate'
          end-placeholder="结束日期"
          default-value="2010-10-01">
        </el-date-picker>
      </div>
      <div class="buttons">
        <el-button type="primary" size="medium" @click="Outboundxc">提交</el-button>
        <el-button type="primary" size="medium" @click="handleOutput">导出</el-button>
      </div>
    </el-header>
    <el-main>
      <el-table
        :data="orders"
        type="expand"
        border
        size='small'
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          width="55">
        </el-table-column>
        <el-table-column label="出库订单编号" prop='receipt_no'>
        </el-table-column>
        <el-table-column label="收货单位" prop='client'>
        </el-table-column>
        <el-table-column label="申请人" prop='applicant'>
        </el-table-column>
        <el-table-column label="申请时间" prop='apply_datetime'>
        </el-table-column>
        <el-table-column label="状态" prop='status'>
        </el-table-column>
        <el-table-column label="操作" prop='goodsCategory'>
          <template scope="scope">
              <el-button @click="exitordetails(scope.$index, scope.row)">详情</el-button>
              <el-button @click="Outbound(scope.$index, scope.row)">回退</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>

      <h5>订单详情：</h5>
       <el-table
        :data="tableData3"
        border
        size='small'
        style="width: 100%">
        <el-table-column
          type="index"
          width="55">
        </el-table-column>
        <el-table-column label="商品类别" prop='category'>
        </el-table-column>
        <el-table-column label="商品名称" prop='goods_name'>
        </el-table-column>
        <el-table-column label="单位" prop='unit'>
        </el-table-column>
        <el-table-column label="所在仓库" prop='location'>
        </el-table-column>
        <el-table-column label="出库数量" prop='out_number'>
        </el-table-column>
        <el-table-column label="商品单价" prop='price'>
        </el-table-column>
        <el-table-column label="商品总额" prop='money'>
        </el-table-column>
        <el-table-column label="收货地址" prop='client_address'>
        </el-table-column>
        <el-table-column label="收货人" prop='client_contact'>
        </el-table-column>
        <el-table-column label="联系方式" prop='client_phone'>
        </el-table-column>
        <el-table-column label="出库用途" prop='purpose'>
        </el-table-column>
        <el-table-column label="备注" prop='apply_comment'>
        </el-table-column>
        <el-table-column label="回退理由" prop='goodsCategory'>
           <template slot-scope="scope">
            <el-input v-model="tableData3[scope.$index].reason_return"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-table :data="tableData3" border size="small" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="55"></el-table-column>
        <el-table-column label="商品类别" prop="goodsCategory"></el-table-column>
        <el-table-column label="商品名称" prop="goodsCategory"></el-table-column>
        <el-table-column label="申请采购数量" prop="goodsCategory"></el-table-column>
        <el-table-column label="单位" prop="goodsCategory"></el-table-column>
        <el-table-column label="所在仓库" prop="goodsCategory"></el-table-column>
        <el-table-column label="申请时间" prop="goodsCategory"></el-table-column>
        <el-table-column label="订单号" prop="goodsCategory"></el-table-column>
        <el-table-column label="经办人" prop="goodsCategory"></el-table-column>
        <el-table-column label="用途" prop="goodsCategory"></el-table-column>
        <el-table-column label="备注" prop="goodsCategory"></el-table-column>
        <el-table-column label="状态" prop="goodsCategory"></el-table-column>
      </el-table> -->
    </el-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage:4,
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
      ],
      options:[],
      tableData3:[
        {
       goods_name:"商品名称",
        category: "商品类别",
        unit: "单位",
        location: "所在位置",
        out_number: 10,
        price: 1.2, 
        money: 12, 
        client_address: "收货地址",
        client_contact: "收货联系人",
        client_phone: "收货联系电话",
        purpose: "用途",
        apply_comment: "",
        reason_return:"",
        },
         {
       goods_name:"商品名称",
        category: "商品类别",
        unit: "单位",
        location: "所在位置",
        out_number: 10,
        price: 1.2, 
        money: 12, 
        client_address: "收货地址",
        client_contact: "收货联系人",
        client_phone: "收货联系电话",
        purpose: "用途",
        apply_comment: "",
        reason_return:"",
        },
      ],
      orders: [
        {
          receipt_no: "哈德",
          client: "哈德",
          client_address: "哈德",
          applicant: "哈德",
          apply_datetime: "哈德",
          status: "哈德",
          client_contact: "哈德",
          client_phone: "哈德"
        },
        
         {
          receipt_no: "哈德",
          client: "哈德",
          client_address: "哈德",
          applicant: "哈德",
          apply_datetime: "哈德",
          status: "哈德",
          client_contact: "哈德",
          client_phone: "哈德"
        },
      ],
      multipleSelection:[],
      value8:"",
      value:"",
      value9:"",
      valuees:"",
      starttime:"",
      endtime:"",
    };
  },
  mounted(){
    // this.exitorder();
  },
   methods: {
     getDivisdon(){
         this.conditions();
     },
      //申请人
     applicant(){
          this.$http.post('${config.httpBaseUrl}/man/get_all_client/',{
              all:0,
              applicant:"",
              status:this.valuees,
              apply_datetime_start:this.starttime,
              apply_datetime_end:this.endtime,
            }).then(res=>{
              this.options=res.tableData3;
            });
     },
     //审核
       getDivision() {
        this.conditions();
      },
     //s审核
    //  exitorstate(status){
    //   console.log(status)
    //  },
     //日期选择
     pickDate(date){
       let time=date;
        let starttime=this.moment(time[0]).format("YYYY-MM-DD HH:mm:ss");
        let endtime=this.moment(time[1]).format("YYYY-MM-DD HH:mm:ss");
        this.starttime=starttime;
        this.endtime=endtime;
        this.conditions();
     },
     //条件查询
     conditions(){
         this.$http.post('${config.httpBaseUrl}/medicine/get_outStorageReceipt/',{
              all:0,
              applicant:this.value,
              status:this.valuees,
              apply_datetime_start:this.starttime,
              apply_datetime_end:this.endtime,
            }).then(res=>{
              // this.orders=res.tableData3;
            });
     },
     //提交审核
     Outboundxc(){
       var audited_datetime
        this.$http.post('${config.httpBaseUrl}/medicine/audited_outStorageReceipt/',{
              multipleSelection:this.multipleSelection,
              audited_datetime:audited_datetime,
               audited_datetime:this.moment(new Date()).format('YYYY-MM-DD')
            }).then(res=>{
              // this.orders=res.tableData3;
            });
     },
     handleSelectionChange(val){
         this.multipleSelection = val;
     },
     //请求所有的
    //  exitorder(){
    //         this.$http.post('${config.httpBaseUrl}/medicine/get_outStorageReceipt/',{
    //            "all": 1,
    //         }).then(res=>{
    //           this.orders=res.tableData3;
    //         });
    //     },
    //     //详情
    //     exitordetails(index,row){
    //         this.$http.post('${config.httpBaseUrl}/medicine/detail_outStorageReceipt/',{
    //            receipt_no:row.receipt_no,
    //         }).then(res=>{
    //           this.tableData3=res.tableData3;
    //         }); 
    //     },
        //回退
        // Outbound(index,row){
        //     this.$http.post('${config.httpBaseUrl}/medicine/return_outStorageReceipt/',{
        //        receipt_no:row.receipt_no,
        //        tabledata3:this.tableData3,
        //        auditor:"",
        //     }).then(res=>{
        //       this.tableData3=res.tableData3;
        //     }); 
        // },
        handleOutput(){
         console.log(121);
        },
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    }
};
</script>

<style lang="scss" scoped>
.exitorderaudit {
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
      margin-left: 20px;
    }
    .buttons {
      float: right;
      text-align: right;
    }
  }
  .el-main {
    padding: 0;
    
    .el-pagination {
      margin-top: 10px;
      text-align: right;
    }
    h5 {
      margin: 30px 0 10px;
    }
  }
}
</style>


