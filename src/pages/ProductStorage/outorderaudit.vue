<template>
  <div class="outorderaudit">
    <el-header>
      <div class="selectStore">
        申请人:
        <el-select size='medium' v-model="value" placeholder="请输入经办人">
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
        <el-select size='medium' v-model="value" placeholder="全部">
          <el-option
            v-for="item in ordersStatus"
            :key="item.label"
            :label="item.label"
            :value="item.label"
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
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change='pickDate'>
        </el-date-picker>
      </div>
      <div class="buttons">
        <el-button type='primary' size='medium' @click="goodsubmit">提交</el-button>
        <el-button type='primary' size='medium' @click='handleOutput'>导出</el-button>
      </div>
    </el-header>
    <el-main>
      <el-table
        :data="orders"
        border
        size='small'
        highlight-current-row
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          width="55">
        </el-table-column>
        <el-table-column label="订单号" prop='receipt_no'>
        </el-table-column>
        <el-table-column label="供应商" prop='supplier'>
        </el-table-column>
        <el-table-column label="申请人" prop='applicant'>
        </el-table-column>
        <el-table-column label="申请时间" prop='apply_datetime'>
        </el-table-column>
        <el-table-column label="状态" prop='status'>
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
               <el-button @click="outordetails(scope.$index, scope.row)">详情</el-button>
          <el-button @click="outorfallback(scope.$index, scope.row)">回退</el-button>
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
        :data="data"
        border
        size='small'
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          width="55">
        </el-table-column>
        <el-table-column label="商品类型" prop='category'>
        </el-table-column>
        <el-table-column label='商品名称' prop='goods_name'>
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
          <el-input v-model="reason_return"></el-input>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentPage:4,
      date: '',
      data:[],
      reason_return:"",
      options: [
        {
          value: "选项1",
          label: "四川省经济贸易公司"
        },
        {
          value: "选项2",
          label: "四川棋照科技有限公司"
        },
        {
          value: "选项3",
          label: "攀枝花攀钢公司"
        },
        {
          value: "选项4",
          label: "阿里巴巴有限公司"
        },
        {
          value: "选项5",
          label: "北京经贸技校公司"
        }
      ],
      receipt_no:"",
      value:"",
      orders: [
        {
          receipt_no: '哈德',
          supplier: '哈德',
          applicant: '哈德',
          apply_datetime: '哈德',
          status: '哈德',
        }
      ],
      starttime:"",
      endtime:"",
      ordersStatus: [
        {
          label: '已审核',
        },
        {
          label: '待审核',
        },
        {
          label: '未通过',
        }
      ]
    }
  },
  methods:{
    //查询所有的订单
      allaudit(){
        this.$http.post('${config.httpBaseUrl}/medicine/get_inStorageReceipt/',{
            all: 1,
          }).then(res=>{
          this.orders=res.data.allgoods;
        })
      },
      //详情
      outordetails(index, row){
        console.log(index)
      this.receipt_no=row.receipt_no;
       this.$http.post('${config.httpBaseUrl}/medicine/get_inStorageReceipt/',{
            receipt_no: this.receipt_no,
          }).then(res=>{
          this.data=res.data.allgoods;
        })
      },
      //提交审核
      goodsubmit(){
        this.$http.post('${config.httpBaseUrl}/medicine/get_goods/',{
            receipt_no: this.receipt_no,
          }).then(res=>{
          this.data=res.data.allgoods;
        })
      },
      //回退
      outorfallback(index, row){
        var receipt_no=receipt_no;
        var goods_name=goods_name;
        var reason_return=this.reason_return;
        var auditor=auditor;
        var date=new Date();
         let times=this.moment(date[0]).format("YYYY-MM-DD HH:mm:ss");
        this.$http.post('${config.httpBaseUrl}/medicine/get_inStorageReceipt/',{
            receipt_no: receipt_no,
            goods_name:goods_name,
            reason_return:reason_return,
            auditor:auditor,
            audited_datetime:date,
          }).then(res=>{
          this.data=res.data.allgoods;
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      //日期查询
      pickDate (date) {
        let time=date;
        let starttime=this.moment(time[0]).format("YYYY-MM-DD HH:mm:ss");
        let endtime=this.moment(time[1]).format("YYYY-MM-DD HH:mm:ss");
        this.starttime=starttime;
        this.endtime=endtime;
        console.log(this.starttime,this.endtime)
      },
      handleOutput(){
        
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
}
</style>


